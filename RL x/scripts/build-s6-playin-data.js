const fs = require("fs");
const path = require("path");

const downloads = "C:/Users/thoma/Downloads";
const output = path.resolve(__dirname, "..", "s6-playin-data.js");
const series = [
  {
    round: "Play-In Elimination R1",
    home: "Best Friends Club",
    away: "Spirit Airlines",
    teams: "spirit-bfc-play-in-71sn2yi93z-teams-games.csv",
    players: "spirit-bfc-play-in-71sn2yi93z-players-games.csv",
  },
  {
    round: "Play-In Elimination R2",
    home: "Supernova Abyss",
    away: "Best Friends Club",
    teams: "supernova-abyss-vs-best-friends--5tx12ta8yv-teams-games.csv",
    players: "supernova-abyss-vs-best-friends--5tx12ta8yv-players-games.csv",
  },
  {
    round: "Play-In Qualification R1",
    home: "Past Our Prime",
    away: "ESC",
    teams: "esc-v-pop-play-in-s8rktd8gf0-teams-games.csv",
    players: "esc-v-pop-play-in-s8rktd8gf0-players-games.csv",
  },
  {
    round: "Play-In Qualification R2",
    home: "Past Our Prime",
    away: "Ball Chasin & Sauce Tastin",
    teams: "bcst-pop-play-in-g72l0ysrit-teams-games.csv",
    players: "bcst-pop-play-in-g72l0ysrit-players-games.csv",
  },
];

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
  const lines = fs.readFileSync(path.join(downloads, file), "utf8").replace(/^\uFEFF/, "").trim().split(/\r?\n/);
  const headers = splitLine(lines.shift());
  return lines.filter(Boolean).map((line) => {
    const cells = splitLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, cells[index] || ""]));
  });
}

function num(row, field) {
  const value = Number(row[field]);
  return Number.isFinite(value) ? value : 0;
}

function dateOnly(row) {
  return String(row.date || "").slice(0, 10);
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
    stage: "Swiss",
    round: config.round,
    home: config.home,
    away: config.away,
    games: ids.map((id, index) => {
      const teams = teamRows.filter((row) => row["replay id"] === id);
      const players = playerRows.filter((row) => row["replay id"] === id);
      const winner = teams.find((row) => String(row.result).toLowerCase() === "win")?.["team name"] || "";
      return {
        id,
        game: `Game ${index + 1}`,
        date: dateOnly(teams[0] || players[0] || {}),
        winner,
        teams: teams.map((row) => [
          row["team name"], row["opposing team name"], num(row, "score"), num(row, "goals"),
          num(row, "assists"), num(row, "saves"), num(row, "shots"), num(row, "shots conceded"),
          num(row, "goals conceded"), num(row, "amount stolen"), num(row, "demos inflicted"), num(row, "demos taken"),
        ]),
        players: players.map((row) => [
          row["team name"], row["player name"], num(row, "score"), num(row, "goals"),
          num(row, "assists"), num(row, "saves"), num(row, "shots"), num(row, "amount stolen"),
          num(row, "demos inflicted"), num(row, "demos taken"),
        ]),
      };
    }),
  };
}

const payload = series.map(buildSeries);
fs.writeFileSync(output, `window.S6_PLAYIN_SERIES = ${JSON.stringify(payload, null, 2)};\n`);
console.log(`Wrote ${payload.length} Play-In series to ${output}`);

