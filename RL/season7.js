(() => {
  const season7ApiBase = window.location.protocol === "file:" ? "http://127.0.0.1:8765" : "";
  const runtime = {
    mode: "signup",
    payload: null,
    loading: false,
    error: "",
    message: "",
    formDirty: false,
    hostKey: sessionStorage.getItem("gtrls-s7-host-key") || "",
    poller: null,
  };

  const html = (value) => escapeHtml(String(value ?? ""));
  const percent = (value) => `${Number(value || 0).toFixed(1)}%`;
  const decimal = (value) => Number(value || 0).toFixed(2);

  function regularCareerRows(name) {
    const candidates = [name, canonicalPlayerName(name)].map((item) => aliasKey(item));
    const effectivePlayers = [
      ...data.players.filter((row) => row.season !== "S6"),
      ...s6StagePlayerRows("overall", "overall"),
    ];
    return effectivePlayers.filter((row) => candidates.includes(aliasKey(row.name)))
      .filter((row) => /^S\d+$/.test(row.season));
  }

  function careerProfile(signup) {
    let rows = regularCareerRows(signup.displayName);
    if (!rows.length) rows = regularCareerRows(signup.trackerName);
    if (!rows.length) {
      return { known: false, games: 0, score: 0, goals: 0, assists: 0, saves: 0, shots: 0, avgScore: 0, goalsPerGame: 0, assistsPerGame: 0, savesPerGame: 0, shootingPct: 0, perPerGame: 0, playstyle: "New prospect" };
    }
    const latestSeasonNumber = Math.max(...rows.map((row) => Number(String(row.season).replace(/^S/, "")) || 0));
    rows = rows.filter((row) => Number(String(row.season).replace(/^S/, "")) === latestSeasonNumber);
    const totals = rows.reduce((sum, row) => {
      ["games", "score", "goals", "assists", "saves", "shots", "per"].forEach((key) => { sum[key] += Number(row[key]) || 0; });
      return sum;
    }, { games: 0, score: 0, goals: 0, assists: 0, saves: 0, shots: 0, per: 0 });
    const games = totals.games || 1;
    const rates = {
      avgScore: totals.score / games,
      goalsPerGame: totals.goals / games,
      assistsPerGame: totals.assists / games,
      savesPerGame: totals.saves / games,
      shootingPct: totals.shots ? (totals.goals / totals.shots) * 100 : 0,
      perPerGame: totals.per / games,
    };
    const styleScores = [
      ["Finisher", rates.goalsPerGame / 1.2],
      ["Playmaker", rates.assistsPerGame / 0.75],
      ["Last-line anchor", rates.savesPerGame / 1.6],
    ].sort((a, b) => b[1] - a[1]);
    const margin = styleScores[0][1] - styleScores[1][1];
    return { known: true, ...totals, ...rates, playstyle: margin < 0.12 ? "Two-way contributor" : styleScores[0][0] };
  }

  function profileMarkup(signup, compact = false) {
    const profile = careerProfile(signup);
    const tracker = signup.trackerUrl
      ? `<a class="s7-tracker-link" href="${html(signup.trackerUrl)}" target="_blank" rel="noopener noreferrer">Tracker profile</a>`
      : `<span class="s7-tracker-link is-muted">No profile link</span>`;
    return `
      <div class="s7-player-main">
        <div>
          <strong>${html(displayName(signup.displayName, "name"))}</strong>
          <span>${html(profile.playstyle)} · Role ${html(signup.preferredRole === "flex" ? "Flex" : signup.preferredRole)}</span>
        </div>
        <div class="s7-mmr ${signup.mmrStatus === "verified" ? "is-verified" : ""}">
          <strong>${Number(signup.mmr || 0).toLocaleString()}</strong>
          <span>${signup.mmrStatus === "verified" ? "Verified MMR" : "Submitted MMR"}</span>
        </div>
      </div>
      ${compact ? "" : `
        <div class="s7-stat-line">
          <span><b>${profile.games || "-"}</b> GP</span>
          <span><b>${profile.known ? decimal(profile.avgScore) : "N/A"}</b> Score/G</span>
          <span><b>${profile.known ? decimal(profile.goalsPerGame) : "N/A"}</b> Gl/G</span>
          <span><b>${profile.known ? decimal(profile.assistsPerGame) : "N/A"}</b> A/G</span>
          <span><b>${profile.known ? decimal(profile.savesPerGame) : "N/A"}</b> Sv/G</span>
          <span><b>${profile.known ? percent(profile.shootingPct) : "N/A"}</b> Shot</span>
        </div>
        <div class="s7-player-links">${tracker}<span>${profile.known ? "Most recent season stats matched automatically" : "No prior GTRLS stats matched"}</span></div>
      `}
    `;
  }

  async function loadState({ quiet = false } = {}) {
    if (runtime.loading) return;
    runtime.loading = true;
    if (!quiet) runtime.error = "";
    try {
      const response = await fetch(`${season7ApiBase}/api/season7`, {
        cache: "no-store",
        headers: runtime.hostKey ? { "x-s7-admin-key": runtime.hostKey } : {},
      });
      if (!response.ok) throw new Error("Season 7 data is unavailable.");
      runtime.payload = await response.json();
    } catch (error) {
      runtime.error = error.message || "Unable to load the Season 7 board.";
    } finally {
      runtime.loading = false;
      if (state.view === "season7" && !(runtime.mode === "signup" && runtime.formDirty)) draw();
    }
  }

  async function post(path, body, admin = false) {
    runtime.error = "";
    runtime.message = "";
    const response = await fetch(path, {
      method: "POST",
      headers: { "content-type": "application/json", ...(admin ? { "x-s7-admin-key": runtime.hostKey } : {}) },
      body: JSON.stringify(body),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || "Unable to save that update.");
    return result;
  }

  function statusLabel(status) {
    return ({ signups: "Signups Open", draft: "Draft Live", complete: "Draft Complete" })[status] || "Preseason";
  }

  function navigation() {
    return `
      <div class="s7-navigation" role="tablist" aria-label="Season 7 draft sections">
        <button type="button" data-s7-mode="signup" class="${runtime.mode === "signup" ? "active" : ""}">Sign Up</button>
        <button type="button" data-s7-mode="board" class="${runtime.mode === "board" ? "active" : ""}">Draft Board</button>
        <button type="button" data-s7-mode="host" class="${runtime.mode === "host" ? "active" : ""}">Host Draft</button>
      </div>
    `;
  }

  function signupPage(payload) {
    const signups = [...payload.signups].sort((a, b) => b.mmr - a.mmr || a.displayName.localeCompare(b.displayName));
    return `
      <div class="s7-signup-layout">
        <section class="s7-form-panel">
          <div class="s7-section-head"><span>Enter the player pool</span><h2>Season 7 Signup</h2></div>
          <form id="s7SignupForm" class="s7-signup-form">
            <label><span>GTRLS / in-game name</span><input name="displayName" maxlength="40" required placeholder="Your usual player name"></label>
            <label><span>Tracker account name</span><input name="trackerName" maxlength="80" required placeholder="Epic, Steam, Xbox, or PSN name"></label>
            <div class="s7-form-row">
              <label><span>Platform</span><select name="platform"><option value="epic">Epic</option><option value="steam">Steam</option><option value="xbl">Xbox</option><option value="psn">PlayStation</option><option value="switch">Switch</option></select></label>
              <label><span>Current ranked MMR</span><input name="mmr" type="number" min="0" max="3000" required placeholder="e.g. 1185"></label>
              <label><span>Preferred role</span><select name="preferredRole"><option value="flex">Flex</option><option value="1">1</option><option value="2">2</option><option value="3">3</option></select></label>
            </div>
            <label><span>Rocket League Tracker profile</span><input name="trackerUrl" type="url" placeholder="https://tracker.gg/rocket-league/profile/.../"></label>
            <div class="s7-form-row two">
              <label><span>Discord</span><input name="discord" maxlength="80" placeholder="Private: only the league host can see this"></label>
              <label><span>Availability</span><input name="availability" maxlength="120" placeholder="Days / times you usually play"></label>
            </div>
            <label><span>Anything captains should know</span><textarea name="notes" maxlength="300" rows="3" placeholder="Comms, role flexibility, schedule notes"></textarea></label>
            <button class="s7-primary-button" type="submit" ${payload.settings.status !== "signups" ? "disabled" : ""}>${payload.settings.status === "signups" ? "Join the Draft Board" : "Signups are closed"}</button>
            <p class="s7-form-note">Career stats and playstyle are matched from GTRLS history. Tracker MMR is marked submitted until the host verifies it against the linked profile.</p>
          </form>
        </section>
        <section class="s7-pool-panel">
          <div class="s7-section-head"><span>${signups.length} registered</span><h2>Player Pool</h2></div>
          <div class="s7-player-list">${signups.length ? signups.map((signup, index) => `<article class="s7-player-row"><span class="s7-rank">${index + 1}</span><div>${profileMarkup(signup)}</div></article>`).join("") : `<p class="s7-empty">The board is waiting for its first player.</p>`}</div>
        </section>
      </div>
    `;
  }

  function boardPage(payload) {
    const drafted = new Set(payload.teams.flatMap((team) => team.picks));
    const available = payload.signups.filter((signup) => !drafted.has(signup.id)).sort((a, b) => b.mmr - a.mmr);
    const onClock = payload.teams.find((team) => team.id === payload.settings.currentTeamId);
    return `
      <section class="s7-clock-strip">
        <div><span>Round ${payload.settings.round} · Pick ${payload.settings.currentPick}</span><strong>${onClock ? html(onClock.name) : "Draft order pending"}</strong></div>
        <b>${onClock ? "On the clock" : statusLabel(payload.settings.status)}</b>
      </section>
      <div class="s7-draft-layout">
        <section class="s7-available-panel">
          <div class="s7-section-head"><span>${available.length} available</span><h2>Best Available</h2></div>
          <div class="s7-player-list compact">${available.length ? available.map((signup, index) => `<article class="s7-player-row"><span class="s7-rank">${index + 1}</span><div>${profileMarkup(signup)}</div></article>`).join("") : `<p class="s7-empty">Every registered player has been drafted.</p>`}</div>
        </section>
        <section class="s7-teams-panel">
          <div class="s7-section-head"><span>Live rosters</span><h2>Draft Board</h2></div>
          <div class="s7-team-grid">${payload.teams.length ? payload.teams.map((team) => `
            <article class="s7-team-column ${team.id === payload.settings.currentTeamId ? "is-on-clock" : ""}" style="--s7-team:${html(team.color)}">
              <header><span>${team.id === payload.settings.currentTeamId ? "On the clock" : `${team.picks.length} picks`}</span><h3>${html(team.name)}</h3></header>
              <ol>${team.picks.map((id) => payload.signups.find((signup) => signup.id === id)).filter(Boolean).map((signup) => `<li>${profileMarkup(signup, true)}</li>`).join("") || `<li class="s7-empty-pick">Roster spot open</li>`}</ol>
            </article>
          `).join("") : `<p class="s7-empty">The host has not added draft teams yet.</p>`}</div>
        </section>
      </div>
    `;
  }

  function hostPage(payload) {
    if (!runtime.hostKey) {
      return `<section class="s7-host-login"><span>League staff</span><h2>Open Host Controls</h2><p>Host access controls the live draft board and verifies submitted MMR.</p><form id="s7HostLogin"><input name="password" type="password" required placeholder="Host password"><button class="s7-primary-button" type="submit">Unlock Draft Room</button></form></section>`;
    }
    const available = payload.signups.filter((signup) => !payload.teams.some((team) => team.picks.includes(signup.id)));
    return `
      <section class="s7-host-toolbar">
        <div><span>Draft status</span><div class="s7-status-buttons">${["signups", "draft", "complete"].map((status) => `<button type="button" data-s7-status="${status}" class="${payload.settings.status === status ? "active" : ""}">${statusLabel(status)}</button>`).join("")}</div></div>
        <button type="button" data-s7-undo ${payload.draftLog.length ? "" : "disabled"}>Undo Last Pick</button>
        <button type="button" data-s7-lock>Lock Host Controls</button>
      </section>
      <div class="s7-host-grid">
        <section class="s7-host-section">
          <div class="s7-section-head"><span>Setup</span><h2>Draft Teams</h2></div>
          <form id="s7TeamForm" class="s7-inline-form"><input name="name" required placeholder="Team name"><input name="color" type="color" value="#20dff5" aria-label="Team color"><button type="submit">Add Team</button></form>
          <div class="s7-host-team-list">${payload.teams.map((team) => `<div style="--s7-team:${html(team.color)}"><button type="button" data-s7-on-clock="${team.id}" class="${team.id === payload.settings.currentTeamId ? "active" : ""}">${html(team.name)}</button><span>${team.picks.length} picks</span><button type="button" data-s7-remove-team="${team.id}" aria-label="Remove ${html(team.name)}">×</button></div>`).join("") || `<p class="s7-empty">Add teams in draft order.</p>`}</div>
        </section>
        <section class="s7-host-section">
          <div class="s7-section-head"><span>Round ${payload.settings.round} · Pick ${payload.settings.currentPick}</span><h2>Make a Pick</h2></div>
          <form id="s7DraftForm" class="s7-pick-form">
            <label><span>Player</span><select name="signupId" required><option value="">Select player</option>${available.map((signup) => `<option value="${signup.id}">${html(signup.displayName)} · ${signup.mmr} MMR</option>`).join("")}</select></label>
            <label><span>Team</span><select name="teamId" required><option value="">Select team</option>${payload.teams.map((team) => `<option value="${team.id}" ${team.id === payload.settings.currentTeamId ? "selected" : ""}>${html(team.name)}</option>`).join("")}</select></label>
            <button class="s7-primary-button" type="submit" ${!available.length || !payload.teams.length ? "disabled" : ""}>Announce Pick</button>
          </form>
        </section>
      </div>
      <section class="s7-verification-panel">
        <div class="s7-section-head"><span>Tracker review</span><h2>Verify Player MMR</h2></div>
        <div class="s7-verification-list">${payload.signups.map((signup) => `<div><div class="s7-contact"><strong>${html(signup.displayName)}</strong><small>${html([signup.discord, signup.availability].filter(Boolean).join(" · ") || "No contact details")}</small></div>${signup.trackerUrl ? `<a href="${html(signup.trackerUrl)}" target="_blank" rel="noopener noreferrer">Open Tracker</a>` : `<span>No link</span>`}<input type="number" min="0" max="3000" value="${signup.mmr}" data-s7-mmr-input="${signup.id}" aria-label="MMR for ${html(signup.displayName)}"><button type="button" data-s7-verify="${signup.id}">${signup.mmrStatus === "verified" ? "Verified" : "Verify"}</button><button type="button" data-s7-remove-signup="${signup.id}" class="danger">Remove</button></div>`).join("") || `<p class="s7-empty">No signups to verify.</p>`}</div>
      </section>
    `;
  }

  function draw() {
    if (!els.season7Panel) return;
    els.season7Panel.classList.remove("hidden");
    const payload = runtime.payload;
    if (!payload) {
      els.season7Panel.innerHTML = `<section class="s7-loading"><strong>${runtime.error || "Loading the Season 7 draft room..."}</strong>${runtime.error ? `<button type="button" data-s7-retry>Try Again</button>` : ""}</section>`;
      return;
    }
    const onClock = payload.teams.find((team) => team.id === payload.settings.currentTeamId);
    els.season7Panel.innerHTML = `
      <section class="s7-hero">
        <div><span class="s7-kicker">GTRLS Season 7</span><h1>The Draft Starts Here</h1><p>Sign up, bring your history with you, and watch the next season take shape live.</p></div>
        <div class="s7-hero-status"><span>${statusLabel(payload.settings.status)}</span><strong>${payload.signups.length}</strong><small>players registered</small>${onClock && payload.settings.status === "draft" ? `<b>${html(onClock.name)} on the clock</b>` : ""}</div>
      </section>
      ${navigation()}
      ${runtime.error ? `<p class="s7-alert error">${html(runtime.error)}</p>` : ""}
      ${runtime.message ? `<p class="s7-alert success">${html(runtime.message)}</p>` : ""}
      ${runtime.mode === "signup" ? signupPage(payload) : runtime.mode === "board" ? boardPage(payload) : hostPage(payload)}
    `;
  }

  async function adminAction(body) {
    try {
      runtime.payload = await post(`${season7ApiBase}/api/season7/admin`, body, true);
      draw();
    } catch (error) {
      runtime.error = error.message;
      if (/password/i.test(runtime.error)) {
        runtime.hostKey = "";
        sessionStorage.removeItem("gtrls-s7-host-key");
      }
      draw();
    }
  }

  els.season7Panel?.addEventListener("click", (event) => {
    const mode = event.target.closest("[data-s7-mode]");
    if (mode) { runtime.mode = mode.dataset.s7Mode; runtime.formDirty = false; runtime.error = ""; runtime.message = ""; draw(); return; }
    if (event.target.closest("[data-s7-retry]")) { loadState(); return; }
    if (event.target.closest("[data-s7-lock]")) { runtime.hostKey = ""; sessionStorage.removeItem("gtrls-s7-host-key"); draw(); return; }
    const status = event.target.closest("[data-s7-status]");
    if (status) { adminAction({ action: "setStatus", status: status.dataset.s7Status }); return; }
    if (event.target.closest("[data-s7-undo]")) { adminAction({ action: "undoPick" }); return; }
    const clock = event.target.closest("[data-s7-on-clock]");
    if (clock) { adminAction({ action: "setOnClock", teamId: clock.dataset.s7OnClock }); return; }
    const removeTeam = event.target.closest("[data-s7-remove-team]");
    if (removeTeam) { adminAction({ action: "removeTeam", teamId: removeTeam.dataset.s7RemoveTeam }); return; }
    const verify = event.target.closest("[data-s7-verify]");
    if (verify) {
      const input = els.season7Panel.querySelector(`[data-s7-mmr-input="${CSS.escape(verify.dataset.s7Verify)}"]`);
      adminAction({ action: "setMmr", signupId: verify.dataset.s7Verify, mmr: input?.value });
      return;
    }
    const removeSignup = event.target.closest("[data-s7-remove-signup]");
    if (removeSignup && confirm("Remove this player from the Season 7 board?")) adminAction({ action: "removeSignup", signupId: removeSignup.dataset.s7RemoveSignup });
  });

  els.season7Panel?.addEventListener("input", (event) => {
    if (event.target.closest("#s7SignupForm")) runtime.formDirty = true;
  });

  els.season7Panel?.addEventListener("change", (event) => {
    if (event.target.closest("#s7SignupForm")) runtime.formDirty = true;
  });

  els.season7Panel?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.target;
    const values = Object.fromEntries(new FormData(form));
    try {
      if (form.id === "s7SignupForm") {
        await post(`${season7ApiBase}/api/season7/signup`, values);
        form.reset();
        runtime.formDirty = false;
        runtime.message = "You are on the Season 7 draft board.";
        await loadState({ quiet: true });
      } else if (form.id === "s7HostLogin") {
        runtime.hostKey = values.password;
        sessionStorage.setItem("gtrls-s7-host-key", runtime.hostKey);
        await adminAction({ action: "setStatus", status: runtime.payload.settings.status });
      } else if (form.id === "s7TeamForm") {
        await adminAction({ action: "addTeam", ...values });
        form.reset();
      } else if (form.id === "s7DraftForm") {
        await adminAction({ action: "draftPlayer", ...values });
      }
    } catch (error) {
      runtime.error = error.message;
      if (form.id === "s7SignupForm") {
        let alert = els.season7Panel.querySelector(".s7-inline-form-error");
        if (!alert) {
          alert = document.createElement("p");
          alert.className = "s7-alert error s7-inline-form-error";
          form.before(alert);
        }
        alert.textContent = runtime.error;
      } else {
        draw();
      }
    }
  });

  window.renderSeason7Page = () => {
    draw();
    if (!runtime.payload && !runtime.loading) loadState();
    if (!runtime.poller) runtime.poller = setInterval(() => { if (state.view === "season7") loadState({ quiet: true }); }, 5000);
  };
})();
