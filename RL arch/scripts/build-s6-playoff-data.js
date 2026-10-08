const fs = require("fs");
const path = require("path");

const downloads = "C:/Users/thoma/Downloads";
const localSources = path.resolve(__dirname, "..", "Replays s6", "playoffs");
const output = path.resolve(__dirname, "..", "s6-playoffs-data.js");
const extraOutput = path.resolve(__dirname, "..", "s6-playoffs-extra-fields.json");
const series = [
  {
    round: "Prequarters P1",
    home: "Hook Line & Blinker",
    away: "Ball Chasin & Sauce Tastin",
    teams: "hlb-bcst-playoffs-da4kizb2jc-teams-games.csv",
    players: "hlb-bcst-playoffs-da4kizb2jc-players-games.csv",
  },
  {
    round: "Prequarters P2",
    home: "Giga's In Paris",
    away: "Quack Wok",
    teams: "quack-woks-playoffs-zdmnao5k35-teams-games.csv",
    players: "quack-woks-playoffs-zdmnao5k35-players-games.csv",
  },
  {
    round: "Prequarters P3",
    home: "The Cox",
    away: "ESC",
    teams: "cox-esc-playoffs-ek0ppu2yk2-teams-games.csv",
    players: "cox-esc-playoffs-ek0ppu2yk2-players-games.csv",
  },
  {
    round: "Prequarters P4",
    home: "Past Our Prime",
    away: "Supernova Abyss",
    teams: "lpreq-pop-v-sup-k2p2qdkzpx-teams-games.csv",
    players: "lpreq-pop-v-sup-k2p2qdkzpx-players-games.csv",
  },
  {
    round: "Quarterfinals Q1",
    home: "The Cox",
    away: "Giga's In Paris",
    teams: "cox-gigas-playoffs-3aqrv8zsr0-teams-games.csv",
    players: "cox-gigas-playoffs-3aqrv8zsr0-players-games.csv",
  },
  {
    round: "Quarterfinals Q2",
    home: "Ball Chasin & Sauce Tastin",
    away: "Supernova Abyss",
    teams: "bcst-sup-quarterfinals-co9hby9vkn-teams-games.csv",
    players: "bcst-sup-quarterfinals-co9hby9vkn-players-games.csv",
  },
  {
    round: "Semifinals S1",
    home: "Hook Line & Blinker",
    away: "The Cox",
    teams: "hlb-cox-semi-lkdw2bj4uv-teams-games.csv",
    players: "hlb-cox-semi-lkdw2bj4uv-players-games.csv",
  },
  {
    round: "Semifinals S2",
    home: "ESC",
    away: "Supernova Abyss",
    teams: "esc-sa-semi-jxruq0nzx1-teams-games.csv",
    players: "esc-sa-semi-jxruq0nzx1-players-games.csv",
  },
  {
    round: "Grand Finals",
    home: "Hook Line & Blinker",
    away: "ESC",
    teams: "gtrls-s6-finals-k74t43uzse-teams-games.csv",
    players: "gtrls-s6-finals-k74t43uzse-players-games.csv",
  },
];

function sourcePath(file) {
  const local = path.join(localSources, file);
  return fs.existsSync(local) ? local : path.join(downloads, file);
}

function splitLine(line) {
  const cells = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"' && quoted && line[index + 1] === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === ";" && !quoted) {
      cells.push(cell);
      cell = "";
    } else {
      cell += char;
    }
  }
  cells.push(cell);
  return cells;
}

function readCsv(file) {
  const lines = fs.readFileSync(sourcePath(file), "utf8").replace(/^\uFEFF/, "").trim().split(/\r?\n/);
  const headers = splitLine(lines.shift());
  return lines.filter(Boolean).map((line) => {
    const cells = splitLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, cells[index] || ""]));
  });
}

function readCsvRaw(file) {
  const lines = fs.readFileSync(sourcePath(file), "utf8").replace(/^\uFEFF/, "").trim().split(/\r?\n/);
  return {
    headers: splitLine(lines.shift()),
    rows: lines.filter(Boolean).map(splitLine),
  };
}

function num(row, field) {
  const value = Number(row[field]);
  return Number.isFinite(value) ? value : 0;
}

function buildSeries(config) {
  const teamRows = readCsv(config.teams);
  const playerRows = readCsv(config.players);
  const ids = [...new Set([...teamRows, ...playerRows].map((row) => row["replay id"]).filter(Boolean))]
    .sort((left, right) => {
      const leftRow = teamRows.find((row) => row["replay id"] === left) || playerRows.find((row) => row["replay id"] === left);
      const rightRow = teamRows.find((row) => row["replay id"] === right) || playerRows.find((row) => row["replay id"] === right);
      return String(leftRow?.date || "").localeCompare(String(rightRow?.date || ""));
    });

  return {
    season: "S6",
    stage: "Playoffs",
    round: config.round,
    home: config.home,
    away: config.away,
    games: ids.map((id, index) => {
      const teams = teamRows.filter((row) => row["replay id"] === id);
      const players = playerRows.filter((row) => (
        row["replay id"] === id
        && !(config.round === "Quarterfinals Q2" && row["player name"] === "SirSkittleZ")
      ));
      const winner = teams.find((row) => String(row.result).toLowerCase() === "win")?.["team name"] || "";
      return {
        id,
        game: `Game ${index + 1}`,
        date: String((teams[0] || players[0] || {}).date || "").slice(0, 10),
        winner,
        teams: teams.map((row) => [
          row["team name"], row["opposing team name"], num(row, "score"), num(row, "goals"),
          num(row, "assists"), num(row, "saves"), num(row, "shots"), num(row, "shots conceded"),
          num(row, "goals conceded"), num(row, "amount stolen"), num(row, "demos inflicted"), num(row, "demos taken"),
          num(row, "epic saves"), num(row, "clears"), num(row, "centers"), num(row, "aerial hits"),
          num(row, "first touches"), num(row, "flip resets"),
        ]),
        players: players.map((row) => [
          row["team name"], row["player name"], num(row, "score"), num(row, "goals"),
          num(row, "assists"), num(row, "saves"), num(row, "shots"), num(row, "amount stolen"),
          num(row, "demos inflicted"), num(row, "demos taken"),
          num(row, "epic saves"), num(row, "clears"), num(row, "centers"), num(row, "aerial hits"),
          num(row, "first touches"), num(row, "flip resets"),
        ]),
      };
    }),
  };
}

const payload = series.map(buildSeries);
fs.writeFileSync(output, `window.S6_PLAYOFF_SERIES = ${JSON.stringify(payload, null, 2)};\n`);
const extraPayload = series.map((config) => ({
  round: config.round,
  home: config.home,
  away: config.away,
  teamSource: config.teams,
  playerSource: config.players,
  teams: readCsvRaw(config.teams),
  players: readCsvRaw(config.players),
}));
fs.writeFileSync(extraOutput, `${JSON.stringify(extraPayload, null, 2)}\n`);
console.log(`Wrote ${payload.length} playoff series to ${output}`);
console.log(`Preserved complete CSV fields in ${extraOutput}`);
