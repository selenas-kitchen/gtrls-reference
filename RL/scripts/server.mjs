import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { dirname, extname, join, normalize, resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname.slice(1));
const port = Number(process.env.PORT || 8765);
const host = process.env.HOST || "127.0.0.1";
const season7Path = join(root, "data", "season7.json");
const adminPasswordPath = join(root, "data", "season7-admin-key.txt");
const adminPassword = process.env.S7_ADMIN_PASSWORD || (() => {
  try { return readFileSync(adminPasswordPath, "utf8").trim(); } catch { return ""; }
})();

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
};

const freshSeason7 = () => ({
  version: 1,
  updatedAt: new Date().toISOString(),
  settings: { status: "signups", title: "Season 7 Draft", currentTeamId: "", currentPick: 1, round: 1 },
  signups: [],
  teams: [],
  draftLog: [],
});

async function loadSeason7() {
  try {
    return { ...freshSeason7(), ...JSON.parse(await readFile(season7Path, "utf8")) };
  } catch (error) {
    if (error.code !== "ENOENT") console.error("Unable to read Season 7 state:", error);
    return freshSeason7();
  }
}

async function saveSeason7(value) {
  value.updatedAt = new Date().toISOString();
  await mkdir(dirname(season7Path), { recursive: true });
  await writeFile(season7Path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function publicSeason7(value) {
  return { ...value, signups: value.signups.map(({ discord, notes, ...signup }) => signup) };
}

function sendJson(response, status, value) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "access-control-allow-origin": "*",
  });
  response.end(JSON.stringify(value));
}

async function readJson(request) {
  let body = "";
  for await (const chunk of request) {
    body += chunk;
    if (body.length > 64_000) throw new Error("Request is too large.");
  }
  return body ? JSON.parse(body) : {};
}

function clean(value, max = 120) {
  return String(value || "").replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max);
}

function numberInRange(value, minimum, maximum) {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric >= minimum && numeric <= maximum ? Math.round(numeric) : null;
}

function validTrackerUrl(value) {
  if (!value) return "";
  try {
    const url = new URL(value);
    return /(^|\.)tracker\.gg$/i.test(url.hostname) && url.pathname.includes("/rocket-league/profile/") ? url.href : "";
  } catch {
    return "";
  }
}

function requireAdmin(request, response) {
  if (!adminPassword) {
    sendJson(response, 503, { error: "Host controls are disabled until S7_ADMIN_PASSWORD is configured on the server." });
    return false;
  }
  if (request.headers["x-s7-admin-key"] !== adminPassword) {
    sendJson(response, 401, { error: "Incorrect host password." });
    return false;
  }
  return true;
}

async function handleSeason7(request, response, url) {
  if (request.method === "GET") {
    const value = await loadSeason7();
    const isHost = adminPassword && request.headers["x-s7-admin-key"] === adminPassword;
    sendJson(response, 200, isHost ? value : publicSeason7(value));
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/season7/signup") {
    try {
      const body = await readJson(request);
      const displayName = clean(body.displayName, 40);
      const trackerName = clean(body.trackerName || displayName, 80);
      const trackerUrl = validTrackerUrl(body.trackerUrl);
      const mmr = numberInRange(body.mmr, 0, 3000);
      if (displayName.length < 2) return sendJson(response, 400, { error: "Enter your in-game name." });
      if (!trackerName) return sendJson(response, 400, { error: "Enter the account name used on Rocket League Tracker." });
      if (body.trackerUrl && !trackerUrl) return sendJson(response, 400, { error: "Enter a valid Rocket League Tracker profile URL." });
      if (mmr === null) return sendJson(response, 400, { error: "Enter your current ranked MMR." });

      const value = await loadSeason7();
      const duplicate = value.signups.some((signup) => signup.displayName.toLowerCase() === displayName.toLowerCase()
        || (trackerUrl && signup.trackerUrl === trackerUrl));
      if (duplicate) return sendJson(response, 409, { error: "That player or Tracker profile is already on the board." });

      const signup = {
        id: randomUUID(), displayName, trackerName,
        platform: ["epic", "steam", "xbl", "psn", "switch"].includes(body.platform) ? body.platform : "epic",
        trackerUrl, mmr, mmrStatus: "submitted",
        preferredRole: ["1", "2", "3", "flex"].includes(body.preferredRole) ? body.preferredRole : "flex",
        availability: clean(body.availability, 120), discord: clean(body.discord, 80), notes: clean(body.notes, 300),
        status: "available", createdAt: new Date().toISOString(),
      };
      value.signups.push(signup);
      await saveSeason7(value);
      sendJson(response, 201, { signup: publicSeason7({ ...freshSeason7(), signups: [signup] }).signups[0] });
    } catch (error) {
      sendJson(response, 400, { error: error.message || "Unable to submit signup." });
    }
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/season7/admin") {
    if (!requireAdmin(request, response)) return;
    try {
      const body = await readJson(request);
      const value = await loadSeason7();
      const action = body.action;
      if (action === "addTeam") {
        const name = clean(body.name, 48);
        if (!name) throw new Error("Enter a team name.");
        value.teams.push({ id: randomUUID(), name, color: clean(body.color, 12) || "#20dff5", picks: [] });
        if (!value.settings.currentTeamId) value.settings.currentTeamId = value.teams[0].id;
      } else if (action === "removeTeam") {
        const team = value.teams.find((item) => item.id === body.teamId);
        if (team?.picks.length) throw new Error("Undo this team's picks before removing it.");
        value.teams = value.teams.filter((item) => item.id !== body.teamId);
      } else if (action === "draftPlayer") {
        const team = value.teams.find((item) => item.id === body.teamId);
        const signup = value.signups.find((item) => item.id === body.signupId);
        if (!team || !signup) throw new Error("Choose a valid player and team.");
        if (value.teams.some((item) => item.picks.includes(signup.id))) throw new Error("That player has already been drafted.");
        team.picks.push(signup.id);
        signup.status = "drafted";
        value.draftLog.push({ signupId: signup.id, teamId: team.id, pick: value.settings.currentPick, round: value.settings.round, at: new Date().toISOString() });
        value.settings.currentPick += 1;
        if (value.teams.length) {
          value.settings.round = Math.ceil(value.settings.currentPick / value.teams.length);
          value.settings.currentTeamId = value.teams[(value.settings.currentPick - 1) % value.teams.length]?.id || "";
        }
      } else if (action === "undoPick") {
        const pick = value.draftLog.pop();
        if (pick) {
          const team = value.teams.find((item) => item.id === pick.teamId);
          if (team) team.picks = team.picks.filter((id) => id !== pick.signupId);
          const signup = value.signups.find((item) => item.id === pick.signupId);
          if (signup) signup.status = "available";
          value.settings.currentPick = Math.max(1, pick.pick);
          value.settings.round = Math.max(1, pick.round);
          value.settings.currentTeamId = pick.teamId;
        }
      } else if (action === "setOnClock") {
        if (!value.teams.some((item) => item.id === body.teamId)) throw new Error("Choose a valid team.");
        value.settings.currentTeamId = body.teamId;
      } else if (action === "setStatus") {
        if (!["signups", "draft", "complete"].includes(body.status)) throw new Error("Choose a valid draft status.");
        value.settings.status = body.status;
      } else if (action === "setMmr") {
        const signup = value.signups.find((item) => item.id === body.signupId);
        const mmr = numberInRange(body.mmr, 0, 3000);
        if (!signup || mmr === null) throw new Error("Enter a valid MMR.");
        signup.mmr = mmr;
        signup.mmrStatus = "verified";
      } else if (action === "removeSignup") {
        if (value.teams.some((item) => item.picks.includes(body.signupId))) throw new Error("Undo this player's draft pick before removing them.");
        value.signups = value.signups.filter((item) => item.id !== body.signupId);
      } else {
        throw new Error("Unknown host action.");
      }
      await saveSeason7(value);
      sendJson(response, 200, publicSeason7(value));
    } catch (error) {
      sendJson(response, 400, { error: error.message || "Unable to update the draft." });
    }
    return;
  }

  sendJson(response, 405, { error: "Method not allowed." });
}

createServer(async (request, response) => {
  const url = new URL(request.url, `http://${host}:${port}`);
  if (url.pathname.startsWith("/api/season7")) {
    if (request.method === "OPTIONS") {
      response.writeHead(204, {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "GET, POST, OPTIONS",
        "access-control-allow-headers": "content-type, x-s7-admin-key",
        "access-control-max-age": "86400",
      });
      response.end();
      return;
    }
    await handleSeason7(request, response, url);
    return;
  }

  const requested = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  if (requested.startsWith("/data/") || requested.startsWith("/scripts/") || requested.split("/").some((part) => part.startsWith("."))) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }
  const filePath = normalize(join(root, requested));
  if (!filePath.startsWith(root) || !existsSync(filePath) || !statSync(filePath).isFile()) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }
  response.writeHead(200, {
    "content-type": types[extname(filePath)] || "application/octet-stream",
    "cache-control": "no-store",
  });
  createReadStream(filePath).pipe(response);
}).listen(port, host, () => {
  console.log(`RL dashboard running at http://${host}:${port}/`);
  if (!adminPassword) console.log("Season 7 host controls are disabled. Set S7_ADMIN_PASSWORD to enable them.");
});
