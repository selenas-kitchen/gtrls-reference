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
  ["DUKEOFDOPE", "DukeofDope7"],
  ["DUKEOFDOPE7", "DukeofDope7"],
  ["GARCIA", "DukeofDope7"],
  ["JOSH", "Joshhh_RL"],
  ["EPONTIOUS", "EPo -_-"],
  ["SKITTLEZ", "SirSkittleZ"],
  ["JAR", "JulietAlphaRomeo"],
  ["WAXYSAUSAGE9", "MJD22-_-"],
  ["MERKWRM", "MerkWTM"],
  ["MERKWTM", "MerkWTM"],
  ["RAVENGLITCH", "Ravenglitch"],
  ["EPO", "EPo -_-"],
  ["SQUID", "KWNSquid"],
  ["SQUIRT", "Ramen"],
  ["STARZYRL", "ttv_starzyrl"],
  ["SIRVANTZ", "Sir_vantzzz"],
  ["SIRVANTZZ", "Sir_vantzzz"],
  ["SIRVANTZZZ", "Sir_vantzzz"],
  ["VANTZ", "Sir_vantzzz"],
  ["VANTTZZ", "Sir_vantzzz"],
  ["VIZPICK", "Vizpick"],
  ["BURT", "Ravenglitch"],
  ["NEMHYROSHI", "Hyroshi"],
  ["TGSLOSTMOSS", "TGS_Lostmoss"],
  ["PILOTSG1", "Pilot_SG1"],
]);

const teamAliasMap = new Map([
  ["GIGASINPARIS", "Giga's In Paris"],
  ["BESTFRIENDCLUB", "Best Friends Club"],
  ["BESTFRIENDSCLUB", "Best Friends Club"],
  ["HOOKLINEBLINKER", "Hook Line & Blinker"],
  ["HOOKLINEANDBLINKER", "Hook Line & Blinker"],
  ["HLBLINKER", "Hook Line & Blinker"],
  ["HLB", "Hook Line & Blinker"],
  ["BALLCHASINSAUCETASTIN", "Ball Chasin & Sauce Tastin"],
  ["BALLCHASINANDSAUCETASTIN", "Ball Chasin & Sauce Tastin"],
  ["BCST", "Ball Chasin & Sauce Tastin"],
  ["BCANDST", "Ball Chasin & Sauce Tastin"],
  ["SPIRITAIRLINES", "Spirit Airlines"],
  ["THECOX", "The Cox"],
  ["PASTOURPRIME", "Past Our Prime"],
  ["POP", "Past Our Prime"],
  ["QUACKWOK", "Quack Wok"],
  ["QUACKWOKS", "Quack Wok"],
  ["CROSSBARCARTEL", "Crossbar Cartel"],
  ["BFC", "Best Friends Club"],
  ["DECEPTITARDS", "Deceptitards"],
  ["DEC", "Deceptitards"],
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
  ["BBB", "BBB"],
  ["BMM", "BMM"],
  ["REDROCKETSSC", "RED ROCKETS SC"],
  ["REDROCKETS", "RED ROCKETS SC"],
  ["RRSC", "RED ROCKETS SC"],
  ["MIDWESTCORNSTARS", "MIDWEST CORNSTARS"],
  ["MC", "MIDWEST CORNSTARS"],
  ["3FURY", "Three Inch Fury"],
  ["THREEINCHFURY", "Three Inch Fury"],
  ["PASSINGS4WIMPS", "Passing's 4 Wimps SC"],
  ["PASSINGS4WIMPSSC", "Passing's 4 Wimps SC"],
  ["TEAMCOOL", "COOL"],
  ["DONALDBUMPS", "THE DONALD BUMPS"],
  ["THEDONALDBUMPS", "THE DONALD BUMPS"],
  ["LAMPLIGHTERS", "THE LAMPLIGHTERS"],
  ["THELAMPLIGHTERS", "THE LAMPLIGHTERS"],
  ["TL", "THE LAMPLIGHTERS"],
  ["SYNDICATEOSCALYWAGS", "SYNDICATE O' SCALLYWAGS"],
  ["SYNDICATEOSCALLLYWAGS", "SYNDICATE O' SCALLYWAGS"],
  ["SYNDICATEOSCALLWAGS", "SYNDICATE O' SCALLYWAGS"],
  ["DEADINTHEWATER", "DEAD IN THE WATER"],
  ["THEGRAVYSTAINBOYS", "GRAVY STAIN BOYS"],
  ["GRAVYSTAINBOYS", "GRAVY STAIN BOYS"],
  ["GSB", "GRAVY STAIN BOYS"],
  ["THEWINDIXIES", "WIN-DIXIES"],
  ["WINDIXIES", "WIN-DIXIES"],
  ["WD", "WIN-DIXIES"],
  ["EW", "EPSTEIN'S WAITLIST"],
  ["EPSTEINSWAITLIST", "EPSTEIN'S WAITLIST"],
  ["TC", "COOL"],
  ["MEGAWATT", "MEGAWATT"],
  ["MW", "MEGAWATT"],
  ["SJ", "SMOOTH JIZZ"],
  ["SMOOTHJIZZ", "SMOOTH JIZZ"],
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
  view: "home",
  season: latestRegularSeason(),
  searchText: "",
  sortKey: "wins",
  sortDir: "desc",
  includeScrims: false,
  excludeTwosEra: false,
  excludeThreesEra: false,
  seasonPhase: "regular",
  s5Stage: "overall",
  s5Pool: "overall",
  s6Stage: "overall",
  s6Pool: "overall",
  scheduleTeamFilter: "All",
  scheduleUnplayedOnly: false,
  playerRoleFilter: "All",
  showMatchupPreview: false,
  analyticsMode: "selena",
  archiveMode: "awards",
  awardFilter: "All",
  awardSeasonFilter: "All",
  milestoneFilter: "All",
  recordEra: "3s",
  recordScope: "season",
  recordEntity: "players",
  kitchenSelectedPlayer: "",
  kitchenTeamFilter: "All",
  kitchenRoleFilter: "All",
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
  csvImportMessage: "",
  csvImportBusy: false,
  page: { type: "dashboard" },
  previousContext: null,
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
  ["pool", "Pool"],
  ["name", "Team"],
  ["matchRecord", "Match Record"],
  ["matchesBack", "Matches Back"],
  ["standingsPoints", "Score"],
  ["goalDiff", "Goal +/-"],
  ["gameRecord", "Game Record"],
  ["matchWinPct", "Match Win %"],
  ["gameWinPct", "Game Win %"],
  ["sweepsText", "SWPS-GM5L"],
  ["accruedBonuses", "Accrued Bonuses"],
  ["remainingMatches", "Remaining Matches"],
  ["maxScore", "Max Score"],
  ["wins", "Match Wins"],
  ["losses", "Match Losses"],
  ["gameWins", "Game Wins"],
  ["gameLosses", "Game Losses"],
  ["sweeps", "Sweeps"],
  ["gameFiveLosses", "Game 5 Losses"],
];

const scheduleColumns = [
  ["stage", "Stage"],
  ["pool", "Pool"],
  ["round", "Round"],
  ["team", "Home"],
  ["result", "Result"],
  ["opponent", "Away"],
  ["note", "Status"],
  ["vod", "VOD"],
];

const scheduleSeriesColumns = [
  ["game", "Game"],
  ["date", "Date"],
  ["team", "Home"],
  ["result", "Result"],
  ["opponent", "Away"],
  ["winner", "Winner"],
  ["note", "Status"],
];

const scheduleGamePlayerColumns = [
  ["team", "Team"],
  ["name", "Player"],
  ["result", "Result"],
  ["score", "Score"],
  ["goals", "G"],
  ["assists", "A"],
  ["saves", "Sv"],
  ["shots", "Sh"],
  ["shootingPct", "Shot %"],
  ["amountStolen", "Stolen"],
  ["demosInflicted", "Demo"],
];

const matchupComparisonStats = [
  ["avgScore", "Score/G"],
  ["perPerGame", "PER/G"],
  ["goalsPerGame", "GL/G"],
  ["goalsConcededPerGame", "GA/G"],
  ["shotsPerGame", "SH/G"],
  ["shotsConcededPerGame", "ShA/G"],
  ["teamSaveRate", "Save %"],
  ["shootingPct", "Shot %"],
  ["opponentShootingPct", "Opp Shot %"],
];

const s6Pools = {
  "Giga's In Paris": "Gravy",
  "Hook Line & Blinker": "Gravy",
  "ESC": "Gravy",
  "Quack Wok": "Gravy",
  "Best Friends Club": "Gravy",
  "Spirit Airlines": "Gravy",
  "Past Our Prime": "Train",
  "The Cox": "Train",
  "Ball Chasin & Sauce Tastin": "Train",
  "Supernova Abyss": "Train",
  "Crossbar Cartel": "Train",
  "Deceptitards": "Train",
};

const s6PoolRanks = {
  "Hook Line & Blinker": 1,
  "Giga's In Paris": 2,
  "Quack Wok": 3,
  "Best Friends Club": 4,
  "ESC": 5,
  "Spirit Airlines": 6,
  "Past Our Prime": 1,
  "Supernova Abyss": 2,
  "The Cox": 3,
  "Ball Chasin & Sauce Tastin": 4,
  "Crossbar Cartel": 5,
  "Deceptitards": 6,
};

const s6PoolClinches = {
  "Hook Line & Blinker": "X",
};

const s6AccruedBonuses = {
  "Hook Line & Blinker": 3,
  "Past Our Prime": 3,
  "Giga's In Paris": 2,
  "The Cox": 2,
  "Supernova Abyss": 2,
  "Ball Chasin & Sauce Tastin": 1,
  "ESC": 1,
  "Quack Wok": 2,
  "Best Friends Club": 1,
  "Spirit Airlines": 0,
  "Crossbar Cartel": 1,
  "Deceptitards": 0,
};

const s6SwissByePoints = {
  "Hook Line & Blinker": 2,
  "The Cox": 2,
  "ESC": 2,
};

const s6SeasonScoreOverrides = {
  "Hook Line & Blinker": 19,
  "Past Our Prime": 17,
  "The Cox": 17,
  "Supernova Abyss": 14,
  "Ball Chasin & Sauce Tastin": 13,
  "Giga's In Paris": 12,
  "ESC": 11,
  "Quack Wok": 13,
  "Best Friends Club": 7,
  "Crossbar Cartel": 4,
  "Spirit Airlines": 4,
  "Deceptitards": 4,
};

const s6OverallStandingsRows = [
  ["Hook Line & Blinker", 1, 19, "7 - 0", 39, "21 - 8", 2, 0, 3],
  ["Past Our Prime", 2, 17, "6 - 1", 15, "20 - 12", 1, 1, 3],
  ["The Cox", 3, 17, "5 - 2", 22, "18 - 8", 4, 1, 2],
  ["Supernova Abyss", 4, 14, "4 - 3", 3, "16 - 12", 2, 2, 2],
  ["Ball Chasin & Sauce Tastin", 5, 13, "4 - 3", 12, "18 - 14", 1, 3, 1],
  ["Giga's In Paris", 6, 12, "4 - 3", 10, "13 - 11", 2, 0, 2],
  ["ESC", 7, 11, "4 - 3", 16, "13 - 13", 2, 0, 1],
  ["Quack Wok", 8, 13, "4 - 4", -10, "17 - 17", 1, 2, 2],
  ["Best Friends Club", 9, 7, "2 - 4", -32, "11 - 16", 0, 2, 1],
  ["Spirit Airlines", 10, 4, "1 - 5", -26, "7 - 16", 0, 2, 0],
  ["Crossbar Cartel", 11, 4, "1 - 5", -27, "6 - 17", 0, 1, 1],
  ["Deceptitards", 12, 4, "0 - 7", -15, "10 - 21", 0, 4, 0],
];

const poolTiebreakRules = [
  "Match record",
  "League Score",
  "Head-to-head",
];

const s5SplitPools = {
  split1: {
    "Big Musty Milkers": "Gravy",
    "Bird Bath Bombers": "Gravy",
    "Milk Before Cereal": "Gravy",
    "Pitch Pirates": "Gravy",
    "The Hornets": "Gravy",
    "Triple Scoop": "Train",
    "Weenie Hut Jrs": "Train",
    "Wouldabeendope": "Train",
    "Danger Pings": "Train",
    "D' n' the V's": "Train",
  },
  split2: {
    "Weenie Hut Jrs": "Gravy",
    "Triple Scoop": "Gravy",
    "Big Musty Milkers": "Gravy",
    "Milk Before Cereal": "Gravy",
    "Wouldabeendope": "Gravy",
    "The Hornets": "Train",
    "Pitch Pirates": "Train",
    "Bird Bath Bombers": "Train",
    "D' n' the V's": "Train",
    "Danger Pings": "Train",
  },
};

const s6OverallTeamRows = [
  ["Best Friends Club", 1037.6, -25, 24, 21960, 40, 65, 24, 108, 142, 201, 6.6, 0.28, 7, 2, 3, 11, 13, 0, 2],
  ["Hook Line & Blinker", 1096.1, 33, 20, 22264, 63, 30, 43, 64, 161, 110, 8.3, 0.42, 15, 5, 0, 15, 5, 2, 0],
  ["Crossbar Cartel", 1023.2, -21, 20, 17630, 32, 53, 18, 75, 112, 164, 4.2, 0.21, 4, 1, 4, 6, 14, 0, 1],
  ["Ball Chasin & Sauce Tastin", 1071.7, 5, 24, 23949, 57, 52, 42, 78, 183, 156, 7.6, 0.32, 9, 3, 2, 13, 11, 0, 2],
  ["Spirit Airlines", 1037.5, -21, 20, 18150, 40, 61, 22, 69, 127, 162, 5.0, 0.25, 4, 1, 4, 7, 13, 0, 2],
  ["The Cox", 1068.3, 11, 20, 22557, 62, 51, 36, 70, 165, 144, 8.3, 0.42, 11, 3, 2, 12, 8, 2, 1],
  ["Past Our Prime", 1084.6, 12, 24, 27277, 65, 53, 56, 90, 177, 171, 9.9, 0.41, 13, 5, 0, 15, 9, 0, 0],
  ["Quack Wok", 1055.1, -3, 22, 20539, 44, 47, 31, 78, 140, 155, 6.0, 0.27, 9, 2, 3, 11, 11, 1, 2],
  ["Giga's In Paris", 1051.2, 8, 18, 17453, 43, 35, 24, 52, 152, 106, 5.1, 0.28, 9, 3, 2, 10, 8, 1, 0],
  ["Deceptitards", 1027.7, -7, 22, 21753, 51, 58, 31, 77, 153, 170, 6.7, 0.31, 3, 0, 5, 7, 15, 0, 3],
  ["Supernova Abyss", 1075.0, 0, 22, 21247, 46, 46, 32, 73, 162, 147, 6.1, 0.28, 11, 3, 2, 13, 9, 1, 2],
  ["ESC", 1046.6, 10, 18, 18372, 49, 39, 28, 59, 139, 124, 6.2, 0.35, 6, 2, 3, 7, 11, 1, 0],
];

const s6OverallPlayerRows = [
  ["Best Friends Club", "I_have_a_bag", 24, 8656, 15, 7, 43, 60, 2.9, 0.12, 6, 1143],
  ["Best Friends Club", "greenarrowspark2", 24, 7171, 13, 10, 32, 42, 2.0, 0.08, 2, 968],
  ["Best Friends Club", "thelakeeffekt", 24, 6133, 12, 7, 33, 40, 1.8, 0.07, 3, 959],
  ["Hook Line & Blinker", "Ramen", 20, 8893, 26, 15, 23, 55, 3.4, 0.17, 9, 1200],
  ["Hook Line & Blinker", "Bubbles3913", 20, 8655, 27, 16, 27, 65, 4.0, 0.20, 6, 1120],
  ["Hook Line & Blinker", "NeonLightning20", 20, 4716, 10, 12, 14, 41, 0.9, 0.05, 0, 857],
  ["Crossbar Cartel", "Vizpick", 20, 7314, 12, 9, 29, 43, 2.0, 0.10, 4, 1202],
  ["Crossbar Cartel", "MJD22-_-", 20, 6110, 13, 4, 28, 45, 1.8, 0.09, 2, 1075],
  ["Crossbar Cartel", "sir_vantzzz", 20, 4206, 7, 5, 18, 24, 0.4, 0.02, 0, 820],
  ["Ball Chasin & Sauce Tastin", "CROCOKYLE", 24, 9457, 15, 21, 31, 75, 3.0, 0.12, 8, 1213],
  ["Ball Chasin & Sauce Tastin", "Pilot_SG1", 24, 7337, 23, 7, 20, 64, 2.2, 0.09, 4, 1011],
  ["Ball Chasin & Sauce Tastin", "TGS_Lostmoss", 24, 7155, 19, 14, 27, 44, 2.4, 0.10, 1, 965],
  ["Spirit Airlines", "JAR", 20, 8456, 19, 10, 33, 61, 3.2, 0.16, 6, 1232],
  ["Spirit Airlines", "dailcowgs94", 20, 6765, 16, 9, 29, 42, 2.4, 0.12, 1, 1078],
  ["Spirit Airlines", "MadJanitor88", 20, 2929, 5, 3, 7, 24, -0.6, -0.03, 0, 855],
  ["The Cox", "roo", 20, 11306, 33, 14, 37, 91, 5.4, 0.27, 9, 1248],
  ["The Cox", "CoalTrainLLC", 20, 7781, 26, 10, 20, 59, 3.0, 0.15, 3, 1111],
  ["The Cox", "Hyroshi", 20, 3470, 3, 12, 13, 15, -0.1, 0.00, 0, 819],
  ["Past Our Prime", "RoyalxRenegade", 24, 12270, 34, 16, 35, 86, 5.0, 0.21, 12, 1262],
  ["Past Our Prime", "AtownSteelers", 24, 8396, 18, 22, 32, 53, 3.2, 0.13, 1, 1009],
  ["Past Our Prime", "MerkWTM", 24, 6611, 13, 18, 23, 38, 1.7, 0.07, 2, 872],
  ["Quack Wok", "Original_6_Hawks", 22, 9617, 32, 6, 29, 62, 3.9, 0.18, 8, 1301],
  ["Quack Wok", "godfatherjones", 22, 6717, 6, 12, 33, 50, 1.7, 0.08, 3, 1125],
  ["Quack Wok", "LIL HATED ONE", 22, 4205, 6, 13, 16, 28, 0.4, 0.02, 0, 782],
  ["Giga's In Paris", "Aximov", 18, 7877, 23, 7, 21, 76, 3.0, 0.17, 5, 1315],
  ["Giga's In Paris", "Selenagomez415", 18, 5977, 12, 8, 19, 59, 1.7, 0.09, 5, 1125],
  ["Giga's In Paris", "Mastergiga9", 18, 3599, 8, 9, 12, 17, 0.4, 0.02, 0, 728],
  ["Deceptitards", "MegatronMD", 22, 9139, 24, 10, 29, 72, 3.4, 0.15, 4, 1433],
  ["Deceptitards", "ravenglitch", 22, 7066, 18, 9, 22, 51, 2.0, 0.09, 3, 972],
  ["Deceptitards", "DukeofDope7", 22, 5548, 9, 12, 26, 30, 1.3, 0.06, 0, 830],
  ["Supernova Abyss", "KWNSquid", 22, 9325, 21, 9, 35, 68, 3.4, 0.15, 10, 1451],
  ["Supernova Abyss", "ttv_starzyrl", 22, 6951, 15, 14, 25, 47, 2.1, 0.10, 2, 952],
  ["Supernova Abyss", "MrStratty", 22, 4971, 10, 9, 13, 47, 0.6, 0.03, 1, 793],
  ["ESC", "Epontious", 18, 9027, 29, 9, 26, 73, 4.0, 0.22, 7, 1452],
  ["ESC", "SkittleZ", 18, 4061, 9, 4, 15, 27, 0.6, 0.03, 0, 962],
  ["ESC", "Clamp2much", 18, 5284, 11, 15, 18, 39, 1.6, 0.09, 0, 770],
];

const s6SwissTeamRows = [
  {
    name: "Giga's In Paris", rating: 1051.2, games: 3, score: 3792, goals: 10, goalsConceded: 4,
    assists: 5, saves: 16, shots: 28, shotsConceded: 21, wins: 1, losses: 0, gameWins: 3, gameLosses: 0,
    standingsPoints: 3, sweeps: 1, gameFiveLosses: 0, amountStolen: 4047, demosInflicted: 5, demosTaken: 7,
    opponentSavesForced: 15, per: 1.7, perPerGame: 0.57,
  },
  {
    name: "Crossbar Cartel", rating: 1023.2, games: 3, score: 2798, goals: 4, goalsConceded: 10,
    assists: 2, saves: 15, shots: 21, shotsConceded: 28, wins: 0, losses: 1, gameWins: 0, gameLosses: 3,
    standingsPoints: 0, sweeps: 0, gameFiveLosses: 0, amountStolen: 3665, demosInflicted: 7, demosTaken: 5,
    opponentSavesForced: 16, per: 0.81, perPerGame: 0.27,
  },
  {
    name: "ESC", rating: 1046.6, games: 3, score: 2891, goals: 7, goalsConceded: 3,
    assists: 4, saves: 9, shots: 21, shotsConceded: 14, wins: 1, losses: 0, gameWins: 3, gameLosses: 0,
    standingsPoints: 3, sweeps: 1, gameFiveLosses: 0, amountStolen: 3377, demosInflicted: 10, demosTaken: 8,
    opponentSavesForced: 11, per: 1.75, perPerGame: 0.58,
  },
  {
    name: "Supernova Abyss", rating: 1075.0, games: 3, score: 2409, goals: 3, goalsConceded: 7,
    assists: 2, saves: 12, shots: 14, shotsConceded: 21, wins: 0, losses: 1, gameWins: 0, gameLosses: 3,
    standingsPoints: 0, sweeps: 0, gameFiveLosses: 0, amountStolen: 4299, demosInflicted: 8, demosTaken: 10,
    opponentSavesForced: 9, per: 0.79, perPerGame: 0.26,
  },
];

const s6SwissPlayerRows = [
  ["Giga's In Paris", "Ax1mov", 3, 1764, 7, 1, 6, 12, 3, 2, 3, 1589, 1315],
  ["Giga's In Paris", "selena.", 3, 1301, 3, 2, 5, 9, 2, 3, 2, 1483, 1125],
  ["Giga's In Paris", "Mastergiga9", 3, 727, 0, 2, 5, 7, 0, 2, 0, 975, 728],
  ["Crossbar Cartel", "VizPick", 3, 1053, 1, 1, 5, 8, 1, 4, 1, 1706, 1202],
  ["Crossbar Cartel", "MJD22-_-", 3, 1126, 3, 1, 4, 11, 1, 0, 1, 1079, 1075],
  ["Crossbar Cartel", "Vanttzz", 3, 619, 0, 0, 6, 2, 5, 1, 0, 880, 820],
  ["ESC", "EPo -_-", 3, 1673, 7, 0, 3, 14, 2, 3, 0, 1380, 1452],
  ["ESC", "Clamp2much", 3, 546, 0, 2, 2, 4, 3, 3, 0, 746, 770],
  ["ESC", "SirSkittleZ", 3, 672, 0, 2, 4, 3, 5, 2, 0, 1251, 962],
  ["Supernova Abyss", "STARZY_RL", 3, 577, 0, 1, 4, 1, 4, 6, 0, 1254, 952],
  ["Supernova Abyss", "S-qui-d", 3, 1347, 2, 0, 7, 8, 2, 2, 0, 1829, 1451],
  ["Supernova Abyss", "MrStratty", 3, 485, 1, 1, 1, 5, 2, 2, 0, 1216, 793],
];

const s6SwissSeriesGameStats = [
  {
    season: "S6",
    stage: "Swiss",
    round: "Round 1",
    home: "Giga's In Paris",
    away: "Crossbar Cartel",
    games: [
      {
        id: "55877a95-7064-4c41-8749-c82ce55ae7e5",
        game: "Game 1",
        date: "2026-07-20",
        winner: "Giga's In Paris",
        teams: [
          { team: "Giga's In Paris", opponent: "Crossbar Cartel", result: "win", score: 1294, goals: 3, assists: 0, saves: 6, shots: 9, shotsConceded: 9, goalsConceded: 2, amountStolen: 1157, demosInflicted: 3, demosTaken: 3 },
          { team: "Crossbar Cartel", opponent: "Giga's In Paris", result: "loss", score: 1197, goals: 2, assists: 1, saves: 7, shots: 9, shotsConceded: 9, goalsConceded: 3, amountStolen: 1377, demosInflicted: 3, demosTaken: 3 },
        ],
        players: [
          { team: "Giga's In Paris", name: "Ax1mov", score: 581, goals: 1, assists: 0, saves: 3, shots: 4, amountStolen: 634, demosInflicted: 3, demosTaken: 1 },
          { team: "Giga's In Paris", name: "selena.", score: 543, goals: 2, assists: 0, saves: 2, shots: 4, amountStolen: 343, demosInflicted: 0, demosTaken: 1 },
          { team: "Giga's In Paris", name: "Mastergiga9", score: 170, goals: 0, assists: 0, saves: 1, shots: 1, amountStolen: 180, demosInflicted: 0, demosTaken: 1 },
          { team: "Crossbar Cartel", name: "MJD22-_-", score: 552, goals: 1, assists: 1, saves: 3, shots: 5, amountStolen: 356, demosInflicted: 0, demosTaken: 0 },
          { team: "Crossbar Cartel", name: "Vizpick", score: 481, goals: 1, assists: 0, saves: 3, shots: 3, amountStolen: 649, demosInflicted: 0, demosTaken: 2 },
          { team: "Crossbar Cartel", name: "Sir_vantzzz", score: 164, goals: 0, assists: 0, saves: 1, shots: 1, amountStolen: 372, demosInflicted: 3, demosTaken: 1 },
        ],
      },
      {
        id: "03193eed-2409-40c1-9c18-72a513002ddb",
        game: "Game 2",
        date: "2026-07-20",
        winner: "Giga's In Paris",
        teams: [
          { team: "Giga's In Paris", opponent: "Crossbar Cartel", result: "win", score: 1362, goals: 4, assists: 3, saves: 4, shots: 13, shotsConceded: 6, goalsConceded: 2, amountStolen: 1606, demosInflicted: 1, demosTaken: 4 },
          { team: "Crossbar Cartel", opponent: "Giga's In Paris", result: "loss", score: 1083, goals: 2, assists: 1, saves: 6, shots: 6, shotsConceded: 13, goalsConceded: 4, amountStolen: 985, demosInflicted: 4, demosTaken: 1 },
        ],
        players: [
          { team: "Giga's In Paris", name: "Ax1mov", score: 709, goals: 4, assists: 0, saves: 1, shots: 7, amountStolen: 468, demosInflicted: 0, demosTaken: 1 },
          { team: "Giga's In Paris", name: "selena.", score: 377, goals: 0, assists: 1, saves: 2, shots: 2, amountStolen: 715, demosInflicted: 1, demosTaken: 2 },
          { team: "Giga's In Paris", name: "Mastergiga9", score: 276, goals: 0, assists: 2, saves: 1, shots: 4, amountStolen: 423, demosInflicted: 0, demosTaken: 1 },
          { team: "Crossbar Cartel", name: "MJD22-_-", score: 444, goals: 2, assists: 0, saves: 1, shots: 4, amountStolen: 209, demosInflicted: 1, demosTaken: 0 },
          { team: "Crossbar Cartel", name: "Sir_vantzzz", score: 397, goals: 0, assists: 0, saves: 5, shots: 0, amountStolen: 181, demosInflicted: 2, demosTaken: 0 },
          { team: "Crossbar Cartel", name: "Vizpick", score: 242, goals: 0, assists: 1, saves: 0, shots: 2, amountStolen: 595, demosInflicted: 1, demosTaken: 1 },
        ],
      },
      {
        id: "d4791dcc-0875-4cb2-915c-92742819f90e",
        game: "Game 3",
        date: "2026-07-20",
        winner: "Giga's In Paris",
        teams: [
          { team: "Giga's In Paris", opponent: "Crossbar Cartel", result: "win", score: 1136, goals: 3, assists: 2, saves: 6, shots: 6, shotsConceded: 6, goalsConceded: 0, amountStolen: 1284, demosInflicted: 1, demosTaken: 0 },
          { team: "Crossbar Cartel", opponent: "Giga's In Paris", result: "loss", score: 518, goals: 0, assists: 0, saves: 2, shots: 6, shotsConceded: 6, goalsConceded: 3, amountStolen: 1303, demosInflicted: 0, demosTaken: 1 },
        ],
        players: [
          { team: "Giga's In Paris", name: "Ax1mov", score: 474, goals: 2, assists: 1, saves: 2, shots: 1, amountStolen: 487, demosInflicted: 0, demosTaken: 0 },
          { team: "Giga's In Paris", name: "selena.", score: 381, goals: 1, assists: 1, saves: 1, shots: 3, amountStolen: 425, demosInflicted: 1, demosTaken: 0 },
          { team: "Giga's In Paris", name: "Mastergiga9", score: 281, goals: 0, assists: 0, saves: 3, shots: 2, amountStolen: 372, demosInflicted: 0, demosTaken: 0 },
          { team: "Crossbar Cartel", name: "Vizpick", score: 330, goals: 0, assists: 0, saves: 2, shots: 3, amountStolen: 462, demosInflicted: 0, demosTaken: 1 },
          { team: "Crossbar Cartel", name: "MJD22-_-", score: 130, goals: 0, assists: 0, saves: 0, shots: 2, amountStolen: 514, demosInflicted: 0, demosTaken: 0 },
          { team: "Crossbar Cartel", name: "Sir_vantzzz", score: 58, goals: 0, assists: 0, saves: 0, shots: 1, amountStolen: 327, demosInflicted: 0, demosTaken: 0 },
        ],
      },
    ],
  },
  {
    season: "S6",
    stage: "Swiss",
    round: "Round 1",
    home: "Supernova Abyss",
    away: "ESC",
    games: [
      {
        id: "918903f8-b6a9-4388-a1c0-8b88b2299ebb",
        game: "Game 1",
        date: "2026-07-19",
        winner: "ESC",
        teams: [
          { team: "Supernova Abyss", opponent: "ESC", result: "loss", score: 646, goals: 0, assists: 0, saves: 4, shots: 3, shotsConceded: 6, goalsConceded: 2, amountStolen: 1567, demosInflicted: 4, demosTaken: 6 },
          { team: "ESC", opponent: "Supernova Abyss", result: "win", score: 878, goals: 2, assists: 1, saves: 2, shots: 6, shotsConceded: 3, goalsConceded: 0, amountStolen: 1238, demosInflicted: 6, demosTaken: 4 },
        ],
        players: [
          { team: "Supernova Abyss", name: "KWNSquid", score: 508, goals: 0, assists: 0, saves: 4, shots: 3, amountStolen: 829, demosInflicted: 2, demosTaken: 1 },
          { team: "Supernova Abyss", name: "MrStratty", score: 76, goals: 0, assists: 0, saves: 0, shots: 0, amountStolen: 430, demosInflicted: 1, demosTaken: 1 },
          { team: "Supernova Abyss", name: "ttv_starzyrl", score: 62, goals: 0, assists: 0, saves: 0, shots: 0, amountStolen: 308, demosInflicted: 1, demosTaken: 4 },
          { team: "ESC", name: "EPo -_-", score: 536, goals: 2, assists: 0, saves: 1, shots: 4, amountStolen: 547, demosInflicted: 1, demosTaken: 2 },
          { team: "ESC", name: "SirSkittleZ", score: 190, goals: 0, assists: 1, saves: 0, shots: 0, amountStolen: 453, demosInflicted: 3, demosTaken: 0 },
          { team: "ESC", name: "Clamp2much", score: 152, goals: 0, assists: 0, saves: 1, shots: 2, amountStolen: 238, demosInflicted: 2, demosTaken: 2 },
        ],
      },
      {
        id: "4a7cb50e-96cc-4c76-99c0-801812291027",
        game: "Game 2",
        date: "2026-07-19",
        winner: "ESC",
        teams: [
          { team: "Supernova Abyss", opponent: "ESC", result: "loss", score: 805, goals: 1, assists: 0, saves: 4, shots: 5, shotsConceded: 5, goalsConceded: 2, amountStolen: 1429, demosInflicted: 2, demosTaken: 4 },
          { team: "ESC", opponent: "Supernova Abyss", result: "win", score: 932, goals: 2, assists: 1, saves: 4, shots: 5, shotsConceded: 5, goalsConceded: 1, amountStolen: 1143, demosInflicted: 4, demosTaken: 2 },
        ],
        players: [
          { team: "Supernova Abyss", name: "KWNSquid", score: 392, goals: 1, assists: 0, saves: 1, shots: 3, amountStolen: 502, demosInflicted: 0, demosTaken: 1 },
          { team: "Supernova Abyss", name: "ttv_starzyrl", score: 363, goals: 0, assists: 0, saves: 3, shots: 1, amountStolen: 300, demosInflicted: 1, demosTaken: 2 },
          { team: "Supernova Abyss", name: "MrStratty", score: 50, goals: 0, assists: 0, saves: 0, shots: 1, amountStolen: 627, demosInflicted: 1, demosTaken: 1 },
          { team: "ESC", name: "EPo -_-", score: 416, goals: 2, assists: 0, saves: 0, shots: 4, amountStolen: 445, demosInflicted: 1, demosTaken: 1 },
          { team: "ESC", name: "SirSkittleZ", score: 338, goals: 0, assists: 0, saves: 3, shots: 1, amountStolen: 440, demosInflicted: 2, demosTaken: 0 },
          { team: "ESC", name: "Clamp2much", score: 178, goals: 0, assists: 1, saves: 1, shots: 0, amountStolen: 258, demosInflicted: 1, demosTaken: 1 },
        ],
      },
      {
        id: "3da8647a-289e-4eef-a536-f81ad0fd7242",
        game: "Game 3",
        date: "2026-07-19",
        winner: "ESC",
        teams: [
          { team: "Supernova Abyss", opponent: "ESC", result: "loss", score: 958, goals: 2, assists: 2, saves: 4, shots: 6, shotsConceded: 10, goalsConceded: 3, amountStolen: 1303, demosInflicted: 2, demosTaken: 0 },
          { team: "ESC", opponent: "Supernova Abyss", result: "win", score: 1081, goals: 3, assists: 2, saves: 3, shots: 10, shotsConceded: 6, goalsConceded: 2, amountStolen: 996, demosInflicted: 0, demosTaken: 2 },
        ],
        players: [
          { team: "Supernova Abyss", name: "KWNSquid", score: 447, goals: 1, assists: 0, saves: 2, shots: 2, amountStolen: 498, demosInflicted: 0, demosTaken: 0 },
          { team: "Supernova Abyss", name: "MrStratty", score: 359, goals: 1, assists: 1, saves: 1, shots: 4, amountStolen: 159, demosInflicted: 0, demosTaken: 0 },
          { team: "Supernova Abyss", name: "ttv_starzyrl", score: 152, goals: 0, assists: 1, saves: 1, shots: 0, amountStolen: 646, demosInflicted: 2, demosTaken: 0 },
          { team: "ESC", name: "EPo -_-", score: 721, goals: 3, assists: 0, saves: 2, shots: 6, amountStolen: 388, demosInflicted: 0, demosTaken: 0 },
          { team: "ESC", name: "Clamp2much", score: 216, goals: 0, assists: 1, saves: 0, shots: 2, amountStolen: 250, demosInflicted: 0, demosTaken: 0 },
          { team: "ESC", name: "SirSkittleZ", score: 144, goals: 0, assists: 1, saves: 1, shots: 2, amountStolen: 358, demosInflicted: 0, demosTaken: 2 },
        ],
      },
    ],
  },
];

function s6TeamRating(teamName) {
  const canonical = canonicalTeamName(teamName);
  return s6OverallTeamRows.find((row) => canonicalTeamName(row[0]) === canonical)?.[1] || 0;
}

function s6PlayerRating(playerName) {
  const canonical = canonicalPlayerName(playerName);
  return s6OverallPlayerRows.find((row) => canonicalPlayerName(row[1]) === canonical)?.[11] || 0;
}

function compactSwissTeam(row, winner) {
  const [team, opponent, score, goals, assists, saves, shots, shotsConceded, goalsConceded, amountStolen, demosInflicted, demosTaken] = row;
  return {
    team: canonicalTeamName(team),
    opponent: canonicalTeamName(opponent),
    result: canonicalTeamName(team) === canonicalTeamName(winner) ? "win" : "loss",
    score,
    goals,
    assists,
    saves,
    shots,
    shotsConceded,
    goalsConceded,
    amountStolen,
    demosInflicted,
    demosTaken,
  };
}

function compactSwissPlayer(row) {
  const [team, name, score, goals, assists, saves, shots, amountStolen, demosInflicted, demosTaken] = row;
  return {
    team: canonicalTeamName(team),
    name: canonicalPlayerName(name),
    score,
    goals,
    assists,
    saves,
    shots,
    amountStolen,
    demosInflicted,
    demosTaken,
  };
}

function addCompactS6SwissSeries(seriesList) {
  seriesList.forEach((series) => {
    const hydrated = {
      season: series.season,
      stage: series.stage,
      round: series.round,
      home: canonicalTeamName(series.home),
      away: canonicalTeamName(series.away),
      games: series.games.map((game) => ({
        ...game,
        winner: canonicalTeamName(game.winner),
        teams: game.teams.map((row) => compactSwissTeam(row, game.winner)),
        players: game.players.map(compactSwissPlayer),
      })),
    };

    const teamAgg = new Map();
    const playerAgg = new Map();
    const seriesWins = new Map();
    hydrated.games.forEach((game) => {
      seriesWins.set(game.winner, (seriesWins.get(game.winner) || 0) + 1);
      game.teams.forEach((row) => {
        if (!teamAgg.has(row.team)) {
          teamAgg.set(row.team, {
            name: row.team,
            rating: s6TeamRating(row.team),
            games: 0,
            score: 0,
            goals: 0,
            goalsConceded: 0,
            assists: 0,
            saves: 0,
            shots: 0,
            shotsConceded: 0,
            amountStolen: 0,
            demosInflicted: 0,
            demosTaken: 0,
            opponentSavesForced: 0,
          });
        }
        const item = teamAgg.get(row.team);
        const opponent = game.teams.find((candidate) => candidate.team !== row.team);
        item.games += 1;
        ["score", "goals", "goalsConceded", "assists", "saves", "shots", "shotsConceded", "amountStolen", "demosInflicted", "demosTaken"].forEach((field) => {
          item[field] += Number(row[field]) || 0;
        });
        item.opponentSavesForced += Number(opponent?.saves || 0);
      });

      const winningPlayers = game.players.filter((row) => row.team === game.winner);
      const gameMvp = winningPlayers.sort((a, b) => b.score - a.score || b.goals - a.goals || b.saves - a.saves)[0];
      game.players.forEach((row) => {
        const key = `${row.team}|${row.name}`;
        if (!playerAgg.has(key)) {
          playerAgg.set(key, {
            team: row.team,
            name: row.name,
            games: 0,
            score: 0,
            goals: 0,
            assists: 0,
            saves: 0,
            shots: 0,
            demosInflicted: 0,
            demosTaken: 0,
            mvps: 0,
            amountStolen: 0,
          });
        }
        const item = playerAgg.get(key);
        item.games += 1;
        ["score", "goals", "assists", "saves", "shots", "demosInflicted", "demosTaken", "amountStolen"].forEach((field) => {
          item[field] += Number(row[field]) || 0;
        });
        if (gameMvp && gameMvp.team === row.team && gameMvp.name === row.name) item.mvps += 1;
      });
    });

    teamAgg.forEach((item, team) => {
      const wins = seriesWins.get(team) || 0;
      const opponent = [...teamAgg.keys()].find((name) => name !== team);
      const losses = seriesWins.get(opponent) || 0;
      item.wins = wins > losses ? 1 : 0;
      item.losses = losses > wins ? 1 : 0;
      item.gameWins = wins;
      item.gameLosses = losses;
      item.sweeps = wins === 3 && losses === 0 ? 1 : 0;
      item.gameFiveLosses = losses === 3 && wins === 2 ? 1 : 0;
      item.standingsPoints = swissLeagueScore(item);
      item.per = Math.round(((0.1 * item.goals) + (0.05 * item.assists) + ((2 / 30) * item.saves) + (0.01 * item.shots) - (0.1 * item.games)) * 100) / 100;
      item.perPerGame = Math.round((item.per / Math.max(1, item.games)) * 100) / 100;
      s6SwissTeamRows.push(item);
    });

    playerAgg.forEach((item) => {
      s6SwissPlayerRows.push([
        item.team, item.name, item.games, item.score, item.goals, item.assists, item.saves, item.shots,
        item.demosInflicted, item.demosTaken, item.mvps, item.amountStolen, s6PlayerRating(item.name),
      ]);
    });
    s6SwissSeriesGameStats.push(hydrated);
  });
}

addCompactS6SwissSeries([
  {"season":"S6","stage":"Swiss","round":"Round 1","home":"Past Our Prime","away":"Spirit Airlines","games":[{"id":"2be7a549-6654-4536-aa05-cdf9fd376da2","game":"Game 1","date":"2026-07-24","winner":"Past Our Prime","teams":[["Past Our Prime","Spirit Airlines",1326,4,3,5,9,8,1,1260,1,5],["Spirit Airlines","Past Our Prime",834,1,1,4,8,9,4,1472,5,1]],"players":[["Past Our Prime","AtownSteelers",524,2,1,1,5,377,0,0],["Past Our Prime","MerkWTM",251,1,0,1,1,371,1,1],["Past Our Prime","RoyalxRenegade",551,1,2,3,3,512,0,4],["Spirit Airlines","JulietAlphaRomeo",266,0,1,2,3,452,1,1],["Spirit Airlines","dailcowgs94",374,1,0,0,2,548,0,0],["Spirit Airlines","MadJanitor88",194,0,0,2,3,472,4,0]]},{"id":"7685c99d-b9f7-4d5e-9b39-4385b1432ef1","game":"Game 2","date":"2026-07-24","winner":"Past Our Prime","teams":[["Spirit Airlines","Past Our Prime",560,1,0,2,6,9,2,912,1,2],["Past Our Prime","Spirit Airlines",868,2,2,3,9,6,1,1348,2,1]],"players":[["Past Our Prime","MerkWTM",118,0,0,0,3,632,2,1],["Past Our Prime","AtownSteelers",404,2,0,1,2,316,0,0],["Past Our Prime","RoyalxRenegade",346,0,2,2,4,400,0,0],["Spirit Airlines","MadJanitor88",72,0,0,0,1,166,1,0],["Spirit Airlines","dailcowgs94",236,1,0,0,1,159,0,1],["Spirit Airlines","JulietAlphaRomeo",252,0,0,2,4,587,0,1]]},{"id":"ede08820-facd-4687-be15-e27231626e6c","game":"Game 3","date":"2026-07-24","winner":"Past Our Prime","teams":[["Past Our Prime","Spirit Airlines",1185,3,3,5,9,7,2,1681,2,2],["Spirit Airlines","Past Our Prime",1065,2,1,5,7,9,3,1157,2,2]],"players":[["Past Our Prime","MerkWTM",280,2,0,0,3,442,1,0],["Past Our Prime","AtownSteelers",358,1,1,1,3,487,0,0],["Past Our Prime","RoyalxRenegade",547,0,2,4,3,752,1,2],["Spirit Airlines","MadJanitor88",288,2,0,0,2,285,0,0],["Spirit Airlines","dailcowgs94",408,0,0,3,2,423,2,2],["Spirit Airlines","JulietAlphaRomeo",369,0,1,2,3,449,0,0]]}]},
  {"season":"S6","stage":"Swiss","round":"Round 1","home":"The Cox","away":"Best Friends Club","games":[{"id":"4feea621-143e-4593-bc99-d06c8aed3d34","game":"Game 1","date":"2026-07-22","winner":"The Cox","teams":[["The Cox","Best Friends Club",790,2,0,2,9,3,1,1144,2,3],["Best Friends Club","The Cox",955,1,0,7,3,9,2,1181,3,2]],"players":[["The Cox","CoalTrainLLC",185,0,0,1,2,455,0,0],["The Cox","Hyroshi",58,0,0,0,0,302,2,1],["The Cox","roo",547,2,0,1,7,387,0,2],["Best Friends Club","greenarrowspark2",257,0,0,3,1,518,1,0],["Best Friends Club","TheLakeEffekt",247,0,0,1,0,442,0,0],["Best Friends Club","I_have_a_bag",451,1,0,3,2,221,2,2]]},{"id":"48c026d4-3218-4ef7-83cd-ac0b8b51811a","game":"Game 2","date":"2026-07-22","winner":"The Cox","teams":[["The Cox","Best Friends Club",1595,6,5,2,14,3,1,1133,5,1],["Best Friends Club","The Cox",904,1,1,6,3,14,6,922,1,5]],"players":[["The Cox","CoalTrainLLC",432,2,1,0,7,260,1,0],["The Cox","Hyroshi",341,0,3,1,1,340,3,1],["The Cox","roo",822,4,1,1,6,533,1,0],["Best Friends Club","I_have_a_bag",192,0,1,0,1,428,0,1],["Best Friends Club","TheLakeEffekt",566,1,0,5,2,177,1,2],["Best Friends Club","greenarrowspark2",146,0,0,1,0,317,0,2]]},{"id":"b180d26f-ccb1-41e5-9d85-090edc4120d5","game":"Game 3","date":"2026-07-22","winner":"The Cox","teams":[["The Cox","Best Friends Club",1234,4,2,4,10,8,3,1100,2,2],["Best Friends Club","The Cox",1014,3,2,4,8,10,4,847,2,2]],"players":[["The Cox","CoalTrainLLC",332,1,0,1,3,409,1,0],["The Cox","Hyroshi",206,0,2,1,0,179,0,1],["The Cox","roo",696,3,0,2,7,512,1,1],["Best Friends Club","greenarrowspark2",230,1,0,0,4,495,2,1],["Best Friends Club","I_have_a_bag",500,2,1,2,3,67,0,0],["Best Friends Club","TheLakeEffekt",284,0,1,2,1,285,0,1]]}]},
  {"season":"S6","stage":"Swiss","round":"Round 1","home":"Hook Line & Blinker","away":"Deceptitards","games":[{"id":"b7bc533c-9ffa-4425-8f28-9ab2201f9da3","game":"Game 1","date":"2026-07-21","winner":"Hook Line & Blinker","teams":[["Deceptitards","Hook Line & Blinker",1082,2,2,5,4,10,3,1362,6,3],["Hook Line & Blinker","Deceptitards",975,3,2,1,10,4,2,1594,3,6]],"players":[["Hook Line & Blinker","Bubbles3913",446,1,1,1,3,565,2,4],["Hook Line & Blinker","NeonLightning20",140,0,1,0,3,528,1,0],["Hook Line & Blinker","Ramen",389,2,0,0,4,501,0,2],["Deceptitards","Ravenglitch",308,1,0,2,1,100,0,2],["Deceptitards","DukeofDope7",306,0,2,1,1,486,4,0],["Deceptitards","MegatronMD",468,1,0,2,2,776,2,1]]},{"id":"7e689e32-551f-4fb5-a516-410df53b349c","game":"Game 2","date":"2026-07-21","winner":"Deceptitards","teams":[["Hook Line & Blinker","Deceptitards",938,2,2,5,6,7,3,1573,1,2],["Deceptitards","Hook Line & Blinker",999,3,1,4,7,6,2,838,2,1]],"players":[["Hook Line & Blinker","Bubbles3913",386,1,1,2,2,603,1,0],["Hook Line & Blinker","NeonLightning20",258,0,1,2,3,392,0,0],["Hook Line & Blinker","Ramen",294,1,0,1,1,578,0,2],["Deceptitards","Ravenglitch",395,1,1,2,2,98,0,0],["Deceptitards","DukeofDope7",70,0,0,0,2,286,0,0],["Deceptitards","MegatronMD",534,2,0,2,3,454,2,1]]},{"id":"6b8f8a47-d7fb-4f45-8130-8d063e2a63d6","game":"Game 3","date":"2026-07-21","winner":"Hook Line & Blinker","teams":[["Hook Line & Blinker","Deceptitards",1401,6,3,2,13,3,1,1164,2,5],["Deceptitards","Hook Line & Blinker",623,1,1,3,3,13,6,1532,5,2]],"players":[["Hook Line & Blinker","Bubbles3913",639,3,1,0,5,397,0,0],["Hook Line & Blinker","NeonLightning20",416,2,1,1,2,378,0,3],["Hook Line & Blinker","Ramen",346,1,1,1,6,389,2,2],["Deceptitards","Ravenglitch",146,0,1,0,2,281,0,1],["Deceptitards","MegatronMD",399,1,0,3,1,995,4,1],["Deceptitards","DukeofDope7",78,0,0,0,0,256,1,0]]},{"id":"2f656b69-c01a-441c-9381-0331c6575fe5","game":"Game 4","date":"2026-07-22","winner":"Hook Line & Blinker","teams":[["Hook Line & Blinker","Deceptitards",1109,3,3,2,7,4,2,1982,1,5],["Deceptitards","Hook Line & Blinker",954,2,1,4,4,7,3,1677,5,1]],"players":[["Hook Line & Blinker","Bubbles3913",484,2,1,1,2,918,1,2],["Hook Line & Blinker","Ramen",378,0,2,1,1,784,0,2],["Hook Line & Blinker","NeonLightning20",247,1,0,0,4,280,0,1],["Deceptitards","Ravenglitch",320,1,1,1,1,327,2,1],["Deceptitards","DukeofDope7",200,0,0,2,0,348,2,0],["Deceptitards","MegatronMD",434,1,0,1,3,1002,1,0]]}]},
  {"season":"S6","stage":"Swiss","round":"Round 1","home":"Quack Wok","away":"Ball Chasin & Sauce Tastin","games":[{"id":"9c2356d2-e9d8-48d4-bc58-50f7ca86ed55","game":"Game 1","date":"2026-07-20","winner":"Ball Chasin & Sauce Tastin","teams":[["Ball Chasin & Sauce Tastin","Quack Wok",1278,5,4,2,10,5,2,856,4,4],["Quack Wok","Ball Chasin & Sauce Tastin",706,2,0,3,5,10,5,1167,4,4]],"players":[["Quack Wok","Original_6_Hawks",266,1,0,1,2,404,2,3],["Quack Wok","LIL HATED ONE",152,1,0,0,1,282,2,0],["Quack Wok","godfatherjones",288,0,0,2,2,481,0,1],["Ball Chasin & Sauce Tastin","Pilot_SG1",296,1,0,1,1,232,2,3],["Ball Chasin & Sauce Tastin","TGS_Lostmoss",468,2,2,1,3,238,1,0],["Ball Chasin & Sauce Tastin","CROCOKYLE",514,2,2,0,6,386,1,1]]},{"id":"044f3aaf-7c82-4beb-8f13-7378c9bd4c16","game":"Game 2","date":"2026-07-21","winner":"Ball Chasin & Sauce Tastin","teams":[["Ball Chasin & Sauce Tastin","Quack Wok",1177,3,2,4,11,5,1,1755,2,1],["Quack Wok","Ball Chasin & Sauce Tastin",793,1,0,5,5,11,3,973,1,2]],"players":[["Quack Wok","Original_6_Hawks",384,1,0,2,2,542,0,1],["Quack Wok","LIL HATED ONE",135,0,0,1,2,187,1,0],["Quack Wok","godfatherjones",274,0,0,2,1,244,0,1],["Ball Chasin & Sauce Tastin","Pilot_SG1",454,0,2,2,2,465,2,0],["Ball Chasin & Sauce Tastin","CROCOKYLE",367,1,0,1,5,749,0,1],["Ball Chasin & Sauce Tastin","TGS_Lostmoss",356,2,0,1,4,541,0,0]]},{"id":"c60e9120-2c95-4dd0-b8ae-c42c83a3576f","game":"Game 3","date":"2026-07-21","winner":"Ball Chasin & Sauce Tastin","teams":[["Quack Wok","Ball Chasin & Sauce Tastin",795,1,1,3,9,8,3,1607,2,5],["Ball Chasin & Sauce Tastin","Quack Wok",1077,3,2,5,8,9,1,1374,5,2]],"players":[["Quack Wok","Original_6_Hawks",312,0,1,0,7,423,0,3],["Quack Wok","LIL HATED ONE",220,1,0,1,1,555,1,0],["Quack Wok","godfatherjones",263,0,0,2,1,629,1,2],["Ball Chasin & Sauce Tastin","Pilot_SG1",312,1,0,2,1,361,3,1],["Ball Chasin & Sauce Tastin","CROCOKYLE",542,2,1,2,6,608,2,1],["Ball Chasin & Sauce Tastin","TGS_Lostmoss",223,0,1,1,1,405,0,0]]}]},
]);

addCompactS6SwissSeries([
  {"season":"S6","stage":"Swiss","round":"Round 2","home":"Hook Line & Blinker","away":"Ball Chasin & Sauce Tastin","games":[{"id":"f0a05158-abd9-4e59-8b4f-2ca9d2ba23d7","game":"Game 1","date":"2026-07-30","winner":"Hook Line & Blinker","teams":[["Ball Chasin & Sauce Tastin","Hook Line & Blinker",1289,4,2,6,9,12,5,1049,3,1],["Hook Line & Blinker","Ball Chasin & Sauce Tastin",1402,5,4,4,12,9,4,1388,1,3]],"players":[["Hook Line & Blinker","Bubbles3913",288,0,1,1,3,797,0,1],["Hook Line & Blinker","NeonLightning20",515,3,1,1,4,330,0,1],["Hook Line & Blinker","Ramen",599,2,2,2,5,261,1,1],["Ball Chasin & Sauce Tastin","Pilot_SG1",450,2,1,1,3,424,2,0],["Ball Chasin & Sauce Tastin","CROCOKYLE",493,1,1,2,4,560,0,0],["Ball Chasin & Sauce Tastin","TGS_Lostmoss",346,1,0,3,2,65,1,1]]},{"id":"95cbe2de-2242-4855-bcaa-962024098dc4","game":"Game 2","date":"2026-07-29","winner":"Ball Chasin & Sauce Tastin","teams":[["Hook Line & Blinker","Ball Chasin & Sauce Tastin",650,1,1,2,4,6,5,1682,2,6],["Ball Chasin & Sauce Tastin","Hook Line & Blinker",1191,5,2,2,6,4,1,1593,6,2]],"players":[["Hook Line & Blinker","Bubbles3913",186,0,1,1,1,593,1,0],["Hook Line & Blinker","NeonLightning20",100,0,0,0,0,575,1,1],["Hook Line & Blinker","Ramen",364,1,0,1,3,514,0,5],["Ball Chasin & Sauce Tastin","Pilot_SG1",322,1,2,0,3,492,2,0],["Ball Chasin & Sauce Tastin","TGS_Lostmoss",406,1,0,2,1,550,2,1],["Ball Chasin & Sauce Tastin","CROCOKYLE",463,3,0,0,2,551,2,1]]},{"id":"3f90e24b-90df-4299-a9ff-46a4911685d6","game":"Game 3","date":"2026-07-30","winner":"Hook Line & Blinker","teams":[["Hook Line & Blinker","Ball Chasin & Sauce Tastin",1230,4,4,1,10,4,1,1801,5,2],["Ball Chasin & Sauce Tastin","Hook Line & Blinker",546,1,0,2,4,10,4,1002,2,5]],"players":[["Hook Line & Blinker","Bubbles3913",336,1,2,0,3,644,1,0],["Hook Line & Blinker","Ramen",682,3,1,1,5,806,3,1],["Hook Line & Blinker","NeonLightning20",212,0,1,0,2,351,1,1],["Ball Chasin & Sauce Tastin","CROCOKYLE",264,1,0,0,3,316,0,1],["Ball Chasin & Sauce Tastin","TGS_Lostmoss",162,0,0,1,1,353,0,1],["Ball Chasin & Sauce Tastin","Pilot_SG1",120,0,0,1,0,333,2,3]]},{"id":"fa05e4bc-e9c4-4a27-ab4b-46840c959ba7","game":"Game 4","date":"2026-07-30","winner":"Hook Line & Blinker","teams":[["Hook Line & Blinker","Ball Chasin & Sauce Tastin",983,3,2,4,5,7,1,1710,2,5],["Ball Chasin & Sauce Tastin","Hook Line & Blinker",728,1,1,2,7,5,3,857,5,2]],"players":[["Hook Line & Blinker","Bubbles3913",373,1,0,3,2,527,0,3],["Hook Line & Blinker","NeonLightning20",100,0,1,0,0,453,0,1],["Hook Line & Blinker","Ramen",510,2,1,1,3,730,2,1],["Ball Chasin & Sauce Tastin","TGS_Lostmoss",228,0,0,1,4,172,1,0],["Ball Chasin & Sauce Tastin","CROCOKYLE",320,1,0,0,3,245,3,2],["Ball Chasin & Sauce Tastin","Pilot_SG1",180,0,1,1,0,440,1,0]]},{"id":"d25740a8-f148-4065-be09-ee6f5accfd7e","game":"Game 5","date":"2026-07-30","winner":"Ball Chasin & Sauce Tastin","teams":[["Hook Line & Blinker","Ball Chasin & Sauce Tastin",632,1,1,2,3,6,3,1034,5,2],["Ball Chasin & Sauce Tastin","Hook Line & Blinker",838,3,2,2,6,3,1,1057,2,5]],"players":[["Hook Line & Blinker","Bubbles3913",246,0,1,1,1,408,2,0],["Hook Line & Blinker","NeonLightning20",64,0,0,0,0,137,0,2],["Hook Line & Blinker","Ramen",322,1,0,1,2,489,3,0],["Ball Chasin & Sauce Tastin","TGS_Lostmoss",158,0,1,0,0,536,1,3],["Ball Chasin & Sauce Tastin","CROCOKYLE",480,2,1,1,4,232,1,0],["Ball Chasin & Sauce Tastin","Pilot_SG1",200,1,0,1,2,289,0,2]]}]},
  {"season":"S6","stage":"Swiss","round":"Round 2","home":"Past Our Prime","away":"ESC","games":[{"id":"0ef4388c-a9db-4722-b9cb-26505f7c314c","game":"Game 1","date":"2026-07-29","winner":"ESC","teams":[["ESC","Past Our Prime",1082,3,2,4,8,5,1,1426,1,2],["Past Our Prime","ESC",842,1,1,4,5,8,3,1291,2,1]],"players":[["ESC","EPo -_-",537,2,1,2,3,393,0,0],["ESC","Clamp2much",335,0,1,2,2,364,0,0],["ESC","SirSkittleZ",210,1,0,0,3,669,1,2],["Past Our Prime","AtownSteelers",104,0,0,0,0,339,1,0],["Past Our Prime","MerkWTM",242,0,1,2,1,181,1,1],["Past Our Prime","RoyalxRenegade",496,1,0,2,4,771,0,0]]},{"id":"00537806-7d9c-4c65-9146-bf63fa2f2b67","game":"Game 2","date":"2026-07-29","winner":"ESC","teams":[["ESC","Past Our Prime",886,2,2,4,4,6,1,1085,3,2],["Past Our Prime","ESC",598,1,1,0,6,4,2,1495,2,3]],"players":[["ESC","EPo -_-",348,1,1,2,1,310,1,1],["ESC","Clamp2much",240,0,1,1,2,250,0,1],["ESC","SirSkittleZ",298,1,0,1,1,525,2,0],["Past Our Prime","AtownSteelers",98,0,0,0,2,518,0,1],["Past Our Prime","MerkWTM",288,1,0,0,2,516,0,0],["Past Our Prime","RoyalxRenegade",212,0,1,0,2,461,2,2]]},{"id":"00ebf326-7e9b-44c9-b905-fcea584e864f","game":"Game 3","date":"2026-07-29","winner":"ESC","teams":[["ESC","Past Our Prime",968,2,2,4,9,6,1,1641,4,0],["Past Our Prime","ESC",1007,1,1,7,6,9,2,1511,0,4]],"players":[["ESC","EPo -_-",533,2,0,2,4,615,2,0],["ESC","Clamp2much",148,0,1,1,3,223,0,0],["ESC","SirSkittleZ",287,0,1,1,2,803,2,0],["Past Our Prime","AtownSteelers",400,1,0,3,2,655,0,0],["Past Our Prime","MerkWTM",211,0,1,1,0,335,0,2],["Past Our Prime","RoyalxRenegade",396,0,0,3,4,521,0,2]]},{"id":"b96b39ef-3448-4525-8552-5a5ad95a0bbd","game":"Game 4","date":"2026-07-29","winner":"Past Our Prime","teams":[["ESC","Past Our Prime",691,1,0,3,6,5,2,1010,3,1],["Past Our Prime","ESC",1014,2,1,5,5,6,1,1051,1,3]],"players":[["ESC","Clamp2much",130,0,0,1,1,137,0,0],["ESC","EPo -_-",417,1,0,2,3,301,2,1],["ESC","SirSkittleZ",144,0,0,0,2,572,1,0],["Past Our Prime","MerkWTM",176,0,0,1,1,383,1,2],["Past Our Prime","AtownSteelers",220,1,0,0,0,161,0,1],["Past Our Prime","RoyalxRenegade",618,1,1,4,4,507,0,0]]},{"id":"b6d5dc75-86a8-4efb-bc9e-bbfc178055ef","game":"Game 5","date":"2026-07-29","winner":"Past Our Prime","teams":[["ESC","Past Our Prime",548,0,0,2,3,5,1,1187,5,1],["Past Our Prime","ESC",831,1,0,3,5,3,0,1120,1,5]],"players":[["ESC","EPo -_-",236,0,0,0,1,550,1,0],["ESC","Clamp2much",144,0,0,1,1,133,1,1],["ESC","SirSkittleZ",168,0,0,1,1,504,3,0],["Past Our Prime","MerkWTM",76,0,0,0,1,171,0,2],["Past Our Prime","AtownSteelers",112,0,0,0,1,223,0,1],["Past Our Prime","RoyalxRenegade",643,1,0,3,3,726,1,2]]}]},
  {"season":"S6","stage":"Swiss","round":"Round 2","home":"The Cox","away":"Giga's In Paris","games":[{"id":"53880050-61e4-4802-b69a-739241d9f134","game":"Game 1","date":"2026-07-29","winner":"The Cox","teams":[["The Cox","Giga's In Paris",880,2,0,3,11,4,1,1273,1,1],["Giga's In Paris","The Cox",941,1,1,7,4,11,2,759,1,1]],"players":[["Giga's In Paris","Ax1mov",621,1,0,6,3,195,1,0],["Giga's In Paris","Mastergiga9",156,0,1,0,0,293,0,0],["Giga's In Paris","selena.",164,0,0,1,1,271,0,1],["The Cox","CoalTrainLLC",222,0,0,1,3,290,0,1],["The Cox","Hyroshi",36,0,0,0,1,264,0,0],["The Cox","roo",622,2,0,2,7,719,1,0]]},{"id":"edf30f9b-c0db-436c-9307-b37e2e945c27","game":"Game 2","date":"2026-07-29","winner":"The Cox","teams":[["Giga's In Paris","The Cox",649,1,0,3,7,7,3,1179,4,3],["The Cox","Giga's In Paris",1050,3,0,5,7,7,1,1332,3,4]],"players":[["Giga's In Paris","Ax1mov",265,0,0,1,3,412,0,1],["Giga's In Paris","Mastergiga9",172,0,0,1,3,343,0,2],["Giga's In Paris","selena.",212,1,0,1,1,424,4,0],["The Cox","CoalTrainLLC",377,1,0,2,2,176,0,2],["The Cox","Hyroshi",30,0,0,0,0,538,3,1],["The Cox","roo",643,2,0,3,5,618,0,1]]},{"id":"12c5ebbd-374f-43c8-9897-a2cd719c42db","game":"Game 3","date":"2026-07-30","winner":"The Cox","teams":[["Giga's In Paris","The Cox",1080,3,2,3,8,11,4,1620,5,1],["The Cox","Giga's In Paris",1196,4,4,3,11,8,3,1211,1,5]],"players":[["Giga's In Paris","Ax1mov",655,3,0,2,7,672,3,0],["Giga's In Paris","selena.",275,0,1,1,1,732,2,0],["Giga's In Paris","Mastergiga9",150,0,1,0,0,216,0,1],["The Cox","CoalTrainLLC",463,1,2,2,5,213,0,3],["The Cox","Hyroshi",182,0,2,0,2,527,1,1],["The Cox","roo",551,3,0,1,4,471,0,1]]}]},
  {"season":"S6","stage":"Swiss","round":"Round 2","home":"Supernova Abyss","away":"Spirit Airlines","games":[{"id":"1a3369ab-0c3d-4846-ae1a-7d0461acf220","game":"Game 1","date":"2026-07-28","winner":"Supernova Abyss","teams":[["Spirit Airlines","Supernova Abyss",455,1,0,1,6,6,4,1132,2,2],["Supernova Abyss","Spirit Airlines",1187,4,4,4,6,6,1,1301,2,2]],"players":[["Supernova Abyss","MrStratty",326,2,1,0,3,450,1,0],["Supernova Abyss","KWNSquid",442,0,2,3,1,424,1,1],["Supernova Abyss","ttv_starzyrl",419,2,1,1,2,427,0,1],["Spirit Airlines","JulietAlphaRomeo",101,0,0,0,0,488,0,0],["Spirit Airlines","dailcowgs94",300,1,0,1,4,176,0,1],["Spirit Airlines","MadJanitor88",54,0,0,0,2,468,2,1]]},{"id":"0d20be9c-4f58-4beb-84ab-95258acf6399","game":"Game 2","date":"2026-07-27","winner":"Supernova Abyss","teams":[["Supernova Abyss","Spirit Airlines",1481,5,5,3,15,7,4,1643,2,6],["Spirit Airlines","Supernova Abyss",1438,4,0,9,7,15,5,950,6,2]],"players":[["Supernova Abyss","ttv_starzyrl",396,2,0,1,6,475,0,3],["Supernova Abyss","MrStratty",514,2,2,1,3,448,1,2],["Supernova Abyss","KWNSquid",571,1,3,1,6,720,1,1],["Spirit Airlines","JulietAlphaRomeo",940,4,0,4,4,411,3,1],["Spirit Airlines","dailcowgs94",284,0,0,3,2,232,1,0],["Spirit Airlines","MadJanitor88",214,0,0,2,1,307,2,1]]},{"id":"758efc7d-e381-4341-995e-e8c55b55e816","game":"Game 3","date":"2026-07-27","winner":"Supernova Abyss","teams":[["Supernova Abyss","Spirit Airlines",1346,4,4,3,9,4,1,1100,3,5],["Spirit Airlines","Supernova Abyss",677,1,0,4,4,9,4,970,5,3]],"players":[["Supernova Abyss","KWNSquid",603,3,1,1,3,264,2,2],["Supernova Abyss","ttv_starzyrl",533,0,3,2,3,534,1,1],["Supernova Abyss","MrStratty",210,1,0,0,3,302,0,2],["Spirit Airlines","JulietAlphaRomeo",309,0,0,2,0,467,0,0],["Spirit Airlines","dailcowgs94",146,0,0,1,2,370,3,2],["Spirit Airlines","MadJanitor88",222,1,0,1,2,133,2,1]]}]},
  {"season":"S6","stage":"Swiss","round":"Round 2","home":"Quack Wok","away":"Deceptitards","games":[{"id":"05c33082-4201-4a73-874b-1c72f24d3e96","game":"Game 1","date":"2026-07-27","winner":"QUACK WOK","teams":[["DECEPTITARDS","QUACK WOK",808,1,1,3,8,11,3,1680,2,2],["QUACK WOK","DECEPTITARDS",1238,3,3,5,11,8,1,908,2,2]],"players":[["QUACK WOK","Original_6_Hawks",648,1,2,3,6,661,2,1],["QUACK WOK","LIL HATED ONE",272,1,0,1,3,99,0,0],["QUACK WOK","godfatherjones",318,1,1,1,2,148,0,1],["DECEPTITARDS","Burt",317,0,1,1,1,246,0,1],["DECEPTITARDS","MegatronMD",343,1,0,1,5,907,2,1],["DECEPTITARDS","Dukeofdope7",148,0,0,1,2,527,0,0]]},{"id":"e720c911-14e2-4e17-8342-f59c5212f7e8","game":"Game 2","date":"2026-07-27","winner":"QUACK WOK","teams":[["QUACK WOK","DECEPTITARDS",1175,4,3,2,10,7,3,932,3,2],["DECEPTITARDS","QUACK WOK",900,3,0,4,7,10,4,1854,2,3]],"players":[["QUACK WOK","Original_6_Hawks",546,2,0,1,6,328,0,1],["QUACK WOK","LIL HATED ONE",247,0,2,1,1,342,0,1],["QUACK WOK","godfatherjones",382,2,1,0,3,262,3,0],["DECEPTITARDS","Burt",232,0,0,2,1,371,0,1],["DECEPTITARDS","MegatronMD",471,3,0,1,5,839,1,1],["DECEPTITARDS","Dukeofdope7",197,0,0,1,1,644,1,1]]},{"id":"e34ff860-c3bb-44aa-a2e1-13a4fab6a514","game":"Game 3","date":"2026-07-27","winner":"DECEPTITARDS","teams":[["QUACK WOK","DECEPTITARDS",1128,3,2,3,10,8,4,1055,1,7],["DECEPTITARDS","QUACK WOK",1473,4,2,7,8,10,3,1753,7,1]],"players":[["QUACK WOK","Original_6_Hawks",654,3,0,1,5,410,1,4],["QUACK WOK","LIL HATED ONE",204,0,1,1,0,170,0,2],["QUACK WOK","godfatherjones",270,0,1,1,5,475,0,1],["DECEPTITARDS","Burt",301,0,0,4,0,115,0,0],["DECEPTITARDS","Dukeofdope7",713,3,0,2,3,703,2,0],["DECEPTITARDS","MegatronMD",459,1,2,1,5,935,5,1]]},{"id":"160bb30b-e650-4ad7-a8f0-9bb8dc9e0d69","game":"Game 4","date":"2026-07-27","winner":"DECEPTITARDS","teams":[["QUACK WOK","DECEPTITARDS",948,2,1,4,8,9,3,740,2,8],["DECEPTITARDS","QUACK WOK",1138,3,1,6,9,8,2,1592,8,2]],"players":[["QUACK WOK","Original_6_Hawks",448,1,0,2,2,302,2,4],["QUACK WOK","LIL HATED ONE",186,0,0,2,1,132,0,3],["QUACK WOK","godfatherjones",314,1,1,0,5,306,0,1],["DECEPTITARDS","Burt",275,0,1,1,4,405,0,0],["DECEPTITARDS","Dukeofdope7",464,2,0,3,2,483,3,1],["DECEPTITARDS","MegatronMD",399,1,0,2,3,704,5,1]]},{"id":"c3aa5af3-34ca-4170-b8ec-c5780046757f","game":"Game 5","date":"2026-07-27","winner":"QUACK WOK","teams":[["QUACK WOK","DECEPTITARDS",1253,5,3,2,8,6,4,931,4,6],["DECEPTITARDS","QUACK WOK",1121,4,2,3,6,8,5,2040,6,4]],"players":[["QUACK WOK","LIL HATED ONE",58,0,0,0,0,54,1,2],["QUACK WOK","Original_6_Hawks",528,2,2,1,4,266,1,4],["QUACK WOK","godfatherjones",667,3,1,1,4,611,2,0],["DECEPTITARDS","Burt",549,3,0,0,4,305,1,1],["DECEPTITARDS","Dukeofdope7",234,1,0,1,2,762,0,0],["DECEPTITARDS","MegatronMD",338,0,2,2,0,973,5,3]]}]},
]);

addCompactS6SwissSeries([
  {"season":"S6","stage":"Swiss","round":"Round 3","home":"Supernova Abyss","away":"Quack Wok","games":[{"id":"53b8d760-5b69-47ff-83a3-7d4f7748443d","game":"Game 1","date":"2026-08-03","winner":"Quack Wok","teams":[["Quack Wok","Supernova Abyss",1184,3,2,3,14,7,2,1227,1,0],["Supernova Abyss","Quack Wok",1052,2,2,6,7,14,3,1118,0,1]],"players":[["Quack Wok","LIL HATED ONE",188,0,1,0,2,159,0,0],["Quack Wok","Original_6_Hawks",590,2,0,2,8,860,1,0],["Quack Wok","godfatherjones",406,1,1,1,4,208,0,0],["Supernova Abyss","MrStratty",260,0,2,2,2,551,0,0],["Supernova Abyss","ttv_starzyrl",240,0,0,2,2,63,0,1],["Supernova Abyss","KWNSquid",552,2,0,2,3,504,0,0]]},{"id":"3fedd284-6e30-44b9-855a-d1f12ce10cd1","game":"Game 2","date":"2026-08-03","winner":"Quack Wok","teams":[["Quack Wok","Supernova Abyss",1051,3,2,2,6,6,2,1083,5,1],["Supernova Abyss","Quack Wok",822,2,1,2,6,6,3,1183,1,5]],"players":[["Quack Wok","LIL HATED ONE",146,0,1,0,0,234,0,0],["Quack Wok","Original_6_Hawks",587,2,0,2,3,358,3,0],["Quack Wok","godfatherjones",318,1,1,0,3,491,2,1],["Supernova Abyss","MrStratty",208,1,0,0,1,323,0,0],["Supernova Abyss","KWNSquid",390,0,1,2,2,384,0,3],["Supernova Abyss","ttv_starzyrl",224,1,0,0,3,476,1,2]]},{"id":"7dfb8953-7413-4db3-a0ec-0986ed2a6117","game":"Game 3","date":"2026-08-04","winner":"Supernova Abyss","teams":[["Quack Wok","Supernova Abyss",701,1,1,3,5,8,6,1344,2,2],["Supernova Abyss","Quack Wok",1463,6,6,1,8,5,1,1541,2,2]],"players":[["Quack Wok","Original_6_Hawks",178,0,0,1,1,546,2,1],["Quack Wok","LIL HATED ONE",221,0,1,1,2,472,0,0],["Quack Wok","godfatherjones",302,1,0,1,2,326,0,1],["Supernova Abyss","MrStratty",453,2,1,1,2,233,1,0],["Supernova Abyss","KWNSquid",578,2,3,0,2,462,0,1],["Supernova Abyss","ttv_starzyrl",432,2,2,0,4,846,1,1]]},{"id":"eef8ba25-bff8-4e25-9641-54bd9d8fd881","game":"Game 4","date":"2026-08-04","winner":"Quack Wok","teams":[["Quack Wok","Supernova Abyss",912,2,2,2,4,7,1,942,3,1],["Supernova Abyss","Quack Wok",758,1,1,2,7,4,2,1447,1,3]],"players":[["Quack Wok","Original_6_Hawks",510,1,1,1,3,609,1,0],["Quack Wok","LIL HATED ONE",48,0,0,0,0,131,0,0],["Quack Wok","godfatherjones",354,1,1,1,1,202,2,1],["Supernova Abyss","ttv_starzyrl",130,0,0,0,2,487,1,0],["Supernova Abyss","KWNSquid",420,1,0,1,4,416,0,2],["Supernova Abyss","MrStratty",208,0,1,1,1,544,0,1]]}]} 
]);

const importedReplayStorageKey = "gtrls.importedReplaySeries.v1";
const importedReplaySeries = [];

function existingReplayIds() {
  return new Set(s6SwissSeriesGameStats.flatMap((series) => (series.games || []).map((game) => game.id)).filter(Boolean));
}

function splitCsvLine(line, delimiter) {
  const cells = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];
    if (char === '"' && quoted && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === delimiter && !quoted) {
      cells.push(cell);
      cell = "";
    } else {
      cell += char;
    }
  }
  cells.push(cell);
  return cells.map((value) => value.trim());
}

function parseReplayCsv(text) {
  const lines = String(text || "").replace(/^\uFEFF/, "").split(/\r?\n/).filter((line) => line.trim());
  if (!lines.length) return [];
  const delimiter = lines[0].includes(";") ? ";" : ",";
  const headers = splitCsvLine(lines[0], delimiter).map((header) => header.toLowerCase().trim());
  return lines.slice(1).map((line) => {
    const values = splitCsvLine(line, delimiter);
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
  });
}

function csvNum(row, key) {
  const value = String(row[key] ?? "").replace(/[%,$]/g, "").trim();
  if (!value || value.toUpperCase() === "N/A") return 0;
  return Number(value) || 0;
}

function csvDate(row) {
  return String(row.date || "").slice(0, 10);
}

function csvGameLabel(rows, replayId, fallbackIndex) {
  const title = String(rows.find((row) => row["replay id"] === replayId)?.["replay title"] || "").trim();
  const match = title.match(/\b(?:g|game)\s*(\d+)\b/i);
  return `Game ${match ? Number(match[1]) : fallbackIndex}`;
}

function replayRowsById(rows) {
  const grouped = new Map();
  rows.forEach((row) => {
    const id = String(row["replay id"] || "").trim();
    if (!id) return;
    if (!grouped.has(id)) grouped.set(id, []);
    grouped.get(id).push(row);
  });
  return grouped;
}

function compactSeriesFromCsv({ teamsCsv, playersCsv, season, stage, round, home, away }) {
  const teamRows = parseReplayCsv(teamsCsv);
  const playerRows = parseReplayCsv(playersCsv);
  const teamsById = replayRowsById(teamRows);
  const playersById = replayRowsById(playerRows);
  const replayIds = [...new Set([...teamsById.keys(), ...playersById.keys()])];
  if (!replayIds.length) throw new Error("No replay IDs found in the selected CSV files.");
  const inferredTeams = [...new Set(teamRows.flatMap((row) => [row["team name"], row["opposing team name"]]).filter(Boolean).map(canonicalTeamName))];
  const seriesHome = canonicalTeamName(home || inferredTeams[0]);
  const seriesAway = canonicalTeamName(away || inferredTeams.find((team) => team !== seriesHome) || inferredTeams[1]);
  if (!seriesHome || !seriesAway || seriesHome === seriesAway) throw new Error("Choose a valid home and away team for this import.");
  const sortedIds = replayIds.sort((a, b) => {
    const aDate = String((teamsById.get(a) || playersById.get(a) || [])[0]?.date || "");
    const bDate = String((teamsById.get(b) || playersById.get(b) || [])[0]?.date || "");
    return aDate.localeCompare(bDate);
  });
  const games = sortedIds.map((id, index) => {
    const tRows = teamsById.get(id) || [];
    const pRows = playersById.get(id) || [];
    const winnerRow = tRows.find((row) => String(row.result || "").toLowerCase() === "win")
      || tRows.slice().sort((a, b) => csvNum(b, "goals") - csvNum(a, "goals"))[0];
    return {
      id,
      game: csvGameLabel([...tRows, ...pRows], id, index + 1),
      date: csvDate(tRows[0] || pRows[0] || {}),
      winner: canonicalTeamName(winnerRow?.["team name"]),
      teams: tRows.map((row) => [
        canonicalTeamName(row["team name"]),
        canonicalTeamName(row["opposing team name"]),
        csvNum(row, "score"),
        csvNum(row, "goals"),
        csvNum(row, "assists"),
        csvNum(row, "saves"),
        csvNum(row, "shots"),
        csvNum(row, "shots conceded"),
        csvNum(row, "goals conceded"),
        csvNum(row, "amount stolen"),
        csvNum(row, "demos inflicted"),
        csvNum(row, "demos taken"),
      ]),
      players: pRows.map((row) => [
        canonicalTeamName(row["team name"]),
        canonicalPlayerName(row["player name"]),
        csvNum(row, "score"),
        csvNum(row, "goals"),
        csvNum(row, "assists"),
        csvNum(row, "saves"),
        csvNum(row, "shots"),
        csvNum(row, "amount stolen"),
        csvNum(row, "demos inflicted"),
        csvNum(row, "demos taken"),
      ]),
    };
  });
  return {
    season: baseSeasonName(season || state.season || "S6"),
    stage: scheduleStageLabel(stage || state.s6Stage || "Swiss"),
    round: round || "Imported",
    home: seriesHome,
    away: seriesAway,
    games,
    source: "csv-import",
    importedAt: new Date().toISOString(),
  };
}

function applyImportedReplaySeries(seriesList, { persist = false } = {}) {
  const seenReplayIds = existingReplayIds();
  const accepted = [];
  seriesList.forEach((series) => {
    const freshGames = (series.games || []).filter((game) => game.id && !seenReplayIds.has(game.id));
    freshGames.forEach((game) => seenReplayIds.add(game.id));
    if (!freshGames.length) return;
    const cleanSeries = { ...series, games: freshGames };
    importedReplaySeries.push(cleanSeries);
    addCompactS6SwissSeries([cleanSeries]);
    accepted.push(cleanSeries);
  });
  if (persist && accepted.length) {
    localStorage.setItem(importedReplayStorageKey, JSON.stringify(importedReplaySeries));
  }
  return accepted;
}

function loadImportedReplaySeries() {
  try {
    const stored = JSON.parse(localStorage.getItem(importedReplayStorageKey) || "[]");
    if (Array.isArray(stored)) applyImportedReplaySeries(stored);
  } catch (error) {
    console.warn("Unable to load imported replay CSVs", error);
  }
}

// CSV imports are intentionally not loaded in the public dashboard.

const s6GroupStandingsRows = [
  ["Hook Line & Blinker", 1, 15, "5 - 0", 33, "15 - 5", 2, 0, "2 - 0"],
  ["Past Our Prime", 2, 13, "5 - 0", 12, "15 - 9", 0, 0, "0 - 0"],
  ["The Cox", 3, 11, "3 - 2", 11, "12 - 8", 2, 1, "2 - 1"],
  ["Supernova Abyss", 4, 11, "3 - 2", 0, "13 - 9", 1, 2, "1 - 2"],
  ["Giga's In Paris", 5, 9, "3 - 2", 8, "10 - 8", 1, 0, "1 - 0"],
  ["Ball Chasin & Sauce Tastin", 6, 9, "3 - 2", 5, "13 - 11", 0, 2, "0 - 2"],
  ["Quack Wok", 7, 9, "2 - 3", -3, "11 - 11", 1, 2, "1 - 2"],
  ["Best Friends Club", 8, 7, "2 - 3", -25, "11 - 13", 0, 2, "0 - 2"],
  ["ESC", 9, 6, "2 - 3", 10, "7 - 11", 1, 0, "1 - 0"],
  ["Spirit Airlines", 10, 4, "1 - 4", -21, "7 - 13", 0, 2, "0 - 2"],
  ["Crossbar Cartel", 11, 4, "1 - 4", -21, "6 - 14", 0, 1, "0 - 1"],
  ["Deceptitards", 12, 3, "0 - 5", -7, "7 - 15", 0, 3, "0 - 3"],
];

const s5SplitStandingsRows = {
  split1: [
    ["Big Musty Milkers", "Gravy", 1, "4 - 0", 8],
    ["Bird Bath Bombers", "Gravy", 2, "2 - 2", 8],
    ["Milk Before Cereal", "Gravy", 3, "2 - 2", 6],
    ["Pitch Pirates", "Gravy", 4, "1 - 3", 4],
    ["The Hornets", "Gravy", 5, "1 - 3", 3],
    ["Triple Scoop", "Train", 1, "3 - 1", 8],
    ["Weenie Hut Jrs", "Train", 2, "3 - 1", 6],
    ["Wouldabeendope", "Train", 3, "2 - 2", 6],
    ["Danger Pings", "Train", 4, "1 - 3", 4],
    ["D' n' the V's", "Train", 5, "1 - 3", 3],
  ],
  split2: [
    ["Weenie Hut Jrs", "Gravy", 1, "4 - 0", 9],
    ["Triple Scoop", "Gravy", 2, "3 - 1", 8],
    ["Big Musty Milkers", "Gravy", 3, "2 - 2", 6],
    ["Milk Before Cereal", "Gravy", 4, "1 - 3", 4],
    ["Wouldabeendope", "Gravy", 5, "0 - 4", 1],
    ["The Hornets", "Train", 1, "4 - 0", 10],
    ["Pitch Pirates", "Train", 2, "3 - 1", 6],
    ["Bird Bath Bombers", "Train", 3, "2 - 2", 6],
    ["D' n' the V's", "Train", 4, "1 - 3", 4],
    ["Danger Pings", "Train", 5, "0 - 4", 2],
  ],
};

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
  homeLogoButton: document.querySelector("#homeLogoButton"),
  patchNotesButton: document.querySelector("#patchNotesButton"),
  patchNotesOverlay: document.querySelector("#patchNotesOverlay"),
  patchNotesClose: document.querySelector("#patchNotesClose"),
  generatedAt: document.querySelector("#generatedAt"),
  seasonSelect: document.querySelector("#seasonSelect"),
  searchInput: document.querySelector("#searchInput"),
  searchSuggestions: document.querySelector("#searchSuggestions"),
  includeScrims: document.querySelector("#includeScrims"),
  excludeTwosControl: document.querySelector("#excludeTwosControl"),
  excludeTwosEra: document.querySelector("#excludeTwosEra"),
  excludeThreesControl: document.querySelector("#excludeThreesControl"),
  excludeThreesEra: document.querySelector("#excludeThreesEra"),
  seasonPhaseControl: document.querySelector("#seasonPhaseControl"),
  s5StageControl: document.querySelector("#s5StageControl"),
  s6StageControl: document.querySelector("#s6StageControl"),
  s6PoolControl: document.querySelector("#s6PoolControl"),
  analyticsModeControl: document.querySelector("#analyticsModeControl"),
  tabButtons: [...document.querySelectorAll("[data-view]")],
  teamLeaderGrid: document.querySelector("#teamLeaderGrid"),
  awardRaceGrid: document.querySelector("#awardRaceGrid"),
  homePanel: document.querySelector("#homePanel"),
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
  detailActions: document.querySelector("#detailActions"),
  detailTeamLogo: document.querySelector("#detailTeamLogo"),
  backButton: document.querySelector("#backButton"),
  leaderOneTitle: document.querySelector("#leaderOneTitle"),
  leaderTwoTitle: document.querySelector("#leaderTwoTitle"),
  leaderOne: document.querySelector("#leaderOne"),
  leaderTwo: document.querySelector("#leaderTwo"),
  tableTitle: document.querySelector("#tableTitle"),
  tableLegend: document.querySelector("#tableLegend"),
  standingsRules: document.querySelector("#standingsRules"),
  rowCount: document.querySelector("#rowCount"),
  head: document.querySelector("#statsHead"),
  body: document.querySelector("#statsBody"),
  tableShell: document.querySelector(".table-shell"),
  detailExtras: document.querySelector("#detailExtras"),
  awardFilters: document.querySelector("#awardFilters"),
  scheduleFilters: document.querySelector("#scheduleFilters"),
  playerFilters: document.querySelector("#playerFilters"),
  csvImportPanel: document.querySelector("#csvImportPanel"),
  kitchenPanel: document.querySelector("#kitchenPanel"),
  teamInfoPanel: document.querySelector("#teamInfoPanel"),
  yourKitchenPanel: document.querySelector("#yourKitchenPanel"),
  playoffStats: document.querySelector("#playoffStats"),
};

const trophyTeams = new Set(["TWO INCHES DEEP", "WEENIE HUT JRS", "SWEATY SWEEPERS", "GRAVY STAIN BOYS", "RED ROCKETS SC"]);
const disputedChampionTeams = new Set(["TWO INCHES DEEP"]);
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
const ongoingAwardSeasons = new Set(["S6"]);
const manualSeasonChampions = [
  { season: "S1", team: "Two Inches Deep", amount: "Champion*" },
];

function seasonChampionDefinitions() {
  const seen = new Set();
  const championDefinition = (season, championTeam, amount = "Champion") => {
    const key = `${season}|${championTeam}`;
    if (seen.has(key)) return null;
    seen.add(key);
    const winners = data.players
      .filter((player) => player.season === season && (player.teams || []).includes(championTeam))
      .map((player) => player.name)
      .sort((a, b) => a.localeCompare(b));
    if (!winners.length) return null;
    return {
      award: "Season Champion",
      season,
      stat: "score",
      avgStat: "avgScore",
      totalLabel: "Champion",
      avgLabel: "",
      winners,
      team: championTeam,
      amount,
      perGameAmount: "",
    };
  };
  const manualDefinitions = manualSeasonChampions
    .map((champion) => championDefinition(champion.season, champion.team, champion.amount))
    .filter(Boolean);
  const playoffDefinitions = (data.manualHistory?.playoffs || [])
    .filter((row) => isChampionshipRound(row) && row.round !== "Championship Game")
    .flatMap((row) => {
      const winnerKey = playoffWinnerKey(row);
      const championTeam = winnerKey ? row[winnerKey] : "";
      const season = baseSeasonName(row.season).replace(/\s+Playoffs$/i, "");
      if (!championTeam || !/^S\d+$/.test(season)) return [];
      const definition = championDefinition(season, championTeam);
      return definition ? [definition] : [];
    });
  return [...manualDefinitions, ...playoffDefinitions];
}

function allStarDefinitions() {
  return ["S1", "S2", "S3", "S4", "S5"].flatMap((season) => {
    const limit = season === "S1" ? 6 : 8;
    const rows = seasonPlayerRows(season)
      .filter((row) => Number.isFinite(row.avgScore) && row.games > 0)
      .sort((a, b) => b.avgScore - a.avgScore || b.score - a.score || a.name.localeCompare(b.name))
      .slice(0, limit);
    if (!rows.length) return [];
    return rows.map((row) => ({
      award: "All-Star",
      season,
      stat: "score",
      avgStat: "avgScore",
      sortStat: "avgScore",
      totalLabel: "All-Star",
      avgLabel: "Score/G",
      winners: [row.name],
      team: row.teamsText || row.teams?.join(", ") || "",
      amount: "All-Star",
      perGameAmount: fmtGameAvg(row.avgScore),
      generated: true,
      nonRace: true,
    }));
  });
}

function allAwardDefinitions() {
  const explicitKeys = new Set(awardDefinitions.map((award) => `${award.season}|${award.award}`));
  const generatedRaceAwards = visibleSeasons()
    .filter((season) => /^S\d+$/.test(season) && !ongoingAwardSeasons.has(season))
    .flatMap((season) => awardRaceDefinitionsForSeason(season)
      .filter((award) => !explicitKeys.has(`${season}|${award.award}`))
      .map(computedAwardDefinition)
      .filter(Boolean));
  return [...awardDefinitions, ...generatedRaceAwards, ...allStarDefinitions(), ...seasonChampionDefinitions()]
    .filter((award) => !ongoingAwardSeasons.has(award.season) && !isWorldCupAwardName(award.award));
}

function worldCupDefinitions() {
  return awardDefinitions.filter((award) => isWorldCupAwardName(award.award));
}

function formattedAwardTeam(definition, index = null) {
  if (Array.isArray(definition.teamList)) {
    if (Number.isInteger(index)) return displayName(definition.teamList[index] || "", "team");
    return definition.teamList.filter(Boolean).map((team) => displayName(team, "team")).join(", ");
  }
  const team = String(definition.team || "");
  if (definition.winners?.length > 1 && team.includes(", ")) {
    return team.split(", ").filter(Boolean).map((teamName) => displayName(teamName, "team")).join(", ");
  }
  return displayName(team, "team");
}

function playerAwardRows() {
  return allAwardDefinitions().flatMap((definition) => definition.winners.map((player, index) => ({
    award: awardDisplayName(definition),
    player,
    team: formattedAwardTeam(definition, index),
    season: definition.season,
    amount: definition.winners.length > 1 && !isNonRaceAwardName(definition.award) ? "" : definition.amount,
    perGameAmount: Array.isArray(definition.perGameList) ? definition.perGameList[index] : definition.perGameAmount,
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
  "games", "wins", "matchWinPct", "gameWins", "gameWinPct",
  "score", "avgScore", "goals", "goalsPerGame", "assists", "assistsPerGame",
  "saves", "savesPerGame", "shots", "shotsPerGame", "shootingPct",
  "per", "perPerGame", "boostStolenPerGame", "pressureRate", "pressureIndex",
]);

const rosterColumns = [
  ["name", "Player"],
  ["role", "Role"],
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

const milestoneArchiveColumns = [
  ["label", "Milestone"],
  ["player", "Player"],
  ["threshold", "Threshold"],
  ["value", "Career Total"],
];

const worldCupArchiveColumns = [
  ["season", "World Cup"],
  ["award", "Award"],
  ["player", "Player"],
  ["team", "Team"],
  ["amount", "Result"],
];

const recordsArchiveColumns = [
  ["record", "Record"],
  ["value", "Value"],
  ["holder", "Holder"],
  ["team", "Team"],
  ["season", "Season"],
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

const recordsArchiveEntries = [
  { era: "2s", scope: "season", entity: "players", record: "Points", value: "25586", holder: "Seth", team: "Glizzy Gobblers", season: "I" },
  { era: "2s", scope: "season", entity: "players", record: "Points (PPG)", value: "665.4", holder: "Brock", team: "Coming, Melissa!", season: "I" },
  { era: "2s", scope: "season", entity: "players", record: "Goals", value: "109", holder: "Seth", team: "Glizzy Gobblers", season: "I" },
  { era: "2s", scope: "season", entity: "players", record: "Goals (PPG)", value: "2.79", holder: "Seth", team: "Glizzy Gobblers", season: "I" },
  { era: "2s", scope: "season", entity: "players", record: "Assists", value: "52", holder: "Clayton", team: "Glizzy Gobblers", season: "I" },
  { era: "2s", scope: "season", entity: "players", record: "Assists (PPG)", value: "1.33", holder: "Clayton", team: "Glizzy Gobblers", season: "I" },
  { era: "2s", scope: "season", entity: "players", record: "Saves", value: "62", holder: "Brock", team: "Coming, Melissa!", season: "I" },
  { era: "2s", scope: "season", entity: "players", record: "Saves (PPG)", value: "1.63", holder: "Brock", team: "Coming, Melissa!", season: "I" },
  { era: "2s", scope: "season", entity: "players", record: "Shots", value: "206", holder: "Seth", team: "Glizzy Gobblers", season: "I" },
  { era: "2s", scope: "season", entity: "players", record: "Shots (PPG)", value: "5.28", holder: "Seth", team: "Glizzy Gobblers", season: "I" },
  { era: "2s", scope: "season", entity: "players", record: "Shooting Percentage", value: "57.14%", holder: "Kellen", team: "Two Inches Deep", season: "I" },
  { era: "2s", scope: "season", entity: "teams", record: "Match Record", value: "9-1", holder: "Glizzy Gobblers", team: "Clayton, Seth", season: "I" },
  { era: "2s", scope: "season", entity: "teams", record: "Game Record (Win%)", value: "26-9 (.722%)", holder: "Two Inches Deep", team: "Kellen, Troy", season: "I" },
  { era: "2s", scope: "season", entity: "teams", record: "Most Wins", value: "28", holder: "Glizzy Gobblers", team: "Clayton, Seth", season: "I" },
  { era: "2s", scope: "season", entity: "teams", record: "Fewest Losses", value: "9", holder: "Two Inches Deep", team: "Kellen, Troy", season: "I" },
  { era: "2s", scope: "season", entity: "teams", record: "Goal Differential", value: "76", holder: "Glizzy Gobblers", team: "Clayton, Seth", season: "I" },
  { era: "2s", scope: "season", entity: "teams", record: "Points", value: "44076", holder: "Glizzy Gobblers", team: "Clayton, Seth", season: "I" },
  { era: "2s", scope: "season", entity: "teams", record: "Goals", value: "164", holder: "Glizzy Gobblers", team: "Clayton, Seth", season: "I" },
  { era: "2s", scope: "season", entity: "teams", record: "Assists", value: "85", holder: "Glizzy Gobblers", team: "Clayton, Seth", season: "I" },
  { era: "2s", scope: "season", entity: "teams", record: "Saves", value: "115", holder: "Coming, Melissa!", team: "Brock, Garcia", season: "I" },
  { era: "2s", scope: "season", entity: "teams", record: "Shots", value: "334", holder: "Glizzy Gobblers", team: "Clayton, Seth", season: "I" },
  { era: "2s", scope: "season", entity: "teams", record: "Sweeps", value: "6", holder: "Two Inches Deep", team: "Kellen, Troy", season: "I" },
  { era: "2s", scope: "game", entity: "players", record: "Points (P)", value: "1042", holder: "James", team: "MegaWatt", season: "II" },
  { era: "2s", scope: "game", entity: "teams", record: "Points (T)", value: "1418", holder: "Ben, Kris", team: "The Win-Dixie's", season: "II" },
  { era: "2s", scope: "game", entity: "players", record: "Goals (P)", value: "3", holder: "Ben, James, Kevin, Kris", team: "-", season: "II" },
  { era: "2s", scope: "game", entity: "teams", record: "Goals (T)", value: "5", holder: "Garcia, Kevin", team: "The Gravy Stain Boys", season: "II" },
  { era: "2s", scope: "game", entity: "players", record: "Assists (P)", value: "3", holder: "Garcia", team: "The Gravy Stain Boys", season: "II" },
  { era: "2s", scope: "game", entity: "teams", record: "Assists (T)", value: "3", holder: "-", team: "GSB, WD", season: "II" },
  { era: "2s", scope: "game", entity: "players", record: "Saves (P)", value: "7", holder: "James", team: "MegaWatt", season: "II" },
  { era: "2s", scope: "game", entity: "teams", record: "Saves (T)", value: "9", holder: "James, Kellen", team: "MegaWatt", season: "II" },
  { era: "2s", scope: "game", entity: "players", record: "Shots (P)", value: "10", holder: "Kris", team: "The Win-Dixie's", season: "II" },
  { era: "2s", scope: "game", entity: "teams", record: "Shots (T)", value: "14", holder: "Ben, Kris", team: "The Win-Dixie's", season: "II" },
  { era: "3s", scope: "season", entity: "players", record: "Points", value: "21876", holder: "Ryan", team: "Syndicate O' Scallywags", season: "III" },
  { era: "3s", scope: "season", entity: "players", record: "PPG", value: "560.9", holder: "Ryan", team: "Syndicate O' Scallywags", season: "III" },
  { era: "3s", scope: "season", entity: "players", record: "Goals", value: "66", holder: "Ryan", team: "Syndicate O' Scallywags", season: "III" },
  { era: "3s", scope: "season", entity: "players", record: "GPG", value: "1.73", holder: "Kevin", team: "Midwest Cornstars", season: "III" },
  { era: "3s", scope: "season", entity: "players", record: "Assists", value: "32", holder: "Seth", team: "Red Rockets SC", season: "III" },
  { era: "3s", scope: "season", entity: "players", record: "APG", value: "0.84", holder: "Seth", team: "Red Rockets SC", season: "III" },
  { era: "3s", scope: "season", entity: "players", record: "Saves", value: "77", holder: "Ryan", team: "Smooth Jizz", season: "II" },
  { era: "3s", scope: "season", entity: "players", record: "SvPG", value: "1.83", holder: "James, Ryan", team: "MW, SJ", season: "II" },
  { era: "3s", scope: "season", entity: "players", record: "Shots", value: "191", holder: "Ryan", team: "Syndicate O' Scallywags", season: "III" },
  { era: "3s", scope: "season", entity: "players", record: "ShPG", value: "4.90", holder: "Ryan", team: "Syndicate O' Scallywags", season: "III" },
  { era: "3s", scope: "season", entity: "players", record: "Shooting Percentage", value: "43.84%", holder: "Kevin", team: "Midwest Cornstars", season: "III" },
  { era: "3s", scope: "season", entity: "players", record: "PER", value: "9.4", holder: "Ryan", team: "Syndicate O' Scallywags", season: "III" },
  { era: "3s", scope: "season", entity: "players", record: "PERPG", value: "0.24", holder: "Ryan", team: "Syndicate O' Scallywags", season: "III" },
  { era: "3s", scope: "season", entity: "players", record: "MVP's", value: "25", holder: "Seth", team: "Epstein's Waitlist", season: "II" },
  { era: "3s", scope: "season", entity: "teams", record: "Score", value: "17", holder: "MC, TL", team: "-", season: "III" },
  { era: "3s", scope: "season", entity: "teams", record: "Rating", value: "985.1", holder: "The Lamplighters", team: "Clayton, David, Ryan", season: "III" },
  { era: "3s", scope: "season", entity: "teams", record: "Match Record", value: "9-1", holder: "Epstein's Waitlist", team: "Henry, Logan, Seth", season: "II" },
  { era: "3s", scope: "season", entity: "teams", record: "Game Record (Win%)", value: "28-8 (.778%)", holder: "Epstein's Waitlist", team: "Henry, Logan, Seth", season: "II" },
  { era: "3s", scope: "season", entity: "teams", record: "Most Wins", value: "28", holder: "Epstein's Waitlist", team: "Henry, Logan, Seth", season: "II" },
  { era: "3s", scope: "season", entity: "teams", record: "Fewest Losses", value: "8", holder: "Epstein's Waitlist", team: "Henry, Logan, Seth", season: "II" },
  { era: "3s", scope: "season", entity: "teams", record: "Goal Differential", value: "46", holder: "The Gravy Stain Boys", team: "Alex, Clayton, Kevin", season: "II" },
  { era: "3s", scope: "season", entity: "teams", record: "Points", value: "42031", holder: "Red Rockets SC", team: "Austin, Logan, Seth", season: "III" },
  { era: "3s", scope: "season", entity: "teams", record: "PPG", value: "1106.1", holder: "Red Rockets SC", team: "Austin, Logan, Seth", season: "III" },
  { era: "3s", scope: "season", entity: "teams", record: "Goals", value: "114", holder: "Red Rockets SC", team: "Austin, Logan, Seth", season: "III" },
  { era: "3s", scope: "season", entity: "teams", record: "GPG", value: "3.00", holder: "Red Rockets SC", team: "Austin, Logan, Seth", season: "III" },
  { era: "3s", scope: "season", entity: "teams", record: "Assists", value: "82", holder: "Red Rockets SC", team: "Austin, Logan, Seth", season: "III" },
  { era: "3s", scope: "season", entity: "teams", record: "APG", value: "2.16", holder: "Red Rockets SC", team: "Austin, Logan, Seth", season: "III" },
  { era: "3s", scope: "season", entity: "teams", record: "Saves", value: "152", holder: "Smooth Jizz", team: "Adam, Jacob, Ryan", season: "II" },
  { era: "3s", scope: "season", entity: "teams", record: "SvPG", value: "3.85", holder: "The Donald Bumps", team: "Alex, Cole, Issac", season: "III" },
  { era: "3s", scope: "season", entity: "teams", record: "Shots", value: "330", holder: "Red Rockets SC", team: "Austin, Logan, Seth", season: "III" },
  { era: "3s", scope: "season", entity: "teams", record: "ShPG", value: "8.68", holder: "Red Rockets SC", team: "Austin, Logan, Seth", season: "III" },
  { era: "3s", scope: "season", entity: "teams", record: "Shoot%", value: "40.59%", holder: "The Lamplighters", team: "Clayton, David, Ryan", season: "III" },
  { era: "3s", scope: "season", entity: "teams", record: "PER", value: "16.3", holder: "Red Rockets SC", team: "Austin, Logan, Seth", season: "III" },
  { era: "3s", scope: "season", entity: "teams", record: "PERPG", value: "0.43", holder: "Red Rockets SC", team: "Austin, Logan, Seth", season: "III" },
  { era: "3s", scope: "season", entity: "teams", record: "Sweeps", value: "5", holder: "Epstein's Waitlist", team: "Henry, Logan, Seth", season: "II" },
  { era: "3s", scope: "game", entity: "players", record: "Points (P)", value: "1160", holder: "Schwifty", team: "Syndicate O' Scallywags", season: "III" },
  { era: "3s", scope: "game", entity: "teams", record: "Points (T)", value: "1950", holder: "Brock, David, Drew", team: "Rough Sax", season: "II" },
  { era: "3s", scope: "game", entity: "players", record: "Goals (P)", value: "6", holder: "Schwifty", team: "Syndicate O' Scallywags", season: "III" },
  { era: "3s", scope: "game", entity: "teams", record: "Goals (T)", value: "8", holder: "Henry, Sam, Schwifty", team: "Syndicate O' Scallywags", season: "III" },
  { era: "3s", scope: "game", entity: "players", record: "Assists (P)", value: "5", holder: "Garcia", team: "The Gravy Stain Boys", season: "II" },
  { era: "3s", scope: "game", entity: "teams", record: "Assists (T)", value: "6", holder: "Kevin, Rick, Ross", team: "Midwest Cornstars", season: "III" },
  { era: "3s", scope: "game", entity: "players", record: "Saves (P)", value: "7", holder: "Seth", team: "Red Rockets SC", season: "III" },
  { era: "3s", scope: "game", entity: "teams", record: "Saves (T)", value: "12", holder: "Austin, Logan, Seth", team: "Red Rockets SC", season: "III" },
  { era: "3s", scope: "game", entity: "players", record: "Shots (P)", value: "9", holder: "Seth", team: "Epstein's Waitlist", season: "II" },
  { era: "3s", scope: "game", entity: "teams", record: "Shots (T)", value: "14", holder: "-", team: "EW, RRSC, TC", season: "II, III" },
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
    .flatMap(([key, label]) => {
      if (state.view === "players" && state.season === "S6" && key === "teamsText") return [[key, label], ["role", "Role"]];
      return [[key, label]];
    })
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

function resetLifetimeEraFiltersIfNeeded() {
  if (isLifetimeView()) return;
  state.excludeTwosEra = false;
  state.excludeThreesEra = false;
  if (els.excludeTwosEra) els.excludeTwosEra.checked = false;
  if (els.excludeThreesEra) els.excludeThreesEra.checked = false;
}

function snapshotContext() {
  return {
    page: { ...state.page },
    view: state.view,
    season: state.season,
    seasonPhase: state.seasonPhase,
    sortKey: state.sortKey,
    sortDir: state.sortDir,
  s5Stage: state.s5Stage,
  s5Pool: state.s5Pool,
  s6Stage: state.s6Stage,
  s6Pool: state.s6Pool,
    scheduleTeamFilter: state.scheduleTeamFilter,
    scheduleUnplayedOnly: state.scheduleUnplayedOnly,
  };
}

function restoreContext(context) {
  if (!context) return false;
  Object.assign(state, {
    page: context.page,
    view: context.view,
    season: context.season,
    seasonPhase: context.seasonPhase,
    sortKey: context.sortKey,
    sortDir: context.sortDir,
    s5Stage: context.s5Stage,
    s5Pool: context.s5Pool,
    s6Stage: context.s6Stage,
    s6Pool: context.s6Pool,
    scheduleTeamFilter: context.scheduleTeamFilter,
    scheduleUnplayedOnly: !!context.scheduleUnplayedOnly,
  });
  return true;
}

function excludedFromLifetime(rowOrSeason) {
  const season = typeof rowOrSeason === "string" ? rowOrSeason : rowOrSeason?.season;
  if (typeof rowOrSeason === "object" && rowOrSeason?.excludeFromLifetime) return true;
  const seasonNumber = /^S\d+$/.test(String(season)) ? Number(String(season).slice(1)) : null;
  return (state.excludeTwosEra && season === "S1")
    || (state.excludeThreesEra && seasonNumber !== null && seasonNumber >= 2 && seasonNumber <= 6);
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
  const formatted = formatDisplayName(value, key);
  const badgeKey = String(value || "").toUpperCase();
  if ((key === "name" || key === "team" || key === "opponent") && trophyTeams.has(badgeKey)) return `${formatted} \u{1F3C6}${disputedChampionTeams.has(badgeKey) ? "*" : ""}`;
  if ((key === "name" || key === "team" || key === "opponent") && silverTrophyTeams.has(badgeKey)) return `${formatted} \u{1F948}`;
  return formatted;
}

const displayNameOverrides = new Map([
  ["THE HORNETS", "The Hornets"],
  ["TRIPLE SCOOP", "Triple Scoop"],
  ["BMM", "Big Musty Milkers"],
  ["BBB", "Bird Bath Bombers"],
  ["PITCH PIRATES", "Pitch Pirates"],
  ["MILK BEFORE CEREAL", "Milk Before Cereal"],
  ["DANGER PINGS", "Danger Pings"],
  ["D' N' THE V'S", "D' n' the V's"],
  ["WEENIE HUT JRS", "Weenie Hut Jrs"],
  ["TEAM ZAZ", "Team ZAZ"],
  ["ESC", "ESC"],
]);

function titleCaseDisplay(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\b([a-z])/g, (match) => match.toUpperCase())
    .replace(/\bSc\b/g, "SC")
    .replace(/\bMvp\b/g, "MVP")
    .replace(/\bDnp\b/g, "DNP")
    .replace(/\bUs\b/g, "US")
    .replace(/'S\b/g, "'s");
}

function formatDisplayName(value, key = "") {
  const text = String(value ?? "");
  if (!text) return "";
  if (key === "team" || key === "opponent" || key === "teamA" || key === "teamB") {
    const override = displayNameOverrides.get(text) || displayNameOverrides.get(text.toUpperCase());
    if (override) return override;
    return /^[A-Z0-9\s'&.-]+$/.test(text) ? titleCaseDisplay(text) : text;
  }
  return text;
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

function scheduleStageLabel(stage) {
  const key = String(stage || "").trim().toLowerCase();
  if (key === "split1") return "Split 1";
  if (key === "split2") return "Split 2";
  if (key === "swiss") return "Swiss";
  if (key === "group") return "Group Stage";
  if (key === "regular") return "Regular Season";
  if (key === "overall") return "Overall";
  return stage || "";
}

function scheduleTeamCell(row, key) {
  const value = row[key];
  if (!value) return "";
  const isWinner = row.winner && row.winner === value;
  const style = isWinner ? ` style="--team-color:${escapeHtml(teamColor(value, row.season || state.season))}"` : "";
  const points = key === "team" ? row.homePoints : row.awayPoints;
  const label = displayName(value, "team");
  const seededLabel = points
    ? (key === "team" ? `(${points}) ${label}` : `${label} (${points})`)
    : label;
  return `<span class="${isWinner ? "schedule-winner-team" : ""}"${style}>${escapeHtml(seededLabel)}</span>`;
}

function scheduleResultMarkup(row) {
  const text = String(row.result || "").trim();
  if (!text) return "";
  const match = text.match(/^(.*?)(\d+)\s*-\s*(\d+)(.*)$/);
  if (!match) return escapeHtml(text);
  const leftScore = Number(match[2]);
  const rightScore = Number(match[3]);
  const left = leftScore > rightScore ? `<strong class="schedule-winning-score">${escapeHtml(match[2])}</strong>` : escapeHtml(match[2]);
  const right = rightScore > leftScore ? `<strong class="schedule-winning-score">${escapeHtml(match[3])}</strong>` : escapeHtml(match[3]);
  return `${escapeHtml(match[1])}${left} - ${right}${escapeHtml(match[4])}`;
}

function scheduleVodMarkup(row) {
  const url = String(row.vod || "").trim();
  if (!url) return "";
  return `
    <a class="vod-link" data-vod-link href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" aria-label="Open VOD">
      <img src="assets/icons/youtube.png" alt="YouTube VOD">
    </a>
  `;
}

function scheduleNoteMarkup(row) {
  const note = String(row.note || "").trim();
  if (!note) return "";
  const locked = /locked/i.test(note);
  const pending = /pending/i.test(note);
  const className = locked ? "schedule-status locked" : (pending ? "schedule-status pending" : "schedule-status");
  return `<span class="${className}">${escapeHtml(note)}</span>`;
}

const draftVodLinks = new Map([
  ["S6", "https://www.youtube.com/watch?v=ju1CaalPFBc"],
]);

function youtubeLogoLink(url, className = "vod-link", label = "Open YouTube video") {
  if (!url) return "";
  return `
    <a class="${className}" data-vod-link href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(label)}" title="${escapeHtml(label)}">
      <img src="assets/icons/youtube.png" alt="YouTube">
    </a>
  `;
}

function teamTextLinks(row) {
  const displayTeamList = (teams) => teams
    .filter(Boolean)
    .map((teamName) => escapeHtml(displayName(teamName, "team")))
    .join(", ");
  if (state.page.type !== "player" || !row.teams?.length) {
    return displayTeamList(row.teams || String(row.teamsText || "").split(", "));
  }
  if (row.__isCareer) {
    return displayTeamList(row.teams);
  }
  return row.teams.map((teamName) => {
    const action = { type: "team", team: teamName, season: row.season };
    return `<button type="button" class="inline-team-link" data-action="${encodeURIComponent(JSON.stringify(action))}">${escapeHtml(displayName(teamName, "team"))}</button>`;
  }).join(", ");
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
  if (unavailableWhenManualZero.has(key) && Number(row.advancedGames || 0) === 0) return true;
  if (key === "pressureRate" || key === "pressureIndex") return Number(row.amountStolen || 0) === 0 && Number(row.demosInflicted || 0) === 0 && Number(row.opponentSavesForced || 0) === 0;
  if (unavailableWhenManualZero.has(key)) return Number(row[key] || 0) === 0;
  if (["teamSaveRate", "opponentShootingPct", "shotsConcededPerGame"].includes(key)) return Number(row.shotsConceded || 0) === 0;
  if (key === "goalsConcededPerGame") return Number(row.goalsConceded || 0) === 0;
  if (key === "goalDiff") return !!row.goalDiffUnavailable;
  return false;
}

function finalizeCommon(item) {
  const games = Math.max(1, item.games);
  const advancedGames = Math.max(1, Number(item.advancedGames || 0) || ((Number(item.amountStolen || 0) || Number(item.demosInflicted || 0) || Number(item.opponentSavesForced || 0)) ? games : 0));
  const matchTotal = Math.max(1, (item.wins || 0) + (item.losses || 0));
  const gameWins = typeof item.gameWins === "number" ? item.gameWins : item.wins;
  const gameLosses = typeof item.gameLosses === "number" ? item.gameLosses : item.losses;
  const gameTotal = Math.max(1, (gameWins || 0) + (gameLosses || 0));
  const calculatedMatchWinPct = Math.round(((item.wins || 0) / matchTotal) * 1000) / 10;
  const calculatedGameWinPct = Math.round(((gameWins || 0) / gameTotal) * 1000) / 10;
  item.matchWinPct = typeof item.matchWinPct === "number" ? item.matchWinPct : calculatedMatchWinPct;
  item.gameWinPct = typeof item.gameWinPct === "number" ? item.gameWinPct : calculatedGameWinPct;
  item.winPct = typeof item.winPct === "number" ? item.winPct : item.matchWinPct;
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
  item.demosPerGame = Math.round((item.demosInflicted / advancedGames) * 100) / 100;
  item.distancePerGame = Math.round(item.totalDistance / games);
  item.boostCollectedPerGame = Math.round((item.amountCollected / advancedGames) * 100) / 100;
  item.boostStolenPerGame = Math.round((item.amountStolen / advancedGames) * 100) / 100;
  item.opponentSavesForcedPerGame = Math.round((item.opponentSavesForced / advancedGames) * 100) / 100;
  const pressureShots = Number(item.pressureShots ?? item.shots ?? 0) || 0;
  const pressureOpponentSaves = Number(item.pressureOpponentSaves ?? item.opponentSavesForced ?? 0) || 0;
  item.pressureIndex = Math.round((
    (pressureShots / advancedGames) +
    (1.5 * (pressureOpponentSaves / advancedGames)) +
    (0.05 * (item.amountStolen / advancedGames)) +
    (item.demosInflicted / advancedGames)
  ) * 100) / 100;
  return item;
}

function s6BaseTeamRows() {
  return data.teams.filter((row) => row.season === "S6");
}

function s6BasePlayerRows() {
  return data.players.filter((row) => row.season === "S6");
}

function makeS6TeamRow(raw) {
  const [name, rating, goalDiff, games, score, goals, goalsConceded, assists, saves, shots, shotsConceded, per, perPerGame, standingsPoints, wins, losses, gameWins, gameLosses, sweeps, gameFiveLosses] = raw;
  const row = {
    season: "S6",
    name,
    clinchMark: s6PoolClinches[name] || "",
    pool: s6Pools[name] || "",
    games,
    gameWins,
    gameLosses,
    wins,
    losses,
    matchRecord: `${wins} - ${losses}`,
    standingsPoints,
    accruedBonuses: s6AccruedBonuses[name] || 0,
    score,
    goals,
    goalsConceded,
    assists,
    saves,
    shots,
    shotsConceded,
    sweeps,
    gameFiveLosses,
    rating,
    goalDiff,
    per,
    perPerGame,
    source: "manual",
    overrideGenerated: true,
  };
  const finalized = finalizeCommon(row);
  finalized.goalDiff = goalDiff;
  finalized.per = per;
  finalized.perPerGame = perPerGame;
  return finalized;
}

function makeS6PlayerRow(raw, teamRows = s6StageTeamRows("overall")) {
  const [team, name, games, score, goals, assists, saves, shots, per, perPerGame, mvps, rating] = raw;
  const teamRow = teamRows.find((row) => row.name === team) || {};
  const row = {
    season: "S6",
    name: canonicalPlayerName(name),
    teams: [team],
    teamsText: team,
    pool: s6Pools[team] || "",
    games,
    wins: Number(teamRow.wins || 0),
    losses: Number(teamRow.losses || 0),
    gameWins: Number(teamRow.gameWins || 0),
    gameLosses: Number(teamRow.gameLosses || 0),
    standingsPoints: 0,
    score,
    goals,
    assists,
    saves,
    shots,
    per,
    perPerGame,
    mvps,
    rating,
    source: "manual",
    overrideGenerated: true,
  };
  const finalized = finalizeCommon(row);
  finalized.per = per;
  finalized.perPerGame = perPerGame;
  return finalized;
}

function swissLeagueScore(row) {
  const wins = Number(row.wins || 0);
  const sweeps = Number(row.sweeps || 0);
  const gameFiveLosses = Number(row.gameFiveLosses || 0);
  return (Math.max(0, Math.min(wins, sweeps)) * 3)
    + (Math.max(0, wins - sweeps) * 2)
    + gameFiveLosses;
}

function makeS6SwissTeamRow(raw) {
  const standingsPoints = swissLeagueScore(raw);
  const row = {
    season: "S6",
    name: canonicalTeamName(raw.name),
    clinchMark: s6PoolClinches[raw.name] || "",
    pool: s6Pools[raw.name] || "",
    games: raw.games,
    gameWins: raw.gameWins,
    gameLosses: raw.gameLosses,
    wins: raw.wins,
    losses: raw.losses,
    matchRecord: `${raw.wins} - ${raw.losses}`,
    standingsPoints,
    accruedBonuses: 0,
    score: raw.score,
    goals: raw.goals,
    goalsConceded: raw.goalsConceded,
    assists: raw.assists,
    saves: raw.saves,
    shots: raw.shots,
    shotsConceded: raw.shotsConceded,
    sweeps: raw.sweeps,
    gameFiveLosses: raw.gameFiveLosses,
    rating: raw.rating,
    amountStolen: raw.amountStolen,
    demosInflicted: raw.demosInflicted,
    demosTaken: raw.demosTaken,
    opponentSavesForced: raw.opponentSavesForced,
    pressureShots: raw.shots,
    pressureOpponentSaves: raw.opponentSavesForced,
    advancedGames: raw.games,
    per: raw.per,
    perPerGame: raw.perPerGame,
    source: "manual",
    overrideGenerated: true,
    stage: "swiss",
  };
  const finalized = finalizeCommon(row);
  finalized.per = raw.per;
  finalized.perPerGame = raw.perPerGame;
  finalized.standingsPoints = standingsPoints;
  finalized.pointsPerGame = Math.round((standingsPoints / Math.max(1, finalized.games)) * 100) / 100;
  return finalized;
}

function applyS6SwissByePoints(row) {
  const byePoints = s6SwissByePoints[row.name] || 0;
  if (!byePoints) return row;
  const next = {
    ...row,
    standingsPoints: (Number(row.standingsPoints) || 0) + byePoints,
  };
  next.pointsPerGame = Math.round((next.standingsPoints / Math.max(1, next.games)) * 100) / 100;
  return next;
}

function applyS6SeasonScoreOverride(row) {
  const standingsPoints = s6SeasonScoreOverrides[row.name];
  if (typeof standingsPoints !== "number") return row;
  const next = {
    ...row,
    standingsPoints,
    maxScore: standingsPoints,
  };
  next.pointsPerGame = Math.round((standingsPoints / Math.max(1, next.games)) * 100) / 100;
  return next;
}

function makeS6SwissPlayerRow(raw, teamRows = s6StageTeamRows("swiss", "overall")) {
  const [team, name, games, score, goals, assists, saves, shots, demosInflicted, demosTaken, mvps, amountStolen, rating] = raw;
  const canonicalTeam = canonicalTeamName(team);
  const teamRow = teamRows.find((row) => row.name === canonicalTeam) || {};
  const row = {
    season: "S6",
    name: canonicalPlayerName(name),
    teams: [canonicalTeam],
    teamsText: canonicalTeam,
    pool: s6Pools[canonicalTeam] || "",
    games,
    wins: Number(teamRow.wins || 0),
    losses: Number(teamRow.losses || 0),
    gameWins: Number(teamRow.gameWins || 0),
    gameLosses: Number(teamRow.gameLosses || 0),
    standingsPoints: 0,
    score,
    goals,
    assists,
    saves,
    shots,
    mvps,
    rating,
    amountStolen,
    demosInflicted,
    demosTaken,
    pressureShots: shots,
    advancedGames: games,
    source: "manual",
    overrideGenerated: true,
    stage: "swiss",
  };
  return finalizeCommon(row);
}

function combineS6Rows(rows, type) {
  const byKey = new Map();
  rows.forEach((row) => {
    const key = type === "player" ? `${row.teams?.[0] || ""}|${row.name}` : row.name;
    if (!byKey.has(key)) {
      byKey.set(key, {
        ...row,
        teams: row.teams ? [...row.teams] : row.teams,
        source: "manual",
        overrideGenerated: true,
      });
      return;
    }
    const item = byKey.get(key);
    [
      "games", "wins", "losses", "gameWins", "gameLosses", "standingsPoints", "accruedBonuses", "score", "goals",
      "goalsConceded", "assists", "saves", "shots", "shotsConceded", "sweeps", "gameFiveLosses",
      "amountStolen", "demosInflicted", "demosTaken", "opponentSavesForced", "pressureShots", "pressureOpponentSaves", "advancedGames", "mvps", "per",
    ].forEach((field) => {
      item[field] = (Number(item[field]) || 0) + (Number(row[field]) || 0);
    });
    item.rating = row.rating || item.rating;
  });
  return [...byKey.values()].map((row) => {
    row.matchRecord = `${row.wins || 0} - ${row.losses || 0}`;
    delete row.matchWinPct;
    delete row.gameWinPct;
    delete row.winPct;
    const carriedPer = Number(row.per) || 0;
    const finalized = finalizeCommon(row);
    finalized.per = Math.round(carriedPer * 100) / 100;
    finalized.perPerGame = Math.round((finalized.per / Math.max(1, finalized.games)) * 100) / 100;
    finalized.stage = "overall";
    return finalized;
  });
}

function s6TeamRowsWithPlayerPer(teamRows, playerRows) {
  const perByTeam = new Map();
  playerRows.forEach((row) => {
    const team = canonicalTeamName(row.teams?.[0] || row.teamsText || "");
    if (!team) return;
    perByTeam.set(team, (perByTeam.get(team) || 0) + (Number(row.per) || 0));
  });
  return teamRows.map((row) => {
    const team = canonicalTeamName(row.name);
    if (!perByTeam.has(team)) return row;
    const per = Math.round(perByTeam.get(team) * 100) / 100;
    return {
      ...row,
      per,
      perPerGame: Math.round((per / Math.max(1, Number(row.games) || 0)) * 100) / 100,
    };
  });
}

function numericDiff(overall, group, key) {
  return Math.round(((Number(overall[key]) || 0) - (Number(group?.[key]) || 0)) * 100) / 100;
}

function s6DiffTeamRows() {
  const groupRows = new Map(s6BaseTeamRows().map((row) => [row.name, row]));
  return s6OverallTeamRows.map((raw) => {
    const overall = makeS6TeamRow(raw);
    const group = groupRows.get(overall.name);
    const diff = {
      ...overall,
      games: numericDiff(overall, group, "games"),
      gameWins: numericDiff(overall, group, "gameWins"),
      gameLosses: numericDiff(overall, group, "gameLosses"),
      wins: numericDiff(overall, group, "wins"),
      losses: numericDiff(overall, group, "losses"),
      standingsPoints: numericDiff(overall, group, "standingsPoints"),
      score: numericDiff(overall, group, "score"),
      goals: numericDiff(overall, group, "goals"),
      assists: numericDiff(overall, group, "assists"),
      saves: numericDiff(overall, group, "saves"),
      shots: numericDiff(overall, group, "shots"),
      goalsConceded: numericDiff(overall, group, "goalsConceded"),
      shotsConceded: numericDiff(overall, group, "shotsConceded"),
      sweeps: Math.max(0, numericDiff(overall, group, "sweeps")),
      gameFiveLosses: Math.max(0, numericDiff(overall, group, "gameFiveLosses")),
      per: numericDiff(overall, group, "per"),
      matchRecord: `${numericDiff(overall, group, "wins")} - ${numericDiff(overall, group, "losses")}`,
    };
    diff.goalDiff = diff.goals - diff.goalsConceded;
    const carriedPer = diff.per;
    const finalized = finalizeCommon(diff);
    finalized.per = carriedPer;
    finalized.perPerGame = Math.round((carriedPer / Math.max(1, finalized.games)) * 100) / 100;
    return finalized;
  }).filter((row) => row.games > 0);
}

function s6DiffPlayerRows() {
  const groupRows = new Map(s6BasePlayerRows().map((row) => [`${row.teams?.[0]}|${row.name}`, row]));
  const swissTeams = s6StageTeamRows("swiss");
  return s6OverallPlayerRows.map((raw) => {
    const team = raw[0];
    const name = canonicalPlayerName(raw[1]);
    const overall = makeS6PlayerRow(raw);
    const group = groupRows.get(`${team}|${name}`);
    const diffRaw = [
      team,
      name,
      numericDiff(overall, group, "games"),
      numericDiff(overall, group, "score"),
      numericDiff(overall, group, "goals"),
      numericDiff(overall, group, "assists"),
      numericDiff(overall, group, "saves"),
      numericDiff(overall, group, "shots"),
      numericDiff(overall, group, "per"),
      0,
      numericDiff(overall, group, "mvps"),
      overall.rating,
    ];
    if (diffRaw[2] <= 0) return null;
    const row = makeS6PlayerRow(diffRaw, swissTeams);
    row.per = diffRaw[8];
    row.perPerGame = Math.round((row.per / Math.max(1, row.games)) * 100) / 100;
    return row;
  }).filter(Boolean);
}

function s6StageTeamRows(stage = state.s6Stage, pool = state.s6Pool) {
  const groupRows = s6OverallTeamRows.map(makeS6TeamRow);
  const swissRows = s6SwissTeamRows.map(makeS6SwissTeamRow);
  const groupPlayerRows = s6OverallPlayerRows.map((row) => makeS6PlayerRow(row, groupRows));
  const swissPlayerRows = s6SwissPlayerRows.map((row) => makeS6SwissPlayerRow(row, swissRows));
  const combinedSwissRows = s6TeamRowsWithPlayerPer(combineS6Rows(swissRows, "team").map(applyS6SwissByePoints), combineS6Rows(swissPlayerRows, "player"));
  const combinedOverallRows = s6TeamRowsWithPlayerPer(
    combineS6Rows([...groupRows, ...combinedSwissRows], "team"),
    combineS6Rows([...groupPlayerRows, ...swissPlayerRows], "player")
  ).map(applyS6SeasonScoreOverride);
  const rows = stage === "swiss"
    ? combinedSwissRows
    : (stage === "overall" ? combinedOverallRows : s6TeamRowsWithPlayerPer(groupRows, groupPlayerRows));
  return s6FilterByPool(rows, pool);
}

function s6StagePlayerRows(stage = state.s6Stage, pool = state.s6Pool) {
  const groupTeams = s6StageTeamRows("group", "overall");
  const groupRows = s6OverallPlayerRows.map((row) => makeS6PlayerRow(row, groupTeams));
  const swissTeams = s6StageTeamRows("swiss", "overall");
  const swissRows = s6SwissPlayerRows.map((row) => makeS6SwissPlayerRow(row, swissTeams));
  const rows = stage === "swiss"
    ? combineS6Rows(swissRows, "player")
    : (stage === "overall" ? combineS6Rows([...groupRows, ...swissRows], "player") : groupRows);
  return s6FilterByPool(rows, pool);
}

function s6ComputedStandingsRows(stage) {
  const rows = s6StageTeamRows(stage, "overall")
    .sort((a, b) => b.standingsPoints - a.standingsPoints
      || b.wins - a.wins
      || a.losses - b.losses
      || b.gameWinPct - a.gameWinPct
      || b.goalDiff - a.goalDiff
      || a.name.localeCompare(b.name));
  return rows.map((row, index) => ({
    ...row,
    standingsRank: index + 1,
    poolRank: s6PoolRanks[row.name] || index + 1,
    matchRecord: `${row.wins || 0} - ${row.losses || 0}`,
    gameRecord: `${row.gameWins || 0} - ${row.gameLosses || 0}`,
    sweepsText: `${row.sweeps || 0} - ${row.gameFiveLosses || 0}`,
    accruedBonuses: Number(row.accruedBonuses || 0),
    remainingMatches: "",
    maxScore: row.standingsPoints || 0,
  }));
}

function s6StageLabel() {
  return state.s6Stage === "group" ? "Group Stage" : (state.s6Stage === "swiss" ? "Swiss" : "Overall");
}

function s5StageLabel() {
  if (state.s5Stage === "split1") return "Split 1";
  if (state.s5Stage === "split2") return "Split 2";
  if (state.s5Stage === "swiss") return "Swiss";
  return "Overall";
}

function activeStageLabel(season = state.season) {
  if (season === "S6") return s6StageLabel();
  if (season === "S5") return s5StageLabel();
  return "";
}

function preserveDetailOnStageChange() {
  return ["team", "player", "playerSeason"].includes(state.page.type);
}

function stagedSortKey() {
  if (state.page.type === "team") return "goals";
  if (state.page.type === "player") return "season";
  if (state.page.type === "playerSeason") return "date";
  return state.view === "standings" ? "standingsRank" : (state.view === "schedule" ? "season" : (isTeamView() ? "wins" : "goals"));
}

function stagedSortDir() {
  if (state.page.type === "player" || state.page.type === "playerSeason") return "asc";
  if (state.view === "standings" || state.view === "schedule") return "asc";
  return "desc";
}

function s5DashboardPrefix() {
  if (state.s5Stage === "swiss") return "S5 Swiss";
  if (state.s5Stage === "overall") return "S5 Overall";
  const pool = state.s5Pool === "overall" ? "" : ` ${s5PoolLabel()}`;
  return `S5 ${s5StageLabel()}${pool}`;
}

function s6DashboardPrefix() {
  if (state.s6Stage === "swiss") return "S6 Swiss";
  const stage = state.s6Stage === "overall" ? "Overall" : "Group Stage";
  const pool = state.s6Pool === "overall" ? "" : ` ${s6PoolLabel()}`;
  return `S6 ${stage}${pool}`;
}

function s5PoolLabel() {
  if (state.s5Pool === "gravy") return "Gravy Pool";
  if (state.s5Pool === "train") return "Train Pool";
  return "Overall";
}

function s6PoolLabel() {
  if (state.s6Pool === "gravy") return "Gravy Pool";
  if (state.s6Pool === "train") return "Train Pool";
  return "Overall";
}

function s5FilterByPool(rows, pool = state.s5Pool, stage = state.s5Stage) {
  if (pool === "overall" || !["split1", "split2"].includes(stage)) return rows;
  const poolName = pool === "gravy" ? "Gravy" : "Train";
  const pools = s5SplitPools[stage] || {};
  return rows.filter((row) => pools[row.name || row.team || row.teams?.[0]] === poolName);
}

function s6FilterByPool(rows, pool = state.s6Pool) {
  if (pool === "overall") return rows;
  return rows.filter((row) => String(row.pool || "").toLowerCase() === pool);
}

function s5SplitStandingRow(raw, index) {
  const [name, pool, poolRank, matchRecord, standingsPoints] = raw;
  const [wins, losses] = String(matchRecord).split("-").map((part) => Number(part.trim()) || 0);
  const total = wins + losses;
  return {
    season: "S5",
    name,
    pool,
    standingsRank: state.s5Pool === "overall" ? index + 1 : poolRank,
    poolRank,
    matchRecord,
    standingsPoints,
    goalDiff: "N/A",
    gameRecord: "N/A",
    wins,
    losses,
    gameWins: "N/A",
    gameLosses: "N/A",
    games: total,
    winPct: total ? Math.round((wins / total) * 1000) / 10 : 0,
    matchWinPct: total ? Math.round((wins / total) * 1000) / 10 : 0,
    gameWinPct: "N/A",
    sweeps: "N/A",
    gameFiveLosses: "N/A",
    sweepsText: "N/A",
    remainingMatches: Math.max(0, 5 - (wins + losses)),
    maxScore: standingsPoints,
  };
}

function s5SplitScheduleRows() {
  const stages = state.s5Stage === "overall" ? ["split1", "split2"] : [state.s5Stage];
  if (!stages.every((stage) => ["split1", "split2"].includes(stage))) return [];
  return stages.flatMap((stage) => s5FilterByPool(s5SplitStandingsRows[stage].map((row, index) => s5SplitStandingRow(row, index)), state.s5Pool, stage)
    .sort((a, b) => b.wins - a.wins || b.standingsPoints - a.standingsPoints || a.losses - b.losses || a.poolRank - b.poolRank || a.name.localeCompare(b.name))
    .map((row) => ({
      season: "S5",
      stage: stage === "split1" ? "Split 1" : "Split 2",
      pool: row.pool,
      round: "Pool Standings",
      team: row.name,
      opponent: "",
    result: "",
    vod: "",
    winner: "",
      matchRecord: row.matchRecord,
      standingsPoints: row.standingsPoints,
      note: "Split-level team/player stats not loaded yet",
    })));
}

function scheduleRows() {
  if (state.season === "S5") {
    if (["split1", "split2", "overall"].includes(state.s5Stage)) {
      const stages = state.s5Stage === "overall" ? ["split1", "split2"] : [state.s5Stage];
      const rows = (data.manualHistory?.schedules || [])
        .filter((row) => row.season === "S5" && stages.includes(row.stage))
        .filter((row) => state.s5Pool === "overall" || row.pool?.toLowerCase() === state.s5Pool)
        .map(scheduleManualRow);
      return rows.length ? rows : s5SplitScheduleRows();
    }
    if (state.s5Stage === "swiss") {
      return (data.manualHistory?.schedules || [])
        .filter((row) => row.season === "S5" && String(row.stage || "").toLowerCase() === "swiss")
        .map(scheduleManualRow);
    }
  }
  if (state.season === "S6") {
    if (state.s6Stage === "swiss") {
      return (data.manualHistory?.schedules || [])
        .filter((row) => row.season === "S6" && String(row.stage || "").toLowerCase() === "swiss")
        .map(scheduleManualRow);
    }
    if (state.s6Stage === "group") {
      return (data.manualHistory?.schedules || [])
        .filter((row) => row.season === "S6" && (!row.stage || String(row.stage).toLowerCase() === "group"))
        .filter((row) => state.s6Pool === "overall" || row.pool?.toLowerCase() === state.s6Pool || s6Pools[row.home] === s6PoolLabel().replace(" Pool", ""))
        .map(scheduleManualRow);
    }
  }
  return (data.manualHistory?.schedules || [])
    .filter((row) => row.season === state.season)
    .map(scheduleManualRow);
}

function filteredScheduleRows(rows) {
  let displayRows = rows.filter((row) => row.team || row.opponent || row.result);
  if (state.scheduleUnplayedOnly) displayRows = displayRows.filter(scheduleRowUnplayed);
  if (state.scheduleTeamFilter === "All") return displayRows;
  return displayRows.filter((row) => row.team === state.scheduleTeamFilter || row.opponent === state.scheduleTeamFilter);
}

function scheduleRowUnplayed(row) {
  const result = String(row.result || "").trim();
  if (row.winner) return false;
  return !result || /\b0\s*-\s*0\b/.test(result);
}

function scheduleTeamOptions(rows) {
  return ["All", ...new Set(rows.filter((row) => row.team || row.opponent || row.result).flatMap((row) => [row.team, row.opponent]).filter(Boolean))]
    .sort((a, b) => a === "All" ? -1 : (b === "All" ? 1 : displayName(a, "team").localeCompare(displayName(b, "team"))));
}

function resetCrossTabFilters() {
  state.s5Stage = "overall";
  state.s5Pool = "overall";
  state.s6Stage = "overall";
  state.s6Pool = "overall";
  state.scheduleTeamFilter = "All";
  state.scheduleUnplayedOnly = false;
  state.playerRoleFilter = "All";
}

function setDefaultStageForView() {
  if (state.view === "schedule" && baseSeasonName(state.season) === "S6") {
    state.s6Stage = "swiss";
    state.s6Pool = "overall";
  } else if (baseSeasonName(state.season) === "S6" && state.s6Stage === "group") {
    state.s6Stage = "overall";
    state.s6Pool = "overall";
  }
}

function resetAnalyticsFilters() {
  state.kitchenSelectedPlayer = "";
  state.kitchenTeamFilter = "All";
  state.kitchenRoleFilter = "All";
  state.yourKitchenTeam = "All";
  state.yourKitchenMember = "All";
}

function renderScheduleFilters(rows) {
  const teams = scheduleTeamOptions(rows);
  if (!teams.includes(state.scheduleTeamFilter)) state.scheduleTeamFilter = "All";
  els.scheduleFilters.innerHTML = `
    <div class="awards-panel schedule-filter-panel">
      <div class="awards-panel-head">
        <div>
          <h2>Schedule Filters</h2>
          <p>Filter this schedule by team without changing any stat totals.</p>
        </div>
      </div>
      <div class="schedule-team-filter">
        <label>
          <span>Team</span>
          <select id="scheduleTeamSelect">
            ${teams.map((teamName) => `<option value="${escapeHtml(teamName)}"${state.scheduleTeamFilter === teamName ? " selected" : ""}>${escapeHtml(teamName === "All" ? "All Teams" : displayName(teamName, "team"))}</option>`).join("")}
          </select>
        </label>
        <label class="check-control schedule-unplayed-filter">
          <input id="scheduleUnplayedOnly" type="checkbox"${state.scheduleUnplayedOnly ? " checked" : ""}>
          <span>Unplayed only</span>
        </label>
      </div>
    </div>
  `;
  els.scheduleFilters.classList.remove("hidden");
}

function scheduleImportOptions(rows) {
  return rows
    .filter((row) => row.season === "S6" && row.team && row.opponent)
    .map((row) => ({
      label: `${scheduleStageLabel(row.stage)} - ${row.round || "Round"} - ${displayName(row.team, "team")} vs ${displayName(row.opponent, "team")}`,
      value: encodeURIComponent(JSON.stringify({
        season: row.season,
        stage: row.stage,
        round: row.round,
        home: row.team,
        away: row.opponent,
      })),
    }));
}

function renderCsvImportPanel(rows) {
  els.csvImportPanel.classList.add("hidden");
  els.csvImportPanel.innerHTML = "";
}

function renderPlayerFilters() {
  if (state.page.type !== "dashboard" || state.view !== "players" || state.season !== "S6") {
    els.playerFilters.classList.add("hidden");
    els.playerFilters.innerHTML = "";
    return;
  }
  const baseRows = playerRoleRows(s6StagePlayerRows().map((row) => ({ ...row, teamsText: row.teams ? row.teams.join(", ") : "" })));
  const roles = [...new Set(baseRows.map((row) => row.role).filter(Boolean))].sort((a, b) => Number(a) - Number(b));
  if (state.playerRoleFilter !== "All" && !roles.includes(state.playerRoleFilter)) state.playerRoleFilter = "All";
  els.playerFilters.innerHTML = `
    <div class="player-role-strip">
      <label>
        <span>Role</span>
        <select id="playerRoleSelect">
          <option value="All"${state.playerRoleFilter === "All" ? " selected" : ""}>All Roles</option>
          ${roles.map((role) => `<option value="${escapeHtml(role)}"${state.playerRoleFilter === role ? " selected" : ""}>Role ${escapeHtml(role)}</option>`).join("")}
        </select>
      </label>
      <small>${state.playerRoleFilter === "All" ? "Award races and table use all roles." : `Award races and table use Role ${escapeHtml(state.playerRoleFilter)} only.`}</small>
    </div>
  `;
  els.playerFilters.classList.remove("hidden");
}

function scheduleSeriesKey(season, stage, home, away) {
  const teams = [canonicalTeamName(home), canonicalTeamName(away)].sort().join("|");
  return [baseSeasonName(season), scheduleStageLabel(stage).toLowerCase(), teams].join("::");
}

function scheduleSeriesData(series) {
  const key = scheduleSeriesKey(series.season, series.stage, series.team, series.opponent);
  const matches = s6SwissSeriesGameStats.filter((item) => scheduleSeriesKey(item.season, item.stage, item.home, item.away) === key);
  if (!matches.length) return null;
  const gameMap = new Map();
  matches.flatMap((item) => item.games || []).forEach((game) => {
    if (!game?.id || gameMap.has(game.id)) return;
    gameMap.set(game.id, game);
  });
  const games = [...gameMap.values()].sort((a, b) => {
    const dateCompare = String(a.date || "").localeCompare(String(b.date || ""));
    if (dateCompare) return dateCompare;
    return String(a.game || "").localeCompare(String(b.game || ""), undefined, { numeric: true });
  }).map((game, index) => ({ ...game, game: game.game || `Game ${index + 1}` }));
  return { ...matches[0], games };
}

function scheduleGameData(page) {
  const series = scheduleSeriesData(page);
  if (!series) return null;
  return series.games.find((game) => game.id === page.gameId || game.game === page.game) || null;
}

function gameTeamRow(game, teamName) {
  return game?.teams?.find((row) => canonicalTeamName(row.team) === canonicalTeamName(teamName)) || null;
}

function gameScoreText(game, home, away) {
  const homeRow = gameTeamRow(game, home);
  const awayRow = gameTeamRow(game, away);
  if (!homeRow || !awayRow) return "";
  return `${fmt(homeRow.goals)} - ${fmt(awayRow.goals)}`;
}

function aggregateSeriesPlayers(seriesData) {
  const map = new Map();
  (seriesData?.games || []).forEach((game) => {
    (game.players || []).forEach((row) => {
      const key = `${canonicalTeamName(row.team)}|${canonicalPlayerName(row.name)}`;
      if (!map.has(key)) {
        map.set(key, {
          team: canonicalTeamName(row.team),
          name: canonicalPlayerName(row.name),
          games: 0,
          score: 0,
          goals: 0,
          assists: 0,
          saves: 0,
          shots: 0,
          amountStolen: 0,
          demosInflicted: 0,
        });
      }
      const item = map.get(key);
      item.games += 1;
      ["score", "goals", "assists", "saves", "shots", "amountStolen", "demosInflicted"].forEach((field) => {
        item[field] += Number(row[field]) || 0;
      });
    });
  });
  return [...map.values()].map((row) => {
    row.shootingPct = row.shots ? Math.round((row.goals / row.shots) * 10000) / 100 : 0;
    row.avgScore = Math.round((row.score / Math.max(1, row.games)) * 10) / 10;
    return row;
  });
}

function aggregateSeriesTeams(seriesData) {
  const map = new Map();
  (seriesData?.games || []).forEach((game) => {
    (game.teams || []).forEach((row) => {
      const key = canonicalTeamName(row.team);
      if (!map.has(key)) {
        map.set(key, {
          team: key,
          games: 0,
          gameWins: 0,
          gameLosses: 0,
          score: 0,
          goals: 0,
          assists: 0,
          saves: 0,
          shots: 0,
          shotsConceded: 0,
          goalsConceded: 0,
          amountStolen: 0,
          demosInflicted: 0,
        });
      }
      const item = map.get(key);
      item.games += 1;
      if (canonicalTeamName(row.team) === canonicalTeamName(game.winner)) item.gameWins += 1;
      else item.gameLosses += 1;
      ["score", "goals", "assists", "saves", "shots", "shotsConceded", "goalsConceded", "amountStolen", "demosInflicted"].forEach((field) => {
        item[field] += Number(row[field]) || 0;
      });
    });
  });
  return [...map.values()].map((row) => {
    row.shootingPct = row.shots ? Math.round((row.goals / row.shots) * 10000) / 100 : 0;
    row.avgScore = Math.round((row.score / Math.max(1, row.games)) * 10) / 10;
    row.goalsPerGame = Math.round((row.goals / Math.max(1, row.games)) * 100) / 100;
    return row;
  });
}

function seriesMvp(seriesData) {
  return aggregateSeriesPlayers(seriesData)
    .sort((a, b) => b.score - a.score || b.goals - a.goals || b.saves - a.saves || b.assists - a.assists || b.shots - a.shots)[0] || null;
}

function seriesTeamSummaryMarkup(seriesData) {
  if (!seriesData) return "";
  const rows = aggregateSeriesTeams(seriesData);
  const teamOrder = [seriesData.home, seriesData.away].map(canonicalTeamName);
  return `
    <section class="game-summary-panel series-summary-panel">
      <div class="game-summary-head">
        <span>${escapeHtml(scheduleStageLabel(seriesData.stage))} / ${escapeHtml(seriesData.round || "Series")}</span>
        <h3>Series Team Summary</h3>
      </div>
      <div class="game-team-summary-grid">
        ${teamOrder.map((teamName) => rows.find((row) => canonicalTeamName(row.team) === teamName)).filter(Boolean).map((row) => `
          <article class="${row.gameWins > row.gameLosses ? "game-winner" : ""}" style="--team-color:${escapeHtml(teamColor(row.team, seriesData.season))}">
            <span>${escapeHtml(displayName(row.team, "team"))}</span>
            <strong>${escapeHtml(fmt(row.gameWins))}-${escapeHtml(fmt(row.gameLosses))} games</strong>
            <div>
              <b>${escapeHtml(fmt(row.score))}<small>Score</small></b>
              <b>${escapeHtml(fmt(row.goals))}<small>Goals</small></b>
              <b>${escapeHtml(fmt(row.shots))}<small>Shots</small></b>
              <b>${escapeHtml(fmt(row.amountStolen))}<small>Stolen</small></b>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function seriesPlayerSectionsMarkup(seriesData) {
  if (!seriesData) return "";
  const rows = aggregateSeriesPlayers(seriesData);
  const teams = [seriesData.home, seriesData.away]
    .map(canonicalTeamName)
    .filter((teamName, index, list) => teamName && list.indexOf(teamName) === index);
  const statColumns = [
    ["name", "Player"],
    ["score", "Score"],
    ["goals", "G"],
    ["assists", "A"],
    ["saves", "Sv"],
    ["shots", "Sh"],
    ["shootingPct", "Shot %", "%"],
    ["amountStolen", "Stolen"],
    ["demosInflicted", "Demo"],
  ];
  return `
    <section class="game-player-sections series-player-sections">
      ${teams.map((teamName, index) => {
        const teamRows = rows.filter((row) => canonicalTeamName(row.team) === teamName)
          .sort((a, b) => b.score - a.score || b.goals - a.goals);
        const label = index === 0 ? "Home Team" : "Away Team";
        return `
          <article style="--team-color:${escapeHtml(teamColor(teamName, seriesData.season))}">
            <div class="game-player-section-head">
              <span>${escapeHtml(label)} / Series Totals</span>
              <h3>${escapeHtml(displayName(teamName, "team"))}</h3>
            </div>
            <table>
              <thead><tr>${statColumns.map(([, labelText]) => `<th>${escapeHtml(labelText)}</th>`).join("")}</tr></thead>
              <tbody>
                ${teamRows.map((row) => `
                  <tr>
                    ${statColumns.map(([key, , suffix]) => {
                      if (key === "name") {
                        const action = encodeURIComponent(JSON.stringify({ type: "player", player: row.name }));
                        return `<td><button type="button" class="inline-player-link" data-action="${action}">${escapeHtml(displayName(row.name, "name"))}</button></td>`;
                      }
                      return `<td>${escapeHtml(fmtStat(row[key], key, suffix || ""))}</td>`;
                    }).join("")}
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </article>
        `;
      }).join("")}
    </section>
  `;
}

function scheduleSeriesGamesMarkup(page) {
  const rows = scheduleSeriesRows(page);
  return `
    <section class="series-games-panel">
      <div class="game-summary-head">
        <span>Drill Down</span>
        <h3>Series Games</h3>
      </div>
      <table>
        <thead>
          <tr>
            <th>Game</th>
            <th>Date</th>
            <th>Home</th>
            <th>Result</th>
            <th>Away</th>
            <th>Winner</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row) => {
            const action = row.gameId ? encodeURIComponent(JSON.stringify({
              type: "scheduleGame",
              season: page.season,
              stage: page.stage,
              pool: page.pool,
              round: page.round,
              team: page.team,
              result: page.result,
              opponent: page.opponent,
              winner: page.winner,
              game: row.game,
              gameId: row.gameId,
            })) : "";
            return `
              <tr${action ? ` class="clickable" data-action="${action}"` : ""}>
                <td>${escapeHtml(row.game)}</td>
                <td>${escapeHtml(row.date || "-")}</td>
                <td>${escapeHtml(displayName(row.team, "team"))}</td>
                <td><strong>${scheduleResultMarkup(row)}</strong></td>
                <td>${escapeHtml(displayName(row.opponent, "team"))}</td>
                <td>${escapeHtml(row.winner ? displayName(row.winner, "team") : row.note || "-")}</td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </section>
  `;
}

function matchupPreviewToggleMarkup() {
  return `
    <section class="matchup-preview-toggle">
      <button type="button" data-toggle-matchup-preview>
        ${state.showMatchupPreview ? "Hide pre-match comparison" : "Show pre-match comparison"}
      </button>
    </section>
  `;
}

function seriesMvpMarkup(seriesData) {
  const mvp = seriesMvp(seriesData);
  if (!mvp) return "";
  return `
    <section class="series-mvp-card" style="--team-color:${escapeHtml(teamColor(mvp.team, seriesData.season))}">
      <div>
        <span>Series MVP</span>
        <h3>${escapeHtml(displayName(mvp.name, "name"))}</h3>
        <p>${escapeHtml(displayName(mvp.team, "team"))}</p>
      </div>
      <div class="series-mvp-stats">
        <b>${escapeHtml(fmt(mvp.score))}<small>Score</small></b>
        <b>${escapeHtml(fmt(mvp.goals))}<small>Goals</small></b>
        <b>${escapeHtml(fmt(mvp.saves))}<small>Saves</small></b>
        <b>${escapeHtml(fmt(mvp.shots))}<small>Shots</small></b>
      </div>
    </section>
  `;
}

function scheduleSeriesRows(series) {
  const uploaded = scheduleSeriesData(series);
  if (!uploaded) {
    return [{
      game: "Series",
      date: "",
      team: series.team,
      result: series.result,
      opponent: series.opponent,
      winner: series.winner,
      season: series.season,
      note: "Game stats have not been uploaded yet.",
    }];
  }
  return uploaded.games.map((game) => ({
    game: game.game,
    gameId: game.id,
    date: game.date,
    team: uploaded.home,
    result: gameScoreText(game, uploaded.home, uploaded.away),
    opponent: uploaded.away,
    winner: game.winner,
    season: uploaded.season,
    stage: uploaded.stage,
    round: uploaded.round,
    note: "View player stats",
  }));
}

function scheduleGamePlayerRows(page) {
  const game = scheduleGameData(page);
  if (!game) return [];
  return (game.players || []).map((row) => {
    const item = {
      ...row,
      name: canonicalPlayerName(row.name),
      team: canonicalTeamName(row.team),
      result: canonicalTeamName(row.team) === canonicalTeamName(game.winner) ? "Win" : "Loss",
      shootingPct: row.shots ? Math.round((row.goals / row.shots) * 10000) / 100 : 0,
    };
    item.per = Math.round(((0.1 * item.goals) + (0.05 * item.assists) + ((2 / 30) * item.saves) + (0.01 * item.shots) - 0.1) * 100) / 100;
    return item;
  });
}

function gameTeamSummaryMarkup(page) {
  const game = scheduleGameData(page);
  if (!game) return "";
  return `
    <section class="game-summary-panel">
      <div class="game-summary-head">
        <span>${escapeHtml(game.date || "")}</span>
        <h3>${escapeHtml(game.game)} Team Summary</h3>
      </div>
      <div class="game-team-summary-grid">
        ${(game.teams || []).map((row) => `
          <article class="${canonicalTeamName(row.team) === canonicalTeamName(game.winner) ? "game-winner" : ""}" style="--team-color:${escapeHtml(teamColor(row.team, page.season))}">
            <span>${escapeHtml(displayName(row.team, "team"))}</span>
            <strong>${escapeHtml(fmt(row.goals))} goals</strong>
            <div>
              <b>${escapeHtml(fmt(row.score))}<small>Score</small></b>
              <b>${escapeHtml(fmt(row.shots))}<small>Shots</small></b>
              <b>${escapeHtml(fmt(row.saves))}<small>Saves</small></b>
              <b>${escapeHtml(fmt(row.amountStolen))}<small>Stolen</small></b>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function scheduleGamePlayerSectionsMarkup(page) {
  const game = scheduleGameData(page);
  if (!game) return "";
  const rows = scheduleGamePlayerRows(page);
  const teams = [page.team, page.opponent]
    .map(canonicalTeamName)
    .filter((teamName, index, list) => teamName && list.indexOf(teamName) === index);
  const statColumns = [
    ["name", "Player"],
    ["score", "Score"],
    ["goals", "G"],
    ["assists", "A"],
    ["saves", "Sv"],
    ["shots", "Sh"],
    ["shootingPct", "Shot %", "%"],
    ["amountStolen", "Stolen"],
    ["demosInflicted", "Demo"],
  ];
  return `
    <section class="game-player-sections">
      ${teams.map((teamName, index) => {
        const teamRows = rows.filter((row) => canonicalTeamName(row.team) === teamName)
          .sort((a, b) => b.score - a.score || b.goals - a.goals);
        const label = index === 0 ? "Home Team" : "Away Team";
        return `
          <article style="--team-color:${escapeHtml(teamColor(teamName, page.season))}">
            <div class="game-player-section-head">
              <span>${escapeHtml(label)}</span>
              <h3>${escapeHtml(displayName(teamName, "team"))}</h3>
            </div>
            <table>
              <thead>
                <tr>${statColumns.map(([, labelText]) => `<th>${escapeHtml(labelText)}</th>`).join("")}</tr>
              </thead>
              <tbody>
                ${teamRows.map((row) => `
                  <tr>
                    ${statColumns.map(([key, , suffix]) => {
                      if (key === "name") {
                        const action = encodeURIComponent(JSON.stringify({ type: "player", player: row.name }));
                        return `<td><button type="button" class="inline-player-link" data-action="${action}">${escapeHtml(displayName(row.name, "name"))}</button></td>`;
                      }
                      return `<td>${escapeHtml(fmtStat(row[key], key, suffix || ""))}</td>`;
                    }).join("")}
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </article>
        `;
      }).join("")}
    </section>
  `;
}

function matchupTeamRows(series) {
  const season = baseSeasonName(series.season);
  const stage = String(series.stage || "").toLowerCase();
  const rows = season === "S6"
    ? s6StageTeamRows(stage === "swiss" ? "group" : (stage || "group"), "overall")
    : rowsForDataset("teams", season).filter((row) => row.season === season);
  const rowFor = (teamName) => rows.find((row) => row.name === teamName) || teamSeasonRow(teamName, season);
  return { rows, home: rowFor(series.team), away: rowFor(series.opponent) };
}

function statRank(rows, stat, teamName) {
  const ranked = rows
    .filter((row) => typeof row[stat] === "number" && !isUnavailableValue(row, stat))
    .sort((a, b) => lowerIsBetterStats.has(stat) ? a[stat] - b[stat] : b[stat] - a[stat]);
  const index = ranked.findIndex((row) => row.name === teamName);
  return index >= 0 ? index + 1 : null;
}

function matchupStrengths(row, allRows) {
  if (!row) return { strengths: ["Stats unavailable"], weaknesses: ["Stats unavailable"] };
  const ranked = matchupComparisonStats
    .filter(([stat]) => typeof row[stat] === "number" && !isUnavailableValue(row, stat))
    .map(([stat, label]) => ({ stat, label, rank: statRank(allRows, stat, row.name), value: row[stat] }))
    .filter((item) => item.rank !== null)
    .sort((a, b) => a.rank - b.rank);
  const strengths = ranked.slice(0, 3).map((item) => `${item.label} ranks #${item.rank}`);
  const weaknesses = [...ranked].sort((a, b) => b.rank - a.rank).slice(0, 2).map((item) => `${item.label} ranks #${item.rank}`);
  return {
    strengths: strengths.length ? strengths : ["No standout strengths yet"],
    weaknesses: weaknesses.length ? weaknesses : ["No clear weaknesses yet"],
  };
}

function matchupColorCardMarkup(teamName, season) {
  const info = teamInfoFor(teamName, season);
  const primary = rocketLeagueColor(info?.primary);
  const secondary = rocketLeagueColor(info?.secondary);
  const swatch = (label, color) => color
    ? `<span><i style="--swatch:${escapeHtml(color.hex)}"></i>${label}: ${escapeHtml(color.code)} ${escapeHtml(color.name)}</span>`
    : `<span><i style="--swatch:#2b3642"></i>${label}: Not available</span>`;
  return `
    <article>
      <strong>${escapeHtml(displayName(teamName, "team"))}</strong>
      ${swatch("Primary", primary)}
      ${swatch("Secondary", secondary)}
    </article>
  `;
}

function matchupStandingBadge(teamRow, series) {
  const season = baseSeasonName(series.season);
  const stageKey = String(series.stage || "").toLowerCase().replace(/\s+/g, "");
  if (season === "S6") {
    const pool = teamRow.pool || s6Pools[teamRow.name] || series.pool || "";
    const rank = s6PoolRanks[teamRow.name] || s6PoolRanks[displayName(teamRow.name, "team")];
    if (rank > 0) return `#${rank} ${pool ? `${pool} Pool` : "Pool"}`;
  }
  if (season === "S5" && ["split1", "split2"].includes(stageKey)) {
    const row = (s5SplitStandingsRows[stageKey] || [])
      .map((item, index) => s5SplitStandingRow(item, index))
      .find((item) => canonicalTeamName(item.name) === canonicalTeamName(teamRow.name));
    if (row?.poolRank) return `#${row.poolRank} ${row.pool ? `${row.pool} Pool` : "Pool"}`;
  }
  const row = standingsRows().find((item) => canonicalTeamName(item.name) === canonicalTeamName(teamRow.name) && item.season === season);
  return row?.standingsRank ? `#${row.standingsRank} Season` : "Standing n/a";
}

function regularPlayerSeasonRows() {
  return [...data.players.filter((row) => row.season !== "S6"), ...s6StagePlayerRows("overall", "overall")]
    .filter((row) => !isScrimSeason(row.season) && !isPlayoffSeason(row.season) && row.season !== "World Cup");
}

function regularTeamSeasonRows(stage = "overall", pool = "overall") {
  return [...data.teams.filter((row) => row.season !== "S6"), ...s6StageTeamRows(stage, pool)]
    .filter((row) => !isScrimSeason(row.season) && !isPlayoffSeason(row.season) && row.season !== "World Cup");
}

function seasonOrdinal(season) {
  const match = String(season || "").match(/^S(\d+)$/);
  return match ? Number(match[1]) : null;
}

function playerFirstSeasonNumber(player) {
  const seasons = regularPlayerSeasonRows()
    .filter((row) => row.name === player)
    .map((row) => seasonOrdinal(row.season))
    .filter((season) => season !== null);
  return seasons.length ? Math.min(...seasons) : null;
}

function aggregateCaptainRows(player, startSeasonNumber) {
  const rows = regularPlayerSeasonRows()
    .filter((row) => row.name === player && seasonOrdinal(row.season) >= startSeasonNumber);
  const item = emptyPlayerAggregate(player, `S${startSeasonNumber}+`);
  item.teams = new Set();
  rows.forEach((row) => {
    [
      "games", "wins", "losses", "gameWins", "gameLosses", "score", "goals", "assists", "saves", "shots",
      "shotsConceded", "goalsConceded", "opponentSavesForced", "demosInflicted", "amountCollected", "amountStolen",
    ].forEach((field) => {
      item[field] = (item[field] || 0) + (Number(row[field]) || 0);
    });
    item.per = (item.per || 0) + (Number(row.per) || 0);
    (row.teams || []).forEach((team) => item.teams.add(team));
  });
  finalizeCommon(item);
  item.per = Math.round((item.per || 0) * 100) / 100;
  item.perPerGame = Math.round((item.per / Math.max(1, item.games)) * 100) / 100;
  item.teams = [...item.teams];
  return item;
}

function playerTeamsBySeason(player) {
  const map = new Map();
  regularPlayerSeasonRows()
    .filter((row) => row.name === player)
    .forEach((row) => {
      if (!map.has(row.season)) map.set(row.season, new Set());
      (row.teams || []).forEach((team) => map.get(row.season).add(canonicalTeamName(team)));
    });
  return map;
}

function captainHeadToHead(playerA, playerB) {
  const teamsA = playerTeamsBySeason(playerA);
  const teamsB = playerTeamsBySeason(playerB);
  const series = [];
  const addSeries = (season, teamA, teamB, winner, label) => {
    const playerATeams = teamsA.get(baseSeasonName(season));
    const playerBTeams = teamsB.get(baseSeasonName(season));
    if (!playerATeams || !playerBTeams || !winner) return;
    const left = canonicalTeamName(teamA);
    const right = canonicalTeamName(teamB);
    const aOnLeft = playerATeams.has(left);
    const aOnRight = playerATeams.has(right);
    const bOnLeft = playerBTeams.has(left);
    const bOnRight = playerBTeams.has(right);
    if (!((aOnLeft && bOnRight) || (aOnRight && bOnLeft))) return;
    const winnerName = canonicalTeamName(winner);
    const playerAWon = (aOnLeft && winnerName === left) || (aOnRight && winnerName === right);
    series.push({ season: baseSeasonName(season), label, playerAWon });
  };
  (data.manualHistory?.schedules || []).forEach((row) => {
    addSeries(row.season, row.home, row.away, row.winner, row.round || row.stage || "Series");
  });
  (data.manualHistory?.playoffs || [])
    .filter((row) => row.round !== "Championship Game")
    .forEach((row) => {
      const winnerKey = playoffWinnerKey(row);
      addSeries(row.season, row.teamA, row.teamB, winnerKey ? row[winnerKey] : "", row.round || "Playoffs");
    });
  const winsA = series.filter((row) => row.playerAWon).length;
  const winsB = series.length - winsA;
  return { winsA, winsB, total: series.length };
}

function captainFeatureMarkup(series, home, away) {
  const homeInfo = teamInfoFor(home.name, series.season);
  const awayInfo = teamInfoFor(away.name, series.season);
  const captains = [homeInfo?.captain, awayInfo?.captain].filter(Boolean);
  if (captains.length < 2 || captains[0] === captains[1]) return "";
  const firstSeasons = captains.map(playerFirstSeasonNumber);
  if (firstSeasons.some((season) => season === null)) return "";
  const startSeason = Math.max(...firstSeasons);
  const rows = captains.map((captain) => aggregateCaptainRows(captain, startSeason));
  const h2h = captainHeadToHead(captains[0], captains[1]);
  const statDefs = [
    ["games", "GP", (value) => fmt(value)],
    ["avgScore", "Score/G", (value) => fmtGameAvg(value)],
    ["goalsPerGame", "Gl/G", (value) => fmtGameAvg(value)],
    ["assistsPerGame", "A/G", (value) => fmtGameAvg(value)],
    ["savesPerGame", "Sv/G", (value) => fmtGameAvg(value)],
    ["shootingPct", "Shot %", (value) => fmt(value, "%")],
    ["perPerGame", "PER/G", (value) => fmtGameAvg(value)],
  ];
  const bestByStat = new Map(statDefs.map(([key]) => [key, Math.max(...rows.map((row) => Number(row[key]) || 0))]));
  const statLine = (row) => statDefs.map(([key, label, formatter]) => ({
    key,
    label,
    value: Number(row[key]) || 0,
    text: formatter(row[key]),
    edge: (Number(row[key]) || 0) === bestByStat.get(key) && bestByStat.get(key) > 0,
  }));
  const h2hValues = [h2h.winsA, h2h.winsB];
  const bestH2h = Math.max(...h2hValues);
  return `
    <section class="captain-feature">
      <div class="captain-feature-head">
        <div>
          <span>Captain's Feature</span>
          <h3>${escapeHtml(displayName(captains[0], "name"))} vs ${escapeHtml(displayName(captains[1], "name"))}</h3>
        </div>
        <strong>Stats since S${startSeason}</strong>
      </div>
      <div class="captain-feature-grid">
        ${rows.map((row, index) => `
          <article style="--team-color:${escapeHtml(teamColor(index === 0 ? home.name : away.name, series.season))}">
            <span>${escapeHtml(index === 0 ? displayName(home.name, "team") : displayName(away.name, "team"))}</span>
            <h4>${escapeHtml(displayName(row.name, "name"))}</h4>
            <strong class="${h2hValues[index] === bestH2h && bestH2h > 0 ? "captain-stat-edge" : ""}">${index === 0 ? `${h2h.winsA}-${h2h.winsB}` : `${h2h.winsB}-${h2h.winsA}`} H2H series</strong>
            <div>
              ${statLine(row).map((stat) => `<p class="${stat.edge ? "captain-stat-edge" : ""}"><small>${escapeHtml(stat.label)}</small><b>${escapeHtml(stat.text)}</b></p>`).join("")}
            </div>
          </article>
        `).join("")}
      </div>
      <p>${h2h.total ? `${escapeHtml(displayName(captains[0], "name"))} and ${escapeHtml(displayName(captains[1], "name"))} have ${fmt(h2h.total)} tracked series against each other.` : "No tracked series head-to-head yet."}</p>
    </section>
  `;
}

function previousScheduleMatchups(series) {
  const currentStage = String(series.stage || "").toLowerCase();
  const currentRound = String(series.round || "");
  const pair = [canonicalTeamName(series.team), canonicalTeamName(series.opponent)].sort().join("|");
  return (data.manualHistory?.schedules || [])
    .filter((row) => row.season === baseSeasonName(series.season))
    .filter((row) => [canonicalTeamName(row.home), canonicalTeamName(row.away)].sort().join("|") === pair)
    .filter((row) => row.winner && !/\b0\s*-\s*0\b/.test(String(row.result || "")))
    .filter((row) => !(String(row.stage || "").toLowerCase() === currentStage
      && String(row.round || "") === currentRound
      && canonicalTeamName(row.home) === canonicalTeamName(series.team)
      && canonicalTeamName(row.away) === canonicalTeamName(series.opponent)
      && String(row.result || "") === String(series.result || "")))
    .map((row) => scheduleManualRow(row));
}

function previousMatchupMarkup(series) {
  const previous = previousScheduleMatchups(series);
  if (!previous.length) {
    return `
      <section class="previous-matchups">
        <h3>Previous Matchup</h3>
        <p class="empty-note">This is their first tracked matchup this season.</p>
      </section>
    `;
  }
  return `
    <section class="previous-matchups">
      <h3>Previous Matchup${previous.length === 1 ? "" : "s"}</h3>
      <div class="previous-matchup-list">
        ${previous.map((row) => {
          const action = {
            type: "scheduleSeries",
            season: row.season,
            stage: row.stage,
            pool: row.pool,
            round: row.round,
            team: row.team,
            result: row.result,
            opponent: row.opponent,
            winner: row.winner,
          };
          return `
            <button type="button" data-action="${encodeURIComponent(JSON.stringify(action))}">
              <span>${escapeHtml(scheduleStageLabel(row.stage))}${row.round ? ` / ${escapeHtml(row.round)}` : ""}</span>
              <strong>${escapeHtml(displayName(row.team, "team"))} ${scheduleResultMarkup(row)} ${escapeHtml(displayName(row.opponent, "team"))}</strong>
              <small>Winner: ${escapeHtml(displayName(row.winner, "team"))}</small>
            </button>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function matchupComparisonMarkup(series) {
  if (series.team === series.opponent || !series.team || !series.opponent) return "";
  const { rows, home, away } = matchupTeamRows(series);
  if (!home || !away) return `<p class="empty-note">Pre-match comparison unavailable until both teams have season stats.</p>`;
  const homeInfo = teamInfoFor(home.name, series.season);
  const statRows = matchupComparisonStats
    .filter(([stat]) => [home, away].some((row) => typeof row[stat] === "number" && !isUnavailableValue(row, stat)))
    .map(([stat, label]) => {
      const homeValue = home[stat];
      const awayValue = away[stat];
      const suffix = stat === "teamSaveRate" || stat === "shootingPct" || stat === "opponentShootingPct" ? "%" : "";
      const homeRank = statRank(rows, stat, home.name);
      const awayRank = statRank(rows, stat, away.name);
      const homeBetter = typeof homeValue === "number" && typeof awayValue === "number" && (lowerIsBetterStats.has(stat) ? homeValue < awayValue : homeValue > awayValue);
      const awayBetter = typeof homeValue === "number" && typeof awayValue === "number" && (lowerIsBetterStats.has(stat) ? awayValue < homeValue : awayValue > homeValue);
      return `
        <tr>
          <td><strong class="${homeBetter ? "matchup-edge" : ""}">${escapeHtml(fmtStat(homeValue, stat, suffix))}</strong><span>${homeRank ? `#${homeRank}` : "n/a"}</span></td>
          <th>${escapeHtml(label)}</th>
          <td><strong class="${awayBetter ? "matchup-edge" : ""}">${escapeHtml(fmtStat(awayValue, stat, suffix))}</strong><span>${awayRank ? `#${awayRank}` : "n/a"}</span></td>
        </tr>
      `;
    }).join("");
  const homeNotes = matchupStrengths(home, rows);
  const awayNotes = matchupStrengths(away, rows);
  return `
    <div class="matchup-preview">
      <div class="matchup-preview-head">
        <div><span>Pre-match comparison</span><h2>${escapeHtml(displayName(home.name, "team"))} vs ${escapeHtml(displayName(away.name, "team"))}</h2></div>
        <strong>${escapeHtml(baseSeasonName(series.season))}</strong>
      </div>
      <div class="matchup-info-grid">
        <article class="matchup-stadium-card">
          <span>Home Stadium</span>
          <strong>${escapeHtml(homeInfo?.homeStadium || "Not available")}</strong>
          <small>${escapeHtml(displayName(home.name, "team"))} home match</small>
        </article>
        <div class="matchup-color-cards">
          ${matchupColorCardMarkup(home.name, series.season)}
          ${matchupColorCardMarkup(away.name, series.season)}
        </div>
      </div>
      <div class="matchup-team-strip">
        ${[[home, "Home"], [away, "Away"]].map(([teamRow, venue]) => `
          <article style="--team-color:${escapeHtml(teamColor(teamRow.name, series.season))}">
            <div class="matchup-team-banner-line">
              <span>${escapeHtml(displayName(teamRow.name, "team"))}</span>
              <div>
                <b>${escapeHtml(venue)}</b>
                <b>${escapeHtml(matchupStandingBadge(teamRow, series))}</b>
              </div>
            </div>
            <strong>${escapeHtml(teamRow.matchRecord || `${fmt(teamRow.wins)} - ${fmt(teamRow.losses)}`)}</strong>
            <small>${fmt(teamRow.standingsPoints)} league score / ${fmt(teamRow.goalDiff)} goal diff</small>
          </article>
        `).join("")}
      </div>
      <table class="matchup-comparison-table">
        <tbody>${statRows}</tbody>
      </table>
      <div class="matchup-notes-grid">
        ${[
          [home, homeNotes],
          [away, awayNotes],
        ].map(([teamRow, notes]) => `
          <article>
            <h3>${escapeHtml(displayName(teamRow.name, "team"))}</h3>
            <p><strong>Strengths:</strong> ${escapeHtml(notes.strengths.join("; "))}</p>
            <p><strong>Watch areas:</strong> ${escapeHtml(notes.weaknesses.join("; "))}</p>
          </article>
        `).join("")}
      </div>
      ${captainFeatureMarkup(series, home, away)}
      ${previousMatchupMarkup(series)}
    </div>
  `;
}

function scheduleUploadedSummary(row) {
  if (!row.home || !row.away) return null;
  const series = scheduleSeriesData({
    season: row.season,
    stage: row.stage || row.round || "",
    team: row.home,
    opponent: row.away,
  });
  if (!series?.games?.length) return null;
  const home = canonicalTeamName(row.home);
  const away = canonicalTeamName(row.away);
  let homeWins = 0;
  let awayWins = 0;
  let homeGoals = 0;
  let awayGoals = 0;
  series.games.forEach((game) => {
    const homeRow = gameTeamRow(game, home);
    const awayRow = gameTeamRow(game, away);
    if (!homeRow || !awayRow) return;
    homeGoals += Number(homeRow.goals) || 0;
    awayGoals += Number(awayRow.goals) || 0;
    if ((Number(homeRow.goals) || 0) > (Number(awayRow.goals) || 0)) homeWins += 1;
    else if ((Number(awayRow.goals) || 0) > (Number(homeRow.goals) || 0)) awayWins += 1;
  });
  const winner = homeWins > awayWins ? home : (awayWins > homeWins ? away : "");
  return {
    result: `(${homeGoals}) ${homeWins}-${awayWins} (${awayGoals})`,
    winner,
    note: winner ? "" : "Played - stats pending",
  };
}

function scheduleManualRow(row) {
  const stage = row.stage || row.round || "";
  const uploaded = scheduleUploadedSummary(row);
  return {
    season: row.season,
    stage,
    pool: row.pool || "",
    round: row.round || "",
    dateRange: row.dateRange || "",
    team: row.home || "",
    homePoints: row.homePoints || "",
    opponent: row.away || "",
    awayPoints: row.awayPoints || "",
    result: uploaded?.result || row.result || "",
    vod: row.vod || "",
    winner: uploaded?.winner || row.winner || "",
    matchRecord: row.matchRecord || "",
    standingsPoints: row.standingsPoints ?? "",
    note: uploaded ? uploaded.note : (row.note || ""),
  };
}

function actionAttr(action) {
  return encodeURIComponent(JSON.stringify(action));
}

function homeSwissRows() {
  const round3Teams = new Set([
    "Past Our Prime",
    "Winner of BFC/CC",
    "Supernova Abyss",
    "Quack Wok",
    "Ball Chasin & Sauce Tastin",
    "Giga's In Paris",
    "Best Friends Club",
    "Crossbar Cartel",
  ].map(canonicalTeamName));
  return (data.manualHistory?.schedules || [])
    .filter((row) => row.season === "S6" && String(row.stage || "").toLowerCase() === "swiss")
    .filter((row) => String(row.round || "") === "Round 2" || String(row.round || "") === "Round 3")
    .map(scheduleManualRow)
    .filter((row) => row.team && row.opponent && !/match|team|bye/i.test(`${row.team} ${row.opponent}`))
    .filter((row) => String(row.round || "") === "Round 3"
      || [canonicalTeamName(row.team), canonicalTeamName(row.opponent)].some((team) => round3Teams.has(team)))
    .filter((row) => String(row.round || "") === "Round 3"
      || [canonicalTeamName(row.team), canonicalTeamName(row.opponent)].includes("Best Friends Club")
      || [canonicalTeamName(row.team), canonicalTeamName(row.opponent)].includes("Crossbar Cartel"));
}

function homeByeRows(kind) {
  const rows = (data.manualHistory?.schedules || [])
    .filter((row) => row.season === "S6" && String(row.stage || "").toLowerCase() === "swiss")
    .filter((row) => String(row.round || "") === "Round 3")
    .filter((row) => /bye/i.test(`${row.result || ""} ${row.away || ""}`))
    .filter((row) => kind === "upper" ? /\+2/.test(String(row.note || "")) : /\+0/.test(String(row.note || "")))
    .map(scheduleManualRow);
  return rows;
}

function scheduleRoundPoints(row) {
  if (scheduleRowUnplayed(row)) return null;
  if (!row.winner) return null;
  const home = canonicalTeamName(row.team);
  const away = canonicalTeamName(row.opponent);
  const winner = canonicalTeamName(row.winner);
  const loser = winner === home ? away : home;
  const winnerPoints = /\b3\s*-\s*0\b/.test(row.result) || /\b0\s*-\s*3\b/.test(row.result) ? 3 : 2;
  const loserPoints = /\b3\s*-\s*2\b/.test(row.result) || /\b2\s*-\s*3\b/.test(row.result) ? 1 : 0;
  return { winner, loser, winnerPoints, loserPoints };
}

function topPlayerForTeam(teamName, metric = "perPerGame") {
  const team = canonicalTeamName(teamName);
  return s6StagePlayerRows("overall", "overall")
    .filter((row) => (row.teams || []).map(canonicalTeamName).includes(team))
    .filter((row) => typeof row[metric] === "number" && Number.isFinite(row[metric]))
    .sort((a, b) => b[metric] - a[metric] || b.score - a.score)[0] || null;
}

function homePlayerWatchList() {
  const rows = s6StagePlayerRows("overall", "overall");
  const picks = [
    { label: "PER/G", metric: "perPerGame", suffix: "", note: "Best all-around efficiency" },
    { label: "Score/G", metric: "avgScore", suffix: "", note: "Most reliable scoreboard pressure" },
    { label: "Goals/G", metric: "goalsPerGame", suffix: "", note: "Primary finisher" },
    { label: "Saves/G", metric: "savesPerGame", suffix: "", note: "Backline workhorse" },
  ];
  const used = new Set();
  return picks.map((pick) => {
    const row = rows
      .filter((candidate) => !used.has(candidate.name))
      .filter((candidate) => typeof candidate[pick.metric] === "number" && Number.isFinite(candidate[pick.metric]))
      .sort((a, b) => b[pick.metric] - a[pick.metric] || b.score - a.score)[0];
    if (row) used.add(row.name);
    return row ? { ...pick, row } : null;
  }).filter(Boolean);
}

function homeTeamSnapshotRows() {
  return s6StageTeamRows("overall", "overall")
    .slice()
    .sort((a, b) => b.standingsPoints - a.standingsPoints || b.wins - a.wins || b.gameWinPct - a.gameWinPct)
    .slice(0, 6);
}

function homeSeriesCard(row) {
  const home = displayName(row.team, "team");
  const away = displayName(row.opponent, "team");
  const homePlayer = topPlayerForTeam(row.team);
  const awayPlayer = topPlayerForTeam(row.opponent);
  const played = !scheduleRowUnplayed(row);
  const roundPoints = scheduleRoundPoints(row);
  const action = {
    type: "scheduleSeries",
    season: row.season,
    stage: row.stage,
    pool: row.pool,
    round: row.round,
    team: row.team,
    result: row.result,
    opponent: row.opponent,
    winner: row.winner,
    preMatchOnly: !played,
  };
  return `
    <article class="home-match-card ${played ? "is-played" : "is-upcoming"}" style="--home-team:${escapeHtml(teamColor(row.team, "S6"))}; --away-team:${escapeHtml(teamColor(row.opponent, "S6"))}">
      <div class="home-match-band"></div>
      <div class="home-match-top">
        <span>${escapeHtml(scheduleStageLabel(row.stage))}${row.round ? ` / ${escapeHtml(row.round)}` : ""}</span>
        <small>${played ? "Played" : "Upcoming"}</small>
        <button type="button" data-action="${actionAttr(action)}">View Match</button>
      </div>
      <div class="home-match-teams">
        <strong>${escapeHtml(home)}</strong>
        <b>${scheduleResultMarkup(row)}</b>
        <strong>${escapeHtml(away)}</strong>
      </div>
      ${roundPoints ? `
        <div class="home-round-points">
          <span class="${roundPoints.winner === canonicalTeamName(row.team) ? "is-earned" : ""}">${escapeHtml(displayName(row.team, "team"))} +${roundPoints.winner === canonicalTeamName(row.team) ? roundPoints.winnerPoints : roundPoints.loserPoints}</span>
          <span class="${roundPoints.winner === canonicalTeamName(row.opponent) ? "is-earned" : ""}">${escapeHtml(displayName(row.opponent, "team"))} +${roundPoints.winner === canonicalTeamName(row.opponent) ? roundPoints.winnerPoints : roundPoints.loserPoints}</span>
        </div>
      ` : ""}
      <div class="home-watch-row">
        ${[homePlayer, awayPlayer].filter(Boolean).map((playerRow) => `
          <button type="button" data-action="${actionAttr({ type: "player", player: playerRow.name })}">
            <span>${escapeHtml(displayName(playerRow.name, "name"))}</span>
            <small>${escapeHtml(displayName((playerRow.teams || [])[0], "team"))} / ${fmtGameAvg(playerRow.perPerGame)} PER/G</small>
          </button>
        `).join("")}
      </div>
    </article>
  `;
}

function homeByeCard(row) {
  const points = /\+2/.test(String(row.note || "")) ? 2 : 0;
  const kind = points ? "2-0 Bye" : "0-2 Bye";
  return `
    <article class="home-bye-card" style="--team-color:${escapeHtml(teamColor(row.team, "S6"))}">
      <span>${escapeHtml(kind)}</span>
      <strong>${escapeHtml(displayName(row.team, "team"))}</strong>
      <small>${escapeHtml(row.note || "Round 3 bye")}</small>
      <b>+${fmt(points)}</b>
    </article>
  `;
}

function renderHomePage() {
  const swissRows = homeSwissRows();
  const upperByeRows = homeByeRows("upper");
  const lowerByeRows = homeByeRows("lower");
  const teamRows = homeTeamSnapshotRows();
  const watchRows = homePlayerWatchList();
  const s6OverallTeams = s6StageTeamRows("overall", "overall");
  const summary = {
    seasons: data.seasons.filter((season) => /^S\d+$/.test(season) && !isPlayoffSeason(season) && !isScrimSeason(season)).length,
    teams: lifetimeTeams().length,
    players: lifetimePlayers().length,
    games: s6OverallTeams.reduce((max, row) => Math.max(max, row.games || 0), 0),
  };
  els.homePanel.innerHTML = `
    <section class="home-hero">
      <div>
        <span class="home-kicker">Gravy Train Rocket League Series</span>
        <h1>selena's kitchen</h1>
        <p>A reference hub for GTRLS seasons, teams, players, schedules, awards, records, and replay-fed game stats. It keeps the old spreadsheet spirit, but makes it searchable, sortable, and a lot easier to argue about.</p>
      </div>
      <div class="home-summary-grid">
        <article><span>Seasons</span><strong>${fmt(summary.seasons)}</strong><small>Regular seasons tracked</small></article>
        <article><span>Teams</span><strong>${fmt(summary.teams)}</strong><small>Lifetime team records</small></article>
        <article><span>Players</span><strong>${fmt(summary.players)}</strong><small>Career profiles</small></article>
        <article><span>S6 GP</span><strong>${fmt(summary.games)}</strong><small>Group + Swiss included</small></article>
      </div>
    </section>

    <section class="home-grid">
      <div class="home-module home-module-wide">
        <div class="home-module-head">
          <div>
            <span>S6 Swiss</span>
            <h2>Round 3 Matchups</h2>
          </div>
          <button type="button" data-action="${actionAttr({ type: "schedule", season: "S6", team: "All" })}">Full Schedule</button>
        </div>
        <div class="home-match-grid">
          ${swissRows.length ? swissRows.map(homeSeriesCard).join("") : `<p class="empty-note">Swiss schedule is not loaded yet.</p>`}
        </div>
        <div class="home-bye-section">
          <div>
            <h3>2-0 Byes</h3>
            <div class="home-bye-grid">${upperByeRows.map(homeByeCard).join("")}</div>
          </div>
          <div>
            <h3>0-2 Byes</h3>
            <div class="home-bye-grid">${lowerByeRows.map(homeByeCard).join("")}</div>
          </div>
        </div>
      </div>

      <div class="home-module">
        <div class="home-module-head">
          <div>
            <span>Current Table</span>
            <h2>S6 Team Snapshot</h2>
          </div>
          <button type="button" data-action="${actionAttr({ type: "view", view: "standings", season: "S6" })}">Standings</button>
        </div>
        <div class="home-standings-list">
          ${teamRows.map((row, index) => `
            <button type="button" data-action="${actionAttr({ type: "team", team: row.name, season: "S6" })}" style="--team-color:${escapeHtml(teamColor(row.name, "S6"))}">
              <span>${index + 1}</span>
              <strong>${escapeHtml(displayName(row.name, "team"))}</strong>
              <small>${escapeHtml(row.matchRecord || `${row.wins} - ${row.losses}`)} / ${fmt(row.standingsPoints)} pts</small>
            </button>
          `).join("")}
        </div>
      </div>

      <div class="home-module">
        <div class="home-module-head">
          <div>
            <span>Players To Watch</span>
            <h2>Current Form</h2>
          </div>
          <button type="button" data-action="${actionAttr({ type: "view", view: "players", season: "S6" })}">Players</button>
        </div>
        <div class="home-player-list">
          ${watchRows.map(({ label, metric, note, row }) => `
            <button type="button" data-action="${actionAttr({ type: "player", player: row.name })}" style="--team-color:${escapeHtml(teamColor((row.teams || [])[0], "S6"))}">
              <span>${escapeHtml(label)}</span>
              <strong>${escapeHtml(displayName(row.name, "name"))}</strong>
              <small>${escapeHtml(displayName((row.teams || [])[0], "team"))} / ${fmtGameAvg(row[metric])} / ${escapeHtml(note)}</small>
            </button>
          `).join("")}
        </div>
      </div>
    </section>
  `;
  els.homePanel.classList.remove("hidden");
}

function s6StandingRow(raw) {
  const [name, standingsRank, standingsPoints, matchRecord, goalDiff, gameRecord, sweeps, gameFiveLosses, extra] = raw;
  const accruedBonuses = typeof extra === "number" ? extra : (s6AccruedBonuses[name] || 0);
  const [wins, losses] = String(matchRecord).split("-").map((part) => Number(part.trim()) || 0);
  const [gameWins, gameLosses] = String(gameRecord).split("-").map((part) => Number(part.trim()) || 0);
  const games = gameWins + gameLosses;
  return {
    season: "S6",
    name,
    pool: s6Pools[name] || "",
    standingsRank,
    poolRank: s6PoolRanks[name] || standingsRank,
    standingsPoints,
    matchRecord,
    goalDiff,
    gameRecord,
    wins,
    losses,
    gameWins,
    gameLosses,
    games,
    winPct: games ? Math.round((gameWins / games) * 1000) / 10 : 0,
    matchWinPct: (wins + losses) ? Math.round((wins / (wins + losses)) * 1000) / 10 : 0,
    gameWinPct: games ? Math.round((gameWins / games) * 1000) / 10 : 0,
    sweeps,
    gameFiveLosses,
    sweepsText: `${sweeps || 0} - ${gameFiveLosses || 0}`,
    accruedBonuses,
    remainingMatches: 0,
    maxScore: standingsPoints,
  };
}

function aggregateLifetimeRows(rows, type) {
  const byName = new Map();
  const numericFields = [
    "games", "wins", "losses", "score", "goals", "assists", "saves", "shots",
    "standingsPoints", "gameWins", "gameLosses", "per",
    "shotsConceded", "goalsConceded", "lastDefenderGoalsConceded", "opponentSavesForced",
    "demosInflicted", "demosTaken", "avgSpeedTotal", "avgBoostTotal", "amountCollected",
    "amountStolen", "pressureShots", "pressureOpponentSaves", "advancedGames", "totalDistance",
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
    const advancedGames = Math.max(1, Number(item.advancedGames || 0));
    const pressureShots = Number(item.pressureShots ?? item.shots ?? 0) || 0;
    const pressureOpponentSaves = Number(item.pressureOpponentSaves ?? item.opponentSavesForced ?? 0) || 0;
    if (type === "team") {
      item.pressureRate = Math.round(((pressureShots + pressureOpponentSaves + item.amountStolen + item.demosInflicted) / advancedGames) * 100) / 100;
      item.missPct = item.shots > 0 ? Math.round(((item.shots - item.goals - item.opponentSavesForced) / item.shots) * 1000) / 10 : 0;
      delete item.teams;
    } else {
      item.avgSpeed = Math.round((item.avgSpeedTotal || 0) / Math.max(1, item.games));
      item.avgBoost = Math.round(((item.avgBoostTotal || 0) / Math.max(1, item.games)) * 10) / 10;
      item.pressureRate = Math.round(((pressureShots + item.amountStolen + item.demosInflicted) / advancedGames) * 100) / 100;
      item.teams = [...item.teams].sort();
    }
    item.__unavailableStats = new Set([...availabilitySensitiveStats].filter((key) => !item.__availableStats.has(key)));
    delete item.__availableStats;
    return item;
  }).sort((a, b) => a.name.localeCompare(b.name));
}

function lifetimeTeams() {
  return aggregateLifetimeRows([...data.teams.filter((row) => row.season !== "S6"), ...s6StageTeamRows("overall", "overall")], "team");
}

function lifetimePlayers() {
  return aggregateLifetimeRows([...data.players.filter((row) => row.season !== "S6"), ...s6StagePlayerRows("overall", "overall")], "player");
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
  item.pressureShots += game.shots || 0;
  item.shotsConceded += game.shotsConceded || 0;
  item.goalsConceded += game.goalsConceded || 0;
  item.opponentSavesForced += game.opponentSavesForced || 0;
  item.pressureOpponentSaves += game.opponentSavesForced || 0;
  item.demosInflicted += game.demosInflicted || 0;
  item.demosTaken += game.demosTaken || 0;
  item.amountCollected += game.boostCollected || 0;
  item.amountStolen += game.boostStolen || 0;
  if ((game.boostStolen || 0) || (game.demosInflicted || 0) || (game.opponentSavesForced || 0)) item.advancedGames += 1;
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
    pressureShots: 0,
    pressureOpponentSaves: 0,
    advancedGames: 0,
    totalDistance: 0,
    firstDate: "",
    lastDate: "",
  };
}

function finalizePlayerAggregate(item) {
  finalizeCommon(item);
  item.avgSpeed = Math.round((item.avgSpeedTotal || 0) / Math.max(1, item.games));
  item.avgBoost = Math.round(((item.avgBoostTotal || 0) / Math.max(1, item.games)) * 10) / 10;
  item.pressureRate = Math.round((((item.pressureShots || item.shots) + item.amountStolen + item.demosInflicted) / Math.max(1, Number(item.advancedGames || 0))) * 100) / 100;
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

function playerRoleRows(rows) {
  const roles = new Map();
  const byTeam = new Map();
  rows.forEach((row) => {
    const team = canonicalTeamName(row.teams?.[0] || row.teamsText || "");
    if (!team) return;
    if (!byTeam.has(team)) byTeam.set(team, []);
    byTeam.get(team).push(row);
  });
  byTeam.forEach((teamRows, team) => {
    teamRows
      .filter((row) => typeof row.rating === "number")
      .sort((a, b) => b.rating - a.rating || a.name.localeCompare(b.name))
      .forEach((row, index) => roles.set(`${team}|${row.name}`, `${index + 1}`));
  });
  return rows.map((row) => {
    const team = canonicalTeamName(row.teams?.[0] || row.teamsText || "");
    return { ...row, role: roles.get(`${team}|${row.name}`) || "" };
  });
}

function teamRoster(team, season) {
  if (season === "S6") return playerRoleRows(s6StagePlayerRows(state.s6Stage, "overall")
    .filter((row) => (row.teams || []).includes(team))
    .sort((a, b) => b.games - a.games || b.goals - a.goals));
  if (season === "S5" && state.s5Stage === "swiss") return [];
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
  return playerRoleRows([...byPlayer.values()].map(finalizePlayerAggregate).sort((a, b) => b.games - a.games || b.goals - a.goals));
}

function playerCareer(player) {
  const bySeason = new Map();
  [...data.players.filter((row) => row.season !== "S6"), ...s6StagePlayerRows(state.s6Stage, "overall")]
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
  [...data.players.filter((row) => row.season !== "S6"), ...s6StagePlayerRows("overall", "overall")]
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
  if (season === "S6") return s6StagePlayerRows();
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
  const allPlayerSeasons = regularPlayerSeasonRows();

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
      if (leaders[0] && (Number(row[stat]) || 0) === leaders[0][stat]) row.__leagueLeaders.add(stat);
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
  if (season === "S6" && view === "teams") {
    return s6StageTeamRows().map((row) => ({ ...row, teamsText: "" }));
  }
  if (season === "S6" && view === "players") {
    return playerRoleRows(s6StagePlayerRows().map((row) => ({ ...row, teamsText: row.teams ? row.teams.join(", ") : "" })))
      .filter((row) => state.playerRoleFilter === "All" || row.role === state.playerRoleFilter);
  }
  if (season === "S5" && view === "teams" && ["split1", "split2"].includes(state.s5Stage)) {
    return s5FilterByPool(data.teams.filter((row) => row.season === "S5")).map((row) => ({ ...row, teamsText: "" }));
  }
  if (season === "S5" && view === "players" && ["split1", "split2"].includes(state.s5Stage)) {
    const poolTeams = new Set(s5FilterByPool(data.teams.filter((row) => row.season === "S5")).map((row) => row.name));
    return data.players
      .filter((row) => row.season === "S5" && row.teams?.some((team) => poolTeams.has(team)))
      .map((row) => ({ ...row, teamsText: row.teams ? row.teams.join(", ") : "" }));
  }
  if (season === "S5" && ["teams", "players"].includes(view) && state.s5Stage === "swiss") {
    return [];
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
  if (state.season === "S5") {
    if (state.s5Stage === "swiss") return [];
    if (["split1", "split2"].includes(state.s5Stage)) {
      return s5FilterByPool(s5SplitStandingsRows[state.s5Stage].map(s5SplitStandingRow))
        .sort((a, b) => b.wins - a.wins || b.standingsPoints - a.standingsPoints || a.losses - b.losses || a.poolRank - b.poolRank || a.name.localeCompare(b.name))
        .map((row, index) => ({ ...row, standingsRank: index + 1 }));
    }
  }
  if (state.season === "S6") {
    if (state.s6Stage === "swiss") {
      return s6ComputedStandingsRows("swiss");
    }
    if (state.s6Stage === "overall") {
      return s6ComputedStandingsRows("overall");
    }
    const isPoolView = state.s6Pool !== "overall";
    return s6FilterByPool(s6GroupStandingsRows.map(s6StandingRow))
      .sort((a, b) => {
        if (isPoolView) return comparePoolStandings(a, b);
        return a.standingsRank - b.standingsRank;
      })
      .map((row, index) => ({ ...row, standingsRank: isPoolView ? index + 1 : row.standingsRank, poolRank: isPoolView ? index + 1 : row.poolRank }));
  }
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

function comparePoolStandings(a, b) {
  return b.wins - a.wins
    || a.losses - b.losses
    || b.standingsPoints - a.standingsPoints
    || compareHeadToHeadPlaceholder(a, b)
    || b.gameWinPct - a.gameWinPct
    || b.goalDiff - a.goalDiff
    || a.name.localeCompare(b.name);
}

function compareHeadToHeadPlaceholder(a, b) {
  return (Number(a.poolRank) || 999) - (Number(b.poolRank) || 999);
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
  const typeRows = isTeamView()
    ? regularTeamSeasonRows(state.s6Stage, "overall")
    : regularPlayerSeasonRows();
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

function baseAwardName(name) {
  return String(name || "").replace(/^Co-/i, "");
}

const awardIconAssets = new Map([
  ["Ballon d'Car", "assets/award-icons/ballon-dcar.png"],
  ["Goalie of the Year", "assets/award-icons/goalie-of-the-year.png"],
  ["Wingman", "assets/award-icons/wingman.png"],
  ["Golden Wheel", "assets/award-icons/golden-wheel.png"],
  ["Silver Striker", "assets/award-icons/silver-striker.png"],
]);

function awardIconFor(name) {
  return awardIconAssets.get(baseAwardName(name)) || "";
}

function awardIconMarkup(name, className = "award-icon") {
  const src = awardIconFor(name);
  return src ? `<img class="${className}" src="${escapeHtml(src)}" alt="" aria-hidden="true">` : "";
}

function awardLabelMarkup(name, className = "award-icon", prizeKinkMarker = false) {
  const marker = prizeKinkMarker ? `<span class="pilot-prize-marker" title="This award is part of the Pilot Praise Kink Collection" aria-label="This award is part of the Pilot Praise Kink Collection">*</span>` : "";
  return `<span class="award-title">${awardIconMarkup(name, className)}<span>${escapeHtml(name)}${marker}</span></span>`;
}

function awardFootnoteCode(name) {
  const award = baseAwardName(name);
  if (award === "Ballon d'Car") return "B";
  if (award === "Golden Wheel") return "GW";
  if (award === "Wingman") return "W";
  if (award === "Goalie of the Year") return "G";
  if (award === "Silver Striker") return "S";
  if (award === "Finals MVP") return "FM";
  if (award === "World Cup Champions") return "WC";
  if (award === "Season Champion") return "C";
  if (/All-Star$/i.test(award)) return "AS";
  return award.split(/\s+/).map((word) => word[0]).join("").slice(0, 3).toUpperCase();
}

function playerAwardFootnotes(player, season) {
  if (!player || !season || season === "Career" || season === "Lifetime") return [];
  return allAwardDefinitions()
    .filter((definition) => definition.season === season && definition.winners?.includes(player))
    .map((definition) => {
      const award = awardDisplayName(definition);
      return {
        code: awardFootnoteCode(award),
        award,
        title: award,
      };
    });
}

function playerAwardFootnoteMarkup(player, season) {
  const footnotes = playerAwardFootnotes(player, season);
  if (!footnotes.length) return "";
  return `<span class="award-footnotes" aria-label="Awards">${footnotes.map((item) => `<span class="award-footnote" title="${escapeHtml(item.title)}">${escapeHtml(item.code)}</span>`).join("")}</span>`;
}

function isWorldCupAwardName(name) {
  return baseAwardName(name) === "World Cup Champions";
}

function isNonRaceAwardName(name) {
  const award = baseAwardName(name);
  return nonRaceAwardNames.has(award) || /All-Star$/i.test(award);
}

function awardDisplayName(definition) {
  if (!definition) return "";
  return definition.winners?.length > 1 && !isNonRaceAwardName(definition.award) ? `Co-${definition.award}` : definition.award;
}

function awardDefinitionByName(name, season = "") {
  const baseName = baseAwardName(name);
  return allAwardDefinitions().find((award) => award.award === baseName && (!season || award.season === season));
}

function silverStrikerEligible(row) {
  return row.shots >= 72 || row.shotsPerGame > 2.25;
}

function awardRaceRows(definition, sourceRows = null) {
  if (!definition || definition.season === "2026" || isNonRaceAwardName(definition.award)) {
    return (definition?.winners || []).map((name, index) => ({ rank: index + 1, name, teamsText: definition.team, games: "", total: definition.amount, average: definition.perGameAmount, extra: "" }));
  }
  const playerRows = sourceRows || seasonPlayerRows(definition.season);
  const contenders = playerRows
    .filter((row) => !row.season || row.season === definition.season)
    .filter((row) => definition.award !== "Silver Striker" || silverStrikerEligible(row))
    .sort((a, b) => b[definition.avgStat] - a[definition.avgStat] || b[definition.stat] - a[definition.stat]);
  const shootingRanks = new Map([...contenders].sort((a, b) => b.shootingPct - a.shootingPct).map((row, index) => [row.name, index + 1]));
  return contenders.map((row, index, sorted) => {
    const tiedRank = sorted.findIndex((candidate) => candidate[definition.avgStat] === row[definition.avgStat]) + 1;
    return {
      rank: tiedRank,
      name: row.name,
      teamsText: row.teams?.join(", ") || "",
      games: row.games,
      total: row[definition.stat],
      average: row[definition.avgStat],
      extraValue: definition.extraStat ? row[definition.extraStat] : "",
      extra: definition.extraStat ? `${definition.extraStat === "shotsPerGame" ? "Sh/G" : "Extra"}: ${fmtStat(row[definition.extraStat], definition.extraStat, definition.extraStat === "shootingPct" ? "%" : "")}${definition.extraStat === "shootingPct" ? ` (${shootingRanks.get(row.name)}${rankSuffix(shootingRanks.get(row.name))})` : ""}` : "",
    };
  });
}

function computedAwardDefinition(definition) {
  const raceRows = awardRaceRows(definition);
  if (!raceRows.length) return null;
  const topAverage = raceRows[0].average;
  const winners = raceRows.filter((row) => row.average === topAverage);
  return {
    ...definition,
    winners: winners.map((row) => row.name),
    team: winners.map((row) => row.teamsText).filter(Boolean).join(", "),
    amount: winners.map((row) => definition.award === "Silver Striker" && row.extraValue !== "" ? `${fmt(row.total)}/${fmtGameAvg(row.extraValue)}` : fmt(row.total)).join(", "),
    perGameAmount: winners.map((row) => fmtStat(row.average, definition.avgStat, definition.avgStat === "shootingPct" ? "%" : "")).join(", "),
    generated: true,
  };
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

const kitchenExpectedCurve = {
  lowerLimit: -0.05,
  upperLimit: 0.25,
  steepness: 0.005,
};

function kitchenExpectedPerPerGame(rating, midpoint) {
  if (!Number.isFinite(rating) || rating <= 0 || !Number.isFinite(midpoint)) return null;
  const { lowerLimit, upperLimit, steepness } = kitchenExpectedCurve;
  return lowerLimit + ((upperLimit - lowerLimit) / (1 + Math.exp(-steepness * (rating - midpoint))));
}

function roundKitchenValue(value, places = 3) {
  if (!Number.isFinite(value)) return null;
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
}

function fmtKitchenDelta(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "n/a";
  return `${numeric >= 0 ? "+" : ""}${numeric.toFixed(3)}`;
}

function regularRowsSinceTwosEra(type) {
  const rows = type === "team" ? regularTeamSeasonRows("overall", "overall") : regularPlayerSeasonRows();
  return rows.filter((row) => row.season !== "S1" && !isScrimSeason(row.season) && !isPlayoffSeason(row.season));
}

function kitchenActivePlayers(season) {
  const sourceRows = season === "S6"
    ? s6StagePlayerRows("overall", "overall")
    : rowsForDataset("players", season);
  const currentRows = sourceRows
    .filter((row) => row.season === season)
    .map((row) => ({
      ...row,
      perPerGame: Number(row.perPerGame),
      teamsText: row.teamsText || (row.teams ? row.teams.join(", ") : ""),
    }))
    .filter((row) => Number.isFinite(row.perPerGame))
    .sort((a, b) => b.perPerGame - a.perPerGame);
  const careerRows = new Map(aggregateLifetimeRows(regularRowsSinceTwosEra("player"), "player").map((row) => [row.name, row]));
  const ratings = currentRows.map((row) => Number(row.rating)).filter((value) => Number.isFinite(value) && value > 0);
  const dataMedian = median(ratings);
  return currentRows.map((row, index) => {
    const rating = Number(row.rating);
    const hasRating = Number.isFinite(rating) && rating > 0;
    const expected = hasRating ? kitchenExpectedPerPerGame(rating, dataMedian) : null;
    const diff = expected === null ? null : row.perPerGame - expected;
    return {
      ...row,
      rating: hasRating ? rating : null,
      rank: index + 1,
      career: careerRows.get(row.name),
      expectedPerPerGame: roundKitchenValue(expected),
      perDelta: roundKitchenValue(diff),
      carryPotential: expected ? Math.round((row.perPerGame / expected) * 100) / 100 : null,
    };
  });
}

function kitchenTeamForPlayer(row) {
  return row.teams?.[0] || row.teamsText || "";
}

function kitchenTeamColor(row, season) {
  return teamColor(kitchenTeamForPlayer(row) || row.name, season);
}

function withKitchenRoles(players) {
  const roleByPlayerTeam = new Map();
  const byTeam = new Map();
  players.forEach((row) => {
    const team = kitchenTeamForPlayer(row);
    if (!team) return;
    if (!byTeam.has(team)) byTeam.set(team, []);
    byTeam.get(team).push(row);
  });
  byTeam.forEach((rows, team) => {
    rows
      .filter((row) => typeof row.rating === "number")
      .sort((a, b) => b.rating - a.rating || a.name.localeCompare(b.name))
      .forEach((row, index) => roleByPlayerTeam.set(`${team}|${row.name}`, `${index + 1}`));
  });
  return players.map((row) => {
    const team = kitchenTeamForPlayer(row);
    return { ...row, role: roleByPlayerTeam.get(`${team}|${row.name}`) || row.role || "" };
  });
}

function kitchenFilterOptions(players) {
  const teamOptions = [...new Set(players.map(kitchenTeamForPlayer).filter(Boolean))]
    .sort((a, b) => displayName(a, "team").localeCompare(displayName(b, "team")));
  const roleOptions = [...new Set(players.map((row) => row.role).filter(Boolean))]
    .sort((a, b) => Number(a) - Number(b));
  return { teamOptions, roleOptions };
}

function kitchenFilteredPlayers(players) {
  return players.filter((row) => {
    const teamMatch = state.kitchenTeamFilter === "All" || kitchenTeamForPlayer(row) === state.kitchenTeamFilter;
    const roleMatch = state.kitchenRoleFilter === "All" || row.role === state.kitchenRoleFilter;
    return teamMatch && roleMatch;
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

function renderKitchenScatter(players, { id, title, season = state.season, fitPlayers = players, yKey, yLabel, yMin, yMax, yFormat = "", yDecimals = null, baselineY = null, showLinearFit = true, showLogisticFit = false, xMin = 700, xMax = 1500 }) {
  const graphXMin = xMin;
  const graphXMax = xMax;
  const chart = { left: 58, top: 22, width: 820, height: 360 };
  const scaleX = (value) => chart.left + (((value - graphXMin) / Math.max(1, graphXMax - graphXMin)) * chart.width);
  const scaleY = (value) => chart.top + chart.height - (((value - yMin) / Math.max(0.01, yMax - yMin)) * chart.height);
  const regression = kitchenRegression(fitPlayers, yKey);
  const lineY1 = baselineY === null ? (regression.slope * graphXMin + regression.intercept) : baselineY;
  const lineY2 = baselineY === null ? (regression.slope * graphXMax + regression.intercept) : baselineY;
  const sCurveDm = median(fitPlayers.map((row) => Number(row.rating)).filter((value) => Number.isFinite(value) && value > 0));
  const referenceYValue = (xValue) => {
    if (showLogisticFit) return kitchenExpectedPerPerGame(xValue, sCurveDm);
    if (baselineY !== null) return baselineY;
    return regression.slope * xValue + regression.intercept;
  };
  const zonePoints = Array.from({ length: 64 }, (_, index) => {
    const xValue = graphXMin + ((graphXMax - graphXMin) * (index / 63));
    return {
      x: scaleX(xValue),
      y: scaleY(referenceYValue(xValue)),
    };
  });
  const showPerformanceZones = showLogisticFit || baselineY !== null;
  const zoneId = `kitchen-zone-${id}`;
  const linePath = zonePoints.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ");
  const reverseLinePath = [...zonePoints].reverse().map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ");
  const greenZone = `${chart.left},${chart.top} ${chart.left + chart.width},${chart.top} ${reverseLinePath}`;
  const redZone = `${linePath} ${chart.left + chart.width},${chart.top + chart.height} ${chart.left},${chart.top + chart.height}`;
  const logisticPoints = showLogisticFit
    ? Array.from({ length: 48 }, (_, index) => {
      const xValue = graphXMin + ((graphXMax - graphXMin) * (index / 47));
      const yValue = kitchenExpectedPerPerGame(xValue, sCurveDm);
      return `${scaleX(xValue).toFixed(1)},${scaleY(yValue).toFixed(1)}`;
    }).join(" ")
    : "";
  const xTicks = [graphXMin, graphXMin + ((graphXMax - graphXMin) / 2), graphXMax];
  const yTicks = [yMin, yMin + ((yMax - yMin) / 2), yMax];
  const yDisplay = (value) => yDecimals === null ? fmt(value, yFormat) : Number(value).toFixed(yDecimals);
  const playerGraphRows = players.map((row) => {
    const yValue = Number(row[yKey]);
    const x = scaleX(row.rating);
    const y = scaleY(yValue);
    const tooltipX = Math.min(x + 12, chart.left + chart.width - 210);
    const tooltipY = Math.max(chart.top + 8, y - 58);
    const deltaText = fmtKitchenDelta(row.perDelta);
    return `
      <g class="kitchen-dot" tabindex="0" data-kitchen-player="${escapeHtml(row.name)}" data-team="${escapeHtml(row.teamsText || "")}" data-role="${escapeHtml(row.role || "")}" data-rating="${fmt(row.rating)}${row.ratingEstimated ? "*" : ""}" data-rating-source="${escapeHtml(row.ratingSource || "")}" data-per="${fmtGameAvg(row.perPerGame)}" data-xper="${fmtGameAvg(row.expectedPerPerGame)}" data-delta="${escapeHtml(deltaText)}" style="--team-color:${escapeHtml(kitchenTeamColor(row, season))}">
        <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6"></circle>
        <g class="kitchen-svg-tooltip" transform="translate(${tooltipX.toFixed(1)} ${tooltipY.toFixed(1)})">
          <rect width="198" height="52" rx="7"></rect>
          <text x="10" y="18">${escapeHtml(displayName(row.name, "name"))}</text>
          <text x="10" y="35">Rating ${fmt(row.rating)}${row.ratingEstimated ? "*" : ""} | ${escapeHtml(yLabel)} ${yDisplay(yValue)}</text>
          <text x="10" y="48">Role ${escapeHtml(row.role || "-")} | PER/G ${fmtGameAvg(row.perPerGame)} | PER/G- ${escapeHtml(deltaText)}</text>
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
          ${showLinearFit ? `<span><i class="expected"></i>${baselineY === null ? "Best fit" : "Zero baseline"}</span>` : ""}
          ${logisticPoints ? `<span><i class="logistic"></i>S-Curve</span>` : ""}
        </div>
      </div>
      <svg viewBox="0 0 920 430" role="img" aria-label="${escapeHtml(title)} scatter plot">
        ${showPerformanceZones ? `
        <defs>
          <linearGradient id="${zoneId}-green" x1="0" y1="${chart.top}" x2="0" y2="${chart.top + chart.height}" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#36ff86" stop-opacity="0.24"></stop>
            <stop offset="62%" stop-color="#36ff86" stop-opacity="0.06"></stop>
            <stop offset="100%" stop-color="#36ff86" stop-opacity="0"></stop>
          </linearGradient>
          <linearGradient id="${zoneId}-red" x1="0" y1="${chart.top}" x2="0" y2="${chart.top + chart.height}" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#ff4a5f" stop-opacity="0"></stop>
            <stop offset="38%" stop-color="#ff4a5f" stop-opacity="0.06"></stop>
            <stop offset="100%" stop-color="#ff4a5f" stop-opacity="0.24"></stop>
          </linearGradient>
        </defs>
        <polygon class="performance-zone performance-zone-good" points="${greenZone}" fill="url(#${zoneId}-green)"></polygon>
        <polygon class="performance-zone performance-zone-bad" points="${redZone}" fill="url(#${zoneId}-red)"></polygon>
        ` : ""}
        <line class="axis" x1="${chart.left}" y1="${chart.top}" x2="${chart.left}" y2="${chart.top + chart.height}"></line>
        <line class="axis" x1="${chart.left}" y1="${chart.top + chart.height}" x2="${chart.left + chart.width}" y2="${chart.top + chart.height}"></line>
        ${xTicks.map((tick) => `<g class="tick"><line x1="${scaleX(tick).toFixed(1)}" y1="${chart.top}" x2="${scaleX(tick).toFixed(1)}" y2="${chart.top + chart.height}"></line><text x="${scaleX(tick).toFixed(1)}" y="${chart.top + chart.height + 28}">${fmt(Math.round(tick))}</text></g>`).join("")}
        ${yTicks.map((tick) => `<g class="tick"><line x1="${chart.left}" y1="${scaleY(tick).toFixed(1)}" x2="${chart.left + chart.width}" y2="${scaleY(tick).toFixed(1)}"></line><text x="${chart.left - 12}" y="${scaleY(tick).toFixed(1)}">${yDisplay(tick)}</text></g>`).join("")}
        ${showLinearFit ? `<line class="fit-line" x1="${scaleX(graphXMin).toFixed(1)}" y1="${scaleY(lineY1).toFixed(1)}" x2="${scaleX(graphXMax).toFixed(1)}" y2="${scaleY(lineY2).toFixed(1)}"></line>` : ""}
        ${logisticPoints ? `<polyline class="logistic-fit-line" points="${logisticPoints}"></polyline>` : ""}
        ${playerGraphRows}
        <text class="axis-label x-label" x="${chart.left + (chart.width / 2)}" y="424">Rating</text>
        <text class="axis-label y-label" transform="translate(16 ${chart.top + (chart.height / 2)}) rotate(-90)">${escapeHtml(yLabel)}</text>
      </svg>
      <div class="kitchen-player-info" data-kitchen-player-info>${kitchenInfoHtml(null)}</div>
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
  const rows = (season === "S6" ? s6StageTeamRows("overall", "overall") : rowsForDataset("teams", season))
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
  const players = withKitchenRoles(kitchenActivePlayers(season));
  const { teamOptions, roleOptions } = kitchenFilterOptions(players);
  if (state.kitchenTeamFilter !== "All" && !teamOptions.includes(state.kitchenTeamFilter)) state.kitchenTeamFilter = "All";
  if (state.kitchenRoleFilter !== "All" && !roleOptions.includes(state.kitchenRoleFilter)) state.kitchenRoleFilter = "All";
  const filteredPlayers = kitchenFilteredPlayers(players);
  if (state.kitchenSelectedPlayer && !filteredPlayers.some((row) => row.name === state.kitchenSelectedPlayer)) state.kitchenSelectedPlayer = "";
  const teams = kitchenTeams(season);
  const topEfficiency = [...filteredPlayers].sort((a, b) => b.perPerGame - a.perPerGame)[0];
  const biggestOver = [...filteredPlayers].filter((row) => typeof row.perDelta === "number").sort((a, b) => b.perDelta - a.perDelta)[0];
  const topTeam = teams[0];
  const fullRatedPlayers = players.map((row) => ({ ...row, rating: Number(row.rating), perPerGame: Number(row.perPerGame) }))
    .filter((row) => Number.isFinite(row.rating) && row.rating > 0 && Number.isFinite(row.perPerGame));
  const ratedPlayers = filteredPlayers.map((row) => ({ ...row, rating: Number(row.rating), perPerGame: Number(row.perPerGame) }))
    .filter((row) => Number.isFinite(row.rating) && row.rating > 0 && Number.isFinite(row.perPerGame));
  const regression = kitchenRegression(fullRatedPlayers);
  const sortedPlayers = sortedKitchenPlayers(filteredPlayers);
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
    ${renderKitchenScatter(ratedPlayers, { id: "per", title: `${season} PER/G vs Rating`, season, fitPlayers: fullRatedPlayers, yKey: "perPerGame", yLabel: "PER/G", yMin: -0.1, yMax: season === "S6" ? 0.3 : 0.4, yDecimals: 2, showLinearFit: season !== "S6", showLogisticFit: season === "S6", ...ratingWindow })}
    ${renderKitchenScatter(ratedPlayers, { id: "delta", title: `${season} PER/G- vs Rating`, season, fitPlayers: fullRatedPlayers, yKey: "perDelta", yLabel: "PER/G-", yMin: -0.1, yMax: 0.15, yDecimals: 3, baselineY: 0, ...ratingWindow })}
  ` : `<div class="kitchen-rating-empty"><strong>Rating graphs unavailable for ${escapeHtml(season)}</strong><span>No manual or estimated player ratings are available.</span></div>`;
  const estimateFootnote = ["S1", "S2"].includes(season) ? `<div class="kitchen-estimate-footnote"><strong>* Estimated ratings</strong><span>${escapeHtml(season)} ratings are backfilled from each player's nearest future manual rating; a future-season median is used when no player-specific value exists.</span></div>` : "";
  const statValue = (value, formatter = fmt) => value === null || value === undefined ? "n/a" : formatter(value);
  const ratingValue = (row) => row.rating === null ? "n/a" : `${fmt(row.rating)}${row.ratingEstimated ? "*" : ""}`;
  const playerRows = sortedPlayers.map((row) => `
    <tr data-kitchen-player="${escapeHtml(row.name)}" data-team="${escapeHtml(row.teamsText || "")}" data-role="${escapeHtml(row.role || "")}" data-rating="${escapeHtml(ratingValue(row))}" data-rating-source="${escapeHtml(row.ratingSource || "")}" data-per="${fmtGameAvg(row.perPerGame)}" data-xper="${escapeHtml(statValue(row.expectedPerPerGame, fmtGameAvg))}" data-delta="${escapeHtml(fmtKitchenDelta(row.perDelta))}" style="--team-color:${escapeHtml(kitchenTeamColor(row, season))}">
      <td><button type="button" class="kitchen-player-button" data-kitchen-player="${escapeHtml(row.name)}">${escapeHtml(displayName(row.name, "name"))}</button></td>
      <td>${escapeHtml(row.teamsText || "")}</td>
      <td>${escapeHtml(row.role || "")}</td>
      <td>${row.ratingEstimated ? `<span class="estimated-rating" title="${escapeHtml(row.ratingSource || "Estimated rating")}">${escapeHtml(ratingValue(row))}</span>` : escapeHtml(ratingValue(row))}</td>
      <td>${fmtGameAvg(row.perPerGame)}</td>
      <td>${escapeHtml(statValue(row.expectedPerPerGame, fmtGameAvg))}</td>
      <td${row.perDelta === null ? "" : ` class="${row.perDelta >= 0 ? "positive" : "negative"}"`}>${escapeHtml(fmtKitchenDelta(row.perDelta))}</td>
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
      <article><span>Most Over Expected</span><strong>${escapeHtml(displayName(biggestOver?.name || "-", "name"))}</strong><small>${biggestOver ? fmtKitchenDelta(biggestOver.perDelta) : "n/a"}</small></article>
      <article><span>Best Fit</span><strong>${ratedPlayers.length ? `${regression.slope >= 0 ? "+" : ""}${fmt(regression.slope * 100)}` : "n/a"}</strong><small>PER/G per 100 rating</small></article>
      <article><span>Top Team</span><strong>${escapeHtml(displayName(topTeam?.name || "-", "team"))}</strong><small>${fmt(topTeam?.standingsPoints)} league score</small></article>
    </div>
    <div class="kitchen-layout">
      <section class="kitchen-card wide">
        <div class="kitchen-card-head">
          <h3>${season} Player Breakdown</h3>
          <span>${filteredPlayers.length} of ${players.length} players | rating vs expected efficiency</span>
        </div>
        <div class="kitchen-filter-bar">
          <label><span>Team</span><select id="kitchenTeamFilter"><option value="All">All teams</option>${teamOptions.map((team) => `<option value="${escapeHtml(team)}"${state.kitchenTeamFilter === team ? " selected" : ""}>${escapeHtml(displayName(team, "team"))}</option>`).join("")}</select></label>
          <label><span>Role</span><select id="kitchenRoleFilter"><option value="All">All roles</option>${roleOptions.map((role) => `<option value="${escapeHtml(role)}"${state.kitchenRoleFilter === role ? " selected" : ""}>Role ${escapeHtml(role)}</option>`).join("")}</select></label>
        </div>
        ${estimateFootnote}
        ${graphHtml}
        <div class="kitchen-table-wrap">
          <table class="kitchen-table">
            <thead><tr>
              ${kitchenSortHeader("name", "Player")}
              ${kitchenSortHeader("teamsText", "Team")}
              ${kitchenSortHeader("role", "Role")}
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
  if (!dataset?.kitchenPlayer) return `
    <strong>Select a player</strong>
    <span>Choose a table row or hover a dot.</span>
    <small>&nbsp;</small>
    <dl>
      <div><dt>Rating</dt><dd>-</dd></div>
      <div><dt>PER/G</dt><dd>-</dd></div>
      <div><dt>xPER/G</dt><dd>-</dd></div>
      <div><dt>PER/G-</dt><dd>-</dd></div>
    </dl>
  `;
  return `
    <strong>${escapeHtml(displayName(dataset.kitchenPlayer, "name"))}</strong>
    <span>${escapeHtml(dataset.team || "")}${dataset.role ? ` | Role ${escapeHtml(dataset.role)}` : ""}</span>
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
  if (temporary) {
    els.kitchenPanel.querySelectorAll(".is-hovered").forEach((node) => node.classList.remove("is-hovered"));
  }
  els.kitchenPanel.querySelectorAll(".kitchen-dot, .kitchen-table tbody tr").forEach((node) => {
    const isActive = node.dataset.kitchenPlayer === activePlayer;
    if (temporary) {
      node.classList.toggle("is-hovered", isActive);
    } else {
      node.classList.toggle("is-selected", isActive);
      node.classList.remove("is-hovered");
    }
  });
  els.kitchenPanel.querySelectorAll("[data-kitchen-player-info]").forEach((info) => {
    info.innerHTML = kitchenInfoHtml(kitchenPlayerDataset(activePlayer));
  });
}

function clearKitchenHover() {
  els.kitchenPanel.querySelectorAll(".is-hovered").forEach((node) => node.classList.remove("is-hovered"));
  els.kitchenPanel.querySelectorAll("[data-kitchen-player-info]").forEach((info) => {
    info.innerHTML = kitchenInfoHtml(kitchenPlayerDataset(state.kitchenSelectedPlayer));
  });
}

function latestRegularSeason() {
  return [...data.seasons]
    .filter((season) => /^S\d+$/.test(season))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .at(-1) || "All";
}

function awardRaceDefinitionsForSeason(season) {
  const explicit = awardDefinitions.filter((award) => award.season !== "2026" && award.season === season && !nonRaceAwardNames.has(award.award));
  if (explicit.length) return explicit;
  const templateSeason = [...new Set(awardDefinitions.map((award) => award.season))]
    .filter((item) => item !== "2026")
    .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))[0];
  return awardDefinitions
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
    const nameType = item.type === "team" || item.entity === "team" ? "team" : "name";
    const prizeKinkMarker = item.prizeKinkMarker && awardIconFor(item.label);
    const marker = item.prizeKinkMarker && !awardIconFor(item.label) ? `<span class="pilot-prize-marker" title="This award is part of the Pilot Praise Kink Collection" aria-label="This award is part of the Pilot Praise Kink Collection">*</span>` : "";
    const label = awardIconFor(item.label) ? awardLabelMarkup(item.label, "mini-award-icon", prizeKinkMarker) : `${escapeHtml(item.label)}${marker}`;
    return `
      <button type="button" class="mini-leader-card"${style}${action}>
        <span class="${awardIconFor(item.label) ? "mini-award-label" : ""}">${label}</span>
        <strong>${escapeHtml(displayName(item.name, nameType))}</strong>
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
      return leader ? [{ key, direction, label, name: leader.name, team: leader.name, meta: fmtStat(leader[key], key, suffix), type: "team" }] : [];
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
  const awardSourceRows = state.view === "players" && panelSeason === "S6" ? rows : null;
  awardPanel.querySelector("h2").textContent = awardSourceRows && state.playerRoleFilter !== "All" ? `${panelSeason} Role ${state.playerRoleFilter} Award Races` : `${panelSeason} Award Races`;

  const regularTeamRows = state.season === "All" ? rowsForDataset("teams", "All") : rowsForDataset("teams", panelSeason);
  const teamItems = teamLeagueStats.flatMap(([key, label, suffix = "", direction = "desc"]) => {
    const leader = leaderFor(regularTeamRows, key, direction);
    return leader ? [{ key, direction, label, name: leader.name, team: leader.name, meta: `${fmtStat(leader[key], key, suffix)} - ${leader.season}`, type: "team" }] : [];
  });
  if (showTeamPanel) renderMiniLeaderGrid(els.teamLeaderGrid, teamItems, (item) => ({ type: "sort", key: item.key, dir: item.direction }));

  const awardItems = awardRaceDefinitionsForSeason(panelSeason).map((award) => {
    const raceRows = awardRaceRows(award, awardSourceRows);
    const leader = raceRows[0];
    const leaders = leader ? raceRows.filter((row) => row.average === leader.average) : [];
    const leaderTeam = leaders.map((row) => row.teamsText).filter(Boolean).join(", ") || award.team || "";
    return {
      label: leaders.length > 1 ? `Co-${award.award}` : award.award,
      name: leaders.length ? leaders.map((row) => displayName(row.name, "name")).join(", ") : "-",
      team: leaderTeam,
      meta: leader ? `${leaderTeam ? `${leaderTeam} | ` : ""}${award.avgLabel ? `${award.avgLabel}: ${fmtStat(leader.average, award.avgStat)} | ` : ""}${award.totalLabel}: ${fmt(leader.total)}` : "",
      sortKey: award.avgStat,
      award,
      prizeKinkMarker: awardSourceRows && ["2", "3"].includes(state.playerRoleFilter),
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
  const title = ({
    teams: "Team Stats",
    players: "Player Stats",
    standings: "Season Standings",
    lifetimeTeams: "Lifetime Team Stats",
    lifetimePlayers: "Lifetime Player Stats",
    awards: "Archives",
    schedule: "Schedule",
    kitchen: "Selena's Kitchen",
    teamInfo: "Team Info",
    yourKitchen: "Your Kitchen",
  })[state.view];
  if (["teams", "players", "standings", "schedule"].includes(state.view)) {
    if (state.season === "S5") return `${s5DashboardPrefix()} ${title}`;
    if (state.season === "S6") return `${s6DashboardPrefix()} ${title}`;
  }
  return title;
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
  .filter((award) => state.awardFilter === "All" || award.award === baseAwardName(state.awardFilter))
  .filter((award) => state.awardSeasonFilter === "All" || award.season === state.awardSeasonFilter)
  .map((award) => ({
    season: award.season,
    award: awardDisplayName(award),
    awardKey: award.award,
    winnerText: award.winners.length ? award.winners.map((winner) => displayName(winner, "name")).join(", ") : "N/A",
    team: formattedAwardTeam(award),
    amount: award.winners.length > 1 && !isNonRaceAwardName(award.award) ? "" : award.amount,
    perGameAmount: award.perGameAmount,
  }));
}

function worldCupArchiveRows() {
  return worldCupDefinitions().flatMap((definition) => definition.winners.map((player) => ({
    season: definition.season,
    award: definition.award,
    player,
    team: "Reef Donkey",
    amount: definition.amount || "Champion",
  })));
}

function recordArchiveRows() {
  return recordsArchiveEntries
    .filter((row) => row.era === state.recordEra)
    .filter((row) => row.scope === state.recordScope)
    .filter((row) => row.entity === state.recordEntity)
    .map(recordDisplayRow);
}

function recordDisplayRow(row) {
  const normalized = {
    ...row,
    record: recordDisplayName(row.record),
    holder: recordHolderDisplay(row.holder, row),
    team: recordTeamDisplay(row.team),
    season: recordSeasonDisplay(row.season),
  };
  if (row.entity === "teams") {
    const teamSource = recordTeamSource(row);
    const playerSource = recordTeamPlayerSource(row);
    normalized.holder = recordTeamDisplay(teamSource);
    normalized.team = recordTeamPlayersDisplay(teamSource, row, playerSource);
  }
  return normalized;
}

function recordDisplayName(record) {
  return String(record || "").replace(/\s+\([PT]\)$/i, "");
}

function recordSeasonDisplay(season) {
  return String(season || "")
    .split(",")
    .map((part) => part.trim())
    .map((part) => ({ I: "1", II: "2", III: "3", IV: "4", V: "5", VI: "6" })[part] || part)
    .join(", ");
}

function recordNameList(value, formatter = (name) => name) {
  return String(value || "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map(formatter)
    .join(", ");
}

function recordHolderDisplay(value, row) {
  return recordNameList(value, (name) => {
    const context = `${row.team || ""} ${row.holder || ""}`;
    if (name === "Seth") return "Ax1mov";
    if (name === "Garcia") return "Dukeofdope";
    if (name === "Kevin" && context.includes("Midwest Cornstars")) return "RoyalxRenegade";
    return name;
  });
}

function recordRosterDisplay(value, row) {
  if (String(value || "").trim() === "-") return "-";
  return recordNameList(recordHolderDisplay(value, row), (name) => displayName(name, "name"));
}

function recordTeamDisplay(value) {
  if (String(value || "").trim() === "-") return "-";
  return recordNameList(value, (name) => formatDisplayName(canonicalTeamName(name), "team"));
}

function recordTeamSource(row) {
  return row.scope === "game" ? row.team : row.holder;
}

function recordTeamPlayerSource(row) {
  return row.scope === "game" ? row.holder : row.team;
}

function recordTeamPlayersDisplay(teamSource, row, fallbackPlayers) {
  const teams = recordListParts(teamSource);
  if (!teams.length || teams.every((team) => team === "-")) return recordRosterDisplay(fallbackPlayers, row);
  const seasons = recordListParts(recordSeasonDisplay(row.season)).map((season) => `S${season}`);
  const resolved = teams.map((team, index) => {
    const season = recordSeasonForTeam(team, seasons, index);
    if (!/^S\d+$/.test(season)) return "";
    const roster = recordTeamRoster(canonicalTeamName(team), season);
    const playerText = roster.length ? roster.map((player) => displayName(player.name, "name")).join(", ") : "";
    if (!playerText) return "";
    return teams.length > 1 ? `${formatDisplayName(canonicalTeamName(team), "team")}: ${playerText}` : playerText;
  }).filter(Boolean);
  return resolved.length ? resolved.join("; ") : recordRosterDisplay(fallbackPlayers, row);
}

function recordTeamRoster(team, season) {
  const canonicalTeam = canonicalTeamName(team);
  const playerRows = [...data.players.filter((row) => row.season !== "S6"), ...s6StagePlayerRows("overall", "overall")]
    .filter((row) => row.season === season && (row.teams || []).map(canonicalTeamName).includes(canonicalTeam));
  if (playerRows.length) return playerRows.sort((a, b) => b.games - a.games || b.goals - a.goals);
  return teamRoster(canonicalTeam, season);
}

function recordListParts(value) {
  return String(value || "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

function recordSeasonForTeam(team, seasons, index) {
  if (seasons.length === 1) return seasons[0];
  const canonicalTeam = canonicalTeamName(team);
  const exactSeason = seasons.find((season) => recordTeamRoster(canonicalTeam, season).length);
  return exactSeason || seasons[Math.min(index, seasons.length - 1)] || "";
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

function milestoneArchiveRows() {
  return awardMilestoneRows()
    .filter((milestone) => state.milestoneFilter === "All" || milestone.label === state.milestoneFilter)
    .map((milestone) => ({
    label: `${fmt(milestone.threshold)} ${milestone.label}`,
    player: milestone.player,
    threshold: milestone.threshold,
    value: milestone.value,
  }));
}

function milestoneNames() {
  return ["All", ...new Set(awardMilestoneRows().map((milestone) => milestone.label))].sort((a, b) => {
    if (a === "All") return -1;
    if (b === "All") return 1;
    return a.localeCompare(b);
  });
}

function renderAwardFilters() {
  const awards = allAwardDefinitions();
  const awardNameOptions = awardNames();
  const awardSeasonOptions = awardSeasons();
  if (!awardNameOptions.includes(state.awardFilter)) state.awardFilter = "All";
  if (!awardSeasonOptions.includes(state.awardSeasonFilter)) state.awardSeasonFilter = "All";
  const counts = awards.reduce((acc, award) => {
    acc[award.award] = (acc[award.award] || 0) + 1;
    return acc;
  }, {});
  const seasonCounts = awards.reduce((acc, award) => {
    acc[award.season] = (acc[award.season] || 0) + 1;
    return acc;
  }, {});
  els.awardFilters.innerHTML = `
    <div class="awards-panel">
      <div class="awards-panel-head">
        <div>
          <h2>Archives</h2>
          <p>Review awards, milestones, records, and World Cup history, then sort the active table by any column.</p>
        </div>
      </div>
      <div class="archive-toggle" role="group" aria-label="Archive type">
        <button type="button" class="${state.archiveMode === "awards" ? "active" : ""}" data-archive-mode="awards">Awards</button>
        <button type="button" class="${state.archiveMode === "milestones" ? "active" : ""}" data-archive-mode="milestones">Milestones</button>
        <button type="button" class="${state.archiveMode === "records" ? "active" : ""}" data-archive-mode="records">Records</button>
        <button type="button" class="${state.archiveMode === "worldCups" ? "active" : ""}" data-archive-mode="worldCups">World Cup(s)</button>
      </div>
      ${state.archiveMode === "awards" ? `
      <h3>Season</h3>
      <div class="award-filter-grid award-season-grid">
        ${awardSeasonOptions.map((season) => `
          <button type="button" class="award-filter${state.awardSeasonFilter === season ? " active" : ""}" data-award-season-filter="${escapeHtml(season)}">
            <strong>${escapeHtml(season)}</strong>
            <span>${season === "All" ? awards.length : seasonCounts[season]} awards</span>
          </button>
        `).join("")}
      </div>
      <h3>Award</h3>
      <div class="award-filter-grid">
        ${awardNameOptions.map((award) => `
        <button type="button" class="award-filter${state.awardFilter === award ? " active" : ""}" data-award-filter="${escapeHtml(award)}">
            <strong>${awardLabelMarkup(award, "award-filter-icon")}</strong>
            <span>${award === "All" ? awards.length : counts[award]} entries</span>
          </button>
        `).join("")}
      </div>
      ` : state.archiveMode === "milestones" ? `
      <h3>Milestones</h3>
      <p>Career milestone archive across regular seasons.</p>
      <div class="award-filter-grid">
        ${milestoneNames().map((milestone) => `
          <button type="button" class="award-filter${state.milestoneFilter === milestone ? " active" : ""}" data-milestone-filter="${escapeHtml(milestone)}">
            <strong>${escapeHtml(milestone === "All" ? "All Milestones" : milestone)}</strong>
            <span>${milestone === "All" ? awardMilestoneRows().length : awardMilestoneRows().filter((row) => row.label === milestone).length} entries</span>
          </button>
        `).join("")}
      </div>
      ` : state.archiveMode === "records" ? `
      <h3>Era</h3>
      <div class="award-filter-grid record-filter-grid">
        ${[
          ["3s", "3's Era", "Current 3v3 record book"],
          ["2s", "2's Era", "Discontinued after Season I"],
        ].map(([era, label, detail]) => `
          <button type="button" class="award-filter${state.recordEra === era ? " active" : ""}" data-record-era="${era}">
            <strong>${escapeHtml(label)}</strong>
            <span>${escapeHtml(detail)}</span>
          </button>
        `).join("")}
      </div>
      <h3>Record Holder</h3>
      <div class="award-filter-grid record-filter-grid">
        ${[
          ["players", "Players", "Individual records"],
          ["teams", "Teams", "Team records"],
        ].map(([entity, label, detail]) => `
          <button type="button" class="award-filter${state.recordEntity === entity ? " active" : ""}" data-record-entity="${entity}">
            <strong>${escapeHtml(label)}</strong>
            <span>${escapeHtml(detail)}</span>
          </button>
        `).join("")}
      </div>
      <h3>Record Type</h3>
      <div class="award-filter-grid record-filter-grid">
        ${[
          ["season", "Single Season", "Full-season record holders"],
          ["game", "Single Game", "Best single-game marks"],
        ].map(([scope, label, detail]) => `
          <button type="button" class="award-filter${state.recordScope === scope ? " active" : ""}" data-record-scope="${scope}">
            <strong>${escapeHtml(label)}</strong>
            <span>${escapeHtml(detail)}</span>
          </button>
        `).join("")}
      </div>
      <p class="record-era-note">${state.recordEra === "2s" ? "*** 2's Era discontinued after Season I" : "3's Era records include seasons II and later."}</p>
      ` : `
      <h3>World Cup(s)</h3>
      <p>World Cup champions are tracked separately from season awards.</p>
      <div class="award-filter-grid award-season-grid">
        ${worldCupDefinitions().map((cup) => `
          <button type="button" class="award-filter active" disabled>
            <strong>${escapeHtml(cup.season)}</strong>
            <span>${cup.winners.length} champions</span>
          </button>
        `).join("")}
      </div>
      `}
    </div>
  `;
  els.awardFilters.classList.remove("hidden");
}

function teamSeasonRow(team, season) {
  if (season === "S6") return s6StageTeamRows(state.s6Stage, "overall").find((row) => row.name === team);
  if (season === "S5" && state.s5Stage === "swiss") return null;
  return data.teams.find((row) => row.name === team && row.season === season);
}

function decorateRosterCareerHighs(rows) {
  const allPlayerSeasons = regularPlayerSeasonRows();
  return rows.map((row) => {
    const highs = new Set();
    const leagueLeaders = new Set();
    const gtrlsRecords = new Set();
    const seasons = playerCareer(row.name);
    playerCareerHighStats.forEach((stat) => {
      const max = Math.max(...seasons.map((season) => Number(season[stat]) || 0));
      if ((Number(row[stat]) || 0) === max && max > 0) highs.add(stat);
      const leaders = seasonLeaders(row.season, stat);
      if (leaders[0] && row[stat] === leaders[0][stat]) leagueLeaders.add(stat);
      const record = Math.max(...allPlayerSeasons.filter((season) => typeof season[stat] === "number" && !isUnavailableValue(season, stat)).map((season) => season[stat]), 0);
      if (record > 0 && row[stat] === record) gtrlsRecords.add(stat);
    });
    return { ...row, __careerHighs: highs, __leagueLeaders: leagueLeaders, __gtrlsRecords: gtrlsRecords };
  });
}

function detailContext() {
  if (state.page.type === "team") {
    const stageLabel = activeStageLabel(state.page.season);
    const seasonLabel = state.page.season === "Lifetime" ? "All seasons" : `${state.page.season}${stageLabel ? ` ${stageLabel}` : ""}`;
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
    const stageLabel = activeStageLabel();
    return {
      eyebrow: stageLabel ? `Player career / ${state.season} ${stageLabel}` : "Player career",
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

  if (state.page.type === "scheduleSeries") {
    const stage = scheduleStageLabel(state.page.stage);
    const context = [state.page.season, stage, state.page.pool, state.page.round].filter(Boolean).join(" / ");
    const title = [state.page.team, state.page.result, state.page.opponent].filter(Boolean).join(" ");
    return {
      eyebrow: context || "Series detail",
      title: title || "Series detail",
      columns: scheduleSeriesColumns,
      rows: scheduleSeriesRows(state.page),
      tableTitle: "Series Games",
      action: (row) => row.gameId ? ({
        type: "scheduleGame",
        season: state.page.season,
        stage: state.page.stage,
        pool: state.page.pool,
        round: state.page.round,
        team: state.page.team,
        result: state.page.result,
        opponent: state.page.opponent,
        winner: state.page.winner,
        game: row.game,
        gameId: row.gameId,
      }) : null,
    };
  }

  if (state.page.type === "scheduleGame") {
    const game = scheduleGameData(state.page);
    const score = game ? gameScoreText(game, state.page.team, state.page.opponent) : state.page.result;
    return {
      eyebrow: [state.page.season, scheduleStageLabel(state.page.stage), state.page.round].filter(Boolean).join(" / ") || "Game detail",
      title: game ? `${game.game}: ${state.page.team} ${score} ${state.page.opponent}` : "Game detail",
      columns: scheduleGamePlayerColumns,
      rows: scheduleGamePlayerRows(state.page),
      tableTitle: "Player Game Stats",
      action: (row) => row.name ? ({ type: "player", player: row.name }) : null,
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
  if (state.view === "awards") {
    if (state.archiveMode === "milestones") return row.player ? { type: "player", player: row.player } : null;
    if (state.archiveMode === "worldCups") return row.player ? { type: "player", player: row.player } : null;
    if (state.archiveMode === "records") return null;
    return isNonRaceAwardName(row.awardKey || row.award) ? null : { type: "awardRace", award: row.awardKey || row.award, season: row.season };
  }
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
  els.excludeTwosEra.checked = state.excludeTwosEra;
  els.excludeThreesEra.checked = state.excludeThreesEra;
  const stagedViews = ["teams", "players", "standings", "schedule"];
  const showS6Stage = selected === "S6" && state.seasonPhase === "regular" && stagedViews.includes(navViewForState());
  const showS5Stage = selected === "S5" && state.seasonPhase === "regular" && stagedViews.includes(navViewForState());
  const inDetail = state.page.type !== "dashboard";
  els.s5StageControl.classList.toggle("hidden", !showS5Stage);
  els.s5StageControl.querySelectorAll("[data-s5-stage]").forEach((button) => {
    button.classList.toggle("active", button.dataset.s5Stage === state.s5Stage);
  });
  els.s6StageControl.classList.toggle("hidden", !showS6Stage);
  els.s6StageControl.querySelectorAll("[data-s6-stage]").forEach((button) => {
    button.classList.toggle("active", button.dataset.s6Stage === state.s6Stage);
  });
  const showS6Pool = !inDetail && showS6Stage && state.s6Stage !== "swiss";
  const showS5Pool = !inDetail && showS5Stage && ["split1", "split2"].includes(state.s5Stage);
  els.s6PoolControl.classList.toggle("hidden", !(showS6Pool || showS5Pool));
  const poolLabel = els.s6PoolControl.querySelector("span");
  if (poolLabel) poolLabel.textContent = showS5Pool ? `${s5StageLabel()} Filter` : "Group Stage Filter";
  els.s6PoolControl.querySelectorAll("[data-s6-pool]").forEach((button) => {
    const activePool = showS5Pool ? state.s5Pool : state.s6Pool;
    button.classList.toggle("active", button.dataset.s6Pool === activePool);
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
  els.excludeThreesControl.classList.toggle("hidden", !isLifetimeView());
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

function awardTeamForWinner(definition, index) {
  if (Array.isArray(definition.teamList)) return definition.teamList[index] || "";
  const team = String(definition.team || "");
  if (definition.winners?.length > 1 && team.includes(",")) {
    const teams = team.split(",").map((item) => item.trim()).filter(Boolean);
    if (teams.length === definition.winners.length) return teams[index] || "";
  }
  return team;
}

function teamAwards(teamName, season) {
  if (!/^S\d+$/.test(String(season)) || season === "S6") return [];
  const targetTeam = canonicalTeamName(teamName);
  return allAwardDefinitions().flatMap((definition) => {
    if (definition.season !== season) return [];
    return (definition.winners || []).flatMap((player, index) => {
      const awardTeam = awardTeamForWinner(definition, index);
      if (canonicalTeamName(awardTeam) !== targetTeam) return [];
      return [{
        award: awardDisplayName(definition),
        player,
        season: definition.season,
        amount: definition.winners.length > 1 && !isNonRaceAwardName(definition.award) ? "" : definition.amount,
        perGameAmount: Array.isArray(definition.perGameList) ? definition.perGameList[index] : definition.perGameAmount,
      }];
    });
  });
}

const playerMilestoneDefinitions = [
  ["score", "Points", [10000, 50000, 100000]],
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
  "S2|EPSTEIN'S WAITLIST": "assets/team-logos/s2/epsteins-waitlist.png",
  "S2|GRAVY STAIN BOYS": "assets/team-logos/s2/gravy-stain-boys.png",
  "S2|MEGAWATT": "assets/team-logos/s2/megawatt.png",
  "S2|ROUGH SAX": "assets/team-logos/s2/rough-sax.png",
  "S2|SMOOTH JIZZ": "assets/team-logos/s2/smooth-jizz.png",
  "S2|WIN-DIXIES": "assets/team-logos/s2/win-dixies.png",
  "S3|COOL": "assets/team-logos/s3/cool.png",
  "S3|DEAD IN THE WATER": "assets/team-logos/s3/dead-in-the-water.png",
  "S3|MIDWEST CORNSTARS": "assets/team-logos/s3/midwest-cornstars.png",
  "S3|ORANGE CAT BEHAVIOR": "assets/team-logos/s3/orange-cat-behavior.png",
  "S3|RED ROCKETS SC": "assets/team-logos/s3/red-rockets-sc.png",
  "S3|SYNDICATE O' SCALLYWAGS": "assets/team-logos/s3/syndicate-o-scallywags.png",
  "S3|THE DONALD BUMPS": "assets/team-logos/s3/the-donald-bumps.png",
  "S3|THE HONKERS": "assets/team-logos/s3/the-honkers.png",
  "S3|THE LAMPLIGHTERS": "assets/team-logos/s3/the-lamplighters.png",
  "S3|WAVE CRASH": "assets/team-logos/s3/wave-crash.png",
  "S4|Bean Bandits": "assets/team-logos/s4/bean-bandits.png",
  "S4|Brock & The Brockettes": "assets/team-logos/s4/brock-the-brockettes.png",
  "S4|Cock N' Load": "assets/team-logos/s4/cock-n-load.png",
  "S4|Cucksirs": "assets/team-logos/s4/cucksirs.png",
  "S4|Open Net A-Miss-Ianados": "assets/team-logos/s4/open-net-a-miss-ianados.png",
  "S4|Passing's 4 Wimps SC": "assets/team-logos/s4/passings-4-wimps-sc.png",
  "S4|Stinky Pinkies": "assets/team-logos/s4/stinky-pinkies.png",
  "S4|Sweaty Sweepers": "assets/team-logos/s4/sweaty-sweepers.png",
  "S4|Team Kawaii": "assets/team-logos/s4/team-kawaii.png",
  "S4|Team ZAZ": "assets/team-logos/s4/team-zaz.png",
  "S4|The Autisticats": "assets/team-logos/s4/the-autisticats.png",
  "S4|Three Inch Fury": "assets/team-logos/s4/three-inch-fury.png",
  "S4|Tire Benders": "assets/team-logos/s4/tire-benders.png",
  "S5|BBB": "assets/team-logos/s5/bird-bath-bombers.png",
  "S5|BMM": "assets/team-logos/s5/big-musty-milkers.png",
  "S5|D' N' THE V'S": "assets/team-logos/s5/d-n-the-vs.png",
  "S5|DANGER PINGS": "assets/team-logos/s5/danger-pings.png",
  "S5|MILK BEFORE CEREAL": "assets/team-logos/s5/milk-before-cereal.png",
  "S5|PITCH PIRATES": "assets/team-logos/s5/pitch-pirates.png",
  "S5|THE HORNETS": "assets/team-logos/s5/the-hornets.png",
  "S5|TRIPLE SCOOP": "assets/team-logos/s5/triple-scoop.png",
  "S5|WEENIE HUT JRS": "assets/team-logos/s5/weenie-hut-jrs.png",
  "S5|WOULDABEENDOPE": "assets/team-logos/s5/wouldabeendope.png",
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
  C1: { hex: "#f7a77f", name: "Light Orange" },
  C4: { hex: "#ff4d00", name: "Orange" },
  B3: { hex: "#ef3544", name: "Red" },
  C3: { hex: "#ff6428", name: "Orange" },
  D4: { hex: "#d89416", name: "Tan" },
  D6: { hex: "#694100", name: "Brown" },
  E3: { hex: "#d8ef31", name: "Yellow" },
  E4: { hex: "#b8dc0b", name: "Yellow" },
  G3: { hex: "#20dd38", name: "Green" },
  G4: { hex: "#00c92d", name: "Green" },
  G6: { hex: "#075900", name: "Dark Green" },
  H4: { hex: "#00dd72", name: "Green" },
  F7: { hex: "#073b18", name: "Dark Green" },
  I3: { hex: "#2ec2e6", name: "Aqua" },
  J2: { hex: "#4a96ed", name: "Light Blue" },
  K5: { hex: "#17269f", name: "Navy" },
  K6: { hex: "#15166d", name: "Purple" },
  L1: { hex: "#9b7be8", name: "Lavender" },
  L3: { hex: "#6d2ce8", name: "Purple" },
  L4: { hex: "#6200dc", name: "Purple" },
  L5: { hex: "#3d1398", name: "Purple" },
  M4: { hex: "#b900df", name: "Purple" },
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

function teamThemeAssetFor(teamName, season) {
  const seasonName = baseSeasonName(season);
  const exact = teamPageThemeAssets[`${seasonName}|${teamName}`];
  if (exact) return exact;
  const targetKey = aliasKey(teamName);
  const match = Object.entries(teamPageThemeAssets)
    .find(([key]) => {
      const [assetSeason, assetTeam] = key.split("|");
      return assetSeason === seasonName && aliasKey(assetTeam) === targetKey;
    });
  return match?.[1] || "";
}

function teamLogoFor(teamName, season) {
  return teamThemeAssetFor(teamName, season);
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
  const logo = teamThemeAssetFor(state.page.team, state.page.season);
  if (!logo) return null;
  const info = teamInfoFor(state.page.team, state.page.season);
  const primary = rocketLeagueColor(info?.primary) || { code: "", name: "Team color", hex: "#32e8ff" };
  const secondary = rocketLeagueColor(info?.secondary) || { code: "", name: "Accent", hex: "#ff4fc3" };
  return {
    primary,
    secondary,
    primaryReadable: readableTeamAccent(primary.hex),
    secondaryReadable: readableTeamAccent(secondary.hex),
    secondaryText: contrastText(readableTeamAccent(secondary.hex)),
    logo,
  };
}

const teamPageBackgrounds = {
  "S6|Best Friends Club": "assets/backgrounds/best-friends-club.png?v=s6-backgrounds-20260629",
  "S6|Hook Line & Blinker": "assets/backgrounds/hook-line-blinker.png?v=s6-backgrounds-20260629",
  "S6|Crossbar Cartel": "assets/backgrounds/crossbar-cartel.png?v=s6-backgrounds-20260629",
  "S6|Ball Chasin & Sauce Tastin": "assets/backgrounds/ball-chasin.png?v=s6-backgrounds-20260629",
  "S6|Spirit Airlines": "assets/backgrounds/spirit-airlines.png?v=s6-backgrounds-20260629",
  "S6|The Cox": "assets/backgrounds/the-cox.png?v=s6-backgrounds-20260629",
  "S6|Past Our Prime": "assets/backgrounds/past-our-prime.png?v=s6-backgrounds-20260629",
  "S6|Quack Wok": "assets/backgrounds/quack-wok.png?v=s6-backgrounds-20260629",
  "S6|Giga's In Paris": "assets/backgrounds/gigas-in-paris.png?v=s6-backgrounds-20260629",
  "S6|Deceptitards": "assets/backgrounds/deceptitards.png?v=s6-backgrounds-20260629",
  "S6|Supernova Abyss": "assets/backgrounds/supernova-abyss.png?v=s6-backgrounds-20260629",
  "S6|ESC": "assets/backgrounds/esc.png?v=s6-backgrounds-20260629",
};

function teamPageBackgroundFor(teamName, season) {
  return teamPageBackgrounds[`${season}|${teamName}`] || "";
}

function applyTeamPageTheme() {
  const theme = activeTeamPageTheme();
  document.body.classList.toggle("team-page-themed", !!theme);
  const teamBackground = state.page.type === "team" ? teamPageBackgroundFor(state.page.team, state.page.season) : "";
  document.body.classList.toggle("team-page-background", !!teamBackground);
  ["--team-primary", "--team-secondary", "--team-primary-readable", "--team-secondary-readable", "--team-secondary-text", "--team-page-background"]
    .forEach((property) => document.body.style.removeProperty(property));
  els.detailTeamLogo.classList.toggle("hidden", !theme?.logo);
  els.detailTeamLogo.src = theme?.logo || "";
  els.detailTeamLogo.alt = theme?.logo ? `${state.page.team} logo` : "";
  if (teamBackground) document.body.style.setProperty("--team-page-background", `url("${teamBackground}")`);
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
  if (state.page.type === "scheduleSeries") {
    const uploaded = scheduleSeriesData(state.page);
    if (state.page.preMatchOnly && !uploaded) {
      els.detailExtras.innerHTML = matchupComparisonMarkup(state.page);
    } else {
      els.detailExtras.innerHTML = uploaded
        ? `${seriesMvpMarkup(uploaded)}${seriesTeamSummaryMarkup(uploaded)}${seriesPlayerSectionsMarkup(uploaded)}${scheduleSeriesGamesMarkup(state.page)}${matchupPreviewToggleMarkup()}${state.showMatchupPreview ? matchupComparisonMarkup(state.page) : ""}`
        : `${scheduleSeriesGamesMarkup(state.page)}${matchupPreviewToggleMarkup()}${state.showMatchupPreview ? matchupComparisonMarkup(state.page) : ""}`;
    }
    els.detailExtras.classList.toggle("hidden", !els.detailExtras.innerHTML.trim());
    return;
  }

  if (state.page.type === "scheduleGame") {
    els.detailExtras.innerHTML = `${gameTeamSummaryMarkup(state.page)}${scheduleGamePlayerSectionsMarkup(state.page)}`;
    els.detailExtras.classList.toggle("hidden", !els.detailExtras.innerHTML.trim());
    return;
  }

  if (state.page.type === "playoffSeries") {
    els.detailExtras.classList.add("hidden");
    els.detailExtras.innerHTML = "";
    return;
  }

  if (state.page.type === "team") {
    const info = teamInfoFor(state.page.team, state.page.season);
    const draft = draftRowForTeam(state.page.team, state.page.season);
    const pageTheme = activeTeamPageTheme();
    const canShowSchedule = state.page.season && state.page.season !== "Lifetime";
    const awards = teamAwards(state.page.team, state.page.season);
    if (!info && !draft && !canShowSchedule) {
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
              <article class="team-color-card" style="--swatch:${escapeHtml(pageTheme.primary.hex)}"><span>Primary${pageTheme.primary.code ? ` - ${escapeHtml(pageTheme.primary.code)}` : ""}</span><strong><i></i>${escapeHtml(pageTheme.primary.name)}</strong></article>
              <article class="team-color-card" style="--swatch:${escapeHtml(pageTheme.secondary.hex)}"><span>Secondary${pageTheme.secondary.code ? ` - ${escapeHtml(pageTheme.secondary.code)}` : ""}</span><strong><i></i>${escapeHtml(pageTheme.secondary.name)}</strong></article>
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
        ${awards.length ? `<section>
          <h2>Awards</h2>
          <div class="award-list">
            ${awards.map((award) => `
              <article class="award-card">
                <strong>${awardLabelMarkup(award.award, "award-card-icon")}</strong>
                <span>${escapeHtml(displayName(award.player, "name"))}</span>
                <small>${award.amount ? `Amount: ${escapeHtml(award.amount)}` : ""}${award.perGameAmount ? `${award.amount ? " / " : ""}Per Game: ${escapeHtml(award.perGameAmount)}` : ""}</small>
              </article>
            `).join("")}
          </div>
        </section>` : ""}
        ${canShowSchedule ? `<section>
          <h2>Schedule</h2>
          <div class="compact-stat-list">
            <button type="button" data-action="${encodeURIComponent(JSON.stringify({ type: "schedule", season: state.page.season, team: state.page.team }))}">
              <strong>View ${escapeHtml(displayName(state.page.team, "team"))} Schedule</strong>
              <span>${escapeHtml(state.page.season)}</span>
            </button>
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
          <strong>${awardLabelMarkup(award.award, "award-card-icon")}</strong>
          <span>${escapeHtml(award.season)} - ${escapeHtml(award.team)}</span>
          <small>${award.amount ? `Amount: ${escapeHtml(award.amount)}` : ""}${award.perGameAmount ? `${award.amount ? " / " : ""}Per Game: ${escapeHtml(award.perGameAmount)}` : ""}</small>
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
  els.playoffStats.classList.add("hidden");
  els.playoffStats.innerHTML = "";
  return;
  if (state.page.type !== "dashboard" || isLifetimeView() || state.view === "awards" || state.view === "kitchen" || state.season === "All" || isPlayoffSeason(state.season)) {
    els.playoffStats.classList.add("hidden");
    els.playoffStats.innerHTML = "";
    return;
  }
  const selectedPlayoffSeason = state.season === "All" ? "" : `${state.season} Playoffs`;
  const manualPlayoffs = (data.manualHistory?.playoffs || []).filter((row) => (!selectedPlayoffSeason || row.season === selectedPlayoffSeason) && row.round !== "Championship Game");
  if (!manualPlayoffs.length) {
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
  const content = playoffBracketHtml;
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
  if (state.view === "schedule" && state.page.type === "dashboard") {
    return columns.filter(([key]) => key !== "note" || columnHasPageData(rows, key));
  }
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
  table.classList.toggle("award-history-table", title === "Awards Archive" || title === "Milestones Archive");
  table.classList.toggle("records-archive-table", title === "Records Archive");
  table.classList.toggle("world-cup-table", title === "World Cup Archive");
  table.classList.toggle("playoff-bracket-table", title.includes("Bracket") || title.includes("Championship Games"));
  table.classList.toggle("award-race-table", title === "Contenders");
  table.classList.toggle("schedule-table", state.view === "schedule" && state.page.type === "dashboard");
  table.classList.toggle("series-games-table", state.view === "schedule" && state.page.type === "scheduleSeries");
  table.classList.toggle("game-player-table", state.view === "schedule" && state.page.type === "scheduleGame");
  els.head.closest(".table-wrap").classList.remove("leader-card-wrap");
  els.tableTitle.textContent = title;
  els.rowCount.textContent = `${rows.length} ${rows.length === 1 ? "row" : "rows"}`;
  renderTableLegend(rows, visibleColumns);
  els.head.innerHTML = `<tr>${visibleColumns.map(([key, label]) => `
    <th data-sort="${key}" class="col-${key}${state.sortKey === key ? ` sorted-column` : ""}">${label}${state.sortKey === key ? (state.sortDir === "asc" ? " ^" : " v") : ""}</th>
  `).join("")}</tr>`;
  els.body.innerHTML = rows.map((row) => {
    const action = rowAction ? rowAction(row) : null;
    const rowClasses = [];
    if (action) rowClasses.push("clickable");
    if (state.view === "schedule" && /locked/i.test(String(row.note || ""))) rowClasses.push("schedule-locked-row");
    const attrs = `${rowClasses.length ? ` class="${rowClasses.join(" ")}"` : ""}${action ? ` data-action="${encodeURIComponent(JSON.stringify(action))}"` : ""}`;
    return `<tr${attrs}>${visibleColumns.map(([key]) => {
    const percent = key === "winPct" || key === "matchWinPct" || key === "gameWinPct" || key === "shootingPct" || key === "missPct" || key === "teamSaveRate" || key === "opponentShootingPct";
    const isScheduleRow = state.view === "schedule";
    const isRecordsArchive = state.view === "awards" && state.archiveMode === "records";
    const nameKeys = new Set(["name", "team", "opponent", "player", "teamA", "teamB", "captain", "pick1", "pick2"]);
    const isPlayoffTeam = (key === "teamA" || key === "teamB") && row.round && row.teamA && row.teamB;
    const isTeamNameCell = key === "teamA" || key === "teamB" || key === "team" || (key === "name" && (isTeamView() || state.view === "standings" || state.yourKitchenEntity === "teams")) || (isScheduleRow && key === "opponent");
    const raw = nameKeys.has(key) && !isRecordsArchive ? displayName(row[key], isTeamNameCell ? "team" : "name") : row[key];
    let value = isUnavailableValue(row, key) ? "n/a" : (key === "season" ? `<span class="pill">${escapeHtml(raw)}</span>` : escapeHtml(fmtStat(raw, key, percent ? "%" : "")));
    if (key === "name" && !isTeamNameCell) value += playerAwardFootnoteMarkup(row.name, row.season);
    if (key === "name" && state.view === "standings" && row.clinchMark) {
      value += ` <span class="clinch-suffix">- ${escapeHtml(row.clinchMark)}</span>`;
    }
    if (key === "season" && state.page.type === "player" && !row.__isCareer) value += playerAwardFootnoteMarkup(state.page.player, row.season);
    if (key === "award") value = awardLabelMarkup(String(raw || ""), "award-table-icon");
    if (isPlayoffTeam) value = playoffTeamMarkup(row, key);
    if (isScheduleRow && key === "stage") value = escapeHtml(scheduleStageLabel(row.stage));
    if (isScheduleRow && (key === "team" || key === "opponent")) value = scheduleTeamCell(row, key);
    if (isScheduleRow && key === "result") value = scheduleResultMarkup(row);
    if (isScheduleRow && key === "vod") value = scheduleVodMarkup(row);
    if (isScheduleRow && key === "note") value = scheduleNoteMarkup(row);
    if (key === "teamsText") value = teamTextLinks(row);
    if (isScheduleRow && value === "") value = `<span class="schedule-empty">-</span>`;
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
  if (hasLeagueLeader) items.push(`<span><strong class="season-leader">Pink</strong> led GTRLS</span>`);
  if (hasCareerHigh) items.push(`<span><em class="career-high">Italic</em> career high</span>`);
  if (hasGtrlsRecord) items.push(`<span><sup class="season-record">*</sup> GTRLS record</span>`);
  els.tableLegend.innerHTML = items.join("");
  els.tableLegend.classList.toggle("hidden", items.length === 0);
}

function renderStandingsRules() {
  if (!els.standingsRules) return;
  const showPoolRules = state.view === "standings"
    && state.page.type === "dashboard"
    && ((state.season === "S6" && state.s6Stage === "group")
      || (state.season === "S5" && ["split1", "split2"].includes(state.s5Stage)));
  if (!showPoolRules) {
    els.standingsRules.classList.add("hidden");
    els.standingsRules.innerHTML = "";
    return;
  }
  const clinchedRows = standingsRows().filter((row) => row.clinchMark);
  els.standingsRules.classList.remove("hidden");
  els.standingsRules.innerHTML = `
    <div class="standings-rule-card">
      <strong>Pool Tiebreaks</strong>
      <span>${poolTiebreakRules.map((rule, index) => `${index + 1}. ${escapeHtml(rule)}`).join(" | ")}</span>
      ${clinchedRows.length ? `<small>${clinchRuleText(clinchedRows)}</small>` : ""}
    </div>
  `;
}

function clinchRuleText(rows) {
  return rows.map((row) => `${escapeHtml(displayName(row.name, "team"))} <span class="clinch-suffix">- ${escapeHtml(row.clinchMark)}</span> won the ${escapeHtml(row.pool || "pool")} Pool for the split`).join(" | ");
}

function render() {
  const inDetail = state.page.type !== "dashboard";
  if (state.view === "kitchen") state.analyticsMode = "selena";
  if (state.view === "yourKitchen") state.analyticsMode = "your";
  document.body.classList.toggle("main-page-background", state.page.type !== "team");
  renderSeasonOptions();
  syncTabButtons();
  applyTeamPageTheme();
  els.detailBar.classList.toggle("hidden", !inDetail);
  renderStandingsRules();
  els.excludeTwosControl.classList.toggle("hidden", !isLifetimeView());
  els.excludeThreesControl.classList.toggle("hidden", !isLifetimeView());
  document.querySelector(".kpis").classList.toggle("hidden", inDetail || isPlayoffSeason(state.season) || state.season === "World Cup" || !["teams", "players", "lifetimeTeams", "lifetimePlayers"].includes(state.view));
  document.querySelector(".figures").classList.add("hidden");
  document.querySelector(".leaderboards").classList.add("hidden");
  els.tableShell.classList.remove("hidden");
  els.kitchenPanel.classList.add("hidden");
  els.kitchenPanel.innerHTML = "";
  els.homePanel.classList.add("hidden");
  els.homePanel.innerHTML = "";
  els.teamInfoPanel.classList.add("hidden");
  els.teamInfoPanel.innerHTML = "";
  els.yourKitchenPanel.classList.add("hidden");
  els.yourKitchenPanel.innerHTML = "";
  const showAnalyticsToggle = !inDetail && (state.view === "kitchen" || state.view === "yourKitchen");
  els.analyticsModeControl.classList.toggle("hidden", !showAnalyticsToggle);
  els.analyticsModeControl.querySelectorAll("[data-analytics-mode]").forEach((button) => button.classList.toggle("active", button.dataset.analyticsMode === state.analyticsMode));
  els.awardFilters.classList.add("hidden");
  els.awardFilters.innerHTML = "";
  els.scheduleFilters.classList.add("hidden");
  els.scheduleFilters.innerHTML = "";
  els.playerFilters.classList.add("hidden");
  els.playerFilters.innerHTML = "";
  els.csvImportPanel.classList.add("hidden");
  els.csvImportPanel.innerHTML = "";
  els.detailActions.innerHTML = "";
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
    if (state.page.type === "draft") {
      els.detailActions.innerHTML = youtubeLogoLink(draftVodLinks.get(state.page.season), "draft-vod-link", `${state.page.season} draft video`);
    }
    renderTable(detail.rows, detail.columns, detail.tableTitle, detail.action);
    if (state.page.type === "scheduleSeries") els.tableShell.classList.add("hidden");
    if (state.page.type === "scheduleGame") els.tableShell.classList.add("hidden");
    renderDetailExtras();
    return;
  }

  renderDetailExtras();

  if (state.view === "home") {
    renderKpis([]);
    els.tableShell.classList.add("hidden");
    els.playoffStats.classList.add("hidden");
    els.playoffStats.innerHTML = "";
    renderHomePage();
    return;
  }

  if (state.view === "awards") {
    renderKpis([]);
    const archiveRows = state.archiveMode === "milestones"
      ? milestoneArchiveRows()
      : state.archiveMode === "records"
        ? recordArchiveRows()
        : state.archiveMode === "worldCups"
          ? worldCupArchiveRows()
          : awardHistoryRows();
    const archiveColumns = state.archiveMode === "milestones"
      ? milestoneArchiveColumns
      : state.archiveMode === "records"
        ? recordsArchiveColumns.map(([key, label]) => [key, key === "team" && state.recordEntity === "teams" ? "Players" : label])
        : state.archiveMode === "worldCups"
          ? worldCupArchiveColumns
          : awardHistoryColumns;
    const archiveTitle = state.archiveMode === "milestones"
      ? "Milestones Archive"
      : state.archiveMode === "records"
        ? "Records Archive"
        : state.archiveMode === "worldCups"
          ? "World Cup Archive"
          : "Awards Archive";
    renderTable(sortRows(archiveRows), archiveColumns, archiveTitle, dashboardAction);
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
    const title = state.season === "S5"
      ? `${s5DashboardPrefix()} Standings`
      : (state.season === "S6" ? `${s6DashboardPrefix()} Standings` : (state.season === "All" ? "All Season Standings" : `${state.season} Standings`));
    renderTable(sortRows(standingsRows()), standingsColumns, title, (row) => ({ type: "team", team: row.name, season: row.season }));
    renderPlayoffStats();
    return;
  }

  if (state.view === "schedule") {
    renderKpis([]);
    const title = state.season === "S5"
      ? `${s5DashboardPrefix()} Schedule`
      : (state.season === "S6" ? `${s6DashboardPrefix()} Schedule` : `${state.season} Schedule`);
    const rows = scheduleRows();
    renderScheduleFilters(rows);
    renderCsvImportPanel(rows);
    renderTable(filteredScheduleRows(rows), scheduleColumns, title, (row) => row.team && row.opponent ? ({
      type: "scheduleSeries",
      season: row.season,
      stage: row.stage,
      pool: row.pool,
      round: row.round,
      team: row.team,
      result: row.result,
      opponent: row.opponent,
      winner: row.winner,
    }) : null);
    renderPlayoffStats();
    return;
  }

  const rows = rowsForView();
  renderKpis(rows);
  renderPlayerFilters();
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
  if (state.season !== "S6") state.playerRoleFilter = "All";
  setDefaultStageForView();
  resetLifetimeEraFiltersIfNeeded();
  if (state.view === "standings") {
    state.sortKey = "standingsRank";
    state.sortDir = "asc";
  }
  if (state.view === "schedule") {
    state.sortKey = "season";
    state.sortDir = "asc";
  }
  if (state.season === "World Cup" && (state.view === "teams" || state.view === "players")) {
    state.view = "standings";
    state.sortKey = "standingsRank";
    state.sortDir = "asc";
  }
  render();
});

els.homeLogoButton.addEventListener("click", () => {
  state.page = { type: "dashboard" };
  state.view = "home";
  state.season = latestRegularSeason();
  state.seasonPhase = "regular";
  state.s6Stage = "overall";
  state.s6Pool = "overall";
  state.s5Pool = "overall";
  state.searchText = "";
  state.scheduleTeamFilter = "All";
  state.scheduleUnplayedOnly = false;
  state.sortKey = "wins";
  state.sortDir = "desc";
  els.searchInput.value = "";
  resetLifetimeEraFiltersIfNeeded();
  render();
});

function openPatchNotes() {
  els.patchNotesOverlay.classList.remove("hidden");
  els.patchNotesClose.focus();
}

function closePatchNotes() {
  els.patchNotesOverlay.classList.add("hidden");
  els.patchNotesButton.focus();
}

els.patchNotesButton.addEventListener("click", openPatchNotes);

els.patchNotesClose.addEventListener("click", closePatchNotes);

els.patchNotesOverlay.querySelector(".patch-notes-backdrop").addEventListener("click", closePatchNotes);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !els.patchNotesOverlay.classList.contains("hidden")) {
    closePatchNotes();
  }
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

els.s6StageControl.addEventListener("click", (event) => {
  const button = event.target.closest("[data-s6-stage]");
  if (!button) return;
  state.s6Stage = button.dataset.s6Stage;
  if (!preserveDetailOnStageChange()) state.page = { type: "dashboard" };
  state.sortKey = stagedSortKey();
  state.sortDir = stagedSortDir();
  render();
});

els.s5StageControl.addEventListener("click", (event) => {
  const button = event.target.closest("[data-s5-stage]");
  if (!button) return;
  state.s5Stage = button.dataset.s5Stage;
  if (!["split1", "split2"].includes(state.s5Stage)) state.s5Pool = "overall";
  if (!preserveDetailOnStageChange()) state.page = { type: "dashboard" };
  state.sortKey = stagedSortKey();
  state.sortDir = stagedSortDir();
  render();
});

els.s6PoolControl.addEventListener("click", (event) => {
  const button = event.target.closest("[data-s6-pool]");
  if (!button) return;
  if (state.season === "S5") state.s5Pool = button.dataset.s6Pool;
  else state.s6Pool = button.dataset.s6Pool;
  if (!preserveDetailOnStageChange()) state.page = { type: "dashboard" };
  state.sortKey = stagedSortKey();
  state.sortDir = stagedSortDir();
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

els.excludeThreesEra.addEventListener("change", (event) => {
  state.excludeThreesEra = event.target.checked;
  render();
});

els.scheduleFilters.addEventListener("change", (event) => {
  if (event.target.id === "scheduleTeamSelect") {
    state.scheduleTeamFilter = event.target.value;
    render();
    return;
  }
  if (event.target.id === "scheduleUnplayedOnly") {
    state.scheduleUnplayedOnly = event.target.checked;
    render();
  }
});

els.playerFilters.addEventListener("change", (event) => {
  if (event.target.id !== "playerRoleSelect") return;
  state.playerRoleFilter = event.target.value;
  render();
});

function readTextFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error || new Error("Unable to read file."));
    reader.readAsText(file);
  });
}

els.csvImportPanel.addEventListener("change", (event) => {
  if (event.target.id !== "csvImportSeries" || !event.target.value) return;
  const selected = JSON.parse(decodeURIComponent(event.target.value));
  const roundInput = els.csvImportPanel.querySelector("#csvImportRound");
  const homeInput = els.csvImportPanel.querySelector("#csvImportHome");
  const awayInput = els.csvImportPanel.querySelector("#csvImportAway");
  if (roundInput) roundInput.value = selected.round || "";
  if (homeInput) homeInput.value = displayName(selected.home, "team");
  if (awayInput) awayInput.value = displayName(selected.away, "team");
});

els.csvImportPanel.addEventListener("click", (event) => {
  if (!event.target.closest("[data-clear-csv-imports]")) return;
  importedReplaySeries.length = 0;
  localStorage.removeItem(importedReplayStorageKey);
  state.csvImportMessage = "Imported CSV layer cleared. Refresh the page to fully remove imported stat rows from the current session.";
  render();
});

els.csvImportPanel.addEventListener("submit", async (event) => {
  if (event.target.id !== "csvImportForm") return;
  event.preventDefault();
  const teamsFile = els.csvImportPanel.querySelector("#csvImportTeamsFile")?.files?.[0];
  const playersFile = els.csvImportPanel.querySelector("#csvImportPlayersFile")?.files?.[0];
  if (!teamsFile || !playersFile) {
    state.csvImportMessage = "Choose both a team CSV and a player CSV.";
    render();
    return;
  }
  const selectedValue = els.csvImportPanel.querySelector("#csvImportSeries")?.value;
  const selected = selectedValue ? JSON.parse(decodeURIComponent(selectedValue)) : {};
  const round = els.csvImportPanel.querySelector("#csvImportRound")?.value || selected.round || "Imported";
  const home = els.csvImportPanel.querySelector("#csvImportHome")?.value || selected.home;
  const away = els.csvImportPanel.querySelector("#csvImportAway")?.value || selected.away;
  try {
    state.csvImportBusy = true;
    state.csvImportMessage = "Importing CSV files...";
    render();
    const [teamsCsv, playersCsv] = await Promise.all([readTextFile(teamsFile), readTextFile(playersFile)]);
    const series = compactSeriesFromCsv({
      teamsCsv,
      playersCsv,
      season: selected.season || "S6",
      stage: selected.stage || "Swiss",
      round,
      home,
      away,
    });
    const accepted = applyImportedReplaySeries([series], { persist: true });
    const importedGames = accepted.reduce((sum, item) => sum + (item.games?.length || 0), 0);
    state.csvImportMessage = importedGames
      ? `Imported ${importedGames} new replay game${importedGames === 1 ? "" : "s"} for ${displayName(series.home, "team")} vs ${displayName(series.away, "team")}.`
      : "No new replay games imported because those replay IDs are already in the dashboard.";
  } catch (error) {
    state.csvImportMessage = error.message || "Unable to import those CSV files.";
  } finally {
    state.csvImportBusy = false;
    render();
  }
});

els.tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.page = { type: "dashboard" };
    const requestedView = button.dataset.view;
    resetCrossTabFilters();
    if (requestedView === "analytics") resetAnalyticsFilters();
    if (requestedView === "home") state.view = "home";
    else if (requestedView === "teams") state.view = els.seasonSelect.value === "Lifetime" ? "lifetimeTeams" : "teams";
    else if (requestedView === "players") state.view = els.seasonSelect.value === "Lifetime" ? "lifetimePlayers" : "players";
    else if (requestedView === "analytics") state.view = state.analyticsMode === "your" ? "yourKitchen" : "kitchen";
    else state.view = requestedView;
    setDefaultStageForView();
    if (!["teams", "players", "lifetimeTeams", "lifetimePlayers"].includes(state.view) && isLifetimeView()) {
      state.season = latestRegularSeason();
      state.seasonPhase = "regular";
    }
    if (state.season === "Lifetime" && !isLifetimeView()) {
      state.season = latestRegularSeason();
      state.seasonPhase = "regular";
    }
    resetLifetimeEraFiltersIfNeeded();
    setDefaultStageForView();
    state.sortKey = state.view === "home" ? "wins" : (state.view === "awards" || state.view === "kitchen" || state.view === "yourKitchen" || state.view === "schedule" ? "season" : (state.view === "standings" ? "standingsRank" : (isTeamView() ? "wins" : "goals")));
    state.sortDir = "desc";
    if (state.view === "standings" || state.view === "schedule") state.sortDir = "asc";
    render();
  });
});

els.analyticsModeControl.addEventListener("click", (event) => {
  const button = event.target.closest("[data-analytics-mode]");
  if (!button) return;
  state.analyticsMode = button.dataset.analyticsMode;
  state.view = state.analyticsMode === "your" ? "yourKitchen" : "kitchen";
  state.page = { type: "dashboard" };
  resetCrossTabFilters();
  resetAnalyticsFilters();
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
    if (!restoreContext(state.previousContext)) {
      state.page = { type: "dashboard" };
      state.sortKey = isTeamView() ? "wins" : "goals";
      state.sortDir = "desc";
    }
    state.previousContext = null;
  } else if (state.page.type === "scheduleSeries") {
    state.page = { type: "dashboard" };
    state.view = "schedule";
    state.sortKey = "season";
    state.sortDir = "asc";
  } else if (state.page.type === "scheduleGame") {
    state.page = {
      type: "scheduleSeries",
      season: state.page.season,
      stage: state.page.stage,
      pool: state.page.pool,
      round: state.page.round,
      team: state.page.team,
      result: state.page.result,
      opponent: state.page.opponent,
      winner: state.page.winner,
    };
    state.view = "schedule";
    state.sortKey = "game";
    state.sortDir = "asc";
  } else {
    state.page = { type: "dashboard" };
    state.sortKey = isTeamView() ? "wins" : "goals";
    state.sortDir = "desc";
  }
  render();
});

function handleDashboardAction(action) {
  if (action.type === "draft") state.previousContext = snapshotContext();
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
  } else if (action.type === "scheduleSeries") {
    state.sortKey = "game";
    state.sortDir = "asc";
    state.showMatchupPreview = !!action.preMatchOnly;
  } else if (action.type === "scheduleGame") {
    state.sortKey = "score";
    state.sortDir = "desc";
  } else if (action.type === "schedule") {
    state.page = { type: "dashboard" };
    state.view = "schedule";
    state.season = action.season;
    state.seasonPhase = "regular";
    setDefaultStageForView();
    state.scheduleTeamFilter = action.team || "All";
    state.sortKey = "season";
    state.sortDir = "asc";
  } else if (action.type === "view") {
    state.page = { type: "dashboard" };
    state.view = action.view;
    state.season = action.season || state.season;
    state.seasonPhase = "regular";
    setDefaultStageForView();
    state.sortKey = state.view === "standings" ? "standingsRank" : (isTeamView() ? "wins" : "goals");
    state.sortDir = state.view === "standings" ? "asc" : "desc";
  }
  render();
}

els.body.addEventListener("click", (event) => {
  if (event.target.closest("[data-vod-link]")) return;
  const row = event.target.closest("[data-action]");
  if (!row) return;
  handleDashboardAction(JSON.parse(decodeURIComponent(row.dataset.action)));
});

els.homePanel.addEventListener("click", (event) => {
  if (event.target.closest("[data-vod-link]")) return;
  const target = event.target.closest("[data-action]");
  if (!target) return;
  handleDashboardAction(JSON.parse(decodeURIComponent(target.dataset.action)));
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
  const action = JSON.parse(decodeURIComponent(target.dataset.action));
  if (action.type === "draft") state.previousContext = snapshotContext();
  state.page = action;
  state.searchText = "";
  els.searchInput.value = "";
  render();
});

els.playoffStats.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = JSON.parse(decodeURIComponent(target.dataset.action));
  if (action.type === "draft") state.previousContext = snapshotContext();
  state.page = action;
  render();
});

els.teamInfoPanel.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = JSON.parse(decodeURIComponent(target.dataset.action));
  if (action.type === "draft") state.previousContext = snapshotContext();
  state.page = action;
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

els.kitchenPanel.addEventListener("change", (event) => {
  if (event.target.id === "kitchenTeamFilter") {
    state.kitchenTeamFilter = event.target.value;
    state.kitchenSelectedPlayer = "";
    render();
  } else if (event.target.id === "kitchenRoleFilter") {
    state.kitchenRoleFilter = event.target.value;
    state.kitchenSelectedPlayer = "";
    render();
  }
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

els.kitchenPanel.addEventListener("pointerover", (event) => {
  const dot = event.target.closest(".kitchen-dot[data-kitchen-player]");
  if (!dot) return;
  updateKitchenSelection(dot.dataset.kitchenPlayer, { temporary: true });
});

els.kitchenPanel.addEventListener("pointerout", (event) => {
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
  const matchupToggle = event.target.closest("[data-toggle-matchup-preview]");
  if (matchupToggle) {
    state.showMatchupPreview = !state.showMatchupPreview;
    render();
    return;
  }
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
  const action = JSON.parse(decodeURIComponent(target.dataset.action));
  if (action.type === "draft") state.previousContext = snapshotContext();
  state.page = action;
  if (action.type === "draft") {
    state.sortKey = "draftOrder";
    state.sortDir = "asc";
  } else if (action.type === "player") {
    state.sortKey = "season";
    state.sortDir = "asc";
  } else if (action.type === "seasonLeaders") {
    state.sortKey = "stat";
    state.sortDir = "asc";
  } else if (action.type === "scheduleSeries") {
    state.sortKey = "game";
    state.sortDir = "asc";
    state.showMatchupPreview = false;
  } else if (action.type === "scheduleGame") {
    state.sortKey = "score";
    state.sortDir = "desc";
  } else if (action.type === "schedule") {
    state.view = "schedule";
    state.season = action.season;
    state.seasonPhase = "regular";
    setDefaultStageForView();
    state.scheduleTeamFilter = action.team || "All";
    state.page = { type: "dashboard" };
    state.sortKey = "season";
    state.sortDir = "asc";
  }
  render();
});

els.awardFilters.addEventListener("click", (event) => {
  const archiveMode = event.target.closest("[data-archive-mode]");
  if (archiveMode) {
    state.archiveMode = archiveMode.dataset.archiveMode;
    state.sortKey = state.archiveMode === "milestones" ? "label" : (state.archiveMode === "records" ? "record" : "season");
    state.sortDir = state.archiveMode === "milestones" || state.archiveMode === "records" ? "asc" : "desc";
    state.page = { type: "dashboard" };
    render();
    return;
  }
  const milestoneFilter = event.target.closest("[data-milestone-filter]");
  if (milestoneFilter) {
    state.milestoneFilter = milestoneFilter.dataset.milestoneFilter;
    state.page = { type: "dashboard" };
    render();
    return;
  }
  const recordEra = event.target.closest("[data-record-era]");
  const recordScope = event.target.closest("[data-record-scope]");
  const recordEntity = event.target.closest("[data-record-entity]");
  if (recordEra || recordScope || recordEntity) {
    if (recordEra) state.recordEra = recordEra.dataset.recordEra;
    if (recordScope) state.recordScope = recordScope.dataset.recordScope;
    if (recordEntity) state.recordEntity = recordEntity.dataset.recordEntity;
    state.sortKey = "record";
    state.sortDir = "asc";
    state.page = { type: "dashboard" };
    render();
    return;
  }
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
els.excludeThreesEra.checked = state.excludeThreesEra;
renderSeasonOptions();
render();
