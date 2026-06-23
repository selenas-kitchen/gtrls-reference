const data = window.RL_DASHBOARD_DATA;
const manualHistory = window.RL_MANUAL_HISTORY || { teams: [], players: [], teamInfo: [], playoffs: [], draft: [], schedules: [] };

const playerAliasMap = new Map([
  ["AXIMOV", "Ax1mov"],
  ["AXIM0V", "Ax1mov"],
  ["AX1MOV", "Ax1mov"],
  ["DIASTRIKO", "Ax1mov"],
  ["SETH", "Ax1mov"],
  ["SLAPSHOTS1324", "I_have_a_bag"],
  ["IHAVEABAG", "I_have_a_bag"],
  ["THELAKEEFFEKT", "TheLakeEffekt"],
  ["HENRYSPACE", "Henryspace_"],
  ["HENRYSPACE_", "Henryspace_"],
  ["HATEDONE", "LIL HATED ONE"],
  ["HATED_ONE", "LIL HATED ONE"],
  ["LILHATEDONE", "LIL HATED ONE"],
  ["DAIL", "dailcowgs94"],
  ["DAILCOWGS94", "dailcowgs94"],
  ["DIALCOWGS94", "dailcowgs94"],
  ["GTDAIL", "dailcowgs94"],
  ["WILDCHIP", "WildChip2567"],
  ["WILDCHIP2567", "WildChip2567"],
  ["GONSLINGER", "gonslinger"],
  ["KUHL", "Kuhlbeans"],
  ["KUHLBEANS", "Kuhlbeans"],
  ["VAL3NOR", "Val-enor"],
  ["VALENOR", "Val-enor"],
  ["SELENAGOMEZ415", "selena."],
  ["SELENAGOMEZ", "selena."],
  ["SELENA", "selena."],
  ["BROCK", "AtownSteelers"],
  ["KEVIN", "RoyalxRenegade"],
  ["RYAN", "Original_6_Hawks"],
  ["AUSTIN", "Authurm19"],
  ["CLAYTON", "gonslinger"],
  ["JOSH", "Joshhh_RL"],
  ["EPONTIOUS", "EPo -_-"],
  ["SKITTLEZ", "SirSkittleZ"],
  ["JAR", "JulietAlphaRomeo"],
  ["WAXYSAUSAGE9", "MJD22-_-"],
  ["MERKWRM", "MerkWTM"],
  ["MERKWTM", "MerkWTM"],
  ["RAVENGLITCH", "Ravenglitch"],
]);

const teamAliasMap = new Map([
  ["GIGASINPARIS", "Giga's In Paris"],
  ["BESTFRIENDCLUB", "Best Friends Club"],
  ["BESTFRIENDSCLUB", "Best Friends Club"],
  ["HOOKLINEBLINKER", "Hook Line & Blinker"],
  ["HOOKLINEANDBLINKER", "Hook Line & Blinker"],
  ["HLBLINKER", "Hook Line & Blinker"],
  ["BALLCHASINSAUCETASTIN", "Ball Chasin & Sauce Tastin"],
  ["BALLCHASINANDSAUCETASTIN", "Ball Chasin & Sauce Tastin"],
  ["SPIRITAIRLINES", "Spirit Airlines"],
  ["THECOX", "The Cox"],
  ["PASTOURPRIME", "Past Our Prime"],
  ["QUACKWOK", "Quack Wok"],
  ["CROSSBARCARTEL", "Crossbar Cartel"],
  ["DECEPTITARDS", "Deceptitards"],
  ["SUPERNOVAABYSS", "Supernova Abyss"],
  ["BIRDBATHBOMBERS", "BBB"],
  ["BIGMUSTYMILKERS", "BMM"],
  ["BIGMUSTYMILKERSZ", "BMM"],
  ["WEENIEHUTJRS", "WEENIE HUT JRS"],
  ["WEENIEHUTJRSY", "WEENIE HUT JRS"],
  ["THEHORNETS", "THE HORNETS"],
  ["THEHORNETSZ", "THE HORNETS"],
  ["PITCHPIRATES", "PITCH PIRATES"],
  ["MILKBEFORECEREAL", "MILK BEFORE CEREAL"],
  ["WOULDABEENDOPE", "WOULDABEENDOPE"],
  ["WOULDABEENDOPEX", "WOULDABEENDOPE"],
  ["DNTHEVS", "D' N' THE V'S"],
  ["DANGERPINGS", "DANGER PINGS"],
  ["DANGERPINGSX", "DANGER PINGS"],
  ["TRIPLESCOOP", "TRIPLE SCOOP"],
  ["TRIPLESCOOPY", "TRIPLE SCOOP"],
  ["3FURY", "Three Inch Fury"],
  ["THREEINCHFURY", "Three Inch Fury"],
  ["PASSINGS4WIMPS", "Passing's 4 Wimps SC"],
  ["PASSINGS4WIMPSSC", "Passing's 4 Wimps SC"],
  ["TEAMCOOL", "COOL"],
  ["DONALDBUMPS", "THE DONALD BUMPS"],
  ["THEDONALDBUMPS", "THE DONALD BUMPS"],
  ["LAMPLIGHTERS", "THE LAMPLIGHTERS"],
  ["THELAMPLIGHTERS", "THE LAMPLIGHTERS"],
  ["SYNDICATEOSCALYWAGS", "SYNDICATE O' SCALLYWAGS"],
  ["SYNDICATEOSCALLLYWAGS", "SYNDICATE O' SCALLYWAGS"],
  ["SYNDICATEOSCALLWAGS", "SYNDICATE O' SCALLYWAGS"],
  ["DEADINTHEWATER", "DEAD IN THE WATER"],
  ["THEGRAVYSTAINBOYS", "GRAVY STAIN BOYS"],
  ["GRAVYSTAINBOYS", "GRAVY STAIN BOYS"],
  ["THEWINDIXIES", "WIN-DIXIES"],
  ["WINDIXIES", "WIN-DIXIES"],
  ["MEGAWATT", "MEGAWATT"],
  ["SLEDDAWGS", "Snowbunnies"],
  ["SNOWBUNNIES", "Snowbunnies"],
]);

function aliasKey(value) {
  return String(value || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function canonicalPlayerName(name) {
  return playerAliasMap.get(aliasKey(name)) || String(name || "").trim();
}

function canonicalTeamName(name) {
  return teamAliasMap.get(aliasKey(name)) || String(name || "").trim();
}

function canonicalizeDataNames() {
  data.players.forEach((row) => {
    row.name = canonicalPlayerName(row.name);
    row.teams = (row.teams || []).map(canonicalTeamName);
  });
  data.teams.forEach((row) => {
    row.name = canonicalTeamName(row.name);
  });
  data.playerGames.forEach((row) => {
    row.player = canonicalPlayerName(row.player);
    row.team = canonicalTeamName(row.team);
    row.opponent = canonicalTeamName(row.opponent);
  });
  manualHistory.teams.forEach((row) => {
    row.name = canonicalTeamName(row.name);
  });
  manualHistory.players.forEach((row) => {
    row.name = canonicalPlayerName(row.name);
    row.teams = (row.teams || []).map(canonicalTeamName);
  });
  manualHistory.teamInfo.forEach((row) => {
    row.team = canonicalTeamName(row.team);
    row.captain = canonicalPlayerName(row.captain);
    row.roster = (row.roster || []).map(canonicalPlayerName);
  });
  manualHistory.draft.forEach((row) => {
    row.team = canonicalTeamName(row.team);
    row.captain = canonicalPlayerName(row.captain);
    row.pick1 = canonicalPlayerName(row.pick1);
    row.pick2 = canonicalPlayerName(row.pick2);
  });
  manualHistory.playoffs.forEach((row) => {
    row.teamA = canonicalTeamName(row.teamA);
    row.teamB = canonicalTeamName(row.teamB);
  });
  manualHistory.schedules.forEach((row) => {
    row.home = canonicalTeamName(row.home);
    row.away = canonicalTeamName(row.away);
    row.winner = canonicalTeamName(row.winner);
  });
}

function combinePlayerSeasonRows(rows) {
  const rawFields = [
    "games", "wins", "losses", "gameWins", "gameLosses", "standingsPoints", "score", "goals", "assists", "saves", "shots",
    "shotsConceded", "goalsConceded", "lastDefenderGoalsConceded", "opponentSavesForced",
    "demosInflicted", "demosTaken", "avgSpeedTotal", "avgBoostTotal", "amountCollected",
    "amountStolen", "totalDistance", "mvps",
  ];
  const groups = new Map();
  rows.forEach((row) => {
    const key = `${row.season}|${row.name}`;
    if (!groups.has(key)) {
      groups.set(key, {
        season: row.season,
        name: row.name,
        teams: new Set(),
        source: row.source,
        overrideGenerated: !!row.overrideGenerated,
        firstDate: row.firstDate || "",
        lastDate: row.lastDate || "",
        rating: row.rating,
        ratingEstimated: !!row.ratingEstimated,
        ratingSource: row.ratingSource || "",
      });
    }
    const item = groups.get(key);
    (row.teams || []).forEach((team) => item.teams.add(team));
    rawFields.forEach((field) => {
      item[field] = (item[field] || 0) + (Number(row[field]) || 0);
    });
    if (row.source !== item.source) item.source = "mixed";
    if (row.overrideGenerated) item.overrideGenerated = true;
    if (typeof row.rating === "number") {
      item.rating = typeof item.rating === "number" ? Math.max(item.rating, row.rating) : row.rating;
      if (!row.ratingEstimated || !item.ratingSource) {
        item.ratingEstimated = !!row.ratingEstimated;
        item.ratingSource = row.ratingSource || item.ratingSource;
      }
    }
    if (row.firstDate && (!item.firstDate || row.firstDate < item.firstDate)) item.firstDate = row.firstDate;
    if (row.lastDate && (!item.lastDate || row.lastDate > item.lastDate)) item.lastDate = row.lastDate;
  });
  return [...groups.values()].map((item) => finalizePlayerAggregate({ ...item, teams: item.teams }));
}

function mergeManualHistory() {
  canonicalizeDataNames();
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
  data.players = combinePlayerSeasonRows(data.players);
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
  season: latestRegularSeason(),
  searchText: "",
  sortKey: "wins",
  sortDir: "desc",
  includeScrims: false,
  excludeTwosEra: false,
  seasonPhase: "regular",
  analyticsMode: "selena",
  awardFilter: "All",
  awardSeasonFilter: "All",
  kitchenSelectedPlayer: "",
  kitchenSortKey: "perPerGame",
  kitchenSortDir: "desc",
  yourKitchenEntity: "players",
  yourKitchenTeam: "All",
  yourKitchenMember: "All",
  yourKitchenChart: "scatter",
  yourKitchenX: "rating",
  yourKitchenY: "perPerGame",
  yourKitchenVariables: [],
  yourKitchenFormula: "",
  yourKitchenVariableName: "",
  yourKitchenError: "",
  page: { type: "dashboard" },
};

const teamColumns = [
  ["name", "Team"],
  ["season", "Season"],
  ["games", "GP"],
  ["standingsPoints", "League Score"],
  ["score", "Total Score"],
  ["avgScore", "Score/G"],
  ["wins", "W"],
  ["losses", "L"],
  ["matchWinPct", "Match Win %"],
  ["gameWins", "Game W"],
  ["gameLosses", "Game L"],
  ["gameWinPct", "Game Win %"],
  ["goals", "Goals"],
  ["goalsPerGame", "Gl/G"],
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
  ["per", "PER"],
  ["perPerGame", "PER/G"],
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
  ["wins", "Match W"],
  ["losses", "Match L"],
  ["matchWinPct", "Match Win %"],
  ["gameWins", "Game W"],
  ["gameLosses", "Game L"],
  ["gameWinPct", "Game Win %"],
  ["goals", "Goals"],
  ["goalsPerGame", "Gl/G"],
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

const detailedPlayoffColumns = [
  ["season", "Season"],
  ["round", "Round"],
  ["game", "Game"],
  ["teamA", "Team"],
  ["result", "Result"],
  ["teamB", "Team"],
  ["series", "Series"],
  ["mvp", "MVP"],
];

const championshipGameColumns = [
  ["game", "Game"],
  ["teamA", "Team"],
  ["result", "Result"],
  ["teamB", "Team"],
  ["series", "Series"],
  ["mvp", "MVP"],
];

const playoffWinnerPattern = /(\d+)\s*-\s*(\d+)/;

const els = {
  generatedAt: document.querySelector("#generatedAt"),
  seasonSelect: document.querySelector("#seasonSelect"),
  searchInput: document.querySelector("#searchInput"),
  searchSuggestions: document.querySelector("#searchSuggestions"),
  includeScrims: document.querySelector("#includeScrims"),
  excludeTwosControl: document.querySelector("#excludeTwosControl"),
  excludeTwosEra: document.querySelector("#excludeTwosEra"),
  seasonPhaseControl: document.querySelector("#seasonPhaseControl"),
  analyticsModeControl: document.querySelector("#analyticsModeControl"),
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
  detailTeamLogo: document.querySelector("#detailTeamLogo"),
  backButton: document.querySelector("#backButton"),
  leaderOneTitle: document.querySelector("#leaderOneTitle"),
  leaderTwoTitle: document.querySelector("#leaderTwoTitle"),
  leaderOne: document.querySelector("#leaderOne"),
  leaderTwo: document.querySelector("#leaderTwo"),
  tableTitle: document.querySelector("#tableTitle"),
  tableLegend: document.querySelector("#tableLegend"),
  rowCount: document.querySelector("#rowCount"),
  head: document.querySelector("#statsHead"),
  body: document.querySelector("#statsBody"),
  tableShell: document.querySelector(".table-shell"),
  detailExtras: document.querySelector("#detailExtras"),
  awardFilters: document.querySelector("#awardFilters"),
  kitchenPanel: document.querySelector("#kitchenPanel"),
  teamInfoPanel: document.querySelector("#teamInfoPanel"),
  yourKitchenPanel: document.querySelector("#yourKitchenPanel"),
  playoffStats: document.querySelector("#playoffStats"),
};

const trophyTeams = new Set(["WEENIE HUT JRS", "SWEATY SWEEPERS", "GRAVY STAIN BOYS", "RED ROCKETS SC"]);
const silverTrophyTeams = new Set(["BMM", "THREE INCH FURY", "EPSTEIN'S WAITLIST", "COOL"]);
const shootingEligibilityShots = 15;
const awardDefinitions = [
  { award: "Ballon d'Car", season: "S1", stat: "score", avgStat: "avgScore", sortStat: "avgScore", totalLabel: "Total points", avgLabel: "Avg", winners: ["AtownSteelers"], team: "Coming, Melissa!", amount: "25286", perGameAmount: "665.4" },
  { award: "Golden Wheel", season: "S1", stat: "goals", avgStat: "goalsPerGame", totalLabel: "Total goals", avgLabel: "Avg", winners: ["Ax1mov"], team: "Glizzy Gobblers", amount: "109", perGameAmount: "2.79" },
  { award: "Wingman", season: "S1", stat: "assists", avgStat: "assistsPerGame", totalLabel: "Total assists", avgLabel: "Avg", winners: ["gonslinger"], team: "Glizzy Gobblers", amount: "52", perGameAmount: "1.33" },
  { award: "Goalie of the Year", season: "S1", stat: "saves", avgStat: "savesPerGame", totalLabel: "Total saves", avgLabel: "Avg", winners: ["AtownSteelers"], team: "Coming, Melissa!", amount: "62", perGameAmount: "1.63" },
  { award: "Silver Striker", season: "S1", stat: "shots", avgStat: "shootingPct", totalLabel: "Shots", avgLabel: "Shot %", winners: ["TheLakeEffekt"], team: "Two Inches Deep", amount: "140/4.00", perGameAmount: "57.14%", extraStat: "shotsPerGame" },
  { award: "Finals MVP", season: "S1", stat: "score", avgStat: "avgScore", totalLabel: "Winner", avgLabel: "", winners: [], team: "N/A", amount: "N/A", perGameAmount: "" },
  { award: "Ballon d'Car", season: "S2", stat: "score", avgStat: "avgScore", sortStat: "avgScore", totalLabel: "Total points", avgLabel: "Avg", winners: ["Ax1mov"], team: "Epstein's Waitlist", amount: "18401", perGameAmount: "511.1" },
  { award: "Golden Wheel", season: "S2", stat: "goals", avgStat: "goalsPerGame", totalLabel: "Total goals", avgLabel: "Avg", winners: ["Ax1mov"], team: "Epstein's Waitlist", amount: "58", perGameAmount: "1.61" },
  { award: "Wingman", season: "S2", stat: "assists", avgStat: "assistsPerGame", totalLabel: "Total assists", avgLabel: "Avg", winners: ["Alex"], team: "The Gravy Stain Boys", amount: "29", perGameAmount: "0.76" },
  { award: "Goalie of the Year", season: "S2", stat: "saves", avgStat: "savesPerGame", totalLabel: "Total saves", avgLabel: "Avg", winners: ["Val-enor", "Original_6_Hawks"], team: "MegaWatt, Smooth Jizz", amount: "66, 77", perGameAmount: "1.83" },
  { award: "Silver Striker", season: "S2", stat: "shots", avgStat: "shootingPct", totalLabel: "Shots", avgLabel: "Shot %", winners: ["Ax1mov"], team: "Epstein's Waitlist", amount: "149/4.14", perGameAmount: "38.93%", extraStat: "shotsPerGame" },
  { award: "Finals MVP", season: "S2", stat: "score", avgStat: "avgScore", totalLabel: "Winner", avgLabel: "", winners: ["RoyalxRenegade"], team: "The Gravy Stain Boys", amount: "Finals MVP", perGameAmount: "" },
  { award: "Ballon d'Car", season: "S3", stat: "score", avgStat: "avgScore", sortStat: "avgScore", totalLabel: "Total points", avgLabel: "Avg", winners: ["SchwiftyWT"], team: "Syndicate O' Scallywags", amount: "21876", perGameAmount: "560.9" },
  { award: "Golden Wheel", season: "S3", stat: "goals", avgStat: "goalsPerGame", totalLabel: "Total goals", avgLabel: "Avg", winners: ["RoyalxRenegade"], team: "Midwest Cornstars", amount: "64", perGameAmount: "1.73" },
  { award: "Wingman", season: "S3", stat: "assists", avgStat: "assistsPerGame", totalLabel: "Total assists", avgLabel: "Avg", winners: ["Ax1mov"], team: "Red Rockets SC", amount: "32", perGameAmount: "0.84" },
  { award: "Goalie of the Year", season: "S3", stat: "saves", avgStat: "savesPerGame", totalLabel: "Total saves", avgLabel: "Avg", winners: ["Ax1mov"], team: "Red Rockets SC", amount: "68", perGameAmount: "1.79" },
  { award: "Silver Striker", season: "S3", stat: "shots", avgStat: "shootingPct", totalLabel: "Shots", avgLabel: "Shot %", winners: ["RoyalxRenegade"], team: "Midwest Cornstars", amount: "146/3.95", perGameAmount: "43.84%", extraStat: "shotsPerGame" },
  { award: "Finals MVP", season: "S3", stat: "score", avgStat: "avgScore", totalLabel: "Winner", avgLabel: "", winners: ["Authurm19"], team: "Red Rockets SC", amount: "Finals MVP", perGameAmount: "" },
  { award: "Ballon d'Car", season: "S4", stat: "score", avgStat: "avgScore", sortStat: "avgScore", totalLabel: "Total points", avgLabel: "Avg", winners: ["Joshhh_RL"], team: "Sweaty Sweepers", amount: "26847", perGameAmount: "639.2" },
  { award: "Golden Wheel", season: "S4", stat: "goals", avgStat: "goalsPerGame", totalLabel: "Total goals", avgLabel: "Avg", winners: ["Joshhh_RL"], team: "Sweaty Sweepers", amount: "91", perGameAmount: "2.17" },
  { award: "Wingman", season: "S4", stat: "assists", avgStat: "assistsPerGame", totalLabel: "Total assists", avgLabel: "Avg", winners: ["MegatronMD"], team: "Stinky Pinkies", amount: "36", perGameAmount: "0.77" },
  { award: "Goalie of the Year", season: "S4", stat: "saves", avgStat: "savesPerGame", totalLabel: "Total saves", avgLabel: "Avg", winners: ["Kneeks."], team: "Passing's 4 Wimps", amount: "87", perGameAmount: "1.98" },
  { award: "Silver Striker", season: "S4", stat: "shots", avgStat: "shootingPct", totalLabel: "Shots", avgLabel: "Shot %", winners: ["Joshhh_RL"], team: "Sweaty Sweepers", amount: "214/5.10", perGameAmount: "42.52%", extraStat: "shotsPerGame" },
  { award: "Finals MVP", season: "S4", stat: "score", avgStat: "avgScore", totalLabel: "Winner", avgLabel: "", winners: ["Joshhh_RL"], team: "Sweaty Sweepers", amount: "Finals MVP", perGameAmount: "" },
  { award: "Ballon d'Car", season: "S5", stat: "score", avgStat: "avgScore", sortStat: "avgScore", totalLabel: "Total points", avgLabel: "Avg", winners: ["EPo -_-"], team: "Triple Scoop", amount: "14678", perGameAmount: "489.3" },
  { award: "Golden Wheel", season: "S5", stat: "goals", avgStat: "goalsPerGame", totalLabel: "Total goals", avgLabel: "Avg", winners: ["Bubbles3913"], team: "Bird Bath Bombers", amount: "47", perGameAmount: "1.47" },
  { award: "Wingman", season: "S5", stat: "assists", avgStat: "assistsPerGame", totalLabel: "Total assists", avgLabel: "Avg", winners: ["Authurm19"], team: "Bird Bath Bombers", amount: "29", perGameAmount: "0.91" },
  { award: "Goalie of the Year", season: "S5", stat: "saves", avgStat: "savesPerGame", totalLabel: "Total saves", avgLabel: "Avg", winners: ["MegatronMD"], team: "The Hornets", amount: "49", perGameAmount: "1.69" },
  { award: "Silver Striker", season: "S5", stat: "shots", avgStat: "shootingPct", totalLabel: "Shots", avgLabel: "Shot %", winners: ["Bubbles3913"], team: "Bird Bath Bombers", amount: "101/3.16", perGameAmount: "46.53%", extraStat: "shotsPerGame" },
  { award: "Finals MVP", season: "S5", stat: "score", avgStat: "avgScore", totalLabel: "Winner", avgLabel: "", winners: ["Ramen"], team: "Weenie Hut Jrs", amount: "Finals MVP", perGameAmount: "" },
  { award: "World Cup Champions", season: "2026", stat: "score", avgStat: "avgScore", totalLabel: "Champion", avgLabel: "", winners: ["Ax1mov", "selena.", "Bubbles3913", "KWNSquid"], team: "World Cup 2026", amount: "Champion", perGameAmount: "" },
];

const nonRaceAwardNames = new Set(["Finals MVP", "World Cup Champions", "Season Champion"]);

function seasonChampionDefinitions() {
  const seen = new Set();
  return (data.manualHistory?.playoffs || [])
    .filter((row) => isChampionshipRound(row) && row.round !== "Championship Game")
    .flatMap((row) => {
      const winnerKey = playoffWinnerKey(row);
      const championTeam = winnerKey ? row[winnerKey] : "";
      const season = baseSeasonName(row.season).replace(/\s+Playoffs$/i, "");
      if (!championTeam || !/^S\d+$/.test(season)) return [];
      const key = `${season}|${championTeam}`;
      if (seen.has(key)) return [];
      seen.add(key);
      const winners = data.players
        .filter((player) => player.season === season && (player.teams || []).includes(championTeam))
        .map((player) => player.name)
        .sort((a, b) => a.localeCompare(b));
      if (!winners.length) return [];
      return [{
        award: "Season Champion",
        season,
        stat: "score",
        avgStat: "avgScore",
        totalLabel: "Champion",
        avgLabel: "",
        winners,
        team: championTeam,
        amount: "Champion",
        perGameAmount: "",
      }];
    });
}

function allAwardDefinitions() {
  return [...awardDefinitions, ...seasonChampionDefinitions()];
}

function playerAwardRows() {
  return allAwardDefinitions().flatMap((definition) => definition.winners.map((player) => ({
    award: definition.award,
    player,
    team: definition.team,
    season: definition.season,
    amount: definition.amount,
    perGameAmount: definition.perGameAmount,
  }))).filter((award) => data.players.some((row) => row.name === award.player));
}
const teamLeagueStats = [
  ["score", "Total Score"],
  ["avgScore", "Score/G"],
  ["perPerGame", "PER/G"],
  ["goalsPerGame", "Gl/G"],
  ["goalsConcededPerGame", "Allowed/G", "", "asc"],
  ["assistsPerGame", "Assists/G"],
  ["goalDiff", "Goal Diff"],
  ["savesPerGame", "Saves/G"],
  ["teamSaveRate", "Save %", "%"],
  ["shotsPerGame", "Shots/G"],
  ["shotsConcededPerGame", "Allowed Shots/G", "", "asc"],
  ["shootingPct", "Shooting %", "%"],
  ["opponentShootingPct", "Opp Shooting %", "%", "asc"],
];
const lowerIsBetterStats = new Set(["goalsConcededPerGame", "shotsConcededPerGame", "opponentShootingPct"]);

function bestStatValue(values, key) {
  return lowerIsBetterStats.has(key) ? Math.min(...values) : Math.max(...values);
}
const careerTeamLeaderStats = [
  ["score", "Career Score"],
  ["goals", "Career Goals"],
  ["assists", "Career Assists"],
  ["saves", "Career Saves"],
  ["shots", "Career Shots"],
  ["standingsPoints", "League Score"],
  ["wins", "Match Wins"],
  ["goalDiff", "Goal Diff"],
];
const careerPlayerLeaderStats = [
  ["score", "Career Score"],
  ["goals", "Career Goals"],
  ["assists", "Career Assists"],
  ["saves", "Career Saves"],
  ["shots", "Career Shots"],
  ["per", "Career PER"],
  ["games", "Games Played"],
  ["avgScore", "Score/G"],
];
const leaderboardStats = [
  ["score", "Total Score"],
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
  ["goalsPerGame", "Gl/G"],
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
  ["wins", "Match W"],
  ["losses", "Match L"],
  ["matchWinPct", "Match Win %"],
  ["gameWins", "Game W"],
  ["gameLosses", "Game L"],
  ["gameWinPct", "Game Win %"],
  ["score", "Total Score"],
  ["goals", "Goals"],
  ["assists", "Assists"],
  ["saves", "Saves"],
  ["shots", "Shots"],
  ["goalsPerGame", "Gl/G"],
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

const draftColumns = [
  ["draftOrder", "Draft Order"],
  ["team", "Team"],
  ["captain", "Captain"],
  ["captainMmr", "Captain MMR"],
  ["pick1", "Round 1 Pick"],
  ["pick1Mmr", "Pick 1 MMR"],
  ["duoMmr", "Duo MMR"],
  ["draftReorder", "Draft Reorder"],
  ["pick2", "Round 2 Pick"],
  ["pick2Mmr", "Pick 2 MMR"],
  ["teamMmr", "Team MMR"],
  ["teamRank", "Team Rank"],
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

function baseSeasonName(season = state.season) {
  return isPlayoffSeason(season) ? String(season).replace(/\s+Playoffs$/, "") : season;
}

function playoffSeasonName(season) {
  return `${baseSeasonName(season)} Playoffs`;
}

function hasPlayoffSeason(season) {
  return data.seasons.includes(playoffSeasonName(season));
}

function lifetimeSeasonEligible() {
  return ["teams", "players", "lifetimeTeams", "lifetimePlayers"].includes(state.view);
}

function navViewForState() {
  if (state.view === "lifetimeTeams") return "teams";
  if (state.view === "lifetimePlayers") return "players";
  if (state.view === "kitchen" || state.view === "yourKitchen") return "analytics";
  return state.view;
}

function syncTabButtons() {
  const navView = navViewForState();
  els.tabButtons.forEach((button) => button.classList.toggle("active", button.dataset.view === navView));
}

function excludedFromLifetime(rowOrSeason) {
  const season = typeof rowOrSeason === "string" ? rowOrSeason : rowOrSeason?.season;
  if (typeof rowOrSeason === "object" && rowOrSeason?.excludeFromLifetime) return true;
  return state.excludeTwosEra && season === "S1";
}

function visibleSeasons() {
  return data.seasons.filter((season) => !isPlayoffSeason(season) && (state.includeScrims || !isScrimSeason(season)));
}

function seasonIncluded(row) {
  if (isScrimSeason(row.season)) return state.includeScrims || state.season === row.season;
  if (isPlayoffSeason(row.season)) return state.season === row.season && !isLifetimeView();
  return true;
}

const averageGameStatKeys = new Set([
  "avgScore", "avgSpeed", "avgBoost", "pointsPerGame", "perPerGame",
  "average",
  "goalsPerGame", "assistsPerGame", "savesPerGame", "shotsPerGame",
  "shotsConcededPerGame", "goalsConcededPerGame", "opponentSavesForcedPerGame",
  "boostCollectedPerGame", "boostStolenPerGame", "demosPerGame",
  "pressureRate", "pressureIndex",
]);

function fmt(value, suffix = "", options = {}) {
  if (typeof value === "number") {
    const fixed = options.fixed;
    const formatOptions = fixed === undefined
      ? (Number.isInteger(value) ? {} : { maximumFractionDigits: 2 })
      : { minimumFractionDigits: fixed, maximumFractionDigits: fixed };
    return `${value.toLocaleString(undefined, formatOptions)}${suffix}`;
  }
  return value ?? "";
}

function fmtStat(value, key, suffix = "") {
  return fmt(value, suffix, averageGameStatKeys.has(key) ? { fixed: 2 } : {});
}

function fmtGameAvg(value, suffix = "") {
  return fmt(value, suffix, { fixed: 2 });
}

function displayName(value, key = "") {
  const badgeKey = String(value || "").toUpperCase();
  if ((key === "name" || key === "team" || key === "opponent") && trophyTeams.has(badgeKey)) return `${value} \u{1F3C6}`;
  if ((key === "name" || key === "team" || key === "opponent") && silverTrophyTeams.has(badgeKey)) return `${value} \u{1F948}`;
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

function isChampionshipRound(row) {
  return /^championship$/i.test(String(row.round || "").trim());
}

function playoffTeamMarkup(row, key) {
  const winnerKey = playoffWinnerKey(row);
  const isWinner = winnerKey === key;
  const isRunnerUp = isChampionshipRound(row) && winnerKey && winnerKey !== key;
  const className = isWinner ? "playoff-winner" : (isRunnerUp ? "playoff-runner-up" : "");
  const badge = isChampionshipRound(row)
    ? (isWinner ? `<span class="postseason-badge" aria-label="Champion" title="Champion">🏆</span>` : (isRunnerUp ? `<span class="postseason-badge" aria-label="Runner-up" title="Runner-up">🥈</span>` : ""))
    : "";
  const label = escapeHtml(row[key]);
  return className ? `<strong class="${className}">${label}${badge}</strong>` : label;
}

function scheduleTeamMarkup(row, key) {
  const isWinner = row.winner === row[key];
  const isRunnerUp = isChampionshipRound(row) && row.winner && !isWinner;
  const className = isWinner ? "winner" : (isRunnerUp ? "runner-up" : "");
  const badge = isChampionshipRound(row)
    ? (isWinner ? `<span class="postseason-badge" aria-label="Champion" title="Champion">🏆</span>` : (isRunnerUp ? `<span class="postseason-badge" aria-label="Runner-up" title="Runner-up">🥈</span>` : ""))
    : "";
  return `<strong${className ? ` class="${className}"` : ""}>${escapeHtml(row[key])}${badge}</strong>`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const unavailableWhenManualZero = new Set([
  "avgSpeed", "avgBoost", "boostCollectedPerGame", "boostStolenPerGame", "opponentSavesForcedPerGame",
  "demosPerGame", "pressureRate", "pressureIndex",
]);
const availabilitySensitiveStats = new Set([
  ...unavailableWhenManualZero,
  "teamSaveRate", "opponentShootingPct", "shotsConcededPerGame", "goalsConcededPerGame", "goalDiff",
]);

function isUnavailableValue(row, key) {
  if (row.__unavailableStats?.has(key)) return true;
  if (!(row.source === "manual" || row.source === "mixed")) return false;
  if (key === "pressureRate" || key === "pressureIndex") return Number(row.amountStolen || 0) === 0 && Number(row.demosInflicted || 0) === 0 && Number(row.opponentSavesForced || 0) === 0;
  if (unavailableWhenManualZero.has(key)) return Number(row[key] || 0) === 0;
  if (["teamSaveRate", "opponentShootingPct", "shotsConcededPerGame"].includes(key)) return Number(row.shotsConceded || 0) === 0;
  if (key === "goalsConcededPerGame") return Number(row.goalsConceded || 0) === 0;
  if (key === "goalDiff") return !!row.goalDiffUnavailable;
  return false;
}

function finalizeCommon(item) {
  const games = Math.max(1, item.games);
  const matchTotal = Math.max(1, (item.wins || 0) + (item.losses || 0));
  const gameWins = typeof item.gameWins === "number" ? item.gameWins : item.wins;
  const gameLosses = typeof item.gameLosses === "number" ? item.gameLosses : item.losses;
  const gameTotal = Math.max(1, (gameWins || 0) + (gameLosses || 0));
  item.matchWinPct = Math.round(((item.wins || 0) / matchTotal) * 1000) / 10;
  item.gameWinPct = Math.round(((gameWins || 0) / gameTotal) * 1000) / 10;
  item.winPct = item.matchWinPct;
  item.avgScore = Math.round((item.score / games) * 100) / 100;
  item.goalsPerGame = Math.round((item.goals / games) * 100) / 100;
  item.assistsPerGame = Math.round((item.assists / games) * 100) / 100;
  item.savesPerGame = Math.round((item.saves / games) * 100) / 100;
  item.shotsPerGame = Math.round((item.shots / games) * 100) / 100;
  item.shotsConcededPerGame = Math.round((item.shotsConceded / games) * 100) / 100;
  item.goalsConcededPerGame = Math.round((item.goalsConceded / games) * 100) / 100;
  const rawPer = (0.1 * item.goals) + (0.05 * item.assists) + ((2 / 30) * item.saves) + (0.01 * item.shots);
  const calculatedPer = item.season === "S1" ? ((rawPer * (2 / 3)) - (item.games * 0.1)) : (rawPer - (item.games * 0.1));
  item.per = Math.round(calculatedPer * 100) / 100;
  item.perPerGame = Math.round((item.per / games) * 100) / 100;
  item.shootingPct = item.shots > 0 ? Math.round((item.goals / item.shots) * 1000) / 10 : 0;
  item.teamSaveRate = item.shotsConceded > 0 ? Math.round((item.saves / item.shotsConceded) * 1000) / 10 : 0;
  item.opponentShootingPct = item.shotsConceded > 0 ? Math.round((item.goalsConceded / item.shotsConceded) * 1000) / 10 : 0;
  item.pointsPerGame = Math.round(((item.standingsPoints || 0) / games) * 100) / 100;
  item.goalDiff = item.goals - item.goalsConceded;
  item.demosPerGame = Math.round((item.demosInflicted / games) * 100) / 100;
  item.distancePerGame = Math.round(item.totalDistance / games);
  item.boostCollectedPerGame = Math.round((item.amountCollected / games) * 100) / 100;
  item.boostStolenPerGame = Math.round((item.amountStolen / games) * 100) / 100;
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
    "standingsPoints", "gameWins", "gameLosses", "per",
    "shotsConceded", "goalsConceded", "lastDefenderGoalsConceded", "opponentSavesForced",
    "demosInflicted", "demosTaken", "avgSpeedTotal", "avgBoostTotal", "amountCollected",
    "amountStolen", "totalDistance",
  ];

  rows.forEach((row) => {
    if (!seasonIncluded(row)) return;
    if (excludedFromLifetime(row)) return;
    if (!byName.has(row.name)) {
      byName.set(row.name, {
        season: "Lifetime",
        name: row.name,
        teams: new Set(),
        firstDate: "",
        lastDate: "",
        __availableStats: new Set(),
      });
    }
    const item = byName.get(row.name);
    numericFields.forEach((field) => {
      item[field] = (item[field] || 0) + (row[field] || 0);
    });
    availabilitySensitiveStats.forEach((key) => {
      if (!isUnavailableValue(row, key)) item.__availableStats.add(key);
    });
    if (row.firstDate && (!item.firstDate || row.firstDate < item.firstDate)) item.firstDate = row.firstDate;
    if (row.lastDate && (!item.lastDate || row.lastDate > item.lastDate)) item.lastDate = row.lastDate;
    (row.teams || []).forEach((team) => item.teams.add(team));
  });

  return [...byName.values()].map((item) => {
    const carriedPer = item.per;
    finalizeCommon(item);
    if (typeof carriedPer === "number") {
      item.per = Math.round(carriedPer * 100) / 100;
      item.perPerGame = Math.round((item.per / Math.max(1, item.games)) * 100) / 100;
    }
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
    item.__unavailableStats = new Set([...availabilitySensitiveStats].filter((key) => !item.__availableStats.has(key)));
    delete item.__availableStats;
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
  if (game.result === "win") {
    item.wins += 1;
    item.gameWins += 1;
  } else {
    item.losses += 1;
    item.gameLosses += 1;
  }
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
    gameWins: 0,
    gameLosses: 0,
    standingsPoints: 0,
    score: 0,
    goals: 0,
    assists: 0,
    saves: 0,
    shots: 0,
    per: 0,
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

function manualPlayerRows() {
  return data.players.filter((row) => row.source === "manual" || row.source === "mixed");
}

function hasManualPlayerSeason(player, season) {
  return manualPlayerRows().some((row) => row.name === player && row.season === season);
}

function hasManualPlayerTeamSeason(player, team, season) {
  return manualPlayerRows().some((row) => row.name === player && row.season === season && (row.teams || []).includes(team));
}

function teamRoster(team, season) {
  const byPlayer = new Map();
  data.players
    .filter((row) => (row.source === "manual" || row.source === "mixed") && (season === "Lifetime" || row.season === season) && (row.teams || []).includes(team))
    .filter((row) => season !== "Lifetime" || !excludedFromLifetime(row))
    .forEach((row) => byPlayer.set(row.name, { ...row, teams: new Set(row.teams || [team]) }));
  playerGames()
    .filter((game) => game.team === team && (season === "Lifetime" || game.season === season))
    .filter((game) => season !== "Lifetime" || !excludedFromLifetime(game))
    .filter((game) => !hasManualPlayerTeamSeason(game.player, team, game.season))
    .forEach((game) => {
      if (!byPlayer.has(game.player)) byPlayer.set(game.player, emptyPlayerAggregate(game.player, season));
      addGameToPlayerAggregate(byPlayer.get(game.player), game);
    });
  return [...byPlayer.values()].map(finalizePlayerAggregate).sort((a, b) => b.games - a.games || b.goals - a.goals);
}

function playerCareer(player) {
  const bySeason = new Map();
  data.players
    .filter((row) => (row.source === "manual" || row.source === "mixed") && row.name === player)
    .filter((row) => !excludedFromLifetime(row))
    .forEach((row) => bySeason.set(row.season, { ...row, teams: new Set(row.teams || []) }));
  playerGames()
    .filter((game) => game.player === player)
    .filter((game) => !excludedFromLifetime(game))
    .filter((game) => !hasManualPlayerSeason(player, game.season))
    .forEach((game) => {
      if (!bySeason.has(game.season)) bySeason.set(game.season, emptyPlayerAggregate(player, game.season));
      addGameToPlayerAggregate(bySeason.get(game.season), game);
    });
  return [...bySeason.values()].map(finalizePlayerAggregate).sort((a, b) => a.season.localeCompare(b.season));
}

function playerLifetimeRow(player) {
  const item = emptyPlayerAggregate(player, "Career");
  data.players
    .filter((row) => (row.source === "manual" || row.source === "mixed") && row.name === player)
    .filter((row) => !excludedFromLifetime(row))
    .forEach((row) => {
      Object.keys(row).forEach((key) => {
        if (typeof row[key] === "number" && typeof item[key] === "number") item[key] += row[key];
      });
      (row.teams || []).forEach((team) => item.teams.add(team));
    });
  playerGames()
    .filter((game) => game.player === player)
    .filter((game) => !excludedFromLifetime(game))
    .filter((game) => !hasManualPlayerSeason(player, game.season))
    .forEach((game) => addGameToPlayerAggregate(item, game));
  const carriedPer = item.per;
  const finalized = finalizePlayerAggregate(item);
  finalized.per = Math.round(carriedPer * 100) / 100;
  finalized.perPerGame = Math.round((finalized.per / Math.max(1, finalized.games)) * 100) / 100;
  return finalized;
}

function seasonPlayerRows(season) {
  const byPlayer = new Map();
  data.players
    .filter((row) => (row.source === "manual" || row.source === "mixed") && row.season === season)
    .forEach((row) => byPlayer.set(row.name, { ...row, teams: new Set(row.teams || []) }));
  playerGames()
    .filter((game) => game.season === season)
    .filter((game) => !hasManualPlayerSeason(game.player, season))
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
  const allPlayerSeasons = data.players.filter((row) => !isScrimSeason(row.season) && !isPlayoffSeason(row.season) && row.season !== "World Cup");

  const maxByStat = {};
  const recordByStat = {};
  playerCareerHighStats.forEach((stat) => {
    maxByStat[stat] = Math.max(...seasons.map((row) => Number(row[stat]) || 0));
    recordByStat[stat] = Math.max(...allPlayerSeasons.filter((row) => typeof row[stat] === "number" && !isUnavailableValue(row, stat)).map((row) => row[stat]), 0);
  });

  seasons.forEach((row) => {
    row.__careerHighs = new Set();
    row.__leagueLeaders = new Set();
    row.__gtrlsRecords = new Set();
    playerCareerHighStats.forEach((stat) => {
      if ((Number(row[stat]) || 0) === maxByStat[stat] && maxByStat[stat] > 0) row.__careerHighs.add(stat);
      const leaders = seasonLeaders(row.season, stat);
      if (leaders[0] && leaders[0].name === player && (Number(row[stat]) || 0) === leaders[0][stat]) row.__leagueLeaders.add(stat);
      if (recordByStat[stat] > 0 && row[stat] === recordByStat[stat]) row.__gtrlsRecords.add(stat);
    });
  });

  return [career, ...seasons];
}

function leaderboardAppearances(player) {
  const seasons = playerCareer(player)
    .map((row) => row.season)
    .filter((season) => !isScrimSeason(season) && !isPlayoffSeason(season))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
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
  const summaries = data.summary.filter((row) => (state.includeScrims || !isScrimSeason(row.season)) && !isPlayoffSeason(row.season) && (!isLifetimeView() || !excludedFromLifetime(row)));
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
    .filter((row) => row.season === season && row.round !== "Championship Game")
    .map((row) => row.result ? { ...row } : { ...row, round: "", teamA: "", result: row.teamA, teamB: "" });
}

function playoffSeriesGames(season) {
  return (data.manualHistory?.playoffs || []).filter((row) => row.season === season && row.round === "Championship Game");
}

function playoffSeriesAction(row) {
  return isChampionshipRound(row) && playoffSeriesGames(row.season).length
    ? { type: "playoffSeries", season: row.season }
    : null;
}

function rowsForView() {
  return decorateDashboardRows(sortRows(rowsForDataset(state.view)));
}

function decorateDashboardRows(rows) {
  if (state.season === "All" || isLifetimeView()) return rows;
  const columns = columnsForView().map(([key]) => key).filter((key) => key !== "name" && key !== "season" && key !== "teamsText");
  const typeRows = (isTeamView() ? data.teams : data.players).filter((row) => !isScrimSeason(row.season) && !isPlayoffSeason(row.season) && row.season !== "World Cup");
  const leaders = new Map();
  const records = new Map();
  [...new Set(typeRows.map((row) => row.season))].forEach((season) => {
    columns.forEach((key) => {
      const seasonValues = typeRows.filter((row) => row.season === season && typeof row[key] === "number" && !isUnavailableValue(row, key)).map((row) => row[key]);
      if (seasonValues.length) leaders.set(`${season}|${key}`, bestStatValue(seasonValues, key));
    });
  });
  columns.forEach((key) => {
    const values = typeRows.filter((row) => typeof row[key] === "number" && !isUnavailableValue(row, key)).map((row) => row[key]);
    if (values.length) records.set(key, bestStatValue(values, key));
  });
  return rows.map((row) => {
    const copy = { ...row, __careerHighs: new Set(), __leagueLeaders: new Set(), __gtrlsRecords: new Set() };
    const entitySeasons = typeRows.filter((candidate) => candidate.name === row.name);
    const hasCareerComparison = new Set(entitySeasons.map((candidate) => candidate.season)).size > 1;
    columns.forEach((key) => {
      if (row[key] === leaders.get(`${row.season}|${key}`)) copy.__leagueLeaders.add(key);
      if (records.get(key) > 0 && row[key] === records.get(key)) copy.__gtrlsRecords.add(key);
      const careerValues = entitySeasons.filter((candidate) => typeof candidate[key] === "number" && !isUnavailableValue(candidate, key)).map((candidate) => candidate[key]);
      const careerHigh = careerValues.length ? Math.max(...careerValues) : 0;
      if (hasCareerComparison && careerHigh > 0 && row[key] === careerHigh) copy.__careerHighs.add(key);
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
  if (!definition || definition.season === "2026" || definition.award === "Finals MVP") {
    return (definition?.winners || []).map((name, index) => ({ rank: index + 1, name, teamsText: definition.team, games: "", total: definition.amount, average: definition.perGameAmount, extra: "" }));
  }
  const contenders = data.players
    .filter((row) => row.season === definition.season)
    .filter((row) => definition.award !== "Silver Striker" || silverStrikerEligible(row))
    .sort((a, b) => b[definition.avgStat] - a[definition.avgStat] || b[definition.stat] - a[definition.stat]);
  const shootingRanks = new Map([...contenders].sort((a, b) => b.shootingPct - a.shootingPct).map((row, index) => [row.name, index + 1]));
  return contenders.map((row, index) => ({
      rank: index + 1,
      name: row.name,
      teamsText: row.teams?.join(", ") || "",
      games: row.games,
      total: row[definition.stat],
      average: row[definition.avgStat],
      extra: definition.extraStat ? `${definition.extraStat === "shotsPerGame" ? "Sh/G" : "Extra"}: ${fmtStat(row[definition.extraStat], definition.extraStat, definition.extraStat === "shootingPct" ? "%" : "")}${definition.extraStat === "shootingPct" ? ` (${shootingRanks.get(row.name)}${rankSuffix(shootingRanks.get(row.name))})` : ""}` : "",
    }));
}

function leaderFor(rows, key, direction = "desc") {
  return [...rows]
    .filter((row) => typeof row[key] === "number" && !isUnavailableValue(row, key))
    .sort((a, b) => direction === "asc" ? a[key] - b[key] : b[key] - a[key])[0];
}

function median(values) {
  const sorted = values.filter((value) => Number.isFinite(value)).sort((a, b) => a - b);
  if (!sorted.length) return 0;
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function regularRowsSinceTwosEra(type) {
  const rows = type === "team" ? data.teams : data.players;
  return rows.filter((row) => row.season !== "S1" && !isScrimSeason(row.season) && !isPlayoffSeason(row.season));
}

function kitchenActivePlayers(season) {
  const currentRows = rowsForDataset("players", season)
    .filter((row) => row.season === season)
    .sort((a, b) => b.perPerGame - a.perPerGame);
  const careerRows = new Map(aggregateLifetimeRows(regularRowsSinceTwosEra("player"), "player").map((row) => [row.name, row]));
  const ratings = currentRows.map((row) => Number(row.rating)).filter((value) => Number.isFinite(value) && value > 0);
  const dataMedian = median(ratings);
  const upperLimit = 0.25;
  const lowerLimit = -0.05;
  const steepness = 0.005;
  return currentRows.map((row, index) => {
    const rating = Number(row.rating);
    const hasRating = Number.isFinite(rating) && rating > 0;
    const expected = hasRating
      ? lowerLimit + ((upperLimit - lowerLimit) / (1 + Math.exp(-steepness * (rating - dataMedian))))
      : null;
    const roundedExpected = expected === null ? null : Math.round(expected * 100) / 100;
    const diff = roundedExpected === null ? null : row.perPerGame - roundedExpected;
    return {
      ...row,
      rating: hasRating ? rating : null,
      rank: index + 1,
      career: careerRows.get(row.name),
      expectedPerPerGame: roundedExpected,
      perDelta: diff === null ? null : Math.round(diff * 100) / 100,
      carryPotential: expected ? Math.round((row.perPerGame / expected) * 100) / 100 : null,
    };
  });
}

function kitchenRegression(points, yKey = "perPerGame") {
  const valid = points.map((row) => ({ ...row, rating: Number(row.rating), yValue: Number(row[yKey]) }))
    .filter((row) => Number.isFinite(row.rating) && Number.isFinite(row.yValue));
  if (valid.length < 2) return { slope: 0, intercept: valid[0]?.yValue || 0 };
  const meanX = valid.reduce((total, row) => total + row.rating, 0) / valid.length;
  const meanY = valid.reduce((total, row) => total + row.yValue, 0) / valid.length;
  const numerator = valid.reduce((total, row) => total + ((row.rating - meanX) * (row.yValue - meanY)), 0);
  const denominator = valid.reduce((total, row) => total + ((row.rating - meanX) ** 2), 0);
  const slope = denominator ? numerator / denominator : 0;
  return { slope, intercept: meanY - (slope * meanX) };
}

function sortedKitchenPlayers(players) {
  return [...players].sort((a, b) => {
    const result = compareValues(a[state.kitchenSortKey], b[state.kitchenSortKey]);
    return state.kitchenSortDir === "asc" ? result : -result;
  });
}

function kitchenSortHeader(key, label) {
  const active = state.kitchenSortKey === key;
  const marker = active ? (state.kitchenSortDir === "asc" ? " ^" : " v") : "";
  return `<th${active ? ` class="sorted-column"` : ""}><button type="button" data-kitchen-sort="${key}">${label}${marker}</button></th>`;
}

function renderKitchenScatter(players, { id, title, yKey, yLabel, yMin, yMax, yFormat = "", yDecimals = null, baselineY = null, xMin = 700, xMax = 1500 }) {
  const graphXMin = xMin;
  const graphXMax = xMax;
  const chart = { left: 58, top: 22, width: 820, height: 360 };
  const scaleX = (value) => chart.left + (((value - graphXMin) / Math.max(1, graphXMax - graphXMin)) * chart.width);
  const scaleY = (value) => chart.top + chart.height - (((value - yMin) / Math.max(0.01, yMax - yMin)) * chart.height);
  const regression = kitchenRegression(players, yKey);
  const lineY1 = baselineY === null ? (regression.slope * graphXMin + regression.intercept) : baselineY;
  const lineY2 = baselineY === null ? (regression.slope * graphXMax + regression.intercept) : baselineY;
  const xTicks = [graphXMin, graphXMin + ((graphXMax - graphXMin) / 2), graphXMax];
  const yTicks = [yMin, yMin + ((yMax - yMin) / 2), yMax];
  const yDisplay = (value) => yDecimals === null ? fmt(value, yFormat) : Number(value).toFixed(yDecimals);
  const playerGraphRows = players.map((row) => {
    const yValue = Number(row[yKey]);
    const x = scaleX(row.rating);
    const y = scaleY(yValue);
    const tooltipX = Math.min(x + 12, chart.left + chart.width - 210);
    const tooltipY = Math.max(chart.top + 8, y - 58);
    return `
      <g class="kitchen-dot" tabindex="0" data-kitchen-player="${escapeHtml(row.name)}" data-team="${escapeHtml(row.teamsText || "")}" data-rating="${fmt(row.rating)}${row.ratingEstimated ? "*" : ""}" data-rating-source="${escapeHtml(row.ratingSource || "")}" data-per="${fmtGameAvg(row.perPerGame)}" data-xper="${fmtGameAvg(row.expectedPerPerGame)}" data-delta="${row.perDelta >= 0 ? "+" : ""}${fmtGameAvg(row.perDelta)}" style="--team-color:${escapeHtml(teamColor(row.teams?.[0] || row.teamsText || row.name))}">
        <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6"></circle>
        <g class="kitchen-svg-tooltip" transform="translate(${tooltipX.toFixed(1)} ${tooltipY.toFixed(1)})">
          <rect width="198" height="52" rx="7"></rect>
          <text x="10" y="18">${escapeHtml(displayName(row.name, "name"))}</text>
          <text x="10" y="35">Rating ${fmt(row.rating)}${row.ratingEstimated ? "*" : ""} | ${escapeHtml(yLabel)} ${yDisplay(yValue)}</text>
          <text x="10" y="48">PER/G ${fmtGameAvg(row.perPerGame)} | PER/G- ${row.perDelta >= 0 ? "+" : ""}${fmtGameAvg(row.perDelta)}</text>
        </g>
        <title>${escapeHtml(displayName(row.name, "name"))} | Rating ${fmt(row.rating)}${row.ratingEstimated ? ` estimated: ${escapeHtml(row.ratingSource || "future rating")}` : ""} | ${escapeHtml(yLabel)} ${yDisplay(yValue)}</title>
      </g>
    `;
  }).join("");
  return `
    <div class="kitchen-scatter" aria-label="${escapeHtml(title)}">
      <div class="kitchen-card-head kitchen-graph-head">
        <h4>${escapeHtml(title)}</h4>
        <div class="kitchen-graph-key">
          <span><i class="actual"></i>Players</span>
          <span><i class="expected"></i>${baselineY === null ? "Best fit" : "Zero baseline"}</span>
        </div>
      </div>
      <svg viewBox="0 0 920 430" role="img" aria-label="${escapeHtml(title)} scatter plot">
        <line class="axis" x1="${chart.left}" y1="${chart.top}" x2="${chart.left}" y2="${chart.top + chart.height}"></line>
        <line class="axis" x1="${chart.left}" y1="${chart.top + chart.height}" x2="${chart.left + chart.width}" y2="${chart.top + chart.height}"></line>
        ${xTicks.map((tick) => `<g class="tick"><line x1="${scaleX(tick).toFixed(1)}" y1="${chart.top}" x2="${scaleX(tick).toFixed(1)}" y2="${chart.top + chart.height}"></line><text x="${scaleX(tick).toFixed(1)}" y="${chart.top + chart.height + 28}">${fmt(Math.round(tick))}</text></g>`).join("")}
        ${yTicks.map((tick) => `<g class="tick"><line x1="${chart.left}" y1="${scaleY(tick).toFixed(1)}" x2="${chart.left + chart.width}" y2="${scaleY(tick).toFixed(1)}"></line><text x="${chart.left - 12}" y="${scaleY(tick).toFixed(1)}">${yDisplay(tick)}</text></g>`).join("")}
        <line class="fit-line" x1="${scaleX(graphXMin).toFixed(1)}" y1="${scaleY(lineY1).toFixed(1)}" x2="${scaleX(graphXMax).toFixed(1)}" y2="${scaleY(lineY2).toFixed(1)}"></line>
        ${playerGraphRows}
        <text class="axis-label x-label" x="${chart.left + (chart.width / 2)}" y="424">Rating</text>
        <text class="axis-label y-label" transform="translate(16 ${chart.top + (chart.height / 2)}) rotate(-90)">${escapeHtml(yLabel)}</text>
      </svg>
      ${id === "per" ? `<div id="kitchenPlayerInfo" class="kitchen-player-info"><span>Select a player from the table or hover a dot.</span></div>` : ""}
    </div>
  `;
}

function teamConsensusLabel(team, avgPerPerGame) {
  const winRate = typeof team.matchWinPct === "number" ? team.matchWinPct : (typeof team.winPct === "number" ? team.winPct : 0);
  const perfDiff = (team.perPerGame || 0) - avgPerPerGame;
  const performance = perfDiff > 0.03 ? "playing above expectations" : (perfDiff < -0.03 ? "playing below expectations" : "playing to expectations");
  const result = winRate > 52 ? "winning" : (winRate < 48 ? "losing" : "splitting");
  let consensus = "fair";
  if (performance.includes("above") && result === "winning") consensus = "strong";
  else if (performance.includes("below") && result === "losing") consensus = "weak";
  else if (performance.includes("below") && result === "winning") consensus = "lucky";
  else if (performance.includes("above") && result === "losing") consensus = "unlucky";
  else if (result === "winning") consensus = perfDiff >= 0 ? "strong" : "lucky";
  else if (result === "losing") consensus = perfDiff <= 0 ? "weak" : "unlucky";
  return { performance, result, consensus, perfDiff };
}

function kitchenTeams(season) {
  const rows = rowsForDataset("teams", season)
    .filter((row) => row.season === season);
  const avgPerPerGame = rows.reduce((total, row) => total + (row.perPerGame || 0), 0) / Math.max(1, rows.length);
  return rows
    .map((row) => ({ ...row, ...teamConsensusLabel(row, avgPerPerGame) }))
    .sort((a, b) => b.standingsPoints - a.standingsPoints || b.matchWinPct - a.matchWinPct);
}

function kitchenClass(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function renderKitchen() {
  const season = /^S\d+(?: Playoffs)?$/.test(state.season) ? state.season : latestRegularSeason();
  const players = kitchenActivePlayers(season);
  const teams = kitchenTeams(season);
  const topEfficiency = players[0];
  const biggestOver = [...players].filter((row) => typeof row.perDelta === "number").sort((a, b) => b.perDelta - a.perDelta)[0];
  const topTeam = teams[0];
  const ratedPlayers = players.map((row) => ({ ...row, rating: Number(row.rating), perPerGame: Number(row.perPerGame) }))
    .filter((row) => Number.isFinite(row.rating) && row.rating > 0 && Number.isFinite(row.perPerGame));
  const regression = kitchenRegression(ratedPlayers);
  const sortedPlayers = sortedKitchenPlayers(players);
  const observedRatings = ratedPlayers.map((row) => row.rating);
  const observedMin = observedRatings.length ? Math.min(...observedRatings) : 700;
  const observedMax = observedRatings.length ? Math.max(...observedRatings) : 1500;
  const observedPadding = Math.max(50, (observedMax - observedMin) * 0.06);
  const fittedRatingWindow = {
    xMin: Math.floor((observedMin - observedPadding) / 50) * 50,
    xMax: Math.ceil((observedMax + observedPadding) / 50) * 50,
  };
  const ratingWindow = season === "S5"
    ? { xMin: 250, xMax: 1000 }
    : (["S3", "S4"].includes(season) ? fittedRatingWindow : { xMin: 700, xMax: 1500 });
  const graphHtml = ratedPlayers.length ? `
    ${renderKitchenScatter(ratedPlayers, { id: "per", title: `${season} PER/G vs Rating`, yKey: "perPerGame", yLabel: "PER/G", yMin: -0.1, yMax: 0.4, yDecimals: 2, ...ratingWindow })}
    ${renderKitchenScatter(ratedPlayers, { id: "delta", title: `${season} PER/G- vs Rating`, yKey: "perDelta", yLabel: "PER/G-", yMin: -0.1, yMax: 0.15, yDecimals: 3, baselineY: 0, ...ratingWindow })}
  ` : `<div class="kitchen-rating-empty"><strong>Rating graphs unavailable for ${escapeHtml(season)}</strong><span>No manual or estimated player ratings are available.</span></div>`;
  const estimateFootnote = ["S1", "S2"].includes(season) ? `<div class="kitchen-estimate-footnote"><strong>* Estimated ratings</strong><span>${escapeHtml(season)} ratings are backfilled from each player's nearest future manual rating; a future-season median is used when no player-specific value exists.</span></div>` : "";
  const statValue = (value, formatter = fmt) => value === null || value === undefined ? "n/a" : formatter(value);
  const ratingValue = (row) => row.rating === null ? "n/a" : `${fmt(row.rating)}${row.ratingEstimated ? "*" : ""}`;
  const playerRows = sortedPlayers.map((row) => `
    <tr data-kitchen-player="${escapeHtml(row.name)}" data-team="${escapeHtml(row.teamsText || "")}" data-rating="${escapeHtml(ratingValue(row))}" data-rating-source="${escapeHtml(row.ratingSource || "")}" data-per="${fmtGameAvg(row.perPerGame)}" data-xper="${escapeHtml(statValue(row.expectedPerPerGame, fmtGameAvg))}" data-delta="${row.perDelta === null ? "n/a" : `${row.perDelta >= 0 ? "+" : ""}${fmtGameAvg(row.perDelta)}`}" >
      <td><button type="button" class="kitchen-player-button" data-kitchen-player="${escapeHtml(row.name)}">${escapeHtml(displayName(row.name, "name"))}</button></td>
      <td>${escapeHtml(row.teamsText || "")}</td>
      <td>${row.ratingEstimated ? `<span class="estimated-rating" title="${escapeHtml(row.ratingSource || "Estimated rating")}">${escapeHtml(ratingValue(row))}</span>` : escapeHtml(ratingValue(row))}</td>
      <td>${fmtGameAvg(row.perPerGame)}</td>
      <td>${escapeHtml(statValue(row.expectedPerPerGame, fmtGameAvg))}</td>
      <td${row.perDelta === null ? "" : ` class="${row.perDelta >= 0 ? "positive" : "negative"}"`}>${row.perDelta === null ? "n/a" : `${row.perDelta >= 0 ? "+" : ""}${fmtGameAvg(row.perDelta)}`}</td>
    </tr>
  `).join("");
  const teamRows = teams.map((row) => `
    <article class="kitchen-team-card ${escapeHtml(kitchenClass(row.consensus))}" style="--team-color:${escapeHtml(teamColor(row.name))}">
      <div>
        <strong>${escapeHtml(displayName(row.name, "team"))}</strong>
        <span>${escapeHtml(row.performance)} and ${escapeHtml(row.result)}</span>
      </div>
      <em>${escapeHtml(row.consensus)}</em>
      <dl>
        <div><dt>Score</dt><dd>${fmt(row.standingsPoints)}</dd></div>
        <div><dt>Match Win</dt><dd>${fmt(row.matchWinPct, "%")}</dd></div>
        <div><dt>PER/G</dt><dd>${fmtGameAvg(row.perPerGame)}</dd></div>
      </dl>
    </article>
  `).join("");
  els.kitchenPanel.innerHTML = `
    <div class="kitchen-hero">
      <div>
        <p class="eyebrow">Analytics lab</p>
        <h2>Selena's Kitchen</h2>
        <p>A clean spin on Sus Kitchen: current ${season} efficiency, an interactive PER/G by rating chart, and team vibe checks.</p>
      </div>
    </div>
    <div class="kitchen-stat-grid">
      <article><span>Top PER/G</span><strong>${escapeHtml(displayName(topEfficiency?.name || "-", "name"))}</strong><small>${fmtGameAvg(topEfficiency?.perPerGame)}</small></article>
      <article><span>Most Over Expected</span><strong>${escapeHtml(displayName(biggestOver?.name || "-", "name"))}</strong><small>${biggestOver ? `${biggestOver.perDelta >= 0 ? "+" : ""}${fmtGameAvg(biggestOver.perDelta)}` : "n/a"}</small></article>
      <article><span>Best Fit</span><strong>${ratedPlayers.length ? `${regression.slope >= 0 ? "+" : ""}${fmt(regression.slope * 100)}` : "n/a"}</strong><small>PER/G per 100 rating</small></article>
      <article><span>Top Team</span><strong>${escapeHtml(displayName(topTeam?.name || "-", "team"))}</strong><small>${fmt(topTeam?.standingsPoints)} league score</small></article>
    </div>
    <div class="kitchen-layout">
      <section class="kitchen-card wide">
        <div class="kitchen-card-head">
          <h3>${season} Player Breakdown</h3>
          <span>${players.length} players | rating vs expected efficiency</span>
        </div>
        ${estimateFootnote}
        ${graphHtml}
        <div class="kitchen-table-wrap">
          <table class="kitchen-table">
            <thead><tr>
              ${kitchenSortHeader("name", "Player")}
              ${kitchenSortHeader("teamsText", "Team")}
              ${kitchenSortHeader("rating", "Rating")}
              ${kitchenSortHeader("perPerGame", "PER/G")}
              ${kitchenSortHeader("expectedPerPerGame", "xPER/G")}
              ${kitchenSortHeader("perDelta", "PER/G-")}
            </tr></thead>
            <tbody>${playerRows}</tbody>
          </table>
        </div>
      </section>
      <section class="kitchen-card">
        <div class="kitchen-card-head">
          <h3>Rough Consensus</h3>
          <span>results plus efficiency</span>
        </div>
        <div class="kitchen-team-grid">${teamRows}</div>
      </section>
      <section class="kitchen-card kitchen-notes">
        <h3>Notes</h3>
        <p>PER is counting-stat production. The scatter plot compares each ${season} player's rating to PER/G, with the grey line showing the linear best fit.</p>
        <p>xPER/G still uses the active ${season} ratings curve, so the plus-minus column highlights who is cooking above or below that baseline.</p>
        <p><strong>* Estimated rating:</strong> S1-S2 use the player's nearest future manual rating. Players without a future value use the nearest future season's median.</p>
      </section>
    </div>
  `;
  els.kitchenPanel.classList.remove("hidden");
  updateKitchenSelection(state.kitchenSelectedPlayer);
}

function kitchenInfoHtml(dataset) {
  if (!dataset?.kitchenPlayer) return `<span>Select a player from the table or hover a dot.</span>`;
  return `
    <strong>${escapeHtml(displayName(dataset.kitchenPlayer, "name"))}</strong>
    <span>${escapeHtml(dataset.team || "")}</span>
    ${dataset.ratingSource ? `<small>${escapeHtml(dataset.ratingSource)}</small>` : ""}
    <dl>
      <div><dt>Rating</dt><dd>${escapeHtml(dataset.rating || "")}</dd></div>
      <div><dt>PER/G</dt><dd>${escapeHtml(dataset.per || "")}</dd></div>
      <div><dt>xPER/G</dt><dd>${escapeHtml(dataset.xper || "")}</dd></div>
      <div><dt>PER/G-</dt><dd>${escapeHtml(dataset.delta || "")}</dd></div>
    </dl>
  `;
}

function kitchenPlayerDataset(player) {
  if (!player) return null;
  return [...els.kitchenPanel.querySelectorAll("[data-kitchen-player]")]
    .find((node) => node.dataset.kitchenPlayer === player)?.dataset || null;
}

function updateKitchenSelection(player, { temporary = false } = {}) {
  const activePlayer = player || "";
  els.kitchenPanel.querySelectorAll(".kitchen-dot, .kitchen-table tbody tr").forEach((node) => {
    const isActive = node.dataset.kitchenPlayer === activePlayer;
    node.classList.toggle(temporary ? "is-hovered" : "is-selected", isActive);
    if (!temporary) node.classList.remove("is-hovered");
  });
  const info = els.kitchenPanel.querySelector("#kitchenPlayerInfo");
  if (info) info.innerHTML = kitchenInfoHtml(kitchenPlayerDataset(activePlayer));
}

function clearKitchenHover() {
  els.kitchenPanel.querySelectorAll(".is-hovered").forEach((node) => node.classList.remove("is-hovered"));
  updateKitchenSelection(state.kitchenSelectedPlayer);
}

function latestRegularSeason() {
  return [...data.seasons]
    .filter((season) => /^S\d+$/.test(season))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .at(-1) || "All";
}

function awardRaceDefinitionsForSeason(season) {
  const explicit = allAwardDefinitions().filter((award) => award.season !== "2026" && award.season === season && !nonRaceAwardNames.has(award.award));
  if (explicit.length) return explicit;
  const templateSeason = [...new Set(allAwardDefinitions().map((award) => award.season))]
    .filter((item) => item !== "2026")
    .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))[0];
  return allAwardDefinitions()
    .filter((award) => award.season === templateSeason && !nonRaceAwardNames.has(award.award))
    .map((award) => ({ ...award, season, winners: [], team: "", amount: "", perGameAmount: "" }));
}

const teamColorPalette = [
  "#00b8d4", "#ff2aa1", "#111318", "#007f96", "#c40078", "#647581",
  "#32e8ff", "#ff73c5", "#263238", "#0094aa", "#d40a86", "#8aa3ad",
];

function teamColor(name, season = state.season) {
  const officialColor = officialTeamColor(name, season);
  if (officialColor) return officialColor;
  const key = aliasKey(name);
  if (!key) return "#1f7a8c";
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) hash = ((hash * 31) + key.charCodeAt(i)) >>> 0;
  return teamColorPalette[hash % teamColorPalette.length];
}

function renderMiniLeaderGrid(target, items, actionType = null) {
  target.innerHTML = items.map((item) => {
    const action = actionType ? ` data-action="${encodeURIComponent(JSON.stringify(actionType(item)))}"` : "";
    const color = item.teamColor || teamColor(item.team || item.name, item.season || state.season);
    const style = ` style="--team-color:${escapeHtml(color)}"`;
    return `
      <button type="button" class="mini-leader-card"${style}${action}>
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
  const panelSeason = state.season === "All" ? latestRegularSeason() : state.season;
  const showLifetimeTeamPanel = state.view === "lifetimeTeams";
  const showLifetimePlayerPanel = state.view === "lifetimePlayers";
  const showTeamPanel = (state.view === "teams" || showLifetimeTeamPanel) && !isPlayoffSeason(state.season) && state.season !== "World Cup";
  const showAwardPanel = (state.view === "players" || showLifetimePlayerPanel) && !isPlayoffSeason(state.season) && state.season !== "World Cup";
  teamPanel.classList.toggle("hidden", !showTeamPanel);
  awardPanel.classList.toggle("hidden", !showAwardPanel);
  if (!showTeamPanel && !showAwardPanel) return;

  if (showLifetimeTeamPanel) {
    teamPanel.querySelector("h2").textContent = "Career Team Leaders";
    const teamItems = careerTeamLeaderStats.flatMap(([key, label, suffix = "", direction = "desc"]) => {
      const leader = leaderFor(lifetimeTeams(), key, direction);
      return leader ? [{ key, direction, label, name: leader.name, team: leader.name, meta: fmtStat(leader[key], key, suffix) }] : [];
    });
    renderMiniLeaderGrid(els.teamLeaderGrid, teamItems, (item) => ({ type: "sort", key: item.key, dir: item.direction }));
    awardPanel.classList.add("hidden");
    return;
  }

  if (showLifetimePlayerPanel) {
    awardPanel.querySelector("h2").textContent = "Career Player Leaders";
    const playerItems = careerPlayerLeaderStats.map(([key, label, suffix = "", direction = "desc"]) => {
      const leader = leaderFor(lifetimePlayers(), key, direction);
      return { key, direction, label, name: leader?.name ?? "-", team: leader?.teams?.[0] || leader?.teamsText || "", meta: leader ? fmtStat(leader[key], key, suffix) : "" };
    });
    renderMiniLeaderGrid(els.awardRaceGrid, playerItems, (item) => ({ type: "sort", key: item.key, dir: item.direction }));
    teamPanel.classList.add("hidden");
    return;
  }

  teamPanel.querySelector("h2").textContent = `${panelSeason} Team League Leaders`;
  awardPanel.querySelector("h2").textContent = `${panelSeason} Award Races`;

  const regularTeamRows = state.season === "All" ? rowsForDataset("teams", "All") : rowsForDataset("teams", panelSeason);
  const teamItems = teamLeagueStats.flatMap(([key, label, suffix = "", direction = "desc"]) => {
    const leader = leaderFor(regularTeamRows, key, direction);
    return leader ? [{ key, direction, label, name: leader.name, team: leader.name, meta: `${fmtStat(leader[key], key, suffix)} - ${leader.season}` }] : [];
  });
  if (showTeamPanel) renderMiniLeaderGrid(els.teamLeaderGrid, teamItems, (item) => ({ type: "sort", key: item.key, dir: item.direction }));

  const awardItems = awardRaceDefinitionsForSeason(panelSeason).map((award) => {
    const leader = awardRaceRows(award)[0];
    const leaderTeam = leader?.teamsText || award.team || "";
    return {
      label: award.award,
      name: leader?.name ?? "-",
      team: leaderTeam,
      meta: leader ? `${leaderTeam ? `${leaderTeam} | ` : ""}${award.avgLabel ? `${award.avgLabel}: ${fmtStat(leader.average, award.avgStat)} | ` : ""}${award.totalLabel}: ${fmt(leader.total)}` : "",
      sortKey: award.avgStat,
      award,
    };
  });
  if (showAwardPanel) renderMiniLeaderGrid(els.awardRaceGrid, awardItems, (item) => ({ type: "sort", key: item.sortKey, dir: "desc" }));
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
    kitchen: "Selena's Kitchen",
    teamInfo: "Team Info",
    yourKitchen: "Your Kitchen",
  })[state.view];
}

function awardNames() {
  return ["All", ...new Set(allAwardDefinitions().map((award) => award.award))];
}

function awardSeasons() {
  return ["All", ...new Set(allAwardDefinitions().map((award) => award.season))].sort((a, b) => {
    if (a === "All") return -1;
    if (b === "All") return 1;
    return a.localeCompare(b, undefined, { numeric: true });
  });
}

function awardHistoryRows() {
  return allAwardDefinitions()
  .filter((award) => state.awardFilter === "All" || award.award === state.awardFilter)
  .filter((award) => state.awardSeasonFilter === "All" || award.season === state.awardSeasonFilter)
  .map((award) => ({
    season: award.season,
    award: award.award,
    winnerText: award.winners.length ? award.winners.map((winner) => displayName(winner, "name")).join(", ") : "N/A",
    team: award.team,
    amount: award.amount,
    perGameAmount: award.perGameAmount,
  }));
}

function awardMilestoneRows() {
  return lifetimePlayers()
    .flatMap((player) => playerMilestones(player).map((milestone) => ({
      player: player.name,
      label: milestone.label,
      threshold: milestone.threshold,
      value: milestone.value,
    })))
    .sort((a, b) => a.label.localeCompare(b.label) || b.threshold - a.threshold || b.value - a.value || a.player.localeCompare(b.player));
}

function renderAwardFilters() {
  const awards = allAwardDefinitions();
  const counts = awards.reduce((acc, award) => {
    acc[award.award] = (acc[award.award] || 0) + 1;
    return acc;
  }, {});
  const seasonCounts = awards.reduce((acc, award) => {
    acc[award.season] = (acc[award.season] || 0) + 1;
    return acc;
  }, {});
  const milestones = awardMilestoneRows();
  els.awardFilters.innerHTML = `
    <div class="awards-panel">
      <div class="awards-panel-head">
        <div>
          <h2>Awards History</h2>
          <p>Filter by season or award, then sort the table by any column.</p>
        </div>
      </div>
      <h3>Season</h3>
      <div class="award-filter-grid award-season-grid">
        ${awardSeasons().map((season) => `
          <button type="button" class="award-filter${state.awardSeasonFilter === season ? " active" : ""}" data-award-season-filter="${escapeHtml(season)}">
            <strong>${escapeHtml(season)}</strong>
            <span>${season === "All" ? awards.length : seasonCounts[season]} awards</span>
          </button>
        `).join("")}
      </div>
      <h3>Award</h3>
      <div class="award-filter-grid">
        ${awardNames().map((award) => `
          <button type="button" class="award-filter${state.awardFilter === award ? " active" : ""}" data-award-filter="${escapeHtml(award)}">
            <strong>${escapeHtml(award)}</strong>
            <span>${award === "All" ? awards.length : counts[award]} entries</span>
          </button>
        `).join("")}
      </div>
      ${milestones.length ? `
        <section class="awards-milestones">
          <div>
            <h3>Career Milestones</h3>
            <p>Career totals earned across regular seasons.</p>
          </div>
          <div class="milestone-grid">
            ${milestones.map((milestone) => `
              <article class="milestone-card">
                <span>${escapeHtml(milestone.label)}</span>
                <strong>${escapeHtml(displayName(milestone.player, "name"))}</strong>
                <small>${escapeHtml(fmt(milestone.threshold))} reached / career total ${escapeHtml(fmt(milestone.value))}</small>
              </article>
            `).join("")}
          </div>
        </section>
      ` : ""}
    </div>
  `;
  els.awardFilters.classList.remove("hidden");
}

function teamSeasonRow(team, season) {
  return data.teams.find((row) => row.name === team && row.season === season);
}

function decorateRosterCareerHighs(rows) {
  const allPlayerSeasons = data.players.filter((row) => !isScrimSeason(row.season) && !isPlayoffSeason(row.season) && row.season !== "World Cup");
  return rows.map((row) => {
    const highs = new Set();
    const leagueLeaders = new Set();
    const gtrlsRecords = new Set();
    const seasons = playerCareer(row.name);
    playerCareerHighStats.forEach((stat) => {
      const max = Math.max(...seasons.map((season) => Number(season[stat]) || 0));
      if ((Number(row[stat]) || 0) === max && max > 0) highs.add(stat);
      const leaders = seasonLeaders(row.season, stat);
      if (leaders[0] && leaders[0].name === row.name && row[stat] === leaders[0][stat]) leagueLeaders.add(stat);
      const record = Math.max(...allPlayerSeasons.filter((season) => typeof season[stat] === "number" && !isUnavailableValue(season, stat)).map((season) => season[stat]), 0);
      if (record > 0 && row[stat] === record) gtrlsRecords.add(stat);
    });
    return { ...row, __careerHighs: highs, __leagueLeaders: leagueLeaders, __gtrlsRecords: gtrlsRecords };
  });
}

function detailContext() {
  if (state.page.type === "team") {
    const seasonLabel = state.page.season === "Lifetime" ? "All seasons" : state.page.season;
    const teamRow = teamSeasonRow(state.page.team, state.page.season);
    const pageTheme = activeTeamPageTheme();
    if (pageTheme) {
      const matchRecord = teamRow ? `${teamRow.wins}-${teamRow.losses} Match Record` : "Match Record n/a";
      return {
        eyebrow: `${matchRecord} / ${seasonLabel}`,
        title: state.page.team,
        columns: rosterColumns,
        rows: decorateRosterCareerHighs(sortRows(teamRoster(state.page.team, state.page.season))),
        tableTitle: "Players",
        action: (row) => ({ type: "player", player: row.name }),
      };
    }
    const record = teamRow
      ? (teamRow.season === "World Cup"
        ? `${teamRow.wins}-${teamRow.losses}, tournament score ${fmt(teamRow.standingsPoints)}`
        : `${teamRow.wins}-${teamRow.losses}, league score ${fmt(teamRow.standingsPoints)}, ${fmtGameAvg(teamRow.avgScore)} score/G`)
      : "";
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
      rows: awardRaceRows(definition).slice(0, 10),
      tableTitle: "Contenders",
      action: (row) => row.name ? ({ type: "player", player: row.name }) : null,
    };
  }

  if (state.page.type === "draft") {
    return {
      eyebrow: "Draft history",
      title: `${state.page.season} Draft`,
      columns: draftColumns,
      rows: draftRowsForSeason(state.page.season),
      tableTitle: "Draft Board",
      action: (row) => ({ type: "team", team: row.team, season: row.season }),
    };
  }

  if (state.page.type === "playoffSeries") {
    const games = playoffSeriesGames(state.page.season);
    const summary = (data.manualHistory?.playoffs || []).find((row) => row.season === state.page.season && isChampionshipRound(row));
    return {
      eyebrow: "Championship series",
      title: summary ? `${summary.teamA} ${summary.result} ${summary.teamB}` : `${state.page.season} Championship`,
      columns: championshipGameColumns,
      rows: games,
      tableTitle: `${state.page.season} Championship Games`,
      action: null,
    };
  }

  return null;
}

function dashboardAction(row) {
  if (state.view === "awards") return nonRaceAwardNames.has(row.award) ? null : { type: "awardRace", award: row.award, season: row.season };
  if (isTeamView()) {
    return { type: "team", team: row.name, season: isLifetimeView() ? "Lifetime" : row.season };
  }
  return { type: "player", player: row.name };
}

function renderSeasonOptions() {
  if (!state.includeScrims && isScrimSeason(state.season)) state.season = latestRegularSeason();
  if (state.season === "All") state.season = latestRegularSeason();
  const seasons = visibleSeasons();
  let selected = isLifetimeView() ? "Lifetime" : baseSeasonName(state.season);
  if (selected !== "Lifetime" && !seasons.includes(selected)) {
    selected = latestRegularSeason();
    state.season = selected;
    state.seasonPhase = "regular";
  }
  const options = lifetimeSeasonEligible() ? [...seasons, "Lifetime"] : seasons;
  els.seasonSelect.innerHTML = options
    .map((season) => `<option value="${season}">${season}</option>`)
    .join("");
  els.seasonSelect.value = selected;
  const playoffsAvailable = selected !== "Lifetime" && hasPlayoffSeason(selected);
  if (selected !== "Lifetime") state.seasonPhase = isPlayoffSeason(state.season) ? "playoffs" : "regular";
  els.seasonPhaseControl.classList.toggle("disabled", selected === "Lifetime" || !playoffsAvailable);
  els.seasonPhaseControl.querySelectorAll("[data-season-phase]").forEach((button) => {
    button.classList.toggle("active", button.dataset.seasonPhase === state.seasonPhase);
    button.disabled = selected === "Lifetime" || (button.dataset.seasonPhase === "playoffs" && !playoffsAvailable);
  });
}

function renderKpis(rows) {
  const modified = new Date(document.lastModified);
  const fallback = new Date(data.generatedAt);
  const lastUpdated = Number.isNaN(modified.getTime()) ? fallback : modified;
  els.generatedAt.textContent = `Last Update: ${lastUpdated.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}`;
  els.seasonSelect.disabled = false;
  document.querySelector(".controls").classList.remove("season-disabled");
  els.excludeTwosControl.classList.toggle("hidden", !isLifetimeView());
  renderLeagueLeaderPanels(rows);
}

function renderBars(target, rows, key, suffix = "", tone = "default", scaleMax = null) {
  const leaders = [...rows].sort((a, b) => b[key] - a[key]).slice(0, 5);
  const max = scaleMax ?? Math.max(...leaders.map((row) => row[key]), 1);
  target.innerHTML = leaders.map((row) => `
    <div class="bar-row ${tone}" title="${row.name}">
      <span class="bar-name">${escapeHtml(displayName(row.name, "name"))}${state.season === "All" && row.season ? ` <small>${escapeHtml(row.season)}</small>` : ""}</span>
      <span class="bar-track"><span class="bar-fill" style="--w:${Math.max(2, Math.min(100, (row[key] / max) * 100))}%"></span></span>
      <span class="bar-value">${fmtStat(row[key], key, suffix)}</span>
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
  metaEl.textContent = row ? `${fmtStat(row[valueKey], valueKey, suffix)} - ${fmt(row.games)} GP` : "";
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
  return playerAwardRows().filter((award) => award.player === player);
}

const playerMilestoneDefinitions = [
  ["goals", "Goals", [100, 200, 300]],
  ["saves", "Saves", [100, 200]],
  ["assists", "Assists", [50]],
];

function playerMilestones(totals) {
  return playerMilestoneDefinitions.flatMap(([key, label, thresholds]) =>
    thresholds
      .filter((threshold) => (totals[key] || 0) >= threshold)
      .map((threshold) => ({ label, threshold, value: totals[key] || 0 }))
  );
}

function teamInfoFor(teamName, season) {
  return (data.manualHistory?.teamInfo || []).find((info) => info.team === teamName && info.season === season);
}

const teamPageThemeAssets = {
  "S6|Best Friends Club": "assets/team-logos/s6/best-friends-club.png",
  "S6|Hook Line & Blinker": "assets/team-logos/s6/hook-line-blinker.png",
  "S6|Crossbar Cartel": "assets/team-logos/s6/crossbar-cartel.png",
  "S6|Ball Chasin & Sauce Tastin": "assets/team-logos/s6/ball-chasin-sauce-tastin.png",
  "S6|Spirit Airlines": "assets/team-logos/s6/spirit-airlines.png",
  "S6|The Cox": "assets/team-logos/s6/the-cox.png",
  "S6|Past Our Prime": "assets/team-logos/s6/past-our-prime.png",
  "S6|Quack Wok": "assets/team-logos/s6/quack-wok.png",
  "S6|Giga's In Paris": "assets/team-logos/s6/gigas-in-paris.png",
  "S6|Deceptitards": "assets/team-logos/s6/deceptitards.png",
  "S6|Supernova Abyss": "assets/team-logos/s6/supernova-abyss.png",
  "S6|ESC": "assets/team-logos/s6/esc.png",
};
const rocketLeagueColorGrid = {
  A1: { hex: "#e7f0f4", name: "White" },
  A4: { hex: "#686d73", name: "Gray" },
  A6: { hex: "#24282d", name: "Dark Grey" },
  A7: { hex: "#05070b", name: "Black" },
  B3: { hex: "#ef3544", name: "Red" },
  C3: { hex: "#ff6428", name: "Orange" },
  D4: { hex: "#d89416", name: "Tan" },
  E3: { hex: "#d8ef31", name: "Yellow" },
  E4: { hex: "#b8dc0b", name: "Yellow" },
  F7: { hex: "#073b18", name: "Dark Green" },
  I3: { hex: "#2ec2e6", name: "Aqua" },
  J2: { hex: "#4a96ed", name: "Light Blue" },
  K5: { hex: "#17269f", name: "Navy" },
  K6: { hex: "#15166d", name: "Purple" },
  L1: { hex: "#9b7be8", name: "Lavender" },
  L3: { hex: "#6d2ce8", name: "Purple" },
  L4: { hex: "#6200dc", name: "Purple" },
  M6: { hex: "#590d61", name: "Purple" },
  N4: { hex: "#e9008f", name: "Pink" },
  O6: { hex: "#760019", name: "Maroon" },
  D1: { hex: "#f2d48a", name: "Sand" },
};

function rocketLeagueColor(value) {
  const code = String(value || "").trim().match(/^([A-O][1-7])/i)?.[1]?.toUpperCase();
  if (!code || !rocketLeagueColorGrid[code]) return null;
  const suppliedName = String(value || "").match(/\(([^)]+)\)/)?.[1]?.trim();
  return { code, ...rocketLeagueColorGrid[code], name: suppliedName || rocketLeagueColorGrid[code].name };
}

function hexRgb(hex) {
  const value = String(hex || "").replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(value)) return null;
  return [0, 2, 4].map((offset) => parseInt(value.slice(offset, offset + 2), 16));
}

function mixHex(color, target, amount) {
  const sourceRgb = hexRgb(color);
  const targetRgb = hexRgb(target);
  if (!sourceRgb || !targetRgb) return color;
  const mixed = sourceRgb.map((channel, index) => Math.round(channel + ((targetRgb[index] - channel) * amount)));
  return `#${mixed.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

function colorLuminance(hex) {
  const rgb = hexRgb(hex);
  if (!rgb) return 1;
  const linear = rgb.map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return (0.2126 * linear[0]) + (0.7152 * linear[1]) + (0.0722 * linear[2]);
}

function readableTeamAccent(hex) {
  let accent = hex;
  let amount = 0;
  while (colorLuminance(accent) < 0.24 && amount < 0.72) {
    amount += 0.08;
    accent = mixHex(hex, "#ffffff", amount);
  }
  return accent;
}

function contrastText(hex) {
  return colorLuminance(hex) > 0.18 ? "#080b12" : "#ffffff";
}

function officialTeamColor(teamName, season) {
  const resolvedSeason = baseSeasonName(season || state.season);
  if (resolvedSeason !== "S6") return null;
  const info = teamInfoFor(teamName, resolvedSeason);
  const primary = rocketLeagueColor(info?.primary);
  return primary ? readableTeamAccent(primary.hex) : null;
}

function teamInfoRowsForSeason() {
  return (data.manualHistory?.teamInfo || [])
    .filter((row) => row.season === state.season)
    .sort((a, b) => a.team.localeCompare(b.team));
}

function teamColorInfoMarkup(label, value) {
  const color = rocketLeagueColor(value);
  if (!color) return `<div class="team-info-color unavailable"><span>${label}</span><strong>Not available</strong></div>`;
  return `<div class="team-info-color"><i style="--swatch:${escapeHtml(color.hex)}"></i><span>${label} - ${escapeHtml(color.code)}</span><strong>${escapeHtml(color.name)}</strong></div>`;
}

function teamLogoFor(teamName, season) {
  return teamPageThemeAssets[`${baseSeasonName(season)}|${teamName}`] || "";
}

function renderTeamInfoPage() {
  const rows = teamInfoRowsForSeason();
  els.teamInfoPanel.innerHTML = `
    <div class="team-info-heading">
      <div><span>Team directory</span><h2>${escapeHtml(state.season)} Team Info</h2></div>
      <strong>${rows.length} ${rows.length === 1 ? "team" : "teams"}</strong>
    </div>
    ${rows.length ? `<div class="team-info-grid">
      ${rows.map((row) => `
        <button type="button" class="team-info-card" data-action="${encodeURIComponent(JSON.stringify({ type: "team", team: row.team, season: row.season }))}">
          ${teamLogoFor(row.team, row.season) ? `<img class="team-info-logo" src="${escapeHtml(teamLogoFor(row.team, row.season))}" alt="${escapeHtml(displayName(row.team, "team"))} logo">` : ""}
          <div class="team-info-card-heading"><h3>${escapeHtml(displayName(row.team, "team"))}</h3></div>
          <div class="team-info-stadium"><span>Home Stadium</span><strong>${escapeHtml(row.homeStadium || "Not available")}</strong></div>
          <div class="team-info-colors">
            ${teamColorInfoMarkup("Primary", row.primary)}
            ${teamColorInfoMarkup("Secondary", row.secondary)}
          </div>
        </button>
      `).join("")}
    </div>` : `<div class="team-info-empty"><strong>No team information for ${escapeHtml(state.season)}</strong><span>Select another season to browse available teams.</span></div>`}
  `;
  els.teamInfoPanel.classList.remove("hidden");
}

const yourKitchenExtraFields = new Map([
  ["rating", "Rating"],
  ["expectedPerPerGame", "Expected PER/G"],
  ["perDelta", "PER/G-"],
  ["goalsConceded", "Goals Allowed"],
  ["shotsConceded", "Shots Allowed"],
  ["opponentSavesForced", "Opponent Saves Forced"],
  ["amountCollected", "Boost Collected"],
  ["amountStolen", "Boost Stolen"],
  ["demosInflicted", "Demos Inflicted"],
  ["demosTaken", "Demos Taken"],
]);

function yourKitchenFieldLabels() {
  const columns = state.yourKitchenEntity === "teams" ? teamColumns : playerColumns;
  return new Map([...columns, ...yourKitchenExtraFields, ...state.yourKitchenVariables.map((variable) => [variable.key, variable.name])]);
}

function yourKitchenBaseRows() {
  const source = state.yourKitchenEntity === "teams" ? data.teams : data.players;
  return source
    .filter((row) => row.season === state.season)
    .map((row) => ({ ...row, teamsText: row.teams?.join(", ") || row.name }));
}

function tokenizeFormula(formula) {
  const tokens = [];
  let position = 0;
  while (position < formula.length) {
    const remainder = formula.slice(position);
    const whitespace = remainder.match(/^\s+/);
    if (whitespace) {
      position += whitespace[0].length;
      continue;
    }
    const number = remainder.match(/^(?:\d+\.?\d*|\.\d+)/);
    if (number) {
      tokens.push({ type: "number", value: Number(number[0]) });
      position += number[0].length;
      continue;
    }
    const identifier = remainder.match(/^[A-Za-z_][A-Za-z0-9_]*/);
    if (identifier) {
      tokens.push({ type: "identifier", value: identifier[0] });
      position += identifier[0].length;
      continue;
    }
    if ("+-*/()".includes(remainder[0])) {
      tokens.push({ type: remainder[0], value: remainder[0] });
      position += 1;
      continue;
    }
    throw new Error(`Unexpected character: ${remainder[0]}`);
  }
  return tokens;
}

function compileYourKitchenFormula(formula, allowedFields) {
  const tokens = tokenizeFormula(formula);
  let cursor = 0;
  const peek = () => tokens[cursor];
  const take = () => tokens[cursor++];

  function parseFactor() {
    const token = take();
    if (!token) throw new Error("Formula is incomplete");
    if (token.type === "number") return { type: "number", value: token.value };
    if (token.type === "identifier") {
      if (!allowedFields.has(token.value)) throw new Error(`Unknown variable: ${token.value}`);
      return { type: "identifier", value: token.value };
    }
    if (token.type === "+" || token.type === "-") return { type: "unary", operator: token.type, value: parseFactor() };
    if (token.type === "(") {
      const value = parseExpression();
      if (take()?.type !== ")") throw new Error("Missing closing parenthesis");
      return value;
    }
    throw new Error(`Unexpected token: ${token.value}`);
  }

  function parseTerm() {
    let node = parseFactor();
    while (peek()?.type === "*" || peek()?.type === "/") {
      const operator = take().type;
      node = { type: "binary", operator, left: node, right: parseFactor() };
    }
    return node;
  }

  function parseExpression() {
    let node = parseTerm();
    while (peek()?.type === "+" || peek()?.type === "-") {
      const operator = take().type;
      node = { type: "binary", operator, left: node, right: parseTerm() };
    }
    return node;
  }

  const ast = parseExpression();
  if (cursor !== tokens.length) throw new Error(`Unexpected token: ${peek().value}`);
  return ast;
}

function evaluateYourKitchenFormula(node, row) {
  if (node.type === "number") return node.value;
  if (node.type === "identifier") {
    if (isUnavailableValue(row, node.value)) return null;
    const value = Number(row[node.value]);
    return Number.isFinite(value) ? value : null;
  }
  if (node.type === "unary") {
    const value = evaluateYourKitchenFormula(node.value, row);
    return value === null ? null : (node.operator === "-" ? -value : value);
  }
  const left = evaluateYourKitchenFormula(node.left, row);
  const right = evaluateYourKitchenFormula(node.right, row);
  if (left === null || right === null) return null;
  if (node.operator === "+") return left + right;
  if (node.operator === "-") return left - right;
  if (node.operator === "*") return left * right;
  if (node.operator === "/") return right === 0 ? null : left / right;
  return null;
}

function yourKitchenDerivedRows() {
  return yourKitchenBaseRows().map((row) => {
    const derived = { ...row };
    state.yourKitchenVariables.forEach((variable) => {
      derived[variable.key] = evaluateYourKitchenFormula(variable.ast, derived);
    });
    return derived;
  });
}

function yourKitchenTeams(rows) {
  const values = state.yourKitchenEntity === "teams"
    ? rows.map((row) => row.name)
    : rows.flatMap((row) => row.teams || []);
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

function yourKitchenFilteredRows(rows) {
  return rows.filter((row) => {
    const teamMatch = state.yourKitchenTeam === "All" || (state.yourKitchenEntity === "teams" ? row.name === state.yourKitchenTeam : row.teams?.includes(state.yourKitchenTeam));
    const memberMatch = state.yourKitchenMember === "All" || row.name === state.yourKitchenMember;
    return teamMatch && memberMatch;
  });
}

function yourKitchenNumericFields(rows) {
  const labels = yourKitchenFieldLabels();
  return [...labels.entries()].filter(([key]) => rows.some((row) => !isUnavailableValue(row, key) && Number.isFinite(Number(row[key]))));
}

function yourKitchenSlug(name) {
  return String(name || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

function yourKitchenChartRows(rows) {
  return rows.filter((row) => Number.isFinite(Number(row[state.yourKitchenX])) && Number.isFinite(Number(row[state.yourKitchenY])));
}

function yourKitchenDomain(values) {
  let min = Math.min(...values);
  let max = Math.max(...values);
  if (min === max) {
    const spread = Math.max(1, Math.abs(min) * 0.1);
    min -= spread;
    max += spread;
  }
  const padding = (max - min) * 0.08;
  return [min - padding, max + padding];
}

function yourKitchenScatter(rows, labels) {
  const plotted = yourKitchenChartRows(rows);
  if (!plotted.length) return `<div class="your-kitchen-empty">No plottable values.</div>`;
  const chart = { left: 72, top: 28, width: 790, height: 350 };
  const [xMin, xMax] = yourKitchenDomain(plotted.map((row) => Number(row[state.yourKitchenX])));
  const [yMin, yMax] = yourKitchenDomain(plotted.map((row) => Number(row[state.yourKitchenY])));
  const x = (value) => chart.left + ((value - xMin) / (xMax - xMin)) * chart.width;
  const y = (value) => chart.top + chart.height - ((value - yMin) / (yMax - yMin)) * chart.height;
  const xTicks = [xMin, (xMin + xMax) / 2, xMax];
  const yTicks = [yMin, (yMin + yMax) / 2, yMax];
  return `<div class="your-chart-wrap"><svg class="your-chart" viewBox="0 0 920 430" role="img" aria-label="${escapeHtml(labels.get(state.yourKitchenY))} versus ${escapeHtml(labels.get(state.yourKitchenX))}">
    <line class="axis" x1="${chart.left}" y1="${chart.top}" x2="${chart.left}" y2="${chart.top + chart.height}"></line>
    <line class="axis" x1="${chart.left}" y1="${chart.top + chart.height}" x2="${chart.left + chart.width}" y2="${chart.top + chart.height}"></line>
    ${xTicks.map((tick) => `<g class="tick"><line x1="${x(tick)}" y1="${chart.top}" x2="${x(tick)}" y2="${chart.top + chart.height}"></line><text x="${x(tick)}" y="${chart.top + chart.height + 25}">${fmtGameAvg(tick)}</text></g>`).join("")}
    ${yTicks.map((tick) => `<g class="tick"><line x1="${chart.left}" y1="${y(tick)}" x2="${chart.left + chart.width}" y2="${y(tick)}"></line><text x="${chart.left - 12}" y="${y(tick)}">${fmtGameAvg(tick)}</text></g>`).join("")}
    ${plotted.map((row) => `<circle class="your-chart-dot" cx="${x(Number(row[state.yourKitchenX]))}" cy="${y(Number(row[state.yourKitchenY]))}" r="7" style="--point-color:${escapeHtml(teamColor(row.teams?.[0] || row.name))}"><title>${escapeHtml(displayName(row.name, state.yourKitchenEntity === "teams" ? "team" : "name"))} | ${escapeHtml(labels.get(state.yourKitchenX))}: ${fmtGameAvg(row[state.yourKitchenX])} | ${escapeHtml(labels.get(state.yourKitchenY))}: ${fmtGameAvg(row[state.yourKitchenY])}</title></circle>`).join("")}
    <text class="axis-label x-label" x="${chart.left + chart.width / 2}" y="424">${escapeHtml(labels.get(state.yourKitchenX))}</text>
    <text class="axis-label y-label" transform="translate(18 ${chart.top + chart.height / 2}) rotate(-90)">${escapeHtml(labels.get(state.yourKitchenY))}</text>
  </svg></div>`;
}

function yourKitchenBars(rows, labels) {
  const plotted = yourKitchenChartRows(rows).sort((a, b) => Number(a[state.yourKitchenX]) - Number(b[state.yourKitchenX]));
  if (!plotted.length) return `<div class="your-kitchen-empty">No plottable values.</div>`;
  const width = Math.max(920, 100 + plotted.length * 54);
  const chart = { left: 62, top: 28, width: width - 100, height: 330 };
  const values = plotted.map((row) => Number(row[state.yourKitchenY]));
  const min = Math.min(0, ...values);
  const max = Math.max(0, ...values);
  const span = Math.max(1, max - min);
  const y = (value) => chart.top + chart.height - ((value - min) / span) * chart.height;
  const baseline = y(0);
  const slot = chart.width / plotted.length;
  return `<div class="your-chart-wrap"><svg class="your-chart your-bar-chart" viewBox="0 0 ${width} 430" style="min-width:${width}px" role="img" aria-label="${escapeHtml(labels.get(state.yourKitchenY))} bar chart">
    <line class="axis" x1="${chart.left}" y1="${chart.top}" x2="${chart.left}" y2="${chart.top + chart.height}"></line>
    <line class="axis" x1="${chart.left}" y1="${baseline}" x2="${chart.left + chart.width}" y2="${baseline}"></line>
    ${plotted.map((row, index) => {
      const value = Number(row[state.yourKitchenY]);
      const barY = Math.min(y(value), baseline);
      const height = Math.max(1, Math.abs(baseline - y(value)));
      const barX = chart.left + index * slot + slot * 0.16;
      const label = displayName(row.name, state.yourKitchenEntity === "teams" ? "team" : "name");
      return `<g><rect class="your-chart-bar" x="${barX}" y="${barY}" width="${slot * 0.68}" height="${height}" style="--point-color:${escapeHtml(teamColor(row.teams?.[0] || row.name))}"><title>${escapeHtml(label)} | ${escapeHtml(labels.get(state.yourKitchenY))}: ${fmtGameAvg(value)} | Ordered by ${escapeHtml(labels.get(state.yourKitchenX))}: ${fmtGameAvg(row[state.yourKitchenX])}</title></rect><text class="bar-label" transform="translate(${barX + slot * 0.34} 374) rotate(-45)">${escapeHtml(label)}</text></g>`;
    }).join("")}
    <text class="axis-label y-label" transform="translate(18 ${chart.top + chart.height / 2}) rotate(-90)">${escapeHtml(labels.get(state.yourKitchenY))}</text>
  </svg></div>`;
}

function renderYourKitchen() {
  const derivedRows = yourKitchenDerivedRows();
  const teams = yourKitchenTeams(derivedRows);
  if (state.yourKitchenTeam !== "All" && !teams.includes(state.yourKitchenTeam)) state.yourKitchenTeam = "All";
  const teamFilteredRows = derivedRows.filter((row) => state.yourKitchenTeam === "All" || (state.yourKitchenEntity === "teams" ? row.name === state.yourKitchenTeam : row.teams?.includes(state.yourKitchenTeam)));
  const members = [...new Set(teamFilteredRows.map((row) => row.name))].sort((a, b) => a.localeCompare(b));
  if (state.yourKitchenMember !== "All" && !members.includes(state.yourKitchenMember)) state.yourKitchenMember = "All";
  const filteredRows = teamFilteredRows.filter((row) => state.yourKitchenMember === "All" || row.name === state.yourKitchenMember);
  const fields = yourKitchenNumericFields(derivedRows);
  const fieldKeys = fields.map(([key]) => key);
  const preferredX = state.yourKitchenEntity === "players" ? ["rating", "games", "goals"] : ["avgScore", "games", "goals"];
  const preferredY = ["perPerGame", "goalsPerGame", "avgScore", "goals"];
  if (!fieldKeys.includes(state.yourKitchenX)) state.yourKitchenX = preferredX.find((key) => fieldKeys.includes(key)) || fieldKeys[0] || "";
  if (!fieldKeys.includes(state.yourKitchenY)) state.yourKitchenY = preferredY.find((key) => fieldKeys.includes(key) && key !== state.yourKitchenX) || fieldKeys.find((key) => key !== state.yourKitchenX) || state.yourKitchenX;
  const labels = yourKitchenFieldLabels();
  const chart = state.yourKitchenChart === "bar" ? yourKitchenBars(filteredRows, labels) : yourKitchenScatter(filteredRows, labels);
  const plotted = yourKitchenChartRows(filteredRows);
  els.yourKitchenPanel.innerHTML = `
    <div class="your-kitchen-heading"><div><span>Analysis workbench</span><h2>Your Kitchen</h2></div><strong>${escapeHtml(state.season)}</strong></div>
    <div class="your-kitchen-controls">
      <label><span>Entity</span><select id="yourKitchenEntity"><option value="players"${state.yourKitchenEntity === "players" ? " selected" : ""}>Players</option><option value="teams"${state.yourKitchenEntity === "teams" ? " selected" : ""}>Teams</option></select></label>
      <label><span>Team</span><select id="yourKitchenTeam"><option value="All">All teams</option>${teams.map((team) => `<option value="${escapeHtml(team)}"${state.yourKitchenTeam === team ? " selected" : ""}>${escapeHtml(displayName(team, "team"))}</option>`).join("")}</select></label>
      <label class="${state.yourKitchenEntity === "teams" ? "hidden" : ""}"><span>Player</span><select id="yourKitchenMember"><option value="All">All players</option>${members.map((name) => `<option value="${escapeHtml(name)}"${state.yourKitchenMember === name ? " selected" : ""}>${escapeHtml(displayName(name, "name"))}</option>`).join("")}</select></label>
      <div class="your-chart-mode" role="group" aria-label="Chart type"><button type="button" data-your-chart="scatter" class="${state.yourKitchenChart === "scatter" ? "active" : ""}">Scatter</button><button type="button" data-your-chart="bar" class="${state.yourKitchenChart === "bar" ? "active" : ""}">Bar</button></div>
    </div>
    <form id="yourVariableForm" class="your-variable-builder">
      <label><span>Variable Name</span><input id="yourVariableName" value="${escapeHtml(state.yourKitchenVariableName)}" placeholder="Impact Score"></label>
      <label class="your-formula-field"><span>Formula</span><input id="yourVariableFormula" value="${escapeHtml(state.yourKitchenFormula)}" placeholder="(goals + assists) / games"></label>
      <label><span>Insert Stat</span><select id="yourFormulaStat"><option value="">Choose stat</option>${fields.map(([key, label]) => `<option value="${escapeHtml(key)}">${escapeHtml(label)} (${escapeHtml(key)})</option>`).join("")}</select></label>
      <div class="your-formula-operators" aria-label="Formula operators">${["+", "-", "*", "/", "(", ")"].map((operator) => `<button type="button" data-formula-token="${operator}" title="Insert ${operator}">${operator}</button>`).join("")}</div>
      <button type="button" class="your-create-variable" data-create-variable>Create Variable</button>
    </form>
    ${state.yourKitchenError ? `<div class="your-kitchen-error" role="alert">${escapeHtml(state.yourKitchenError)}</div>` : ""}
    <div class="your-variable-list"><span>Session Variables</span>${state.yourKitchenVariables.length ? state.yourKitchenVariables.map((variable) => `<div><strong>${escapeHtml(variable.name)}</strong><code>${escapeHtml(variable.formula)}</code><button type="button" data-delete-variable="${escapeHtml(variable.key)}" title="Delete ${escapeHtml(variable.name)}">&times;</button></div>`).join("") : `<em>None</em>`}</div>
    <div class="your-axis-controls">
      <label><span>${state.yourKitchenChart === "bar" ? "Bar Order" : "X Axis"}</span><select id="yourKitchenX">${fields.map(([key, label]) => `<option value="${escapeHtml(key)}"${state.yourKitchenX === key ? " selected" : ""}>${escapeHtml(label)}</option>`).join("")}</select></label>
      <label><span>Y Axis</span><select id="yourKitchenY">${fields.map(([key, label]) => `<option value="${escapeHtml(key)}"${state.yourKitchenY === key ? " selected" : ""}>${escapeHtml(label)}</option>`).join("")}</select></label>
      <strong>${plotted.length} plotted</strong>
    </div>
    <section class="your-kitchen-chart-panel"><h3>${escapeHtml(labels.get(state.yourKitchenY) || "Y")} ${state.yourKitchenChart === "scatter" ? `vs ${escapeHtml(labels.get(state.yourKitchenX) || "X")}` : `by ${state.yourKitchenEntity === "players" ? "Player" : "Team"}`}</h3>${chart}</section>
    <div class="your-kitchen-table-wrap"><table class="your-kitchen-table"><thead><tr><th>${state.yourKitchenEntity === "players" ? "Player" : "Team"}</th><th>${escapeHtml(labels.get(state.yourKitchenX) || "X")}</th><th>${escapeHtml(labels.get(state.yourKitchenY) || "Y")}</th></tr></thead><tbody>${plotted.map((row) => `<tr><td>${escapeHtml(displayName(row.name, state.yourKitchenEntity === "teams" ? "team" : "name"))}</td><td>${fmtGameAvg(row[state.yourKitchenX])}</td><td>${fmtGameAvg(row[state.yourKitchenY])}</td></tr>`).join("")}</tbody></table></div>
  `;
  els.yourKitchenPanel.classList.remove("hidden");
}

function createYourKitchenVariable() {
  state.yourKitchenVariableName = els.yourKitchenPanel.querySelector("#yourVariableName").value.trim();
  state.yourKitchenFormula = els.yourKitchenPanel.querySelector("#yourVariableFormula").value.trim();
  try {
    if (!state.yourKitchenVariableName) throw new Error("Variable name is required");
    if (!state.yourKitchenFormula) throw new Error("Formula is required");
    const slug = yourKitchenSlug(state.yourKitchenVariableName);
    if (!slug) throw new Error("Variable name needs a letter or number");
    const key = `custom_${slug}`;
    const fields = yourKitchenNumericFields(yourKitchenDerivedRows());
    const allowedFields = new Set(fields.map(([fieldKey]) => fieldKey));
    if (allowedFields.has(key) || state.yourKitchenVariables.some((variable) => variable.key === key)) throw new Error("Variable name is already in use");
    const ast = compileYourKitchenFormula(state.yourKitchenFormula, allowedFields);
    state.yourKitchenVariables.push({ key, name: state.yourKitchenVariableName, formula: state.yourKitchenFormula, ast });
    state.yourKitchenY = key;
    state.yourKitchenVariableName = "";
    state.yourKitchenFormula = "";
    state.yourKitchenError = "";
  } catch (error) {
    state.yourKitchenError = error.message || "Formula could not be created";
  }
  render();
}

function activeTeamPageTheme() {
  if (state.page.type !== "team") return null;
  const key = `${state.page.season}|${state.page.team}`;
  if (!teamPageThemeAssets[key]) return null;
  const info = teamInfoFor(state.page.team, state.page.season);
  const primary = rocketLeagueColor(info?.primary);
  const secondary = rocketLeagueColor(info?.secondary);
  return primary && secondary ? {
    primary,
    secondary,
    primaryReadable: readableTeamAccent(primary.hex),
    secondaryReadable: readableTeamAccent(secondary.hex),
    secondaryText: contrastText(readableTeamAccent(secondary.hex)),
    logo: teamPageThemeAssets[key],
  } : null;
}

function applyTeamPageTheme() {
  const theme = activeTeamPageTheme();
  document.body.classList.toggle("team-page-themed", !!theme);
  ["--team-primary", "--team-secondary", "--team-primary-readable", "--team-secondary-readable", "--team-secondary-text"]
    .forEach((property) => document.body.style.removeProperty(property));
  els.detailTeamLogo.classList.toggle("hidden", !theme?.logo);
  els.detailTeamLogo.src = theme?.logo || "";
  els.detailTeamLogo.alt = theme?.logo ? `${state.page.team} logo` : "";
  if (!theme) return;
  document.body.style.setProperty("--team-primary", theme.primary.hex);
  document.body.style.setProperty("--team-secondary", theme.secondary.hex);
  document.body.style.setProperty("--team-primary-readable", theme.primaryReadable);
  document.body.style.setProperty("--team-secondary-readable", theme.secondaryReadable);
  document.body.style.setProperty("--team-secondary-text", theme.secondaryText);
  const darkSecondary = colorLuminance(theme.secondary.hex) < 0.08;
  document.body.style.setProperty("--team-banner-label", darkSecondary ? "#05070b" : theme.secondaryReadable);
  document.body.style.setProperty("--team-back-bg", darkSecondary ? theme.secondary.hex : theme.secondaryReadable);
  document.body.style.setProperty("--team-back-text", darkSecondary ? "#ffffff" : theme.secondaryText);
}

function draftRowsForPlayer(player) {
  return (data.manualHistory?.draft || []).filter((row) => [row.captain, row.pick1, row.pick2].includes(player));
}

function draftSeasons() {
  return [...new Set((data.manualHistory?.draft || []).map((row) => row.season))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function draftRowsForSeason(season) {
  return (data.manualHistory?.draft || [])
    .filter((row) => row.season === season)
    .sort((a, b) => a.draftOrder - b.draftOrder);
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
  if (state.page.type === "playoffSeries") {
    els.detailExtras.classList.add("hidden");
    els.detailExtras.innerHTML = "";
    return;
  }

  if (state.page.type === "team") {
    const info = teamInfoFor(state.page.team, state.page.season);
    const draft = draftRowForTeam(state.page.team, state.page.season);
    const pageTheme = activeTeamPageTheme();
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
            ${pageTheme ? `
              <article class="team-color-card" style="--swatch:${escapeHtml(pageTheme.primary.hex)}"><span>Primary - ${escapeHtml(pageTheme.primary.code)}</span><strong><i></i>${escapeHtml(pageTheme.primary.name)}</strong></article>
              <article class="team-color-card" style="--swatch:${escapeHtml(pageTheme.secondary.hex)}"><span>Secondary - ${escapeHtml(pageTheme.secondary.code)}</span><strong><i></i>${escapeHtml(pageTheme.secondary.name)}</strong></article>
            ` : ""}
          </div>
          ${info.roster?.length ? `<div class="team-roster-list">
            ${info.roster.map((name) => `<button type="button" data-action="${encodeURIComponent(JSON.stringify({ type: "player", player: name }))}">${escapeHtml(displayName(name, "name"))}</button>`).join("")}
          </div>` : ""}
        </section>` : ""}
        ${draft ? `<section class="draft-info-section">
          <h2>Draft Info</h2>
          <div class="info-grid">
            <button type="button" data-action="${encodeURIComponent(JSON.stringify({ type: "draft", season: draft.season }))}"><span>Draft Order</span><strong>${escapeHtml(fmt(draft.draftOrder))}</strong></button>
            <button type="button" data-action="${encodeURIComponent(JSON.stringify({ type: "player", player: draft.captain }))}"><span>Captain</span><strong>${escapeHtml(displayName(draft.captain, "name"))} (${fmt(draft.captainMmr)})</strong></button>
            <button type="button" data-action="${encodeURIComponent(JSON.stringify({ type: "player", player: draft.pick1 }))}"><span>Round 1</span><strong>${escapeHtml(displayName(draft.pick1, "name"))} (${fmt(draft.pick1Mmr)})</strong></button>
            <button type="button" data-action="${encodeURIComponent(JSON.stringify({ type: "player", player: draft.pick2 }))}"><span>Round 2</span><strong>${escapeHtml(displayName(draft.pick2, "name"))} (${fmt(draft.pick2Mmr)})</strong></button>
            <button type="button" data-action="${encodeURIComponent(JSON.stringify({ type: "draft", season: draft.season }))}"><span>Team MMR</span><strong>${escapeHtml(fmt(draft.teamMmr))}</strong></button>
            <button type="button" data-action="${encodeURIComponent(JSON.stringify({ type: "draft", season: draft.season }))}"><span>Team Rank</span><strong>${escapeHtml(fmt(draft.teamRank))}</strong></button>
          </div>
        </section>` : ""}
      </div>
    `;
    els.detailExtras.classList.remove("hidden");
    return;
  }

  if (state.page.type === "draft") {
    const seasons = draftSeasons();
    els.detailExtras.innerHTML = `
      <div class="extras-grid">
        <section>
          <h2>Draft Navigation</h2>
          <div class="compact-stat-list">
            ${seasons.map((season) => `
              <button type="button" data-action="${encodeURIComponent(JSON.stringify({ type: "draft", season }))}">
                <strong>${escapeHtml(season)} Draft</strong>
                <span>${fmt(draftRowsForSeason(season).length)} teams</span>
              </button>
            `).join("")}
          </div>
        </section>
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
  const totals = playerLifetimeRow(state.page.player);
  const milestones = playerMilestones(totals);
  const totalCards = [
    ["Total Score", totals.score],
    ["Total Goals", totals.goals],
    ["Total Assists", totals.assists],
    ["Total Saves", totals.saves],
  ];
  const leaderboardHtml = groups.length ? groups.map((group) => `
    <article class="appearance-card">
      <h3>${escapeHtml(group.label)}</h3>
      ${group.entries.map((entry) => `
        <button type="button" data-action="${encodeURIComponent(JSON.stringify({ type: "seasonLeaders", season: entry.season, player: state.page.player }))}">
          <span>${escapeHtml(entry.season)}</span>
          <strong>${escapeHtml(fmtStat(entry.value, group.stat))}</strong>
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
          <small>Amount: ${escapeHtml(award.amount)}${award.perGameAmount ? ` / Per Game: ${escapeHtml(award.perGameAmount)}` : ""}</small>
        </article>
      `).join("")}
    </div>
  ` : `<p class="empty-note">No awards added yet.</p>`;
  const draftHtml = draftRows.length ? `
    <div class="award-list">
      ${draftRows.map((row) => `
        <article class="award-card">
          <button type="button" data-action="${encodeURIComponent(JSON.stringify({ type: "draft", season: row.season }))}">
            <strong>${escapeHtml(row.season)} Draft - ${escapeHtml(draftRole(row, state.page.player))}</strong>
            <span>${escapeHtml(displayName(row.team, "team"))}</span>
            <small>Order: ${fmt(row.draftOrder)} / Team MMR: ${fmt(row.teamMmr)} / Rank: ${fmt(row.teamRank)}</small>
          </button>
        </article>
      `).join("")}
    </div>
  ` : `<p class="empty-note">No draft info added yet.</p>`;
  const milestonesHtml = milestones.length ? `
    <div class="milestone-list">
      ${milestones.map((milestone) => `
        <article class="milestone-card">
          <span>${escapeHtml(milestone.label)}</span>
          <strong>${escapeHtml(fmt(milestone.threshold))}</strong>
          <small>Career total: ${escapeHtml(fmt(milestone.value))}</small>
        </article>
      `).join("")}
    </div>
  ` : `<p class="empty-note">No milestones yet.</p>`;

  els.detailExtras.innerHTML = `
    <div class="extras-grid">
      <section>
        <h2>Career Totals</h2>
        <div class="player-total-grid">
          ${totalCards.map(([label, value]) => `
            <article>
              <span>${escapeHtml(label)}</span>
              <strong>${escapeHtml(fmt(value))}</strong>
            </article>
          `).join("")}
        </div>
      </section>
      <section>
        <h2>Leaderboard Appearances</h2>
        <div class="appearance-grid">${leaderboardHtml}</div>
      </section>
      <section>
        <h2>Awards</h2>
        ${awardsHtml}
      </section>
      <section class="draft-info-section">
        <h2>Draft Info</h2>
        ${draftHtml}
      </section>
      <section>
        <h2>Milestones</h2>
        ${milestonesHtml}
      </section>
    </div>
  `;
  els.detailExtras.classList.remove("hidden");
}

function renderPlayoffStats() {
  if (state.page.type !== "dashboard" || isLifetimeView() || state.view === "awards" || state.view === "kitchen" || state.season === "All" || isPlayoffSeason(state.season)) {
    els.playoffStats.classList.add("hidden");
    els.playoffStats.innerHTML = "";
    return;
  }
  const selectedPlayoffSeason = state.season === "All" ? "" : `${state.season} Playoffs`;
  const manualPlayoffs = (data.manualHistory?.playoffs || []).filter((row) => (!selectedPlayoffSeason || row.season === selectedPlayoffSeason) && row.round !== "Championship Game");
  const manualSchedules = (data.manualHistory?.schedules || []).filter((row) => row.season === state.season);
  if (!manualPlayoffs.length && !manualSchedules.length) {
    els.playoffStats.classList.add("hidden");
    els.playoffStats.innerHTML = "";
    return;
  }
  const playoffBracketHtml = manualPlayoffs.length ? `
    <section>
      <h2>${selectedPlayoffSeason || "Historical"} Playoff Brackets</h2>
      <div class="compact-stat-list">
        ${manualPlayoffs.map((row) => row.result
          ? `<button type="button"${isChampionshipRound(row) ? ` class="championship-match"` : ""}${playoffSeriesAction(row) ? ` data-action="${encodeURIComponent(JSON.stringify(playoffSeriesAction(row)))}"` : ""}><strong>${escapeHtml(row.round)}${row.game ? ` ${escapeHtml(row.game)}` : ""}${row.mvp ? ` / MVP: ${escapeHtml(displayName(row.mvp, "name"))}` : ""}</strong><span class="playoff-matchup"><span class="playoff-team playoff-team-left">${playoffTeamMarkup(row, "teamA")}</span><b>${escapeHtml(row.result)}</b><span class="playoff-team playoff-team-right">${playoffTeamMarkup(row, "teamB")}</span></span></button>`
          : `<button type="button"><strong>${escapeHtml(row.teamA)}</strong></button>`).join("")}
      </div>
    </section>
  ` : "";
  const scheduleHtml = manualSchedules.length ? `<section>
        <h2>${escapeHtml(state.season)} Schedule & Results</h2>
        <div class="schedule-list">
          ${manualSchedules.map((row) => `
            <article${row.round === "Championship" ? ` class="championship"` : ""}>
              <span>${escapeHtml(row.round)}</span>
              <div>
                ${scheduleTeamMarkup(row, "home")}
                <b>${escapeHtml(row.result)}</b>
                ${scheduleTeamMarkup(row, "away")}
              </div>
              ${row.note ? `<small>${escapeHtml(row.note)}</small>` : ""}
            </article>
          `).join("")}
        </div>
      </section>` : "";
  const content = `${scheduleHtml}${playoffBracketHtml}`;
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

function columnHasPageData(rows, key) {
  const detailRows = rows.some((row) => row.__isCareer) ? rows.filter((row) => !row.__isCareer) : rows;
  return detailRows.some((row) => {
    if (isUnavailableValue(row, key)) return false;
    const value = row[key];
    if (value === null || typeof value === "undefined") return false;
    if (typeof value === "number") return Number.isFinite(value);
    if (typeof value === "string") return value.trim() !== "" && value.trim().toLowerCase() !== "n/a";
    return true;
  });
}

function pageColumns(rows, columns) {
  if (!rows.length) return columns;
  const impliedSeason = state.page.type === "dashboard"
    && !isLifetimeView()
    && !isPlayoffSeason(state.season)
    && ["teams", "players"].includes(state.view);
  return columns.filter(([key]) => {
    if (key === "season" && (impliedSeason || state.page.type === "playerSeason" || state.page.type === "team")) return false;
    if (key === "teamsText" && state.page.type === "team" && state.page.season !== "Lifetime") return false;
    return columnHasPageData(rows, key);
  });
}

function renderTable(rows, columns, title, rowAction = null) {
  const visibleColumns = pageColumns(rows, columns);
  const table = els.head.closest("table");
  table.classList.remove("leader-card-table");
  table.classList.toggle("award-history-table", title === "Awards History");
  table.classList.toggle("playoff-bracket-table", title.includes("Bracket") || title.includes("Championship Games"));
  table.classList.toggle("award-race-table", title === "Contenders");
  els.head.closest(".table-wrap").classList.remove("leader-card-wrap");
  els.tableTitle.textContent = title;
  els.rowCount.textContent = `${rows.length} ${rows.length === 1 ? "row" : "rows"}`;
  renderTableLegend(rows, visibleColumns);
  els.head.innerHTML = `<tr>${visibleColumns.map(([key, label]) => `
    <th data-sort="${key}" class="col-${key}${state.sortKey === key ? ` sorted-column` : ""}">${label}${state.sortKey === key ? (state.sortDir === "asc" ? " ^" : " v") : ""}</th>
  `).join("")}</tr>`;
  els.body.innerHTML = rows.map((row) => {
    const action = rowAction ? rowAction(row) : null;
    const attrs = action ? ` class="clickable" data-action="${encodeURIComponent(JSON.stringify(action))}"` : "";
    return `<tr${attrs}>${visibleColumns.map(([key]) => {
    const percent = key === "winPct" || key === "matchWinPct" || key === "gameWinPct" || key === "shootingPct" || key === "missPct" || key === "teamSaveRate" || key === "opponentShootingPct";
    const nameKeys = new Set(["name", "team", "opponent", "player", "teamA", "teamB", "captain", "pick1", "pick2"]);
    const isPlayoffTeam = (key === "teamA" || key === "teamB") && row.round && row.teamA && row.teamB;
    const raw = nameKeys.has(key) ? displayName(row[key], key === "teamA" || key === "teamB" || key === "team" ? "team" : "name") : row[key];
    let value = isUnavailableValue(row, key) ? "n/a" : (key === "season" ? `<span class="pill">${escapeHtml(raw)}</span>` : escapeHtml(fmtStat(raw, key, percent ? "%" : "")));
    if (isPlayoffTeam) value = playoffTeamMarkup(row, key);
    if (action?.type === "playoffSeries" && key === "round") {
      value = `<button type="button" class="table-drilldown" data-action="${encodeURIComponent(JSON.stringify(action))}"><strong>${value}</strong><span>View games</span></button>`;
    }
    if (row.__careerHighs?.has(key)) value = `<em class="career-high">${value}</em>`;
    if (row.__leagueLeaders?.has(key)) value = `<strong class="season-leader">${value}</strong>`;
    if (row.__gtrlsRecords?.has(key)) value = `${value}<sup class="season-record">*</sup>`;
    const classes = [`col-${key}`];
    if (state.sortKey === key) classes.push("sorted-column");
    return `<td class="${classes.join(" ")}">${value}</td>`;
  }).join("")}</tr>`;
  }).join("");
}

function renderTableLegend(rows, columns = []) {
  const visibleKeys = new Set(columns.map(([key]) => key));
  const hasVisibleMark = (row, marker) => [...(row[marker] || [])].some((key) => visibleKeys.has(key));
  const hasCareerHigh = rows.some((row) => hasVisibleMark(row, "__careerHighs"));
  const hasLeagueLeader = rows.some((row) => hasVisibleMark(row, "__leagueLeaders"));
  const hasGtrlsRecord = rows.some((row) => hasVisibleMark(row, "__gtrlsRecords"));
  const items = [];
  if (hasLeagueLeader) items.push(`<span><strong class="season-leader">Bold</strong> led GTRLS</span>`);
  if (hasCareerHigh) items.push(`<span><em class="career-high">Italic</em> career high</span>`);
  if (hasGtrlsRecord) items.push(`<span><sup class="season-record">*</sup> GTRLS record</span>`);
  els.tableLegend.innerHTML = items.join("");
  els.tableLegend.classList.toggle("hidden", items.length === 0);
}

function render() {
  const inDetail = state.page.type !== "dashboard";
  if (state.view === "kitchen") state.analyticsMode = "selena";
  if (state.view === "yourKitchen") state.analyticsMode = "your";
  renderSeasonOptions();
  syncTabButtons();
  applyTeamPageTheme();
  els.detailBar.classList.toggle("hidden", !inDetail);
  els.excludeTwosControl.classList.toggle("hidden", !isLifetimeView());
  document.querySelector(".kpis").classList.toggle("hidden", inDetail || isPlayoffSeason(state.season) || state.season === "World Cup" || !["teams", "players", "lifetimeTeams", "lifetimePlayers"].includes(state.view));
  document.querySelector(".figures").classList.add("hidden");
  document.querySelector(".leaderboards").classList.add("hidden");
  els.tableShell.classList.remove("hidden");
  els.kitchenPanel.classList.add("hidden");
  els.kitchenPanel.innerHTML = "";
  els.teamInfoPanel.classList.add("hidden");
  els.teamInfoPanel.innerHTML = "";
  els.yourKitchenPanel.classList.add("hidden");
  els.yourKitchenPanel.innerHTML = "";
  const showAnalyticsToggle = !inDetail && (state.view === "kitchen" || state.view === "yourKitchen");
  els.analyticsModeControl.classList.toggle("hidden", !showAnalyticsToggle);
  els.analyticsModeControl.querySelectorAll("[data-analytics-mode]").forEach((button) => button.classList.toggle("active", button.dataset.analyticsMode === state.analyticsMode));
  els.awardFilters.classList.add("hidden");
  els.awardFilters.innerHTML = "";
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

  if (state.view === "awards") {
    renderKpis([]);
    renderTable(sortRows(awardHistoryRows()), awardHistoryColumns, "Awards History", dashboardAction);
    renderAwardFilters();
    renderPlayoffStats();
    return;
  }

  if (state.view === "kitchen") {
    renderKpis([]);
    els.tableShell.classList.add("hidden");
    renderKitchen();
    renderPlayoffStats();
    return;
  }

  if (state.view === "teamInfo") {
    renderKpis([]);
    els.tableShell.classList.add("hidden");
    els.playoffStats.classList.add("hidden");
    els.playoffStats.innerHTML = "";
    renderTeamInfoPage();
    return;
  }

  if (state.view === "yourKitchen") {
    renderKpis([]);
    els.tableShell.classList.add("hidden");
    els.playoffStats.classList.add("hidden");
    els.playoffStats.innerHTML = "";
    renderYourKitchen();
    return;
  }

  if (isPlayoffSeason(state.season) && playoffBracketRows(state.season).length) {
    const bracketRows = playoffBracketRows(state.season);
    const bracketColumns = bracketRows.some((row) => row.game || row.series || row.mvp) ? detailedPlayoffColumns : playoffColumns;
    renderKpis([]);
    renderTable(bracketRows, bracketColumns, `${state.season} Bracket`, playoffSeriesAction);
    renderPlayoffStats();
    return;
  }

  if (state.view === "standings") {
    renderKpis([]);
    renderTable(sortRows(standingsRows()), standingsColumns, state.season === "All" ? "All Season Standings" : `${state.season} Standings`, (row) => ({ type: "team", team: row.name, season: row.season }));
    renderPlayoffStats();
    return;
  }

  const rows = rowsForView();
  renderKpis(rows);
  renderTable(rows, columnsForView(), dashboardTitle(), dashboardAction);
  renderPlayoffStats();
}

els.seasonSelect.addEventListener("change", (event) => {
  const selected = event.target.value;
  state.page = { type: "dashboard" };
  if (selected === "Lifetime") {
    if (navViewForState() === "teams") state.view = "lifetimeTeams";
    else if (navViewForState() === "players") state.view = "lifetimePlayers";
    state.season = "Lifetime";
    state.seasonPhase = "regular";
    render();
    return;
  }
  if (state.view === "lifetimeTeams") state.view = "teams";
  if (state.view === "lifetimePlayers") state.view = "players";
  state.season = state.seasonPhase === "playoffs" && hasPlayoffSeason(selected) ? playoffSeasonName(selected) : selected;
  if (state.season === "World Cup" && (state.view === "teams" || state.view === "players")) {
    state.view = "standings";
    state.sortKey = "standingsRank";
    state.sortDir = "asc";
  }
  render();
});

els.seasonPhaseControl.addEventListener("click", (event) => {
  const button = event.target.closest("[data-season-phase]");
  if (!button || button.disabled || els.seasonSelect.value === "Lifetime") return;
  state.seasonPhase = button.dataset.seasonPhase;
  state.page = { type: "dashboard" };
  const base = els.seasonSelect.value;
  state.season = state.seasonPhase === "playoffs" && hasPlayoffSeason(base) ? playoffSeasonName(base) : base;
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

els.excludeTwosEra.addEventListener("change", (event) => {
  state.excludeTwosEra = event.target.checked;
  render();
});

els.tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.page = { type: "dashboard" };
    const requestedView = button.dataset.view;
    if (requestedView === "teams") state.view = els.seasonSelect.value === "Lifetime" ? "lifetimeTeams" : "teams";
    else if (requestedView === "players") state.view = els.seasonSelect.value === "Lifetime" ? "lifetimePlayers" : "players";
    else if (requestedView === "analytics") state.view = state.analyticsMode === "your" ? "yourKitchen" : "kitchen";
    else state.view = requestedView;
    if (!["teams", "players", "lifetimeTeams", "lifetimePlayers"].includes(state.view) && isLifetimeView()) {
      state.season = latestRegularSeason();
      state.seasonPhase = "regular";
    }
    if (state.season === "Lifetime" && !isLifetimeView()) {
      state.season = latestRegularSeason();
      state.seasonPhase = "regular";
    }
    state.sortKey = state.view === "awards" || state.view === "kitchen" || state.view === "yourKitchen" ? "season" : (state.view === "standings" ? "standingsRank" : (isTeamView() ? "wins" : "goals"));
    state.sortDir = "desc";
    if (state.view === "standings") state.sortDir = "asc";
    render();
  });
});

els.analyticsModeControl.addEventListener("click", (event) => {
  const button = event.target.closest("[data-analytics-mode]");
  if (!button) return;
  state.analyticsMode = button.dataset.analyticsMode;
  state.view = state.analyticsMode === "your" ? "yourKitchen" : "kitchen";
  state.page = { type: "dashboard" };
  render();
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
  } else if (state.page.type === "draft") {
    state.page = { type: "dashboard" };
    state.sortKey = isTeamView() ? "wins" : "goals";
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
  } else if (action.type === "draft") {
    state.sortKey = "draftOrder";
    state.sortDir = "asc";
  }
  render();
});

document.querySelector(".kpis").addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = JSON.parse(decodeURIComponent(target.dataset.action));
  if (action.type === "sort") {
    state.page = { type: "dashboard" };
    state.sortKey = action.key;
    state.sortDir = action.dir || "desc";
  } else {
    state.page = action;
    state.sortKey = "rank";
    state.sortDir = "asc";
  }
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

els.teamInfoPanel.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  state.page = JSON.parse(decodeURIComponent(target.dataset.action));
  state.sortKey = "goals";
  state.sortDir = "desc";
  render();
});

els.yourKitchenPanel.addEventListener("input", (event) => {
  if (event.target.id === "yourVariableName") state.yourKitchenVariableName = event.target.value;
  if (event.target.id === "yourVariableFormula") state.yourKitchenFormula = event.target.value;
});

els.yourKitchenPanel.addEventListener("change", (event) => {
  if (event.target.id === "yourKitchenEntity") {
    state.yourKitchenEntity = event.target.value;
    state.yourKitchenTeam = "All";
    state.yourKitchenMember = "All";
    state.yourKitchenX = "";
    state.yourKitchenY = "";
    render();
  } else if (event.target.id === "yourKitchenTeam") {
    state.yourKitchenTeam = event.target.value;
    state.yourKitchenMember = "All";
    render();
  } else if (event.target.id === "yourKitchenMember") {
    state.yourKitchenMember = event.target.value;
    render();
  } else if (event.target.id === "yourKitchenX") {
    state.yourKitchenX = event.target.value;
    render();
  } else if (event.target.id === "yourKitchenY") {
    state.yourKitchenY = event.target.value;
    render();
  } else if (event.target.id === "yourFormulaStat" && event.target.value) {
    const input = els.yourKitchenPanel.querySelector("#yourVariableFormula");
    state.yourKitchenFormula = `${state.yourKitchenFormula}${state.yourKitchenFormula.trim() ? " " : ""}${event.target.value}`;
    input.value = state.yourKitchenFormula;
    input.focus();
    event.target.value = "";
  }
});

els.yourKitchenPanel.addEventListener("click", (event) => {
  if (event.target.closest("[data-create-variable]")) {
    createYourKitchenVariable();
    return;
  }
  const chartButton = event.target.closest("[data-your-chart]");
  if (chartButton) {
    state.yourKitchenChart = chartButton.dataset.yourChart;
    render();
    return;
  }
  const tokenButton = event.target.closest("[data-formula-token]");
  if (tokenButton) {
    const token = tokenButton.dataset.formulaToken;
    const input = els.yourKitchenPanel.querySelector("#yourVariableFormula");
    const spacer = state.yourKitchenFormula && !state.yourKitchenFormula.endsWith(" ") && token !== ")" ? " " : "";
    state.yourKitchenFormula = `${state.yourKitchenFormula}${spacer}${token}${token === "(" ? "" : " "}`;
    input.value = state.yourKitchenFormula;
    input.focus();
    return;
  }
  const deleteButton = event.target.closest("[data-delete-variable]");
  if (deleteButton) {
    state.yourKitchenVariables = state.yourKitchenVariables.filter((variable) => variable.key !== deleteButton.dataset.deleteVariable);
    state.yourKitchenError = "";
    render();
  }
});

els.yourKitchenPanel.addEventListener("submit", (event) => {
  if (event.target.id !== "yourVariableForm") return;
  event.preventDefault();
  createYourKitchenVariable();
});

els.kitchenPanel.addEventListener("click", (event) => {
  const sortHeader = event.target.closest("[data-kitchen-sort]");
  if (sortHeader) {
    const key = sortHeader.dataset.kitchenSort;
    if (state.kitchenSortKey === key) {
      state.kitchenSortDir = state.kitchenSortDir === "asc" ? "desc" : "asc";
    } else {
      state.kitchenSortKey = key;
      state.kitchenSortDir = key === "name" || key === "teamsText" ? "asc" : "desc";
    }
    render();
    return;
  }
  const target = event.target.closest("[data-kitchen-player]");
  if (!target) return;
  state.kitchenSelectedPlayer = target.dataset.kitchenPlayer || "";
  updateKitchenSelection(state.kitchenSelectedPlayer);
});

els.kitchenPanel.addEventListener("mouseover", (event) => {
  const dot = event.target.closest(".kitchen-dot[data-kitchen-player]");
  if (!dot) return;
  updateKitchenSelection(dot.dataset.kitchenPlayer, { temporary: true });
});

els.kitchenPanel.addEventListener("mouseout", (event) => {
  const dot = event.target.closest(".kitchen-dot[data-kitchen-player]");
  if (!dot || dot.contains(event.relatedTarget)) return;
  clearKitchenHover();
});

els.kitchenPanel.addEventListener("focusin", (event) => {
  const dot = event.target.closest(".kitchen-dot[data-kitchen-player]");
  if (!dot) return;
  updateKitchenSelection(dot.dataset.kitchenPlayer, { temporary: true });
});

els.kitchenPanel.addEventListener("focusout", (event) => {
  const dot = event.target.closest(".kitchen-dot[data-kitchen-player]");
  if (!dot) return;
  clearKitchenHover();
});

els.detailExtras.addEventListener("click", (event) => {
  const awardFilter = event.target.closest("[data-award-filter]");
  if (awardFilter) {
    state.awardFilter = awardFilter.dataset.awardFilter;
    state.page = { type: "dashboard" };
    render();
    return;
  }
  const awardSeasonFilter = event.target.closest("[data-award-season-filter]");
  if (awardSeasonFilter) {
    state.awardSeasonFilter = awardSeasonFilter.dataset.awardSeasonFilter;
    state.page = { type: "dashboard" };
    render();
    return;
  }
  const target = event.target.closest("[data-action]");
  if (!target) return;
  state.page = JSON.parse(decodeURIComponent(target.dataset.action));
  if (state.page.type === "draft") {
    state.sortKey = "draftOrder";
    state.sortDir = "asc";
  } else if (state.page.type === "player") {
    state.sortKey = "season";
    state.sortDir = "asc";
  } else if (state.page.type === "seasonLeaders") {
    state.sortKey = "stat";
    state.sortDir = "asc";
  }
  render();
});

els.awardFilters.addEventListener("click", (event) => {
  const awardFilter = event.target.closest("[data-award-filter]");
  const awardSeasonFilter = event.target.closest("[data-award-season-filter]");
  if (!awardFilter && !awardSeasonFilter) return;
  if (awardFilter) state.awardFilter = awardFilter.dataset.awardFilter;
  if (awardSeasonFilter) state.awardSeasonFilter = awardSeasonFilter.dataset.awardSeasonFilter;
  state.page = { type: "dashboard" };
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
els.excludeTwosEra.checked = state.excludeTwosEra;
renderSeasonOptions();
render();
