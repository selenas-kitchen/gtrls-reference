const data = window.RL_DASHBOARD_DATA;
const manualHistory = window.RL_MANUAL_HISTORY || { teams: [], players: [], teamInfo: [], playoffs: [], draft: [], schedules: [] };

function mergeManualHistory() {
  if (!manualHistory.teams.length && !manualHistory.players.length) return;
  const overrideTeams = new Map();
  manualHistory.teams.filter((row) => row.overrideGenerated).forEach((row) => {
    const key = `${row.season}|${row.name}`;
    overrideTeams.set(key, true);
  });
  data.teams = data.teams.filter((row) => !overrideTeams.has(`${row.season}|${row.name}`));
  data.players = data.players.filter((row) => {
    const teams = row.teams || [];
    return !teams.some((team) => overrideTeams.has(`${row.season}|${team}`));
  });
  const mergeRows = (target, rows) => {
    rows.forEach((row) => {
      const index = target.findIndex((existing) => existing.season === row.season && existing.name === row.name);
      if (index >= 0 && row.overrideGenerated) target[index] = row;
      else if (index < 0) target.push(row);
      else target.push(row);
    });
  };
  mergeRows(data.teams, manualHistory.teams);
  mergeRows(data.players, manualHistory.players);
  data.manualHistory = manualHistory;
  data.seasons = [...new Set([...data.seasons, ...manualHistory.teams.map((row) => row.season), ...manualHistory.players.map((row) => row.season), ...manualHistory.playoffs.map((row) => row.season)])].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const summaryBySeason = new Map(data.summary.map((row) => [row.season, row]));
  data.seasons.forEach((season) => {
    if (!summaryBySeason.has(season)) {
      summaryBySeason.set(season, {
        season,
        games: Math.max(...data.teams.filter((row) => row.season === season).map((row) => row.games), 0),
        teams: data.teams.filter((row) => row.season === season).length,
        players: data.players.filter((row) => row.season === season).length,
      });
    }
  });
  data.summary = [...summaryBySeason.values()].sort((a, b) => a.season.localeCompare(b.season, undefined, { numeric: true }));
}

mergeManualHistory();

const state = {
  view: "teams",
  season: "All",
  searchText: "",
  sortKey: "wins",
  sortDir: "desc",
  includeScrims: false,
  page: { type: "dashboard" },
};

const teamColumns = [
  ["name", "Team"],
  ["season", "Season"],
  ["games", "GP"],
  ["standingsPoints", "Pts"],
  ["pointsPerGame", "Pts/G"],
  ["wins", "W"],
  ["losses", "L"],
  ["winPct", "Win %"],
  ["goals", "Goals"],
  ["goalsPerGame", "G/G"],
  ["assists", "Ast"],
  ["assistsPerGame", "A/G"],
  ["saves", "Saves"],
  ["savesPerGame", "Sv/G"],
  ["shots", "Shots"],
  ["shotsPerGame", "Sh/G"],
  ["shootingPct", "Shot %"],
  ["teamSaveRate", "Save %"],
  ["missPct", "Miss %"],
  ["opponentShootingPct", "Opp Shot %"],
  ["goalsConcededPerGame", "GA/G"],
  ["shotsConcededPerGame", "ShA/G"],
  ["opponentSavesForcedPerGame", "Opp Sv/G"],
  ["goalDiff", "Diff"],
  ["avgScore", "Score/G"],
  ["boostCollectedPerGame", "Boost/G"],
  ["boostStolenPerGame", "Stolen/G"],
  ["demosPerGame", "Demo/G"],
  ["pressureRate", "Pressure/G"],
  ["pressureIndex", "Pressure Index"],
];

const playerColumns = [
  ["name", "Player"],
  ["season", "Season"],
  ["teamsText", "Team(s) This Season"],
  ["games", "GP"],
  ["wins", "W"],
  ["winPct", "Win %"],
  ["goals", "Goals"],
  ["goalsPerGame", "G/G"],
  ["assists", "Ast"],
  ["assistsPerGame", "A/G"],
  ["saves", "Saves"],
  ["savesPerGame", "Sv/G"],
  ["shots", "Shots"],
  ["shotsPerGame", "Sh/G"],
  ["shootingPct", "Shot %"],
  ["avgScore", "Score/G"],
  ["avgSpeed", "Speed"],
  ["avgBoost", "Boost"],
  ["boostCollectedPerGame", "Boost/G"],
  ["boostStolenPerGame", "Stolen/G"],
  ["opponentSavesForcedPerGame", "Est Opp Sv/G"],
  ["demosPerGame", "Demo/G"],
  ["per", "PER"],
  ["perPerGame", "PER/G"],
  ["pressureRate", "Pressure/G"],
  ["pressureIndex", "Pressure Index"],
];

const standingsColumns = [
  ["standingsRank", "Standings"],
  ["name", "Team"],
  ["matchRecord", "Match Record"],
  ["standingsPoints", "Score"],
  ["goalDiff", "Goal +/-"],
  ["gameRecord", "Game Record"],
  ["winPct", "Win %"],
  ["sweepsText", "SWPS-GM5L"],
  ["remainingMatches", "Remaining Matches"],
  ["maxScore", "Max Score"],
  ["wins", "Match Wins"],
  ["losses", "Match Losses"],
  ["gameWins", "Game Wins"],
  ["gameLosses", "Game Losses"],
  ["sweeps", "Sweeps"],
  ["gameFiveLosses", "Game 5 Losses"],
];

const playoffColumns = [
  ["season", "Season"],
  ["round", "Round"],
  ["teamA", "Team"],
  ["result", "Result"],
  ["teamB", "Team"],
];

const playoffWinnerPattern = /^(\d+)\s*-\s*(\d+)$/;

const els = {
  generatedAt: document.querySelector("#generatedAt"),
  seasonSelect: document.querySelector("#seasonSelect"),
  searchInput: document.querySelector("#searchInput"),
  searchSuggestions: document.querySelector("#searchSuggestions"),
  includeScrims: document.querySelector("#includeScrims"),
  tabButtons: [...document.querySelectorAll("[data-view]")],
  teamLeaderGrid: document.querySelector("#teamLeaderGrid"),
  awardRaceGrid: document.querySelector("#awardRaceGrid"),
  figureOneLabel: document.querySelector("#figureOneLabel"),
  figureOneValue: document.querySelector("#figureOneValue"),
  figureOneMeta: document.querySelector("#figureOneMeta"),
  figureTwoLabel: document.querySelector("#figureTwoLabel"),
  figureTwoValue: document.querySelector("#figureTwoValue"),
  figureTwoMeta: document.querySelector("#figureTwoMeta"),
  figureThreeLabel: document.querySelector("#figureThreeLabel"),
  figureThreeValue: document.querySelector("#figureThreeValue"),
  figureThreeMeta: document.querySelector("#figureThreeMeta"),
  figureFourLabel: document.querySelector("#figureFourLabel"),
  figureFourValue: document.querySelector("#figureFourValue"),
  figureFourMeta: document.querySelector("#figureFourMeta"),
  detailBar: document.querySelector("#detailBar"),
  detailEyebrow: document.querySelector("#detailEyebrow"),
  detailTitle: document.querySelector("#detailTitle"),
  backButton: document.querySelector("#backButton"),
  leaderOneTitle: document.querySelector("#leaderOneTitle"),
  leaderTwoTitle: document.querySelector("#leaderTwoTitle"),
  leaderOne: document.querySelector("#leaderOne"),
  leaderTwo: document.querySelector("#leaderTwo"),
  tableTitle: document.querySelector("#tableTitle"),
  rowCount: document.querySelector("#rowCount"),
  head: document.querySelector("#statsHead"),
  body: document.querySelector("#statsBody"),
  detailExtras: document.querySelector("#detailExtras"),
  playoffStats: document.querySelector("#playoffStats"),
};

const trophyTeams = new Set(["WEENIE HUT JRS"]);
const silverTrophyTeams = new Set(["BMM"]);
const shootingEligibilityShots = 15;
const awardDefinitions = [
  { award: "Ballon d'Car", season: "S5", stat: "score", avgStat: "avgScore", sortStat: "avgScore", totalLabel: "Total points", avgLabel: "Avg", winners: ["EPo -_-"], team: "Triple Scoop", amount: "14678", perGameAmount: "489.3" },
  { award: "Golden Wheel", season: "S5", stat: "goals", avgStat: "goalsPerGame", totalLabel: "Total goals", avgLabel: "Avg", winners: ["Bubbles3913"], team: "Bird Bath Bombers", amount: "47", perGameAmount: "1.47" },
  { award: "Wingman", season: "S5", stat: "assists", avgStat: "assistsPerGame", totalLabel: "Total assists", avgLabel: "Avg", winners: ["Authurm19"], team: "Bird Bath Bombers", amount: "29", perGameAmount: "0.91" },
  { award: "Goalie of the Year", season: "S5", stat: "saves", avgStat: "savesPerGame", totalLabel: "Total saves", avgLabel: "Avg", winners: ["MegatronMD"], team: "The Hornets", amount: "49", perGameAmount: "1.69" },
  { award: "Silver Striker", season: "S5", stat: "shots", avgStat: "shotsPerGame", totalLabel: "Shots", avgLabel: "Sh/G", winners: ["Bubbles3913"], team: "Bird Bath Bombers", amount: "101/3.16", perGameAmount: "46.53%", extraStat: "shootingPct" },
  { award: "World Cup Champions", season: "2026", stat: "score", avgStat: "avgScore", totalLabel: "Champion", avgLabel: "", winners: ["Ax1mov", "Selena Gomez", "Bubbles3913", "KWNSquid"], team: "World Cup 2026", amount: "Champion", perGameAmount: "" },
];
const s5Awards = awardDefinitions.flatMap((definition) => definition.winners.map((player) => ({
  award: definition.award,
  player,
  team: definition.team,
  season: definition.season,
  amount: definition.amount,
  perGameAmount: definition.perGameAmount,
}))).filter((award) => data.players.some((row) => row.name === award.player));
const teamLeagueStats = [
  ["pointsPerGame", "Points/G"],
  ["perPerGame", "PER/G"],
  ["goalsPerGame", "Goals/G"],
  ["goalsConcededPerGame", "Allowed/G"],
  ["assistsPerGame", "Assists/G"],
  ["goalDiff", "Goal Diff"],
  ["savesPerGame", "Saves/G"],
  ["teamSaveRate", "Save %", "%"],
  ["shotsPerGame", "Shots/G"],
  ["shotsConcededPerGame", "Allowed Shots/G", "", "asc"],
  ["shootingPct", "Shooting %", "%"],
  ["opponentShootingPct", "Opp Shooting %", "%"],
];
const leaderboardStats = [
  ["goals", "Goals"],
  ["assists", "Assists"],
  ["saves", "Saves"],
  ["shots", "Shots"],
  ["shootingPct", "Shooting %"],
  ["avgScore", "Score/G"],
  ["per", "PER"],
  ["perPerGame", "PER/G"],
  ["boostStolenPerGame", "Boost Stolen/G"],
  ["pressureIndex", "Pressure Index"],
];
const playerCareerHighStats = new Set([
  "games", "wins", "goals", "goalsPerGame", "assistsPerGame", "savesPerGame",
  "shotsPerGame", "shootingPct", "avgScore", "per", "perPerGame", "boostStolenPerGame", "pressureIndex",
]);

const rosterColumns = [
  ["name", "Player"],
  ["teamsText", "Team(s)"],
  ["games", "GP"],
  ["goals", "Goals"],
  ["goalsPerGame", "G/G"],
  ["assistsPerGame", "A/G"],
  ["savesPerGame", "Sv/G"],
  ["shotsPerGame", "Sh/G"],
  ["shootingPct", "Shot %"],
  ["avgScore", "Score/G"],
  ["per", "PER"],
  ["perPerGame", "PER/G"],
  ["boostStolenPerGame", "Stolen/G"],
  ["pressureIndex", "Pressure Index"],
];

const playerSeasonColumns = [
  ["season", "Season"],
  ["teamsText", "Team(s)"],
  ["games", "GP"],
  ["goals", "Goals"],
  ["goalsPerGame", "G/G"],
  ["assistsPerGame", "A/G"],
  ["savesPerGame", "Sv/G"],
  ["shotsPerGame", "Sh/G"],
  ["shootingPct", "Shot %"],
  ["avgScore", "Score/G"],
  ["per", "PER"],
  ["perPerGame", "PER/G"],
  ["boostStolenPerGame", "Stolen/G"],
  ["pressureIndex", "Pressure Index"],
];

const gameColumns = [
  ["date", "Date"],
  ["replayTitle", "Game"],
  ["team", "Team"],
  ["opponent", "Opponent"],
  ["result", "Result"],
  ["score", "Score"],
  ["goals", "G"],
  ["assists", "A"],
  ["saves", "Sv"],
  ["shots", "Sh"],
  ["shootingPct", "Shot %"],
  ["per", "PER"],
  ["perPerGame", "PER/G"],
  ["boostStolen", "Stolen"],
  ["demosInflicted", "Demo"],
  ["pressureIndex", "Pressure Index"],
];

const awardHistoryColumns = [
  ["season", "Season"],
  ["award", "Award"],
  ["winnerText", "Winner(s)"],
  ["team", "Team"],
  ["amount", "Amount"],
  ["perGameAmount", "Per Game Amount"],
];

const awardRaceColumns = [
  ["rank", "Rank"],
  ["name", "Player"],
  ["teamsText", "Team"],
  ["games", "GP"],
  ["total", "Total"],
  ["average", "Avg"],
  ["extra", "Extra"],
];

function isLifetimeView() {
  return state.view === "lifetimeTeams" || state.view === "lifetimePlayers";
}

function isTeamView() {
  return state.view === "teams" || state.view === "lifetimeTeams";
}

function columnsForView() {
  const columns = isTeamView() ? teamColumns : playerColumns;
  return columns
    .filter(([key]) => !isLifetimeView() || key !== "season")
    .map(([key, label]) => {
      if (key === "teamsText" && isLifetimeView()) return [key, "Team(s) All Time"];
      return [key, label];
    });
}

function isScrimSeason(season) {
  return season === "Scrims";
}

function isPlayoffSeason(season) {
  return String(season).endsWith("Playoffs");
}

function visibleSeasons() {
  return data.seasons.filter((season) => state.includeScrims || !isScrimSeason(season));
}

function seasonIncluded(row) {
  if (isScrimSeason(row.season)) return state.includeScrims || state.season === row.season;
  if (isPlayoffSeason(row.season)) return state.season === row.season && !isLifetimeView();
  return true;
}

function fmt(value, suffix = "") {
  if (typeof value === "number") {
    return `${Number.isInteger(value) ? value.toLocaleString() : value.toLocaleString(undefined, { maximumFractionDigits: 2 })}${suffix}`;
  }
  return value ?? "";
}

function displayName(value, key = "") {
  if ((key === "name" || key === "team" || key === "opponent") && trophyTeams.has(value)) return `${value} \u{1F3C6}`;
  if ((key === "name" || key === "team" || key === "opponent") && silverTrophyTeams.has(value)) return `${value} \u{1F948}`;
  return value ?? "";
}

function playoffWinnerKey(row) {
  const result = String(row.result || "").trim();
  if (/champion/i.test(result)) return "teamA";
  const score = result.match(playoffWinnerPattern);
  if (!score) return "";
  const left = Number(score[1]);
  const right = Number(score[2]);
  if (left === right) return "";
  return left > right ? "teamA" : "teamB";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function finalizeCommon(item) {
  const games = Math.max(1, item.games);
  item.winPct = Math.round((item.wins / games) * 1000) / 10;
  item.avgScore = Math.round((item.score / games) * 10) / 10;
  item.goalsPerGame = Math.round((item.goals / games) * 100) / 100;
  item.assistsPerGame = Math.round((item.assists / games) * 100) / 100;
  item.savesPerGame = Math.round((item.saves / games) * 100) / 100;
  item.shotsPerGame = Math.round((item.shots / games) * 100) / 100;
  item.shotsConcededPerGame = Math.round((item.shotsConceded / games) * 100) / 100;
  item.goalsConcededPerGame = Math.round((item.goalsConceded / games) * 100) / 100;
  item.per = Math.round(((0.1 * item.goals) + (0.05 * item.assists) + ((2 / 30) * item.saves) + (0.01 * item.shots) - (item.games * 0.1)) * 100) / 100;
  item.perPerGame = Math.round((item.per / games) * 1000) / 1000;
  item.shootingPct = item.shots > 0 ? Math.round((item.goals / item.shots) * 1000) / 10 : 0;
  item.teamSaveRate = item.shotsConceded > 0 ? Math.round((item.saves / item.shotsConceded) * 1000) / 10 : 0;
  item.opponentShootingPct = item.shotsConceded > 0 ? Math.round((item.goalsConceded / item.shotsConceded) * 1000) / 10 : 0;
  item.pointsPerGame = Math.round(((item.standingsPoints || 0) / games) * 100) / 100;
  item.goalDiff = item.goals - item.goalsConceded;
  item.demosPerGame = Math.round((item.demosInflicted / games) * 100) / 100;
  item.distancePerGame = Math.round(item.totalDistance / games);
  item.boostCollectedPerGame = Math.round(item.amountCollected / games);
  item.boostStolenPerGame = Math.round(item.amountStolen / games);
  item.opponentSavesForcedPerGame = Math.round((item.opponentSavesForced / games) * 100) / 100;
  item.pressureIndex = Math.round((
    (item.shots / games) +
    (1.5 * (item.opponentSavesForced / games)) +
    (0.05 * (item.amountStolen / games)) +
    (item.demosInflicted / games)
  ) * 100) / 100;
  return item;
}

function aggregateLifetimeRows(rows, type) {
  const byName = new Map();
  const numericFields = [
    "games", "wins", "losses", "score", "goals", "assists", "saves", "shots",
    "standingsPoints",
    "shotsConceded", "goalsConceded", "lastDefenderGoalsConceded", "opponentSavesForced",
    "demosInflicted", "demosTaken", "avgSpeedTotal", "avgBoostTotal", "amountCollected",
    "amountStolen", "totalDistance",
  ];

  rows.forEach((row) => {
    if (!seasonIncluded(row)) return;
    if (!byName.has(row.name)) {
      byName.set(row.name, {
        season: "Lifetime",
        name: row.name,
        teams: new Set(),
        firstDate: "",
        lastDate: "",
      });
    }
    const item = byName.get(row.name);
    numericFields.forEach((field) => {
      item[field] = (item[field] || 0) + (row[field] || 0);
    });
    if (row.firstDate && (!item.firstDate || row.firstDate < item.firstDate)) item.firstDate = row.firstDate;
    if (row.lastDate && (!item.lastDate || row.lastDate > item.lastDate)) item.lastDate = row.lastDate;
    (row.teams || []).forEach((team) => item.teams.add(team));
  });

  return [...byName.values()].map((item) => {
    finalizeCommon(item);
    if (type === "team") {
      item.pressureRate = Math.round(((item.shots + item.opponentSavesForced + item.amountStolen + item.demosInflicted) / Math.max(1, item.games)) * 100) / 100;
      item.missPct = item.shots > 0 ? Math.round(((item.shots - item.goals - item.opponentSavesForced) / item.shots) * 1000) / 10 : 0;
      delete item.teams;
    } else {
      item.avgSpeed = Math.round((item.avgSpeedTotal || 0) / Math.max(1, item.games));
      item.avgBoost = Math.round(((item.avgBoostTotal || 0) / Math.max(1, item.games)) * 10) / 10;
      item.pressureRate = Math.round(((item.shots + item.amountStolen + item.demosInflicted) / Math.max(1, item.games)) * 100) / 100;
      item.teams = [...item.teams].sort();
    }
    return item;
  }).sort((a, b) => a.name.localeCompare(b.name));
}

function lifetimeTeams() {
  return aggregateLifetimeRows(data.teams, "team");
}

function lifetimePlayers() {
  return aggregateLifetimeRows(data.players, "player");
}

function addGameToPlayerAggregate(item, game) {
  item.games += 1;
  if (game.result === "win") item.wins += 1;
  else item.losses += 1;
  item.score += game.score || 0;
  item.goals += game.goals || 0;
  item.assists += game.assists || 0;
  item.saves += game.saves || 0;
  item.shots += game.shots || 0;
  item.shotsConceded += game.shotsConceded || 0;
  item.goalsConceded += game.goalsConceded || 0;
  item.opponentSavesForced += game.opponentSavesForced || 0;
  item.demosInflicted += game.demosInflicted || 0;
  item.demosTaken += game.demosTaken || 0;
  item.amountCollected += game.boostCollected || 0;
  item.amountStolen += game.boostStolen || 0;
  item.avgSpeedTotal += game.avgSpeed || 0;
  item.avgBoostTotal += game.avgBoost || 0;
  item.teams.add(game.team);
  if (game.date && (!item.firstDate || game.date < item.firstDate)) item.firstDate = game.date;
  if (game.date && (!item.lastDate || game.date > item.lastDate)) item.lastDate = game.date;
}

function emptyPlayerAggregate(name, season = "") {
  return {
    season,
    name,
    teams: new Set(),
    games: 0,
    wins: 0,
    losses: 0,
    standingsPoints: 0,
    score: 0,
    goals: 0,
    assists: 0,
    saves: 0,
    shots: 0,
    shotsConceded: 0,
    goalsConceded: 0,
    lastDefenderGoalsConceded: 0,
    opponentSavesForced: 0,
    demosInflicted: 0,
    demosTaken: 0,
    avgSpeedTotal: 0,
    avgBoostTotal: 0,
    amountCollected: 0,
    amountStolen: 0,
    totalDistance: 0,
    firstDate: "",
    lastDate: "",
  };
}

function finalizePlayerAggregate(item) {
  finalizeCommon(item);
  item.avgSpeed = Math.round((item.avgSpeedTotal || 0) / Math.max(1, item.games));
  item.avgBoost = Math.round(((item.avgBoostTotal || 0) / Math.max(1, item.games)) * 10) / 10;
  item.pressureRate = Math.round(((item.shots + item.amountStolen + item.demosInflicted) / Math.max(1, item.games)) * 100) / 100;
  item.teams = [...item.teams].sort();
  item.teamsText = item.teams.join(", ");
  return item;
}

function playerGames() {
  return data.playerGames.filter((game) => {
    if (isScrimSeason(game.season)) return state.includeScrims || state.season === game.season;
    if (isPlayoffSeason(game.season)) return state.season === game.season && !isLifetimeView();
    return true;
  });
}

function teamRoster(team, season) {
  const byPlayer = new Map();
  data.players
    .filter((row) => row.source === "manual" && (season === "Lifetime" || row.season === season) && (row.teams || []).includes(team))
    .forEach((row) => byPlayer.set(row.name, { ...row, teams: new Set(row.teams || [team]) }));
  playerGames()
    .filter((game) => game.team === team && (season === "Lifetime" || game.season === season))
    .forEach((game) => {
      if (!byPlayer.has(game.player)) byPlayer.set(game.player, emptyPlayerAggregate(game.player, season));
      addGameToPlayerAggregate(byPlayer.get(game.player), game);
    });
  return [...byPlayer.values()].map(finalizePlayerAggregate).sort((a, b) => b.games - a.games || b.goals - a.goals);
}

function playerCareer(player) {
  const bySeason = new Map();
  data.players
    .filter((row) => row.source === "manual" && row.name === player)
    .forEach((row) => bySeason.set(row.season, { ...row, teams: new Set(row.teams || []) }));
  playerGames()
    .filter((game) => game.player === player)
    .forEach((game) => {
      if (!bySeason.has(game.season)) bySeason.set(game.season, emptyPlayerAggregate(player, game.season));
      addGameToPlayerAggregate(bySeason.get(game.season), game);
    });
  return [...bySeason.values()].map(finalizePlayerAggregate).sort((a, b) => a.season.localeCompare(b.season));
}

function playerLifetimeRow(player) {
  const item = emptyPlayerAggregate(player, "Career");
  data.players
    .filter((row) => row.source === "manual" && row.name === player)
    .forEach((row) => {
      Object.keys(row).forEach((key) => {
        if (typeof row[key] === "number" && typeof item[key] === "number") item[key] += row[key];
      });
      (row.teams || []).forEach((team) => item.teams.add(team));
    });
  playerGames()
    .filter((game) => game.player === player)
    .forEach((game) => addGameToPlayerAggregate(item, game));
  return finalizePlayerAggregate(item);
}

function seasonPlayerRows(season) {
  const byPlayer = new Map();
  data.players
    .filter((row) => row.source === "manual" && row.season === season)
    .forEach((row) => byPlayer.set(row.name, { ...row, teams: new Set(row.teams || []) }));
  playerGames()
    .filter((game) => game.season === season)
    .forEach((game) => {
      if (!byPlayer.has(game.player)) byPlayer.set(game.player, emptyPlayerAggregate(game.player, season));
      addGameToPlayerAggregate(byPlayer.get(game.player), game);
    });
  return [...byPlayer.values()].map(finalizePlayerAggregate);
}

function seasonLeaders(season, stat) {
  return seasonPlayerRows(season)
    .filter((row) => row.games >= 1 && typeof row[stat] === "number")
    .sort((a, b) => b[stat] - a[stat])
    .map((row, index) => ({ ...row, rank: index + 1 }))
    .slice(0, 10);
}

function statSuffix(stat) {
  return stat === "shootingPct" ? "%" : "";
}

function seasonLeaderCard(season, stat, label) {
  const leaders = seasonLeaders(season, stat);
  const [first, ...rest] = leaders;
  const actionFor = (player) => encodeURIComponent(JSON.stringify({ type: "player", player }));
  const leaderLine = (row) => `
    <li>
      <span>${row.rank}.</span>
      <button type="button" data-action="${actionFor(row.name)}">${escapeHtml(displayName(row.name, "name"))}</button>
      <strong>${escapeHtml(fmt(row[stat], statSuffix(stat)))}</strong>
    </li>
  `;

  return `
    <article class="leader-card">
      <h3>${escapeHtml(label)}</h3>
      ${first ? `<ol class="leader-list">${leaderLine(first)}</ol>` : `<p class="empty-note">No leaders.</p>`}
      ${rest.length ? `
        <details>
          <summary>Show #2-10</summary>
          <ol class="leader-list leader-list-extra">
            ${rest.map(leaderLine).join("")}
          </ol>
        </details>
      ` : ""}
    </article>
  `;
}

function renderSeasonLeaderDetail(season) {
  els.detailEyebrow.textContent = "Season leaders";
  els.detailTitle.textContent = `${season} leaders`;
  els.tableTitle.textContent = "League Leaders";
  els.rowCount.textContent = `${leaderboardStats.length} stats`;
  els.head.closest("table").classList.add("leader-card-table");
  els.head.closest(".table-wrap").classList.add("leader-card-wrap");
  els.head.innerHTML = "";
  els.body.innerHTML = `
    <tr>
      <td class="leader-grid-cell">
        <div class="leader-card-grid">
          ${leaderboardStats.map(([stat, label]) => seasonLeaderCard(season, stat, label)).join("")}
        </div>
      </td>
    </tr>
  `;
  renderDetailExtras();
}

function decoratePlayerCareerRows(player) {
  const seasons = playerCareer(player);
  const career = playerLifetimeRow(player);
  career.__isCareer = true;

  const maxByStat = {};
  playerCareerHighStats.forEach((stat) => {
    maxByStat[stat] = Math.max(...seasons.map((row) => Number(row[stat]) || 0));
  });

  seasons.forEach((row) => {
    row.__careerHighs = new Set();
    row.__seasonRecords = new Set();
    playerCareerHighStats.forEach((stat) => {
      if ((Number(row[stat]) || 0) === maxByStat[stat] && maxByStat[stat] > 0) row.__careerHighs.add(stat);
      const leaders = seasonLeaders(row.season, stat);
      if (leaders[0] && leaders[0].name === player && (Number(row[stat]) || 0) === leaders[0][stat]) row.__seasonRecords.add(stat);
    });
  });

  return [career, ...seasons];
}

function leaderboardAppearances(player) {
  const seasons = [...new Set(playerGames().filter((game) => game.player === player).map((game) => game.season))].sort();
  return leaderboardStats.map(([stat, label]) => {
    const entries = seasons.flatMap((season) => {
      const hit = seasonLeaders(season, stat).find((row) => row.name === player);
      return hit ? [{ season, rank: hit.rank, value: hit[stat] }] : [];
    });
    return { stat, label, entries };
  }).filter((group) => group.entries.length);
}

function playerSeasonGames(player, season) {
  return playerGames()
    .filter((game) => game.player === player && game.season === season)
    .sort((a, b) => String(a.date).localeCompare(String(b.date)));
}

function activeSummary() {
  if (state.season !== "All" && !isLifetimeView()) {
    return data.summary.find((row) => row.season === state.season) ?? { games: 0, teams: 0, players: 0 };
  }
  const summaries = data.summary.filter((row) => (state.includeScrims || !isScrimSeason(row.season)) && !isPlayoffSeason(row.season));
  if (isLifetimeView()) {
    const games = summaries.reduce((total, row) => total + row.games, 0);
    return { games, teams: lifetimeTeams().length, players: lifetimePlayers().length };
  }
  if (state.season === "All") {
    return summaries.reduce((acc, row) => {
      acc.games += row.games;
      acc.teams += row.teams;
      acc.players += row.players;
      return acc;
    }, { games: 0, teams: 0, players: 0 });
  }
  return data.summary.find((row) => row.season === state.season) ?? { games: 0, teams: 0, players: 0 };
}

function rowsForDataset(view, season = state.season) {
  if (season === "All" && view === "teams") {
    return lifetimeTeams().map((row) => ({ ...row, teamsText: row.teams ? row.teams.join(", ") : "" }));
  }
  if (season === "All" && view === "players") {
    return lifetimePlayers().map((row) => ({ ...row, teamsText: row.teams ? row.teams.join(", ") : "" }));
  }
  const sourceMap = {
    teams: data.teams.filter(seasonIncluded),
    players: data.players.filter(seasonIncluded),
    lifetimeTeams: lifetimeTeams(),
    lifetimePlayers: lifetimePlayers(),
    standings: standingsRows(),
  };
  return (sourceMap[view] || []).map((row) => ({
    ...row,
    teamsText: row.teams ? row.teams.join(", ") : "",
  })).filter((row) => isLifetimeView() || season === "All" || row.season === season);
}

function standingsRows() {
  const seasons = state.season === "All"
    ? data.seasons.filter((season) => !isScrimSeason(season) && !isPlayoffSeason(season))
    : [state.season];
  return data.teams
    .filter((row) => seasons.includes(row.season))
    .map((row) => ({
      ...row,
      standingsRank: row.standingsRank || "",
      matchRecord: row.matchRecord || `${row.wins} - ${row.losses}`,
      gameRecord: `${row.gameWins ?? row.wins} - ${row.gameLosses ?? row.losses}`,
      winPct: row.games > 0 && typeof row.gameWins === "number" ? Math.round((row.gameWins / row.games) * 1000) / 10 : row.winPct,
      sweepsText: `${row.sweeps || 0} - ${row.gameFiveLosses || 0}`,
      remainingMatches: row.remainingMatches || 0,
      maxScore: row.maxScore || row.standingsPoints || 0,
    }))
    .sort((a, b) => {
      if (state.season !== "All" && a.standingsRank && b.standingsRank) return a.standingsRank - b.standingsRank;
      return b.standingsPoints - a.standingsPoints || b.goalDiff - a.goalDiff;
    });
}

function playoffBracketRows(season) {
  return (data.manualHistory?.playoffs || [])
    .filter((row) => row.season === season)
    .map((row) => ({ ...row }));
}

function rowsForView() {
  return decorateDashboardRows(sortRows(rowsForDataset(state.view)));
}

function decorateDashboardRows(rows) {
  if (state.season === "All" || isLifetimeView()) return rows;
  const columns = columnsForView().map(([key]) => key).filter((key) => key !== "name" && key !== "season" && key !== "teamsText");
  const typeRows = isTeamView() ? data.teams.filter((row) => !isScrimSeason(row.season) && !isPlayoffSeason(row.season)) : data.players.filter((row) => !isScrimSeason(row.season) && !isPlayoffSeason(row.season));
  const leaders = new Map();
  [...new Set(typeRows.map((row) => row.season))].forEach((season) => {
    columns.forEach((key) => {
      const leader = [...typeRows].filter((row) => row.season === season && typeof row[key] === "number").sort((a, b) => b[key] - a[key])[0];
      if (leader) leaders.set(`${season}|${leader.name}|${key}`, true);
    });
  });
  return rows.map((row) => {
    const copy = { ...row, __seasonRecords: new Set() };
    columns.forEach((key) => {
      if (leaders.has(`${row.season}|${row.name}|${key}`)) copy.__seasonRecords.add(key);
    });
    return copy;
  });
}

function awardDefinitionByName(name, season = "") {
  return awardDefinitions.find((award) => award.award === name && (!season || award.season === season));
}

function silverStrikerEligible(row) {
  return row.shots >= 72 || row.shotsPerGame > 2.25;
}

function awardRaceRows(definition) {
  if (!definition || definition.season === "2026") {
    return (definition?.winners || []).map((name, index) => ({ rank: index + 1, name, teamsText: definition.team, games: "", total: definition.amount, average: definition.perGameAmount, extra: "" }));
  }
  const contenders = data.players
    .filter((row) => row.season === definition.season)
    .filter((row) => definition.award !== "Silver Striker" || silverStrikerEligible(row))
    .sort((a, b) => b[definition.sortStat || definition.stat] - a[definition.sortStat || definition.stat] || b[definition.stat] - a[definition.stat]);
  const shootingRanks = new Map([...contenders].sort((a, b) => b.shootingPct - a.shootingPct).map((row, index) => [row.name, index + 1]));
  return contenders.map((row, index) => ({
      rank: index + 1,
      name: row.name,
      teamsText: row.teams?.join(", ") || "",
      games: row.games,
      total: row[definition.stat],
      average: row[definition.avgStat],
      extra: definition.extraStat ? `${fmt(row[definition.extraStat], "%")} (${shootingRanks.get(row.name)}${rankSuffix(shootingRanks.get(row.name))})` : "",
    }));
}

function leaderFor(rows, key, direction = "desc") {
  return [...rows]
    .filter((row) => typeof row[key] === "number")
    .sort((a, b) => direction === "asc" ? a[key] - b[key] : b[key] - a[key])[0];
}

function renderMiniLeaderGrid(target, items, actionType = null) {
  target.innerHTML = items.map((item) => {
    const action = actionType ? ` data-action="${encodeURIComponent(JSON.stringify(actionType(item)))}"` : "";
    return `
      <button type="button" class="mini-leader-card"${action}>
        <span>${escapeHtml(item.label)}</span>
        <strong>${escapeHtml(displayName(item.name, "name"))}</strong>
        <small>${escapeHtml(item.meta)}</small>
      </button>
    `;
  }).join("");
}

function renderLeagueLeaderPanels(rows) {
  const teamPanel = document.querySelector("#teamLeaderPanel");
  const awardPanel = document.querySelector("#awardRacePanel");
  const showTeamPanel = state.view === "teams" && state.season !== "All" && !isPlayoffSeason(state.season);
  const showAwardPanel = state.view === "players" && state.season !== "All" && !isPlayoffSeason(state.season);
  teamPanel.classList.toggle("hidden", !showTeamPanel);
  awardPanel.classList.toggle("hidden", !showAwardPanel);
  if (!showTeamPanel && !showAwardPanel) return;

  const regularTeamRows = rowsForDataset("teams");
  const teamItems = teamLeagueStats.map(([key, label, suffix = "", direction = "desc"]) => {
    const leader = leaderFor(regularTeamRows, key, direction);
    return { label, name: leader?.name ?? "-", meta: leader ? `${fmt(leader[key], suffix)} - ${leader.season}` : "" };
  });
  if (showTeamPanel) renderMiniLeaderGrid(els.teamLeaderGrid, teamItems, null);

  const awardItems = awardDefinitions.filter((award) => award.season !== "2026" && award.season === state.season).map((award) => {
    const leader = awardRaceRows(award)[0];
    return {
      label: award.award,
      name: leader?.name ?? "-",
      meta: leader ? `${award.totalLabel}: ${fmt(leader.total)} | ${award.avgLabel}: ${fmt(leader.average)}` : "",
      award,
    };
  });
  if (showAwardPanel) renderMiniLeaderGrid(els.awardRaceGrid, awardItems, (item) => ({ type: "awardRace", award: item.award.award, season: item.award.season }));
}

function gameNumberFromLabel(label) {
  const match = String(label ?? "").match(/^Game\s+(\d+)$/i);
  return match ? Number(match[1]) : null;
}

function compareValues(av, bv) {
  if (typeof av === "number" && typeof bv === "number") return av - bv;
  return String(av ?? "").localeCompare(String(bv ?? ""));
}

function sortRows(rows) {
  return [...rows].sort((a, b) => {
    let result;
    if (state.sortKey === "date") {
      result = compareValues(a.date, b.date);
      const ag = gameNumberFromLabel(a.replayTitle);
      const bg = gameNumberFromLabel(b.replayTitle);
      if (result === 0 && ag !== null && bg !== null) result = compareValues(ag, bg);
      if (result === 0) result = compareValues(a.sortDate, b.sortDate);
    } else {
      result = compareValues(a[state.sortKey], b[state.sortKey]);
    }
    return state.sortDir === "asc" ? result : -result;
  });
}

function dashboardTitle() {
  return ({
    teams: "Team Stats",
    players: "Player Stats",
    standings: "Season Standings",
    lifetimeTeams: "Lifetime Team Stats",
    lifetimePlayers: "Lifetime Player Stats",
    awards: "Awards History",
  })[state.view];
}

function awardHistoryRows() {
  return awardDefinitions.map((award) => ({
    season: award.season,
    award: award.award,
    winnerText: award.winners.join(", "),
    team: award.team,
    amount: award.amount,
    perGameAmount: award.perGameAmount,
  }));
}

function teamSeasonRow(team, season) {
  return data.teams.find((row) => row.name === team && row.season === season);
}

function decorateRosterCareerHighs(rows) {
  return rows.map((row) => {
    const highs = new Set();
    const seasons = playerCareer(row.name);
    playerCareerHighStats.forEach((stat) => {
      const max = Math.max(...seasons.map((season) => Number(season[stat]) || 0));
      if ((Number(row[stat]) || 0) === max && max > 0) highs.add(stat);
    });
    return { ...row, __careerHighs: highs };
  });
}

function detailContext() {
  if (state.page.type === "team") {
    const seasonLabel = state.page.season === "Lifetime" ? "All seasons" : state.page.season;
    const teamRow = teamSeasonRow(state.page.team, state.page.season);
    const record = teamRow ? `${teamRow.wins}-${teamRow.losses}, ${fmt(teamRow.standingsPoints)} pts, ${fmt(teamRow.pointsPerGame)} pts/G` : "";
    return {
      eyebrow: "Team roster",
      title: `${state.page.team} - ${seasonLabel}${record ? ` (${record})` : ""}`,
      columns: rosterColumns,
      rows: decorateRosterCareerHighs(sortRows(teamRoster(state.page.team, state.page.season))),
      tableTitle: "Players",
      action: (row) => ({ type: "player", player: row.name }),
    };
  }

  if (state.page.type === "player") {
    return {
      eyebrow: "Player career",
      title: state.page.player,
      columns: playerSeasonColumns,
      rows: decoratePlayerCareerRows(state.page.player),
      tableTitle: "Seasons",
      action: (row) => row.__isCareer ? null : ({ type: "playerSeason", player: state.page.player, season: row.season }),
    };
  }

  if (state.page.type === "playerSeason") {
    return {
      eyebrow: "Player game log",
      title: `${state.page.player} - ${state.page.season}`,
      columns: gameColumns,
      rows: sortRows(playerSeasonGames(state.page.player, state.page.season)),
      tableTitle: "Games",
      action: null,
    };
  }

  if (state.page.type === "awardRace") {
    const definition = awardDefinitionByName(state.page.award, state.page.season);
    return {
      eyebrow: "Award race",
      title: `${state.page.season} ${state.page.award}`,
      columns: awardRaceColumns,
      rows: awardRaceRows(definition),
      tableTitle: "Contenders",
      action: (row) => row.name ? ({ type: "player", player: row.name }) : null,
    };
  }

  return null;
}

function dashboardAction(row) {
  if (state.view === "awards") return { type: "awardRace", award: row.award, season: row.season };
  if (isTeamView()) {
    return { type: "team", team: row.name, season: isLifetimeView() ? "Lifetime" : row.season };
  }
  return { type: "player", player: row.name };
}

function renderSeasonOptions() {
  if (!state.includeScrims && isScrimSeason(state.season)) state.season = "All";
  els.seasonSelect.innerHTML = ["All", ...visibleSeasons()]
    .map((season) => `<option value="${season}">${season === "All" ? "All seasons" : season}</option>`)
    .join("");
  els.seasonSelect.value = state.season;
}

function renderKpis(rows) {
  els.generatedAt.textContent = `Generated ${data.generatedAt}`;
  els.seasonSelect.disabled = isLifetimeView();
  document.querySelector(".controls").classList.toggle("season-disabled", isLifetimeView());
  renderLeagueLeaderPanels(rows);
}

function renderBars(target, rows, key, suffix = "", tone = "default", scaleMax = null) {
  const leaders = [...rows].sort((a, b) => b[key] - a[key]).slice(0, 5);
  const max = scaleMax ?? Math.max(...leaders.map((row) => row[key]), 1);
  target.innerHTML = leaders.map((row) => `
    <div class="bar-row ${tone}" title="${row.name}">
      <span class="bar-name">${escapeHtml(displayName(row.name, "name"))}${state.season === "All" && row.season ? ` <small>${escapeHtml(row.season)}</small>` : ""}</span>
      <span class="bar-track"><span class="bar-fill" style="--w:${Math.max(2, Math.min(100, (row[key] / max) * 100))}%"></span></span>
      <span class="bar-value">${fmt(row[key], suffix)}</span>
    </div>
  `).join("");
}

function renderLeaders(rows) {
  const entity = isTeamView() ? "Team" : "Player";
  const leaderRows = state.season === "All"
    ? (isTeamView() ? lifetimeTeams() : lifetimePlayers())
    : rows;
  const shootingRows = isTeamView() ? leaderRows : leaderRows.filter((row) => row.shots >= shootingEligibilityShots);
  els.leaderOneTitle.textContent = `${entity} Goal Leaders`;
  els.leaderTwoTitle.textContent = isTeamView() ? "Shooting %" : `Shooting % (${shootingEligibilityShots}+ shots)`;
  renderBars(els.leaderOne, leaderRows, "goals", "", "goals");
  renderBars(els.leaderTwo, shootingRows, "shootingPct", "%", "shooting", 100);
}

function bestBy(rows, key, minGames = 1, predicate = () => true) {
  return [...rows]
    .filter((row) => row.games >= minGames && typeof row[key] === "number" && predicate(row))
    .sort((a, b) => b[key] - a[key])[0];
}

function setFigure(index, label, row, valueKey, suffix = "") {
  const slots = [
    [els.figureOneLabel, els.figureOneValue, els.figureOneMeta],
    [els.figureTwoLabel, els.figureTwoValue, els.figureTwoMeta],
    [els.figureThreeLabel, els.figureThreeValue, els.figureThreeMeta],
    [els.figureFourLabel, els.figureFourValue, els.figureFourMeta],
  ];
  const [labelEl, valueEl, metaEl] = slots[index];
  labelEl.textContent = label;
  valueEl.textContent = row ? row.name : "-";
  metaEl.textContent = row ? `${fmt(row[valueKey], suffix)} - ${fmt(row.games)} GP` : "";
}

function renderFigures(rows) {
  const minGames = isLifetimeView() ? 5 : 2;
  const shootingEligible = (row) => isTeamView() || row.shots >= shootingEligibilityShots;
  setFigure(0, "Top Scorer", bestBy(rows, "goals", 1), "goals");
  setFigure(1, "Pressure Leader", bestBy(rows, "pressureIndex", minGames), "pressureIndex");
  setFigure(2, "Most Efficient", bestBy(rows, "shootingPct", minGames, shootingEligible), "shootingPct", "%");
  setFigure(3, "Boost Thief", bestBy(rows, "boostStolenPerGame", minGames, (row) => (row.amountStolen || 0) > 0), "boostStolenPerGame");
}

function playerAwards(player) {
  return s5Awards.filter((award) => award.player === player);
}

function teamInfoFor(teamName, season) {
  return (data.manualHistory?.teamInfo || []).find((info) => info.team === teamName && info.season === season);
}

function draftRowsForPlayer(player) {
  return (data.manualHistory?.draft || []).filter((row) => [row.captain, row.pick1, row.pick2].includes(player));
}

function draftRowForTeam(teamName, season) {
  return (data.manualHistory?.draft || []).find((row) => row.team === teamName && row.season === season);
}

function draftRole(row, player) {
  if (row.captain === player) return "Captain";
  if (row.pick1 === player) return "Round 1 Pick";
  if (row.pick2 === player) return "Round 2 Pick";
  return "";
}

function renderDetailExtras() {
  if (state.page.type === "team") {
    const info = teamInfoFor(state.page.team, state.page.season);
    const draft = draftRowForTeam(state.page.team, state.page.season);
    if (!info && !draft) {
      els.detailExtras.classList.add("hidden");
      els.detailExtras.innerHTML = "";
      return;
    }
    els.detailExtras.innerHTML = `
      <div class="extras-grid">
        ${info ? `<section>
          <h2>Team Info</h2>
          <div class="info-grid">
            <article><span>Captain</span><strong>${escapeHtml(displayName(info.captain, "name"))}</strong></article>
            <article><span>Home Stadium</span><strong>${escapeHtml(info.homeStadium)}</strong></article>
            <article><span>Home Server</span><strong>${escapeHtml(info.homeServer)}</strong></article>
            <article><span>Average MMR</span><strong>${escapeHtml(fmt(info.averageMmr))}</strong></article>
          </div>
        </section>` : ""}
        ${draft ? `<section>
          <h2>Draft Info</h2>
          <div class="info-grid">
            <article><span>Draft Order</span><strong>${escapeHtml(fmt(draft.draftOrder))}</strong></article>
            <article><span>Captain</span><strong>${escapeHtml(displayName(draft.captain, "name"))} (${fmt(draft.captainMmr)})</strong></article>
            <article><span>Round 1</span><strong>${escapeHtml(displayName(draft.pick1, "name"))} (${fmt(draft.pick1Mmr)})</strong></article>
            <article><span>Round 2</span><strong>${escapeHtml(displayName(draft.pick2, "name"))} (${fmt(draft.pick2Mmr)})</strong></article>
            <article><span>Team MMR</span><strong>${escapeHtml(fmt(draft.teamMmr))}</strong></article>
            <article><span>Team Rank</span><strong>${escapeHtml(fmt(draft.teamRank))}</strong></article>
          </div>
        </section>` : ""}
      </div>
    `;
    els.detailExtras.classList.remove("hidden");
    return;
  }

  if (state.page.type !== "player") {
    els.detailExtras.classList.add("hidden");
    els.detailExtras.innerHTML = "";
    return;
  }

  const groups = leaderboardAppearances(state.page.player);
  const awards = playerAwards(state.page.player);
  const draftRows = draftRowsForPlayer(state.page.player);
  const leaderboardHtml = groups.length ? groups.map((group) => `
    <article class="appearance-card">
      <h3>${escapeHtml(group.label)}</h3>
      ${group.entries.map((entry) => `
        <button type="button" data-action="${encodeURIComponent(JSON.stringify({ type: "seasonLeaders", season: entry.season, player: state.page.player }))}">
          <span>${escapeHtml(entry.season)}</span>
          <strong>${escapeHtml(fmt(entry.value))}</strong>
          <em>(${entry.rank}${rankSuffix(entry.rank)})</em>
        </button>
      `).join("")}
      <small>${group.entries.length} season${group.entries.length === 1 ? "" : "s"} in Top 10</small>
    </article>
  `).join("") : `<p class="empty-note">No Top 10 leaderboard appearances yet.</p>`;
  const awardsHtml = awards.length ? `
    <div class="award-list">
      ${awards.map((award) => `
        <article class="award-card">
          <strong>${escapeHtml(award.award)}</strong>
          <span>${escapeHtml(award.season)} - ${escapeHtml(award.team)}</span>
          <small>Amount: ${escapeHtml(award.amount)} / Per Game: ${escapeHtml(award.perGameAmount)}</small>
        </article>
      `).join("")}
    </div>
  ` : `<p class="empty-note">No awards added yet.</p>`;
  const draftHtml = draftRows.length ? `
    <div class="award-list">
      ${draftRows.map((row) => `
        <article class="award-card">
          <strong>${escapeHtml(row.season)} Draft - ${escapeHtml(draftRole(row, state.page.player))}</strong>
          <span>${escapeHtml(displayName(row.team, "team"))}</span>
          <small>Order: ${fmt(row.draftOrder)} / Team MMR: ${fmt(row.teamMmr)} / Rank: ${fmt(row.teamRank)}</small>
        </article>
      `).join("")}
    </div>
  ` : `<p class="empty-note">No draft info added yet.</p>`;

  els.detailExtras.innerHTML = `
    <div class="extras-grid">
      <section>
        <h2>Leaderboard Appearances</h2>
        <div class="appearance-grid">${leaderboardHtml}</div>
      </section>
      <section>
        <h2>Awards</h2>
        ${awardsHtml}
      </section>
      <section>
        <h2>Draft Info</h2>
        ${draftHtml}
      </section>
      <section>
        <h2>Honors</h2>
        <p class="empty-note">Honors can be added here later.</p>
      </section>
    </div>
  `;
  els.detailExtras.classList.remove("hidden");
}

function renderPlayoffStats() {
  if (state.page.type !== "dashboard" || isLifetimeView() || state.view === "awards" || state.season === "All" || isPlayoffSeason(state.season)) {
    els.playoffStats.classList.add("hidden");
    els.playoffStats.innerHTML = "";
    return;
  }
  const selectedPlayoffSeason = state.season === "All" ? "" : `${state.season} Playoffs`;
  const manualPlayoffs = (data.manualHistory?.playoffs || []).filter((row) => !selectedPlayoffSeason || row.season === selectedPlayoffSeason);
  const playoffTeams = data.teams.filter((row) => row.season === "S5 Playoffs").sort((a, b) => b.wins - a.wins || b.goals - a.goals);
  const playoffPlayers = data.players.filter((row) => row.season === "S5 Playoffs").sort((a, b) => b.goals - a.goals).slice(0, 8);
  if (!playoffTeams.length && !playoffPlayers.length && !manualPlayoffs.length) {
    els.playoffStats.classList.add("hidden");
    els.playoffStats.innerHTML = "";
    return;
  }
  const playoffBracketHtml = manualPlayoffs.length ? `
    <section>
      <h2>${selectedPlayoffSeason || "Historical"} Playoff Brackets</h2>
      <div class="compact-stat-list">
        ${manualPlayoffs.map((row) => `<button type="button"><strong>${escapeHtml(row.round)}</strong><span>${escapeHtml(displayName(row.teamA, "team"))} ${escapeHtml(row.result)} ${escapeHtml(displayName(row.teamB, "team"))}</span></button>`).join("")}
      </div>
    </section>
  ` : "";
  const playoffTeamHtml = playoffTeams.length && state.season === "S5" ? `<section>
        <h2>S5 Playoff Team Stats</h2>
        <div class="compact-stat-list">
          ${playoffTeams.map((row) => `<button type="button" data-action="${encodeURIComponent(JSON.stringify({ type: "team", team: row.name, season: row.season }))}"><strong>${escapeHtml(displayName(row.name, "name"))}</strong><span>${fmt(row.wins)}-${fmt(row.losses)} | ${fmt(row.goalsPerGame)} G/G | ${fmt(row.pointsPerGame)} pts/G</span></button>`).join("")}
        </div>
      </section>` : "";
  const playoffPlayerHtml = playoffPlayers.length && state.season === "S5" ? `<section>
        <h2>S5 Playoff Player Stats</h2>
        <div class="compact-stat-list">
          ${playoffPlayers.map((row) => `<button type="button" data-action="${encodeURIComponent(JSON.stringify({ type: "player", player: row.name }))}"><strong>${escapeHtml(displayName(row.name, "name"))}</strong><span>${fmt(row.goals)} G | ${fmt(row.perPerGame)} PER/G | ${fmt(row.shootingPct, "%")}</span></button>`).join("")}
        </div>
      </section>` : "";
  const content = `${playoffTeamHtml}${playoffPlayerHtml}${playoffBracketHtml}`;
  if (!content.trim()) {
    els.playoffStats.classList.add("hidden");
    els.playoffStats.innerHTML = "";
    return;
  }
  els.playoffStats.innerHTML = `
    <div class="extras-grid">
      ${content}
    </div>
  `;
  els.playoffStats.classList.remove("hidden");
}

function searchPool() {
  const teamSeason = state.season !== "All" ? state.season : "Lifetime";
  const teams = [...new Map(data.teams.map((row) => [row.name, row])).values()].map((row) => ({ type: "Team", name: row.name, action: { type: "team", team: row.name, season: teamSeason } }));
  const players = [...new Map(data.players.map((row) => [row.name, row])).values()].map((row) => ({ type: "Player", name: row.name, action: { type: "player", player: row.name } }));
  return [...teams, ...players];
}

function searchScore(item, query) {
  const name = item.name.toLowerCase();
  if (name === query) return 100;
  if (name.startsWith(query)) return 80 - name.length / 100;
  if (name.includes(query)) return 50 - name.indexOf(query);
  return 0;
}

function renderSearchSuggestions() {
  const query = state.searchText.trim().toLowerCase();
  if (!query) {
    els.searchSuggestions.classList.add("hidden");
    els.searchSuggestions.innerHTML = "";
    return;
  }
  const matches = searchPool()
    .map((item) => ({ ...item, score: searchScore(item, query) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
    .slice(0, 5);
  els.searchSuggestions.innerHTML = matches.length ? matches.map((item) => `
    <button type="button" data-action="${encodeURIComponent(JSON.stringify(item.action))}">
      <span>${escapeHtml(displayName(item.name, "name"))}</span>
      <em>${item.type}</em>
    </button>
  `).join("") : `<p>No matches</p>`;
  els.searchSuggestions.classList.remove("hidden");
}

function rankSuffix(rank) {
  if (rank % 100 >= 11 && rank % 100 <= 13) return "th";
  if (rank % 10 === 1) return "st";
  if (rank % 10 === 2) return "nd";
  if (rank % 10 === 3) return "rd";
  return "th";
}

function renderTable(rows, columns, title, rowAction = null) {
  els.head.closest("table").classList.remove("leader-card-table");
  els.head.closest(".table-wrap").classList.remove("leader-card-wrap");
  els.tableTitle.textContent = title;
  els.rowCount.textContent = `${rows.length} ${rows.length === 1 ? "row" : "rows"}`;
  els.head.innerHTML = `<tr>${columns.map(([key, label]) => `
    <th data-sort="${key}">${label}${state.sortKey === key ? (state.sortDir === "asc" ? " ^" : " v") : ""}</th>
  `).join("")}</tr>`;
  els.body.innerHTML = rows.map((row) => {
    const action = rowAction ? rowAction(row) : null;
    const attrs = action ? ` class="clickable" data-action="${encodeURIComponent(JSON.stringify(action))}"` : "";
    const playoffWinner = row.round && row.teamA && row.teamB ? playoffWinnerKey(row) : "";
    return `<tr${attrs}>${columns.map(([key]) => {
    const percent = key === "winPct" || key === "shootingPct" || key === "missPct" || key === "teamSaveRate" || key === "opponentShootingPct";
    const raw = key === "name" || key === "team" || key === "opponent" || key === "player" || key === "teamA" || key === "teamB" ? displayName(row[key], key === "teamA" || key === "teamB" ? "team" : key) : row[key];
    let value = key === "season" ? `<span class="pill">${escapeHtml(raw)}</span>` : escapeHtml(fmt(raw, percent ? "%" : ""));
    if ((key === "teamA" || key === "teamB") && playoffWinner === key) value = `<strong class="playoff-winner">${value}</strong>`;
    if (row.__careerHighs?.has(key)) value = `<strong class="career-high">${value}</strong>`;
    if (row.__seasonRecords?.has(key)) value = `<strong class="season-leader">${value}</strong><sup class="season-record">*</sup>`;
    return `<td>${value}</td>`;
  }).join("")}</tr>`;
  }).join("");
}

function render() {
  const inDetail = state.page.type !== "dashboard";
  els.detailBar.classList.toggle("hidden", !inDetail);
  document.querySelector(".kpis").classList.toggle("hidden", inDetail || state.season === "All" || isPlayoffSeason(state.season) || !["teams", "players"].includes(state.view));
  document.querySelector(".figures").classList.toggle("hidden", inDetail || state.view === "awards");
  document.querySelector(".leaderboards").classList.toggle("hidden", inDetail || state.season === "All" || isPlayoffSeason(state.season) || state.view === "awards");
  renderSearchSuggestions();

  if (inDetail) {
    renderPlayoffStats();
    if (state.page.type === "seasonLeaders") {
      renderSeasonLeaderDetail(state.page.season);
      return;
    }

    const detail = detailContext();
    els.detailEyebrow.textContent = detail.eyebrow;
    els.detailTitle.textContent = detail.title;
    renderTable(detail.rows, detail.columns, detail.tableTitle, detail.action);
    renderDetailExtras();
    return;
  }

  renderDetailExtras();

  if (isPlayoffSeason(state.season) && playoffBracketRows(state.season).length) {
    renderKpis([]);
    renderTable(playoffBracketRows(state.season), playoffColumns, `${state.season} Bracket`, null);
    renderPlayoffStats();
    return;
  }

  if (state.view === "awards") {
    renderKpis([]);
    renderTable(awardHistoryRows(), awardHistoryColumns, "Awards History", dashboardAction);
    renderPlayoffStats();
    return;
  }

  if (state.view === "standings") {
    renderKpis([]);
    renderTable(standingsRows(), standingsColumns, state.season === "All" ? "All Season Standings" : `${state.season} Standings`, (row) => ({ type: "team", team: row.name, season: row.season }));
    renderPlayoffStats();
    return;
  }

  const rows = rowsForView();
  const figureRows = state.season === "All" ? (isTeamView() ? lifetimeTeams() : lifetimePlayers()) : rows;
  renderKpis(rows);
  renderFigures(figureRows);
  renderLeaders(rows);
  renderTable(rows, columnsForView(), dashboardTitle(), dashboardAction);
  renderPlayoffStats();
}

els.seasonSelect.addEventListener("change", (event) => {
  state.season = event.target.value;
  render();
});

els.searchInput.addEventListener("input", (event) => {
  state.searchText = event.target.value;
  renderSearchSuggestions();
});

els.includeScrims.addEventListener("change", (event) => {
  state.includeScrims = event.target.checked;
  renderSeasonOptions();
  render();
});

els.tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.page = { type: "dashboard" };
    state.view = button.dataset.view;
    state.sortKey = state.view === "awards" ? "season" : (state.view === "standings" ? "standingsRank" : (isTeamView() ? "wins" : "goals"));
    state.sortDir = "desc";
    if (state.view === "standings") state.sortDir = "asc";
    els.tabButtons.forEach((btn) => btn.classList.toggle("active", btn === button));
    render();
  });
});

els.backButton.addEventListener("click", () => {
  if (state.page.type === "playerSeason") {
    state.page = { type: "player", player: state.page.player };
    state.sortKey = "season";
    state.sortDir = "asc";
  } else if (state.page.type === "seasonLeaders") {
    if (state.page.player) {
      state.page = { type: "player", player: state.page.player };
      state.sortKey = "season";
      state.sortDir = "asc";
    } else {
      state.page = { type: "dashboard" };
      state.sortKey = isTeamView() ? "wins" : "goals";
      state.sortDir = "desc";
    }
  } else if (state.page.type === "awardRace") {
    state.page = { type: "dashboard" };
    state.view = "awards";
    state.sortKey = "season";
    state.sortDir = "desc";
  } else {
    state.page = { type: "dashboard" };
    state.sortKey = isTeamView() ? "wins" : "goals";
    state.sortDir = "desc";
  }
  render();
});

els.body.addEventListener("click", (event) => {
  const row = event.target.closest("[data-action]");
  if (!row) return;
  const action = JSON.parse(decodeURIComponent(row.dataset.action));
  state.page = action;
  if (action.type === "team") {
    state.sortKey = "goals";
    state.sortDir = "desc";
  } else if (action.type === "player") {
    state.sortKey = "season";
    state.sortDir = "asc";
  } else if (action.type === "playerSeason") {
    state.sortKey = "date";
    state.sortDir = "asc";
  }
  render();
});

document.querySelector(".kpis").addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  state.page = JSON.parse(decodeURIComponent(target.dataset.action));
  state.sortKey = "rank";
  state.sortDir = "asc";
  render();
});

els.searchSuggestions.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  state.page = JSON.parse(decodeURIComponent(target.dataset.action));
  state.searchText = "";
  els.searchInput.value = "";
  render();
});

els.playoffStats.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  state.page = JSON.parse(decodeURIComponent(target.dataset.action));
  render();
});

els.detailExtras.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  state.page = JSON.parse(decodeURIComponent(target.dataset.action));
  state.sortKey = "stat";
  state.sortDir = "asc";
  render();
});

els.head.addEventListener("click", (event) => {
  const header = event.target.closest("[data-sort]");
  if (!header) return;
  const key = header.dataset.sort;
  if (state.sortKey === key) {
    state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
  } else {
    state.sortKey = key;
    state.sortDir = "desc";
  }
  render();
});

els.includeScrims.checked = state.includeScrims;
renderSeasonOptions();
render();
