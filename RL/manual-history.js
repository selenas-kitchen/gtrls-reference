(function () {
  const playerAliases = new Map([
    ["AXIMOV", "Ax1mov"],
    ["AXIM0V", "Ax1mov"],
    ["AX1MOV", "Ax1mov"],
    ["DIASTRIKO", "Ax1mov"],
    ["SETH", "Ax1mov"],
    ["EPONTIOUS", "EPo -_-"],
    ["THELAKEEFFEKT", "TheLakeEffekt"],
    ["THELAKEEFFEKT", "TheLakeEffekt"],
    ["SLAPSHOTS1324", "I_have_a_bag"],
    ["IHAVEABAG", "I_have_a_bag"],
    ["ATOWNSTEELERS", "AtownSteelers"],
    ["BROCK", "AtownSteelers"],
    ["DUKEOFDOPE7", "Dukeofdope7"],
    ["DIALCOWGS94", "dailcowgs94"],
    ["DAILCOWGS94", "dailcowgs94"],
    ["GTDAIL", "dailcowgs94"],
    ["DAIL", "dailcowgs94"],
    ["VAL3NOR", "Val-enor"],
    ["VALENOR", "Val-enor"],
    ["JAMES", "Val-enor"],
    ["LILHATEDONE", "LIL HATED ONE"],
    ["HATEDONE", "LIL HATED ONE"],
    ["HATED_ONE", "LIL HATED ONE"],
    ["MADJANITOR88", "MadJanitor88"],
    ["COALTRAINLLC", "CoalTrainLLC"],
    ["POOLNOODLE412", "PoolnoodlE_412"],
    ["SIRVANTZZZ", "Sir_vantzzz"],
    ["SELENAGOMEZ415", "selena."],
    ["SELENAGOMEZ", "selena."],
    ["SELENA", "selena."],
    ["SKITTLEZ", "SirSkittleZ"],
    ["JAR", "JulietAlphaRomeo"],
    ["WAXYSAUSAGE9", "MJD22-_-"],
    ["MERKWRM", "MerkWTM"],
    ["MERKWTM", "MerkWTM"],
    ["RAVENGLITCH", "Ravenglitch"],
    ["MADJANITOR", "MadJanitor88"],
    ["IMmABLURR", "IMMa_Blurr"],
    ["IMMABLURR", "IMMa_Blurr"],
    ["GOIG", "go1g_"],
    ["HENRYSPACE", "Henryspace_"],
    ["HENRYSPACE_", "Henryspace_"],
    ["WILDCHIP", "WildChip2567"],
    ["WILDCHIP2567", "WildChip2567"],
    ["GONSLINGER", "gonslinger"],
    ["KUHLBEANS", "Kuhlbeans"],
    ["KUHL", "Kuhlbeans"],
    ["CLAYTON", "gonslinger"],
    ["KEVIN", "RoyalxRenegade"],
    ["RYAN", "Original_6_Hawks"],
    ["AUSTIN", "Authurm19"],
    ["JOSH", "Joshhh_RL"],
  ]);

  const teamAliases = new Map([
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
    ["COOL", "COOL"],
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

  function key(value) {
    return String(value || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  }

  function player(name) {
    return playerAliases.get(key(name)) || String(name).trim();
  }

  function team(name) {
    return teamAliases.get(key(name)) || String(name).trim();
  }

  function record(text) {
    const match = String(text || "").match(/(\d+)\s*-\s*(\d+)/);
    return match ? [Number(match[1]), Number(match[2])] : [0, 0];
  }

  function leagueScore(extra, fallbackWins) {
    if (typeof extra.standingsPoints === "number") return extra.standingsPoints;
    const [matchWins] = record(extra.matchRecord || "");
    const wins = matchWins || Number(extra.wins ?? fallbackWins ?? 0);
    const sweeps = Number(extra.sweeps || 0);
    const gameFiveLosses = Number(extra.gameFiveLosses || 0);
    return (sweeps * 3) + (Math.max(0, wins - sweeps) * 2) + gameFiveLosses;
  }

  function teamRow(season, name, games, gameRecord, score, goals, goalsAgainst, assists, saves, shots, extra = {}) {
    const [wins, losses] = record(gameRecord);
    const [matchWins, matchLosses] = record(extra.matchRecord || "");
    return {
      season,
      name: team(name),
      games,
      gameWins: wins,
      gameLosses: losses,
      wins: Number(extra.wins ?? (matchWins || wins)),
      losses: Number(extra.losses ?? (matchLosses || losses)),
      standingsPoints: leagueScore(extra, wins),
      score,
      goals,
      assists,
      saves,
      shots,
      goalsConceded: goalsAgainst,
      shotsConceded: Number(extra.shotsConceded ?? 0),
      opponentSavesForced: 0,
      demosInflicted: 0,
      demosTaken: 0,
      amountCollected: 0,
      amountStolen: 0,
      totalDistance: 0,
      source: "manual",
      ...extra,
    };
  }

  function playerRow(season, teamName, name, games, gameRecord, score, goals, assists, saves, shots, extra = {}) {
    const [wins, losses] = record(gameRecord);
    return {
      season,
      name: player(name),
      teams: [team(teamName)],
      games,
      wins,
      losses,
      standingsPoints: 0,
      score,
      goals,
      assists,
      saves,
      shots,
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
      source: "manual",
      ...extra,
    };
  }

  function finalizeCommon(row) {
    const games = Math.max(1, row.games || 0);
    const matchTotal = Math.max(1, (row.wins || 0) + (row.losses || 0));
    const gameWins = typeof row.gameWins === "number" ? row.gameWins : row.wins;
    const gameLosses = typeof row.gameLosses === "number" ? row.gameLosses : row.losses;
    const gameTotal = Math.max(1, (gameWins || 0) + (gameLosses || 0));
    row.matchWinPct = Math.round(((row.wins || 0) / matchTotal) * 1000) / 10;
    row.gameWinPct = Math.round(((gameWins || 0) / gameTotal) * 1000) / 10;
    row.winPct = row.matchWinPct;
    row.avgScore = Math.round(((row.score || 0) / games) * 10) / 10;
    row.goalsPerGame = Math.round(((row.goals || 0) / games) * 100) / 100;
    row.assistsPerGame = Math.round(((row.assists || 0) / games) * 100) / 100;
    row.savesPerGame = Math.round(((row.saves || 0) / games) * 100) / 100;
    row.shotsPerGame = Math.round(((row.shots || 0) / games) * 100) / 100;
    row.shotsConcededPerGame = Math.round(((row.shotsConceded || 0) / games) * 100) / 100;
    row.goalsConcededPerGame = Math.round(((row.goalsConceded || 0) / games) * 100) / 100;
    const rawPer = (0.1 * (row.goals || 0)) + (0.05 * (row.assists || 0)) + ((2 / 30) * (row.saves || 0)) + (0.01 * (row.shots || 0));
    const calculatedPer = row.season === "S1" ? ((rawPer * (2 / 3)) - (games * 0.1)) : (rawPer - (games * 0.1));
    row.per = typeof row.per === "number" ? row.per : Math.round(calculatedPer * 100) / 100;
    row.perPerGame = typeof row.perPerGame === "number" ? row.perPerGame : Math.round((row.per / games) * 1000) / 1000;
    row.shootingPct = row.shots > 0 ? Math.round((row.goals / row.shots) * 1000) / 10 : 0;
    row.teamSaveRate = row.shotsConceded > 0 ? Math.round((row.saves / row.shotsConceded) * 1000) / 10 : 0;
    row.opponentShootingPct = row.shotsConceded > 0 ? Math.round((row.goalsConceded / row.shotsConceded) * 1000) / 10 : 0;
    row.pointsPerGame = Math.round(((row.standingsPoints || 0) / games) * 100) / 100;
    row.goalDiff = typeof row.goalDiff === "number" ? row.goalDiff : (row.goals || 0) - (row.goalsConceded || 0);
    row.demosPerGame = 0;
    row.distancePerGame = 0;
    row.boostCollectedPerGame = 0;
    row.boostStolenPerGame = 0;
    row.opponentSavesForcedPerGame = 0;
    row.pressureRate = Math.round((((row.shots || 0) + (row.opponentSavesForced || 0)) / games) * 100) / 100;
    row.pressureIndex = Math.round(((row.shots || 0) / games) * 100) / 100;
    return row;
  }

  const s1Players = [
    ["Two Inches Deep", "Troy", "SlapShots1324", 35, "23-9", 18987, 63, 34, 43, 162],
    ["Two Inches Deep", "Kellen", "TheLakeEffekt", 35, "23-9", 18037, 80, 14, 38, 140],
    ["Coming, Melissa!", "Brock", "AtownSteelers", 38, "20-11", 25286, 97, 31, 62, 199],
    ["Coming, Melissa!", "Garcia", "DukeofDope7", 38, "20-11", 16769, 45, 35, 53, 104],
    ["2 Goals, 1 Cup", "Duncan", "Dunkappotamusrex", 39, "7-24", 15155, 50, 24, 30, 109],
    ["2 Goals, 1 Cup", "Logan", "Kuhlbeans", 39, "7-24", 15817, 45, 22, 53, 106],
    ["Glizzy Gobblers", "Seth", "Diastriko", 39, "25-10", 25586, 109, 33, 46, 206],
    ["Glizzy Gobblers", "Clayton", "Gonslinger", 39, "25-10", 18490, 55, 52, 37, 128],
    ["Demon Semen", "Riley", "Rickbob12", 36, "7-19", 16247, 50, 12, 52, 108],
    ["Demon Semen", "Drew", "Lil_Otter13", 36, "7-19", 8904, 19, 14, 30, 54],
    ["Mostly Gay", "Dail", "dailcowgs94", 35, "11-20", 12681, 34, 18, 39, 68],
    ["Mostly Gay", "Jonah", "godfatherjones", 35, "11-20", 16999, 50, 18, 49, 113],
  ];

  const teams = [
    teamRow("S2", "EPSTEIN'S WAITLIST", 36, "28-8", 29935, 95, 53, 51, 88, 236, { matches: 10, matchRecord: "9 - 1", sweeps: 5 }),
    teamRow("S2", "ROUGH SAX", 38, "19-19", 37778, 95, 78, 54, 131, 257, { matches: 10, matchRecord: "5 - 5", sweeps: 3 }),
    teamRow("S2", "GRAVY STAIN BOYS", 38, "26-12", 37300, 99, 53, 61, 103, 293, { matches: 10, matchRecord: "8 - 2", sweeps: 3 }),
    teamRow("S2", "MEGAWATT", 37, "8-29", 26632, 56, 92, 34, 135, 231, { matches: 10, matchRecord: "1 - 9", sweeps: 0 }),
    teamRow("S2", "SMOOTH JIZZ", 42, "19-23", 40096, 82, 101, 56, 152, 254, { matches: 10, matchRecord: "3 - 7", sweeps: 2 }),
    teamRow("S2", "WIN-DIXIES", 37, "14-23", 31624, 69, 96, 44, 113, 205, { matches: 10, matchRecord: "4 - 6", sweeps: 1 }),

    teamRow("S3", "SYNDICATE O' SCALLYWAGS", 39, "17-22", 38861, 103, 116, 60, 110, 285, { standingsPoints: 9, rating: 924.6, matches: 9, matchRecord: "3 - 6" }),
    teamRow("S3", "THE HONKERS", 38, "19-19", 36785, 93, 94, 61, 114, 282, { standingsPoints: 12, rating: 938.3, matches: 9, matchRecord: "4 - 5" }),
    teamRow("S3", "COOL", 32, "5-27", 26425, 54, 128, 31, 110, 179, { standingsPoints: 1, rating: 879.4, matches: 9, matchRecord: "0 - 9" }),
    teamRow("S3", "RED ROCKETS SC", 38, "24-14", 42031, 114, 84, 82, 133, 330, { standingsPoints: 15, rating: 971.5, matches: 9, matchRecord: "7 - 2" }),
    teamRow("S3", "THE DONALD BUMPS", 33, "17-16", 31981, 72, 74, 43, 127, 192, { standingsPoints: 12, rating: 922.6, matches: 9, matchRecord: "4 - 5" }),
    teamRow("S3", "DEAD IN THE WATER", 37, "17-20", 34855, 86, 79, 42, 118, 251, { standingsPoints: 10, rating: 947.7, matches: 9, matchRecord: "4 - 5" }),
    teamRow("S3", "MIDWEST CORNSTARS", 37, "22-15", 37781, 103, 85, 65, 129, 263, { standingsPoints: 17, rating: 976.0, matches: 9, matchRecord: "5 - 4" }),
    teamRow("S3", "ORANGE CAT BEHAVIOR", 33, "16-17", 31593, 78, 71, 50, 85, 254, { standingsPoints: 11, rating: 936.3, matches: 9, matchRecord: "4 - 5" }),
    teamRow("S3", "THE LAMPLIGHTERS", 39, "24-15", 36705, 97, 76, 64, 114, 239, { standingsPoints: 17, rating: 985.1, matches: 9, matchRecord: "8 - 1" }),
    teamRow("S3", "WAVE CRASH", 38, "21-17", 38506, 100, 86, 66, 127, 248, { standingsPoints: 13, rating: 962.9, matches: 9, matchRecord: "6 - 3" }),

    teamRow("S4", "Brock & The Brockettes", 42, "21-21", 41287, 101, 102, 67, 149, 289, { standingsPoints: 14, shotsConceded: 300, matches: 12, matchRecord: "6 - 4", sweeps: 1, gameFiveLosses: 1 }),
    teamRow("S4", "Open Net A-Miss-Ianados", 49, "20-29", 43113, 90, 105, 58, 159, 336, { standingsPoints: 11, shotsConceded: 341, matches: 12, matchRecord: "2 - 9", sweeps: 1, gameFiveLosses: 6 }),
    teamRow("S4", "Three Inch Fury", 44, "20-24", 41661, 108, 113, 64, 137, 307, { standingsPoints: 12, shotsConceded: 311, matches: 12, matchRecord: "5 - 5", sweeps: 0, gameFiveLosses: 2 }),
    teamRow("S4", "The Autisticats", 44, "18-26", 41197, 86, 109, 54, 172, 284, { standingsPoints: 8, shotsConceded: 321, matches: 12, matchRecord: "4 - 7", sweeps: 0, gameFiveLosses: 0 }),
    teamRow("S4", "Tire Benders", 48, "33-15", 48654, 129, 89, 86, 153, 335, { standingsPoints: 24, shotsConceded: 296, matches: 12, matchRecord: "10 - 2", sweeps: 3, gameFiveLosses: 1 }),
    teamRow("S4", "Stinky Pinkies", 48, "27-21", 51461, 145, 121, 97, 167, 404, { standingsPoints: 19, shotsConceded: 327, matches: 12, matchRecord: "6 - 6", sweeps: 3, gameFiveLosses: 4 }),
    teamRow("S4", "Team ZAZ", 42, "20-22", 40858, 99, 82, 59, 146, 306, { standingsPoints: 12, shotsConceded: 264, matches: 12, matchRecord: "5 - 5", sweeps: 0, gameFiveLosses: 2 }),
    teamRow("S4", "Passing's 4 Wimps SC", 44, "21-23", 43045, 105, 119, 54, 163, 289, { standingsPoints: 13, shotsConceded: 369, matches: 12, matchRecord: "5 - 5", sweeps: 1, gameFiveLosses: 2 }),
    teamRow("S4", "Cucksirs", 37, "20-17", 37610, 91, 79, 56, 140, 258, { standingsPoints: 15, shotsConceded: 254, matches: 12, matchRecord: "6 - 4", sweeps: 3, gameFiveLosses: 0 }),
    teamRow("S4", "Team Kawaii", 48, "18-30", 42922, 102, 138, 57, 155, 282, { standingsPoints: 9, shotsConceded: 373, matches: 12, matchRecord: "3 - 9", sweeps: 0, gameFiveLosses: 3 }),
    teamRow("S4", "Cock N' Load", 31, "10-21", 28223, 72, 86, 40, 92, 234, { standingsPoints: 4, shotsConceded: 201, matches: 12, matchRecord: "2 - 6", sweeps: 0, gameFiveLosses: 0 }),
    teamRow("S4", "Bean Bandits", 26, "9-14", 21344, 51, 64, 28, 72, 169, { standingsPoints: 5, shotsConceded: 174, matches: 12, matchRecord: "2 - 4", sweeps: 0, gameFiveLosses: 1 }),
    teamRow("S4", "Sweaty Sweepers", 42, "34-8", 46761, 137, 84, 74, 141, 353, { standingsPoints: 29, shotsConceded: 258, matches: 12, matchRecord: "11 - 1", sweeps: 7, gameFiveLosses: 0 }),

    teamRow("S5", "Milk Before Cereal", 31, "14 - 17", 27983, 70, 78, 36, 90, 211, { overrideGenerated: true, standingsPoints: 10, wins: 3, losses: 5, matchRecord: "3 - 5", sweeps: 2, gameFiveLosses: 2, shotsConceded: 212, rating: 638.2, standingsRank: 7 }),
    teamRow("S5", "The Hornets - Z", 29, "17 - 12", 29832, 79, 77, 47, 103, 198, { overrideGenerated: true, standingsPoints: 13, wins: 5, losses: 3, matchRecord: "5 - 3", sweeps: 2, gameFiveLosses: 1, shotsConceded: 235, rating: 667.2, standingsRank: 4 }),
    teamRow("S5", "Triple Scoop - Y", 30, "20 - 10", 29428, 69, 58, 45, 101, 207, { overrideGenerated: true, standingsPoints: 16, wins: 6, losses: 2, matchRecord: "6 - 2", sweeps: 3, gameFiveLosses: 1, shotsConceded: 201, rating: 681.2, standingsRank: 2 }),
    teamRow("S5", "Danger Pings - X", 33, "11 - 22", 29047, 53, 78, 38, 114, 200, { overrideGenerated: true, standingsPoints: 6, wins: 1, losses: 7, matchRecord: "1 - 7", sweeps: 0, gameFiveLosses: 4, shotsConceded: 244, rating: 590.0, standingsRank: 10 }),
    teamRow("S5", "Bird Bath Bombers", 32, "18 - 14", 35528, 106, 81, 71, 92, 267, { overrideGenerated: true, standingsPoints: 14, wins: 4, losses: 4, matchRecord: "4 - 4", sweeps: 3, gameFiveLosses: 3, shotsConceded: 210, rating: 638.5, standingsRank: 5 }),
    teamRow("S5", "D' n' the V's", 35, "13 - 22", 33428, 71, 90, 47, 113, 261, { overrideGenerated: true, standingsPoints: 7, wins: 2, losses: 6, matchRecord: "2 - 6", sweeps: 0, gameFiveLosses: 3, shotsConceded: 246, rating: 613.0, standingsRank: 9 }),
    teamRow("S5", "Pitch Pirates", 34, "16 - 18", 32621, 67, 76, 39, 130, 219, { overrideGenerated: true, standingsPoints: 10, wins: 4, losses: 4, matchRecord: "4 - 4", sweeps: 1, gameFiveLosses: 1, shotsConceded: 238, rating: 645.1, standingsRank: 6 }),
    teamRow("S5", "Big Musty Milkers - Z", 35, "20 - 15", 34357, 86, 73, 50, 120, 245, { overrideGenerated: true, standingsPoints: 14, wins: 6, losses: 2, matchRecord: "6 - 2", sweeps: 1, gameFiveLosses: 1, shotsConceded: 233, rating: 662.7, standingsRank: 3 }),
    teamRow("S5", "Wouldabeendope - X", 29, "11 - 18", 25499, 56, 74, 32, 95, 177, { overrideGenerated: true, standingsPoints: 7, wins: 2, losses: 6, matchRecord: "2 - 6", sweeps: 2, gameFiveLosses: 1, shotsConceded: 213, rating: 614.7, standingsRank: 8 }),
    teamRow("S5", "Weenie Hut Jrs - Y", 36, "22 - 14", 36380, 90, 64, 52, 126, 272, { overrideGenerated: true, standingsPoints: 15, wins: 7, losses: 1, matchRecord: "7 - 1", sweeps: 1, gameFiveLosses: 0, shotsConceded: 228, rating: 695.3, standingsRank: 1 }),

    teamRow("S6", "Giga's In Paris", 7, "6 - 1", 6937, 19, 7, 10, 16, 72, { overrideGenerated: true, standingsPoints: 5, wins: 2, losses: 0, matchRecord: "2 - 0", sweeps: 1, gameFiveLosses: 0, shotsConceded: 27, rating: 1069.1, standingsRank: 1, goalDiff: 12, per: 2.1, perPerGame: 0.30 }),
    teamRow("S6", "Hook Line & Blinker", 13, "9 - 4", 13658, 37, 22, 25, 38, 104, { overrideGenerated: true, standingsPoints: 7, wins: 3, losses: 0, matchRecord: "3 - 0", sweeps: 1, gameFiveLosses: 0, shotsConceded: 74, rating: 1075.8, standingsRank: 2, goalDiff: 15, per: 4.6, perPerGame: 0.36 }),
    teamRow("S6", "Past Our Prime", 10, "6 - 4", 12114, 27, 25, 24, 46, 57, { overrideGenerated: true, standingsPoints: 4, wins: 2, losses: 0, matchRecord: "2 - 0", sweeps: 0, gameFiveLosses: 0, shotsConceded: 82, rating: 1068.9, standingsRank: 3, goalDiff: 2, per: 4.5, perPerGame: 0.45 }),
    teamRow("S6", "The Cox", 3, "3 - 0", 3597, 11, 6, 7, 7, 30, { overrideGenerated: true, standingsPoints: 3, wins: 1, losses: 0, matchRecord: "1 - 0", sweeps: 1, gameFiveLosses: 0, shotsConceded: 16, rating: 1066.8, standingsRank: 4, goalDiff: 5, per: 1.3, perPerGame: 0.44 }),
    teamRow("S6", "Supernova Abyss", 10, "5 - 5", 9126, 21, 23, 15, 26, 77, { overrideGenerated: true, standingsPoints: 3, wins: 1, losses: 1, matchRecord: "1 - 1", sweeps: 0, gameFiveLosses: 1, shotsConceded: 61, rating: 1070.2, standingsRank: 5, goalDiff: -2, per: 2.4, perPerGame: 0.24 }),
    teamRow("S6", "Best Friends Club", 19, "8 - 11", 17723, 32, 57, 20, 87, 107, { overrideGenerated: true, standingsPoints: 4, wins: 1, losses: 3, matchRecord: "1 - 3", sweeps: 0, gameFiveLosses: 2, shotsConceded: 170, rating: 1026.7, standingsRank: 6, goalDiff: -25, per: 5.4, perPerGame: 0.28 }),
    teamRow("S6", "ESC", 5, "3 - 2", 6047, 20, 7, 11, 13, 53, { overrideGenerated: true, standingsPoints: 2, wins: 1, losses: 0, matchRecord: "1 - 0", sweeps: 0, gameFiveLosses: 0, shotsConceded: 24, rating: 1066.6, standingsRank: 7, goalDiff: 13, per: 2.4, perPerGame: 0.49 }),
    teamRow("S6", "Deceptitards", 5, "2 - 3", 4770, 11, 10, 6, 17, 34, { overrideGenerated: true, standingsPoints: 1, wins: 0, losses: 1, matchRecord: "0 - 1", sweeps: 0, gameFiveLosses: 1, shotsConceded: 34, rating: 1067.5, standingsRank: 8, goalDiff: 1, per: 1.4, perPerGame: 0.27 }),
    teamRow("S6", "Ball Chasin & Sauce Tastin", 5, "2 - 3", 4877, 14, 15, 10, 8, 39, { overrideGenerated: true, standingsPoints: 1, wins: 0, losses: 1, matchRecord: "0 - 1", sweeps: 0, gameFiveLosses: 1, shotsConceded: 30, rating: 1052.2, standingsRank: 9, goalDiff: -1, per: 1.3, perPerGame: 0.26 }),
    teamRow("S6", "Quack Wok", 5, "2 - 3", 4717, 8, 12, 7, 21, 33, { overrideGenerated: true, standingsPoints: 1, wins: 0, losses: 1, matchRecord: "0 - 1", sweeps: 0, gameFiveLosses: 1, shotsConceded: 34, rating: 1062.9, standingsRank: 10, goalDiff: -4, per: 1.4, perPerGame: 0.28 }),
    teamRow("S6", "Spirit Airlines", 11, "2 - 9", 10159, 21, 32, 10, 42, 58, { overrideGenerated: true, standingsPoints: 1, wins: 0, losses: 3, matchRecord: "0 - 3", sweeps: 0, gameFiveLosses: 1, shotsConceded: 98, rating: 1022.8, standingsRank: 11, goalDiff: -11, per: 2.7, perPerGame: 0.24 }),
    teamRow("S6", "Crossbar Cartel", 3, "0 - 3", 3007, 6, 11, 4, 13, 16, { overrideGenerated: true, standingsPoints: 0, wins: 0, losses: 1, matchRecord: "0 - 1", sweeps: 0, gameFiveLosses: 0, shotsConceded: 30, rating: 1024.8, standingsRank: 12, goalDiff: -5, per: 0.9, perPerGame: 0.31 }),

    teamRow("World Cup", "Reef Donkeys", 9, "9 - 0", 0, 0, 0, 0, 0, 0, { overrideGenerated: true, standingsPoints: 9, wins: 3, losses: 0, matchRecord: "3 - 0", sweeps: 3, gameFiveLosses: 0, remainingMatches: 0, maxScore: 9, standingsRank: 1, goalDiffUnavailable: true, excludeFromLifetime: true }),
    teamRow("World Cup", "Bigger Nehavior", 12, "6 - 6", 0, 0, 0, 0, 0, 0, { overrideGenerated: true, standingsPoints: 4, wins: 2, losses: 1, matchRecord: "2 - 1", sweeps: 0, gameFiveLosses: 0, remainingMatches: 0, maxScore: 4, standingsRank: 2, goalDiffUnavailable: true, excludeFromLifetime: true }),
    teamRow("World Cup", "Snowbunnies", 13, "5 - 8", 0, 0, 0, 0, 0, 0, { overrideGenerated: true, standingsPoints: 3, wins: 1, losses: 2, matchRecord: "1 - 2", sweeps: 0, gameFiveLosses: 1, remainingMatches: 0, maxScore: 3, standingsRank: 3, goalDiffUnavailable: true, excludeFromLifetime: true }),
    teamRow("World Cup", "Hoosier Daddy", 12, "3 - 9", 0, 0, 0, 0, 0, 0, { overrideGenerated: true, standingsPoints: 1, wins: 0, losses: 3, matchRecord: "0 - 3", sweeps: 0, gameFiveLosses: 1, remainingMatches: 0, maxScore: 1, standingsRank: 4, goalDiffUnavailable: true, excludeFromLifetime: true }),
  ];

  function addAggregatedTeamRowsFromPlayers(players) {
    const byTeam = new Map();
    const s1TeamMeta = new Map([
      ["Two Inches Deep", { matches: 9, matchRecord: "7 - 2" }],
      ["Coming, Melissa!", { matches: 8, matchRecord: "5 - 3" }],
      ["2 Goals, 1 Cup", { matches: 8, matchRecord: "1 - 7" }],
      ["Glizzy Gobblers", { matches: 9, matchRecord: "8 - 1" }],
      ["Demon Semen", { matches: 7, matchRecord: "2 - 5" }],
      ["Mostly Gay", { matches: 9, matchRecord: "3 - 6" }],
    ]);
    players.forEach((row) => {
      const keyName = `${row.season}|${row.teams[0]}`;
      if (!byTeam.has(keyName)) {
        const meta = row.season === "S1" ? (s1TeamMeta.get(row.teams[0]) || {}) : {};
        byTeam.set(keyName, teamRow(row.season, row.teams[0], row.games, `${row.wins}-${row.losses}`, 0, 0, 0, 0, 0, 0, meta));
      }
      const item = byTeam.get(keyName);
      item.score += row.score;
      item.goals += row.goals;
      item.assists += row.assists;
      item.saves += row.saves;
      item.shots += row.shots;
    });
    return [...byTeam.values()];
  }

  const players = [
    ...s1Players.map(([teamName, display, username, games, rec, score, goals, assists, saves, shots]) => playerRow("S1", teamName, username || display, games, rec, score, goals, assists, saves, shots)),

    ...[
      ["EPSTEIN'S WAITLIST", "Aximov", 36, "28-8", 18401, 58, 17, 45, 149, { mvps: 25, mmr: 0 }],
      ["EPSTEIN'S WAITLIST", "kuhlbeans", 36, "28-8", 10854, 22, 19, 42, 72, { mvps: 2 }],
      ["EPSTEIN'S WAITLIST", "henryspace_", 36, "28-8", 4403, 6, 12, 15, 28],
      ["ROUGH SAX", "Atownsteelers", 38, "19-19", 17543, 52, 26, 51, 141, { mvps: 17 }],
      ["ROUGH SAX", "WildChip2567", 38, "19-19", 12907, 34, 12, 45, 88],
      ["ROUGH SAX", "Lil_Otter13", 38, "19-19", 7328, 9, 16, 35, 28],
      ["GRAVY STAIN BOYS", "RoyalxRenegade", 38, "26-12", 18260, 59, 13, 46, 155],
      ["GRAVY STAIN BOYS", "Dukeofdope7", 38, "26-12", 10061, 20, 29, 28, 71],
      ["GRAVY STAIN BOYS", "gonslinger", 33, "26-12", 8979, 20, 19, 29, 67],
      ["MEGAWATT", "Val3nor", 36, "8-29", 14693, 30, 9, 66, 106],
      ["MEGAWATT", "thelakeeffekt", 36, "8-29", 9998, 23, 15, 34, 70],
      ["MEGAWATT", "TheAeth", 35, "8-29", 9040, 20, 15, 32, 66],
      ["SMOOTH JIZZ", "Original_6_Hawks", 42, "19-23", 17366, 26, 24, 77, 101],
      ["SMOOTH JIZZ", "dailcowgs94", 42, "19-23", 12429, 35, 12, 38, 76],
      ["SMOOTH JIZZ", "Otterly_Amazing", 42, "19-23", 10301, 21, 20, 35, 77],
      ["WIN-DIXIES", "Bubbles3913", 36, "14-23", 10463, 30, 9, 44, 83],
      ["WIN-DIXIES", "Doobxy", 35, "14-23", 12325, 31, 22, 51, 94],
      ["WIN-DIXIES", "MadJanitor88", 31, "14-23", 4661, 8, 10, 19, 49],
    ].map((row) => playerRow("S2", ...row)),

    ...[
      ["SYNDICATE O' SCALLYWAGS", "SchwiftyWT", 39, "17-22", 21876, 66, 23, 54, 191],
      ["SYNDICATE O' SCALLYWAGS", "TheAeth", 39, "17-22", 10826, 26, 22, 40, 61],
      ["SYNDICATE O' SCALLYWAGS", "henryspace_", 39, "17-22", 6159, 11, 15, 16, 33],
      ["THE HONKERS", "SqueakerJG2", 38, "19-19", 16726, 50, 20, 46, 142],
      ["THE HONKERS", "KWNSquid", 38, "19-19", 13534, 28, 25, 49, 85],
      ["THE HONKERS", "PoolnoodlE_412", 38, "19-19", 6525, 15, 16, 19, 55],
      ["COOL", "AtownSteelers", 32, "5-27", 11383, 31, 9, 43, 90],
      ["COOL", "i_have_a_bag", 32, "5-27", 12149, 22, 15, 54, 71],
      ["COOL", "xvp08", 24, "5-27", 1469, 0, 5, 6, 7],
      ["RED ROCKETS SC", "Aximov", 38, "24-14", 19061, 49, 32, 68, 150],
      ["RED ROCKETS SC", "Kuhlbeans", 38, "24-14", 12323, 34, 29, 32, 99],
      ["RED ROCKETS SC", "Authurm19", 38, "24-14", 10647, 31, 21, 33, 81],
      ["THE DONALD BUMPS", "CoalTrainLLC", 33, "17-16", 12256, 32, 14, 49, 90],
      ["THE DONALD BUMPS", "Prxlifik", 33, "17-16", 11603, 28, 16, 45, 64],
      ["THE DONALD BUMPS", "Dukeofdope7", 33, "17-16", 8122, 12, 13, 33, 38],
      ["DEAD IN THE WATER", "godfatherjones", 37, "17-20", 14216, 36, 14, 48, 111],
      ["DEAD IN THE WATER", "JulietAlphaRomeo", 37, "17-20", 12838, 32, 18, 44, 87],
      ["DEAD IN THE WATER", "LIL HATED ONE", 37, "17-20", 7801, 18, 10, 26, 53],
      ["MIDWEST CORNSTARS", "RoyalxRenegade", 37, "22-15", 18979, 64, 15, 54, 146],
      ["MIDWEST CORNSTARS", "LilacAbyss", 37, "22-15", 10670, 21, 27, 47, 55],
      ["MIDWEST CORNSTARS", "MadJanitor88", 37, "22-15", 8132, 18, 23, 28, 62],
      ["ORANGE CAT BEHAVIOR", "millameista", 33, "16-17", 11668, 31, 16, 24, 110],
      ["ORANGE CAT BEHAVIOR", "Val3nor", 33, "16-17", 11727, 29, 18, 35, 90],
      ["ORANGE CAT BEHAVIOR", "Thelakeeffekt", 33, "16-17", 8198, 18, 16, 26, 54],
      ["THE LAMPLIGHTERS", "Original_6_Hawks", 39, "24-15", 14438, 39, 18, 36, 97],
      ["THE LAMPLIGHTERS", "gonslinger", 39, "24-15", 9730, 34, 20, 31, 70],
      ["THE LAMPLIGHTERS", "Wildchip2567", 39, "24-15", 12537, 24, 26, 47, 72],
      ["WAVE CRASH", "Dailcowgs94", 38, "21-17", 12324, 38, 22, 32, 89],
      ["WAVE CRASH", "Doobxy", 38, "21-17", 14600, 27, 29, 60, 78],
      ["WAVE CRASH", "Bubbles3913", 38, "21-17", 11582, 35, 15, 35, 81],
    ].map((row) => playerRow("S3", ...row)),

    ...[
      ["Brock & The Brockettes", "AtownSteelers", 42, "21-21", 14930, 44, 25, 39, 114],
      ["Brock & The Brockettes", "Original_6_Hawks", 42, "21-21", 16417, 41, 22, 70, 119],
      ["Brock & The Brockettes", "DukeofDope7", 42, "21-21", 9940, 16, 20, 40, 56],
      ["Open Net A-Miss-Ianados", "I_have_a_bag", 49, "20-29", 16011, 31, 22, 56, 138],
      ["Open Net A-Miss-Ianados", "godfatherjones", 44, "20-29", 13630, 22, 24, 57, 93],
      ["Open Net A-Miss-Ianados", "TheLakeEffekt", 49, "20-29", 13472, 37, 12, 46, 105],
      ["Three Inch Fury", "RoyalxRenegade", 43, "20-24", 20663, 59, 21, 73, 157],
      ["Three Inch Fury", "CoaltrainLLC", 42, "20-24", 12720, 28, 23, 41, 89],
      ["Three Inch Fury", "Madjanitor88", 42, "20-24", 8278, 21, 20, 23, 61],
      ["The Autisticats", "Val3nor", 44, "18-26", 16233, 40, 10, 61, 125],
      ["The Autisticats", "Authurm19", 44, "18-26", 14308, 27, 21, 67, 93],
      ["The Autisticats", "ttv_starzyrl", 44, "18-26", 10656, 19, 23, 44, 66],
      ["Tire Benders", "KWNSquid", 48, "33-15", 20039, 57, 29, 58, 136],
      ["Tire Benders", "JulietAlphaRomeo", 48, "33-15", 18021, 51, 34, 48, 141],
      ["Tire Benders", "LIL HATED ONE", 48, "33-15", 10594, 21, 23, 47, 58],
      ["Stinky Pinkies", "MegatronMD", 47, "27-21", 20132, 63, 36, 54, 177],
      ["Stinky Pinkies", "Ramen", 46, "27-21", 19899, 58, 32, 63, 165],
      ["Stinky Pinkies", "Sir_vantzzz", 46, "27-21", 11430, 24, 29, 50, 62],
      ["Team ZAZ", "SqueakerJG2", 38, "20-22", 18600, 51, 23, 63, 152],
      ["Team ZAZ", "RL_Zombie", 42, "20-22", 13268, 29, 20, 47, 98],
      ["Team ZAZ", "TheAeth", 42, "20-22", 8990, 19, 16, 36, 56],
      ["Passing's 4 Wimps SC", "Kneeks.", 44, "21-23", 23505, 61, 22, 87, 165],
      ["Passing's 4 Wimps SC", "TJMaxxinista", 44, "21-23", 11866, 31, 16, 35, 96],
      ["Passing's 4 Wimps SC", "Lil_Otter13", 39, "21-23", 7674, 13, 16, 41, 28],
      ["Cucksirs", "Aximov", 37, "20-17", 17964, 53, 23, 65, 127],
      ["Cucksirs", "IMMa_Blurr", 37, "20-17", 11283, 27, 16, 44, 80],
      ["Cucksirs", "WildChip2567", 37, "20-17", 8363, 11, 17, 31, 51],
      ["Team Kawaii", "Epontious", 48, "18-30", 22686, 67, 17, 66, 159],
      ["Team Kawaii", "dailcowgs94", 48, "18-30", 13641, 30, 26, 55, 88],
      ["Team Kawaii", "go1g_", 48, "18-30", 6595, 5, 14, 34, 35],
      ["Cock N' Load", "SchwiftyWT", 30, "10-21", 15652, 43, 19, 47, 147],
      ["Cock N' Load", "KolbyCheat", 29, "10-21", 4766, 8, 9, 22, 28],
      ["Cock N' Load", "Ravenglitch", 30, "10-21", 7805, 21, 12, 23, 59],
      ["Bean Bandits", "JenkiJ", 26, "9-14", 9655, 24, 10, 29, 67],
      ["Bean Bandits", "Doobxy", 26, "9-14", 8018, 18, 11, 28, 63],
      ["Bean Bandits", "PoolNoodlE_412", 26, "9-14", 3671, 9, 7, 15, 39],
      ["Sweaty Sweepers", "Joshhh_RL", 42, "34-8", 26847, 91, 32, 74, 214],
      ["Sweaty Sweepers", "Bubbles3913", 42, "34-8", 14338, 32, 32, 51, 98],
      ["Sweaty Sweepers", "Henryspace_", 42, "34-8", 5576, 14, 10, 16, 41],
    ].map((row) => playerRow("S4", ...row)),

    ...[
      ["MILK BEFORE CEREAL", "RoyalxRenegade", 31, "0-0", 12487, 29, 14, 41, 98, { per: 4.2, perPerGame: 0.14, mvps: 10, rating: 890, overrideGenerated: true }],
      ["MILK BEFORE CEREAL", "godfatherjones", 31, "0-0", 10120, 28, 11, 31, 83, { per: 3.1, perPerGame: 0.10, mvps: 4, rating: 693, overrideGenerated: true }],
      ["MILK BEFORE CEREAL", "go1g_", 28, "0-0", 5376, 13, 11, 18, 30, { per: 0.5, perPerGame: 0.02, mvps: 0, rating: 338, overrideGenerated: true }],
      ["THE HORNETS", "MegatronMD", 29, "0-0", 13292, 33, 19, 49, 86, { per: 5.5, perPerGame: 0.19, mvps: 8, rating: 903, overrideGenerated: true }],
      ["THE HORNETS", "AtownSteelers", 29, "0-0", 11789, 33, 17, 36, 76, { per: 4.4, perPerGame: 0.15, mvps: 9, rating: 737, overrideGenerated: true }],
      ["THE HORNETS", "PoolNoodlE_412", 29, "0-0", 4751, 13, 11, 18, 36, { per: 0.5, perPerGame: 0.02, mvps: 0, rating: 299, overrideGenerated: true }],
      ["TRIPLE SCOOP", "Epontious", 30, "0-0", 14678, 40, 13, 48, 119, { per: 6.0, perPerGame: 0.20, mvps: 19, rating: 933, overrideGenerated: true }],
      ["TRIPLE SCOOP", "MJD22-_-", 30, "0-0", 10295, 19, 26, 43, 60, { per: 3.7, perPerGame: 0.12, mvps: 1, rating: 637, overrideGenerated: true }],
      ["TRIPLE SCOOP", "Lil_Otter13", 30, "0-0", 4455, 10, 6, 10, 28, { per: -0.8, perPerGame: -0.03, mvps: 0, rating: 362, overrideGenerated: true }],
      ["DANGER PINGS", "JulietAlphaRomeo", 33, "0-0", 11438, 19, 17, 44, 81, { per: 3.2, perPerGame: 0.10, mvps: 4, rating: 745, overrideGenerated: true }],
      ["DANGER PINGS", "CoalTrainLLC", 33, "0-0", 10620, 24, 9, 38, 71, { per: 2.8, perPerGame: 0.08, mvps: 7, rating: 689, overrideGenerated: true }],
      ["DANGER PINGS", "DukeofDope7", 33, "0-0", 6989, 10, 12, 32, 48, { per: 0.9, perPerGame: 0.03, mvps: 0, rating: 478, overrideGenerated: true }],
      ["BBB", "Authurm19", 32, "0-0", 11890, 31, 29, 37, 78, { per: 4.6, perPerGame: 0.14, mvps: 6, rating: 688, overrideGenerated: true }],
      ["BBB", "Bubbles3913", 32, "0-0", 13397, 47, 15, 34, 101, { per: 5.5, perPerGame: 0.17, mvps: 10, rating: 685, overrideGenerated: true }],
      ["BBB", "Ravenglitch", 32, "0-0", 10241, 28, 27, 21, 88, { per: 3.2, perPerGame: 0.10, mvps: 2, rating: 568, overrideGenerated: true }],
      ["D' N' THE V'S", "Vizpick", 35, "0-0", 14162, 28, 12, 52, 118, { per: 4.5, perPerGame: 0.13, mvps: 7, rating: 811, overrideGenerated: true }],
      ["D' N' THE V'S", "dailcowgs94", 35, "0-0", 11291, 31, 17, 30, 94, { per: 3.4, perPerGame: 0.10, mvps: 5, rating: 617, overrideGenerated: true }],
      ["D' N' THE V'S", "Sir_vantzzz", 35, "0-0", 7975, 12, 18, 31, 49, { per: 1.2, perPerGame: 0.03, mvps: 1, rating: 515, overrideGenerated: true }],
      ["PITCH PIRATES", "Val3nor", 34, "0-0", 13425, 27, 18, 56, 90, { per: 4.8, perPerGame: 0.14, mvps: 8, rating: 740, overrideGenerated: true }],
      ["PITCH PIRATES", "Original_6_Hawks", 34, "0-0", 13589, 32, 14, 46, 93, { per: 4.5, perPerGame: 0.13, mvps: 8, rating: 773, overrideGenerated: true }],
      ["PITCH PIRATES", "LIL HATED ONE", 34, "0-0", 5607, 8, 7, 28, 36, { per: 0.0, perPerGame: 0.0, mvps: 0, rating: 426, overrideGenerated: true }],
      ["BMM", "Aximov", 35, "0-0", 15831, 47, 18, 46, 116, { per: 6.3, perPerGame: 0.18, mvps: 16, rating: 908, overrideGenerated: true }],
      ["BMM", "Selenagomez415", 35, "0-0", 8978, 16, 13, 37, 61, { per: 1.8, perPerGame: 0.05, mvps: 2, rating: 523, overrideGenerated: true }],
      ["BMM", "TheLakeEffekt", 35, "0-0", 9548, 23, 19, 37, 68, { per: 2.9, perPerGame: 0.08, mvps: 2, rating: 512, overrideGenerated: true }],
      ["WOULDABEENDOPE", "KWNSquid", 29, "0-0", 11211, 25, 18, 32, 90, { per: 3.5, perPerGame: 0.12, mvps: 9, rating: 809, overrideGenerated: true }],
      ["WOULDABEENDOPE", "RL_Zombie", 26, "0-0", 7008, 15, 7, 31, 40, { per: 1.7, perPerGame: 0.07, mvps: 1, rating: 621, overrideGenerated: true }],
      ["WOULDABEENDOPE", "ttv_starzyrl", 29, "0-0", 7280, 16, 7, 32, 47, { per: 1.7, perPerGame: 0.06, mvps: 1, rating: 512, overrideGenerated: true }],
      ["WEENIE HUT JRS", "Ramen", 36, "0-0", 15159, 41, 21, 45, 117, { per: 5.7, perPerGame: 0.16, mvps: 12, rating: 835, overrideGenerated: true }],
      ["WEENIE HUT JRS", "I_have_a_bag", 36, "0-0", 13024, 36, 18, 38, 110, { per: 4.5, perPerGame: 0.13, mvps: 9, rating: 714, overrideGenerated: true }],
      ["WEENIE HUT JRS", "greenarrowspark2", 36, "0-0", 8197, 13, 13, 43, 45, { per: 1.7, perPerGame: 0.05, mvps: 1, rating: 378, overrideGenerated: true }],
    ].map((row) => playerRow("S5", ...row)),

    ...[
      ["Best Friends Club", "I_have_a_bag", 19, "0-0", 6776, 13, 4, 33, 43, { per: 2.2, perPerGame: 0.12, mvps: 4, rating: 1143, overrideGenerated: true }],
      ["Best Friends Club", "greenarrowspark2", 19, "0-0", 5761, 8, 9, 27, 32, { per: 1.5, perPerGame: 0.08, mvps: 1, rating: 968, overrideGenerated: true }],
      ["Best Friends Club", "thelakeeffekt", 19, "0-0", 5186, 11, 7, 27, 32, { per: 1.7, perPerGame: 0.09, mvps: 3, rating: 959, overrideGenerated: true }],
      ["Hook Line & Blinker", "Ramen", 13, "0-0", 5690, 18, 8, 13, 38, { per: 2.1, perPerGame: 0.17, mvps: 6, rating: 1200, overrideGenerated: true }],
      ["Hook Line & Blinker", "Bubbles3913", 13, "0-0", 5384, 15, 9, 19, 39, { per: 2.3, perPerGame: 0.18, mvps: 3, rating: 1120, overrideGenerated: true }],
      ["Hook Line & Blinker", "NeonLightning20", 13, "0-0", 2584, 4, 8, 6, 27, { per: 0.2, perPerGame: 0.01, mvps: 0, rating: 857, overrideGenerated: true }],
      ["Crossbar Cartel", "Vizpick", 3, "0-0", 1102, 1, 4, 3, 3, { per: 0.2, perPerGame: 0.08, mvps: 0, rating: 1202, overrideGenerated: true }],
      ["Crossbar Cartel", "MJD22-_-", 3, "0-0", 1279, 3, 0, 7, 11, { per: 0.6, perPerGame: 0.19, mvps: 0, rating: 1075, overrideGenerated: true }],
      ["Crossbar Cartel", "sir_vantzzz", 3, "0-0", 626, 2, 0, 3, 2, { per: 0.1, perPerGame: 0.04, mvps: 0, rating: 820, overrideGenerated: true }],
      ["Ball Chasin & Sauce Tastin", "CROCOKYLE", 5, "0-0", 1898, 3, 6, 3, 17, { per: 0.5, perPerGame: 0.09, mvps: 1, rating: 1213, overrideGenerated: true }],
      ["Ball Chasin & Sauce Tastin", "Pilot_SG1", 5, "0-0", 1399, 5, 1, 3, 9, { per: 0.3, perPerGame: 0.07, mvps: 1, rating: 1011, overrideGenerated: true }],
      ["Ball Chasin & Sauce Tastin", "TGS_Lostmoss", 5, "0-0", 1580, 6, 3, 2, 13, { per: 0.5, perPerGame: 0.10, mvps: 0, rating: 965, overrideGenerated: true }],
      ["Spirit Airlines", "JAR", 11, "0-0", 4716, 9, 6, 22, 26, { per: 1.8, perPerGame: 0.17, mvps: 2, rating: 1232, overrideGenerated: true }],
      ["Spirit Airlines", "dailcowgs94", 11, "0-0", 3834, 9, 4, 16, 23, { per: 1.3, perPerGame: 0.12, mvps: 0, rating: 1078, overrideGenerated: true }],
      ["Spirit Airlines", "MadJanitor88", 11, "0-0", 1609, 3, 0, 4, 9, { per: -0.4, perPerGame: -0.04, mvps: 0, rating: 855, overrideGenerated: true }],
      ["The Cox", "roo", 3, "0-0", 1799, 6, 3, 4, 14, { per: 0.9, perPerGame: 0.29, mvps: 2, rating: 1248, overrideGenerated: true }],
      ["The Cox", "CoalTrainLLC", 3, "0-0", 1191, 5, 2, 1, 10, { per: 0.5, perPerGame: 0.16, mvps: 1, rating: 1111, overrideGenerated: true }],
      ["The Cox", "Hyroshi", 3, "0-0", 607, 0, 2, 2, 6, { per: 0.0, perPerGame: 0.0, mvps: 0, rating: 819, overrideGenerated: true }],
      ["Past Our Prime", "RoyalxRenegade", 10, "0-0", 5305, 14, 7, 17, 25, { per: 2.1, perPerGame: 0.21, mvps: 5, rating: 1262, overrideGenerated: true }],
      ["Past Our Prime", "AtownSteelers", 10, "0-0", 3683, 7, 10, 15, 18, { per: 1.4, perPerGame: 0.14, mvps: 1, rating: 1009, overrideGenerated: true }],
      ["Past Our Prime", "MerkWTM", 10, "0-0", 3126, 6, 7, 14, 14, { per: 1.0, perPerGame: 0.10, mvps: 0, rating: 872, overrideGenerated: true }],
      ["Quack Wok", "Original_6_Hawks", 5, "0-0", 1959, 5, 2, 7, 13, { per: 0.7, perPerGame: 0.14, mvps: 1, rating: 1301, overrideGenerated: true }],
      ["Quack Wok", "godfatherjones", 5, "0-0", 1501, 0, 2, 8, 11, { per: 0.2, perPerGame: 0.05, mvps: 1, rating: 1125, overrideGenerated: true }],
      ["Quack Wok", "LIL HATED ONE", 5, "0-0", 1257, 3, 3, 6, 9, { per: 0.4, perPerGame: 0.09, mvps: 0, rating: 782, overrideGenerated: true }],
      ["Giga's In Paris", "Aximov", 7, "0-0", 2654, 7, 4, 3, 33, { per: 0.7, perPerGame: 0.10, mvps: 2, rating: 1315, overrideGenerated: true }],
      ["Giga's In Paris", "Selenagomez415", 7, "0-0", 2750, 8, 3, 9, 29, { per: 1.1, perPerGame: 0.16, mvps: 4, rating: 1125, overrideGenerated: true }],
      ["Giga's In Paris", "Mastergiga9", 7, "0-0", 1533, 4, 3, 4, 10, { per: 0.2, perPerGame: 0.03, mvps: 0, rating: 728, overrideGenerated: true }],
      ["Deceptitards", "MegatronMD", 5, "0-0", 1946, 6, 2, 3, 15, { per: 0.6, perPerGame: 0.11, mvps: 1, rating: 1433, overrideGenerated: true }],
      ["Deceptitards", "ravenglitch", 5, "0-0", 1573, 2, 3, 8, 12, { per: 0.5, perPerGame: 0.10, mvps: 1, rating: 972, overrideGenerated: true }],
      ["Deceptitards", "DukeofDope7", 5, "0-0", 1251, 3, 1, 6, 7, { per: 0.3, perPerGame: 0.06, mvps: 0, rating: 830, overrideGenerated: true }],
      ["Supernova Abyss", "KWNSquid", 10, "0-0", 4121, 12, 2, 12, 34, { per: 1.4, perPerGame: 0.14, mvps: 2, rating: 1451, overrideGenerated: true }],
      ["Supernova Abyss", "ttv_starzyrl", 10, "0-0", 2979, 6, 8, 9, 18, { per: 0.8, perPerGame: 0.08, mvps: 2, rating: 952, overrideGenerated: true }],
      ["Supernova Abyss", "MrStratty", 10, "0-0", 2026, 3, 5, 5, 25, { per: 0.1, perPerGame: 0.01, mvps: 1, rating: 793, overrideGenerated: true }],
      ["ESC", "Epontious", 5, "0-0", 3234, 12, 5, 8, 28, { per: 1.8, perPerGame: 0.35, mvps: 3, rating: 1452, overrideGenerated: true }],
      ["ESC", "SkittleZ", 5, "0-0", 1362, 5, 0, 3, 12, { per: 0.3, perPerGame: 0.06, mvps: 0, rating: 962, overrideGenerated: true }],
      ["ESC", "Clamp2much", 5, "0-0", 1451, 3, 6, 2, 13, { per: 0.4, perPerGame: 0.07, mvps: 0, rating: 770, overrideGenerated: true }],
    ].map((row) => playerRow("S6", ...row)),
  ];

  const historicalPlayerRatings = {
    S3: [
      ["SchwiftyWT", 1319], ["TheAeth", 795], ["henryspace_", 607],
      ["SqueakerJG2", 1134], ["KWNSquid", 1027], ["PoolnoodlE_412", 652],
      ["AtownSteelers", 1113], ["i_have_a_bag", 1110], ["xvp08", 590],
      ["Aximov", 1207], ["Kuhlbeans", 830], ["Authurm19", 777],
      ["CoalTrainLLC", 1035], ["Prxlifik", 973], ["Dukeofdope7", 807],
      ["godfatherjones", 1031], ["JulietAlphaRomeo", 988], ["LIL HATED ONE", 875],
      ["RoyalxRenegade", 1125], ["LilacAbyss", 863], ["MadJanitor88", 824],
      ["millameista", 1092], ["Val3nor", 1064], ["Thelakeeffekt", 806],
      ["Original_6_Hawks", 1071], ["gonslinger", 913], ["Wildchip2567", 813],
      ["Dailcowgs94", 1014], ["Doobxy", 1011], ["Bubbles3913", 887],
    ],
    S4: [
      ["AtownSteelers", 1151], ["Original_6_Hawks", 1142], ["DukeofDope7", 958],
      ["I_have_a_bag", 1205], ["godfatherjones", 1087], ["TheLakeEffekt", 831],
      ["RoyalxRenegade", 1220], ["CoalTrainLLC", 1149], ["MadJanitor88", 858],
      ["Val3nor", 1221], ["Authurm19", 1058], ["ttv_starzyrl", 922],
      ["KWNSquid", 1243], ["JulietAlphaRomeo", 1124], ["LIL HATED ONE", 850],
      ["MegatronMD", 1287], ["Ramen", 1194], ["Sir_vantzzz", 798],
      ["SqueakerJG2", 1322], ["RL_Zombie", 1083], ["TheAeth", 843],
      ["Kneeks.", 1328], ["TJMaxxinista", 1116], ["Lil_Otter13", 759],
      ["Aximov", 1339], ["IMMa_Blurr", 1045], ["WildChip2567", 1025],
      ["Epontious", 1356], ["dailcowgs94", 1057], ["go1g_", 756],
      ["SchwiftyWT", 1393], ["KolbyCheat", 1048], ["Ravenglitch", 964],
      ["JenkiJ", 1395], ["Doobxy", 1131], ["PoolNoodlE_412", 652],
      ["Joshhh_RL", 1616], ["Bubbles3913", 1129], ["Henryspace_", 656],
    ],
  };

  Object.entries(historicalPlayerRatings).forEach(([season, rows]) => {
    const ratings = new Map(rows.map(([name, rating]) => [player(name), rating]));
    players.filter((row) => row.season === season).forEach((row) => {
      if (!ratings.has(row.name)) return;
      row.rating = ratings.get(row.name);
      row.ratingEstimated = false;
      row.ratingSource = "Manual MMR";
    });
  });

  players.filter((row) => row.season === "S5" && Number.isFinite(row.rating)).forEach((row) => {
    row.ratingEstimated = false;
    row.ratingSource = "Manual rating";
  });
  players.filter((row) => row.season === "S6" && Number.isFinite(row.rating)).forEach((row) => {
    row.ratingEstimated = false;
    row.ratingSource = "Draft MMR";
  });

  function medianRating(rows) {
    const values = rows.map((row) => row.rating).filter(Number.isFinite).sort((a, b) => a - b);
    if (!values.length) return null;
    const middle = Math.floor(values.length / 2);
    return values.length % 2 ? values[middle] : (values[middle - 1] + values[middle]) / 2;
  }

  ["S1", "S2"].forEach((season) => {
    const seasonNumber = Number(season.slice(1));
    players.filter((row) => row.season === season && !Number.isFinite(row.rating)).forEach((row) => {
      const future = players
        .filter((candidate) => candidate.name === row.name && Number(candidate.season.slice(1)) > seasonNumber && Number.isFinite(candidate.rating))
        .sort((a, b) => Number(a.season.slice(1)) - Number(b.season.slice(1)))[0];
      if (future) {
        row.rating = future.rating;
        row.ratingSource = `Estimated from ${future.season} ${future.ratingSource || "rating"}`;
      } else {
        const futureSeason = ["S3", "S4", "S5", "S6"].find((candidateSeason) => Number(candidateSeason.slice(1)) > seasonNumber && medianRating(players.filter((candidate) => candidate.season === candidateSeason)) !== null);
        row.rating = Math.round(medianRating(players.filter((candidate) => candidate.season === futureSeason)) || 0);
        row.ratingSource = `Estimated from ${futureSeason} player median`;
      }
      row.ratingEstimated = true;
    });
  });

  teams.push(...addAggregatedTeamRowsFromPlayers(players.filter((row) => row.season === "S1")));

  const teamInfo = [
    ["S3", "Syndicate O' Scallywags", "TheAeth", "Salty Shores (Salty Fest)", "US E/C", 907],
    ["S3", "The Honkers", "SqueakerJG2", "Urban Central", "US E/C", 937.7],
    ["S3", "Cool", "FATDclyde", "DFH Stadium", "US E/C", 937.7],
    ["S3", "Red Rockets SC", "Aximov", "Mannfield", "US E/C", 938],
    ["S3", "Donald Bumps", "Dukeofdope7", "Estadio Vida", "US E/C", 938.3],
    ["S3", "Dead In The Water", "JulietAlphaRomeo", "Deadeye Canyon (Oasis)", "US E/C", 964.7],
    ["S3", "Midwest Cornstars", "RoyalxRenegade", "Farmstead (Pitched)", "US E/C", 937.3],
    ["S3", "Orange Cat Behavior", "Thelakeeffekt", "Utopia Colisuem", "US E/C", 987.3],
    ["S3", "Lamplighters", "Original_6_Hawks", "Beckwith Park", "US E/C", 932.3],
    ["S3", "Wave Crash", "dailcowgs94", "Aquadome (Salty Shallows)", "US E/C", 970.7],
    ["S4", "Brock & The Brockettes", "AtownSteelers", "Urban Central", "US E", 1083.7],
    ["S4", "Open Net A-Miss-Ianados", "I_have_a_bag", "Mannfield", "US E", 1041],
    ["S4", "Three Inch Fury", "RoyalxRenegade", "Drift Woods", "US E", 1075.7],
    ["S4", "The Autisticats", "Val-enor", "Neo Tokyo (Arcade)", "US E", 1067],
    ["S4", "Tire Benders", "KWNSquid", "Aquadome (Salty Shallows)", "US E", 1072.3],
    ["S4", "Stinky Pinkies", "MegatronMD", "Beckwith Park", "US E", 1093],
    ["S4", "Team ZAZ", "SqueakerJG2", "Farmstead (Pitched)", "US E", 1082.7],
    ["S4", "Passing's 4 Wimps SC", "Kneeks.", "Sovereign Heights", "US E", 1067.7],
    ["S4", "Cucksirs", "Aximov", "Utopia Coliseum", "US E", 1136.3],
    ["S4", "Team Kawaii", "Epontious", "Fobidden Temple", "US E", 1056.3],
    ["S4", "Cock N' Load", "SchwiftyWT", "Deadeye Canyon (Oasis)", "US E", 1135],
    ["S4", "Bean Bandits", "JenkiJ", "DFH Stadium", "US E", 1059.3],
    ["S4", "Sweaty Sweepers", "Joshhh_RL", "Salty Shoes (Salty Fest)", "US E", 1133.7],
  ].map(([season, teamName, captain, homeStadium, homeServer, averageMmr]) => ({
    season,
    team: team(teamName),
    captain: player(captain),
    homeStadium,
    homeServer,
    averageMmr,
  }));

  const s5TeamInfo = [
    ["S5", "D' n' the V's", "Dail", "Estadio Vida", "US E", 647.7, "E4 (Yellow)", "G4 (Green)", "Train", "Train"],
    ["S5", "Big Musty Milkers", "Aximov", "Mannfield Park (Not Day)", "US E", 647.7, "C1 (Light Orange)", "A1 (White)", "Gravy", "Gravy"],
    ["S5", "Wouldabeendope", "KWNSquid", "Farmstead", "US E", 647.3, "G6 (Dark Green)", "L5 (Purple)", "Train", "Gravy"],
    ["S5", "Bird Bath Bombers", "Bubbles3913", "Fordidden Temple", "US E", 647.0, "L5 (Purple)", "A6 (Dark Grey)", "Gravy", "Train"],
    ["S5", "The Hornets", "Atownsteelers", "Rivals Arena", "US E", 646.3, "A7 (Black)", "E4 (Yellow)", "Gravy", "Train"],
    ["S5", "Pitch Pirates", "Original_6_Hawks", "Beckwith Park", "US E", 646.3, "G3 (Green)", "A1 (White)", "Gravy", "Train"],
    ["S5", "Triple Scoop", "Epontious", "Salty Shores Night", "US E", 644.0, "D4 (Tan)", "A1 (White)", "Train", "Gravy"],
    ["S5", "Weenie Hut Jrs", "Ramen", "Aquadome", "US E", 642.3, "N4 (Pink)", "H4 (Green)", "Train", "Gravy"],
    ["S5", "Milk Before Cereal", "RoyalxRenegade", "Neo Tokyo (Arcade)", "US E", 640.3, "A1 (White)", "D6 (Brown)", "Gravy", "Gravy"],
    ["S5", "Danger Pings", "JulietAlphaRomeo", "Deadeye Canyon (Oasis)", "US E", 637.3, "C4 (Orange)", "M4 (Purple)", "Train", "Train"],
  ].map(([season, teamName, captain, homeStadium, homeServer, averageMmr, primary, secondary, firstSplitPool, secondSplitPool]) => ({
    season,
    team: team(teamName),
    captain: player(captain),
    homeStadium,
    homeServer,
    averageMmr,
    primary,
    secondary,
    firstSplitPool,
    secondSplitPool,
  }));
  teamInfo.push(...s5TeamInfo);

  const s6TeamInfo = [
    ["S6", "Best Friends Club", "I_have_a_bag", "Sovereign Heights (Dusk)", "US E", 1023.3, "B3 (Red)", "A1 (White)", "greenarrowspark2", "thelakeeffekt"],
    ["S6", "Hook Line & Blinker", "Ramen", "Aquadome (Salty Fest)", "US E", 1059.0, "K5 (Navy)", "D1 (Sand)", "Bubbles3913", "NeonLightning20"],
    ["S6", "Crossbar Cartel", "Vizpick", "Drift Woods", "US E", 1032.3, "F7 (Dark Green)", "K6 (Purple)", "MJD22-_-", "sir_vantzzz"],
    ["S6", "Ball Chasin & Sauce Tastin", "CROCOKYLE", "Neo Tokyo", "US E", 1063.0, "C3 (Orange)", "E3 (Yellow)", "Pilot_SG1", "TGS_Lostmoss"],
    ["S6", "Spirit Airlines", "JAR", "Salty Shores (Salty Fest)", "US E", 1055.0, "E4 (Yellow)", "A7 (Black)", "dailcowgs94", "MadJanitor88"],
    ["S6", "The Cox", "roo", "Forbidden Temple", "US E", 1059.3, "O6 (Maroon)", "D4 (Tan)", "CoalTrainLLC", "Hyroshi"],
    ["S6", "Past Our Prime", "RoyalxRenegade", "Mannfield", "US E", 1047.7, "L3 (Purple)", "I3 (Aqua)", "AtownSteelers", "MerkWTM"],
    ["S6", "Quack Wok", "Original_6_Hawks", "Beckwith Park", "US E", 1069.3, "L1 (Lavender)", "A4 (Gray)", "godfatherjones", "LIL HATED ONE"],
    ["S6", "Giga's In Paris", "Aximov", "Parc de Paris", "US E", 1056.0, "A6 (Dark Grey)", "A7 (Black)", "Selenagomez415", "Mastergiga9"],
    ["S6", "Deceptitards", "MegatronMD", "Farmstead Night", "US E", 1078.3, "M6 (Purple)", "I3 (Aqua)", "ravenglitch", "DukeofDope7"],
    ["S6", "Supernova Abyss", "KWNSquid", "Utopia Coliseum", "US E", 1065.3, "J2 (Light Blue)", "N4 (Pink)", "ttv_starzyrl", "MrStratty"],
    ["S6", "ESC", "Epontious", "DFH Stadium", "US E", 1061.3, "L4 (Purple)", "N4 (Pink)", "SkittleZ", "Clamp2much"],
  ].map(([season, teamName, captain, homeStadium, homeServer, averageMmr, primary, secondary, pick1, pick2]) => ({
    season,
    team: team(teamName),
    captain: player(captain),
    homeStadium,
    homeServer,
    averageMmr,
    primary,
    secondary,
    roster: [player(captain), player(pick1), player(pick2)],
  }));
  teamInfo.push(...s6TeamInfo);

  const worldCupTeamInfo = [
    ["World Cup", "Reef Donkeys", "KWNSquid", "Ax1mov", "selena.", "Bubbles3913"],
    ["World Cup", "Hoosier Daddy", "Ramen", "dailcowgs94", "Authurm19", "AtownSteelers"],
    ["World Cup", "Bigger Nehavior", "Original_6_Hawks", "RoyalxRenegade", "Sir_vantzzz", "MadJanitor88"],
    ["World Cup", "Snowbunnies", "EPo -_-", "I_have_a_bag", "JulietAlphaRomeo", "greenarrowspark2"],
  ].map(([season, teamName, captain, ...roster]) => ({
    season,
    team: team(teamName),
    captain: player(captain),
    homeStadium: "World Cup",
    homeServer: "Tournament",
    averageMmr: "N/A",
    roster: [player(captain), ...roster.map(player)],
  }));
  teamInfo.push(...worldCupTeamInfo);

  const draft = [
    ["S4", "Team Kawaii", 10, "Epontious", 1356, "goig", 756, 1, "GTdail", 1057, 1056.3, 12],
    ["S4", "The Autisticats", 4, "Val3nor", 1221, "Authurm19", 1058, 2, "Starzy", 922, 1067.0, 10],
    ["S4", "Open Net A-Miss-Ianados", 2, "I_have_a_bag", 1205, "godfatherjones", 1087, 3, "TheLakeEffekt", 831, 1041.0, 13],
    ["S4", "Brock & The Brockettes", 1, "AtownSteelers", 1151, "Original_6_Hawks", 1142, 4, "DukeofDope7", 958, 1083.7, 5],
    ["S4", "Tire Benders", 5, "KWNSquid", 1243, "JulietAlphaRomeo", 1124, 5, "Hated_One", 850, 1072.3, 8],
    ["S4", "Three Inch Fury", 3, "RoyalxRenegade", 1220, "CoalTrainLLC", 1149, 6, "MadJanitor", 858, 1075.7, 7],
    ["S4", "Cucksirs", 9, "Aximov", 1339, "ImmaBlurr", 1045, 7, "Wildchip", 1025, 1136.3, 1],
    ["S4", "Team ZAZ", 7, "SqueakerJG2", 1322, "RL_Zombie", 1083, 8, "Aeth", 843, 1082.7, 6],
    ["S4", "Cock N' Load", 11, "SchwiftyWT", 1393, "H00SI3R DADDY69", 1048, 9, "Ravenglitch", 964, 1135.0, 2],
    ["S4", "Passing's 4 Wimps SC", 8, "Kneeks", 1328, "TJMaxx", 1116, 10, "Lil_Otter13", 759, 1067.7, 9],
    ["S4", "Stinky Pinkies", 6, "MegatronMD", 1287, "Ramen", 1194, 11, "Sir Vantzzz", 798, 1093.0, 4],
    ["S4", "Bean Bandits", 12, "JenkiRL", 1395, "Doobxy", 1131, 12, "PoolNoodlE", 652, 1059.3, 11],
    ["S4", "Sweaty Sweepers", 13, "Joshhh_RL", 1616, "Bubbles3913", 1129, 13, "Henryspace_", 656, 1133.7, 3],
    ["S6", "Best Friends Club", 1, "I_have_a_bag", 1143, "greenarrowspark2", 968, 1, "Thelakeeffekt", 959, 1023.3, 12],
    ["S6", "Hook Line & Blinker", 2, "Ramen", 1200, "Bubbles3913", 1120, 7, "NeonLightning20", 857, 1059.0, 7],
    ["S6", "Crossbar Cartel", 3, "Vizpick", 1202, "waxy_sausage9", 1075, 5, "sir_vantzzz", 820, 1032.3, 11],
    ["S6", "Ball Chasin & Sauce Tastin", 4, "CROCOKYLE", 1213, "Pilot_SG1", 1011, 3, "TGS Lostmoss", 965, 1063.0, 4],
    ["S6", "Spirit Airlines", 5, "JulietAlphaRomeo", 1232, "dailcowgs94", 1078, 6, "MadJanitor88", 855, 1055.0, 9],
    ["S6", "The Cox", 6, "roo", 1248, "CoalTrainLLC", 1111, 8, "Hyroshi", 819, 1059.3, 6],
    ["S6", "Past Our Prime", 7, "RoyalxRenegade", 1262, "AtownSteelers", 1009, 4, "MerkWRM", 872, 1047.7, 10],
    ["S6", "Quack Wok", 8, "Original_6_Hawks", 1301, "godfatherjones", 1125, 11, "LIL HATED ONE", 782, 1069.3, 2],
    ["S6", "GIGAS IN PARIS", 9, "Aximov", 1315, "selenagomez415", 1125, 12, "Mastergiga9", 728, 1056.0, 8],
    ["S6", "Deceptitards", 10, "MegatronMD", 1433, "ravenglitch", 972, 10, "Dukeofdope7", 830, 1078.3, 1],
    ["S6", "Supernova Abyss", 11, "KWNSquid", 1451, "ttv_starzyrl", 952, 9, "MrStratty", 793, 1065.3, 3],
    ["S6", "ESC", 12, "Epontious", 1452, "Clamp2much", 770, 2, "SkittleZ", 962, 1061.3, 5],
  ].map(([season, teamName, draftOrder, captain, captainMmr, pick1, pick1Mmr, draftReorder, pick2, pick2Mmr, teamMmr, teamRank]) => ({
    season,
    team: team(teamName),
    draftOrder,
    captain: player(captain),
    captainMmr,
    pick1: player(pick1),
    pick1Mmr,
    duoMmr: Math.round(((captainMmr + pick1Mmr) / 2) * 10) / 10,
    draftReorder,
    pick2: player(pick2),
    pick2Mmr,
    teamMmr,
    teamRank,
  }));

  const s5PoolByStage = {
    split1: new Map([
      ["Big Musty Milkers", "Gravy"], ["Bird Bath Bombers", "Gravy"], ["Milk Before Cereal", "Gravy"], ["Pitch Pirates", "Gravy"], ["The Hornets", "Gravy"],
      ["Triple Scoop", "Train"], ["Weenie Hut Jrs", "Train"], ["Wouldabeendope", "Train"], ["Danger Pings", "Train"], ["D' n' the V's", "Train"],
    ].map(([name, pool]) => [team(name), pool])),
    split2: new Map([
      ["Weenie Hut Jrs", "Gravy"], ["Triple Scoop", "Gravy"], ["Big Musty Milkers", "Gravy"], ["Milk Before Cereal", "Gravy"], ["Wouldabeendope", "Gravy"],
      ["The Hornets", "Train"], ["Pitch Pirates", "Train"], ["Bird Bath Bombers", "Train"], ["D' n' the V's", "Train"], ["Danger Pings", "Train"],
    ].map(([name, pool]) => [team(name), pool])),
  };

  const s6PoolByTeam = new Map([
    ["Giga's In Paris", "Gravy"], ["Hook Line & Blinker", "Gravy"], ["ESC", "Gravy"], ["Quack Wok", "Gravy"], ["Best Friends Club", "Gravy"], ["Spirit Airlines", "Gravy"],
    ["Past Our Prime", "Train"], ["The Cox", "Train"], ["Ball Chasin & Sauce Tastin", "Train"], ["Supernova Abyss", "Train"], ["Crossbar Cartel", "Train"], ["Deceptitards", "Train"],
  ].map(([name, pool]) => [team(name), pool]));

  function cleanResult(value) {
    return String(value || "").replace(/\s+/g, " ").replace(/(\d)\s*-\s*(\d)/g, "$1 - $2").trim();
  }

  function scheduleWinner(homeName, result, awayName) {
    const match = cleanResult(result).match(/(\d+)\s*-\s*(\d+)/);
    if (!match) return "";
    const left = Number(match[1]);
    const right = Number(match[2]);
    if (left === right) return "";
    return left > right ? homeName : awayName;
  }

  function schedulePool(season, stage, homeName, awayName) {
    if (season === "S5") return s5PoolByStage[stage]?.get(homeName) || s5PoolByStage[stage]?.get(awayName) || "";
    if (season === "S6") return s6PoolByTeam.get(homeName) || s6PoolByTeam.get(awayName) || "";
    return "";
  }

  function parseScheduleBlock(season, stage, raw) {
    const rows = [];
    let round = "";
    let dateRange = "";
    raw.split(/\r?\n/).forEach((line) => {
      const parts = line.split(/\t+/).map((item) => item.trim()).filter(Boolean);
      if (!parts.length) return;
      const joined = parts.join(" ");
      if (/^(SCHEDULE|HOME|AWAY|Score|Results)$/i.test(joined)) return;
      if (/^(Game|Week|Round)\s+\d+/i.test(parts[0])) {
        round = parts[0];
        const date = parts.find((part) => /\d{1,2}\/\d{1,2}/.test(part));
        if (date) dateRange = date;
        return;
      }
      if (/^Byes?:/i.test(joined) || /^DNP Week/i.test(joined) || /All-Star Break/i.test(joined)) {
        rows.push({ season, stage, round, dateRange, home: "", result: "", away: "", winner: "", note: joined, pool: "", source: "manual" });
        return;
      }
      const resultIndex = parts.findIndex((part) => /(?:\(\d+\)\s*)?\d+\s*-\s*\d+(?:\s*\(\d+\))?/.test(part));
      if (resultIndex < 1 || resultIndex >= parts.length - 1) return;
      const homeName = team(parts[resultIndex - 1].replace(/\.$/, ""));
      const awayName = team(parts[resultIndex + 1].replace(/\.$/, ""));
      const result = cleanResult(parts[resultIndex]);
      rows.push({
        season,
        stage,
        round,
        dateRange,
        home: homeName,
        result,
        away: awayName,
        winner: team(scheduleWinner(homeName, result, awayName)),
        note: "",
        pool: schedulePool(season, stage, homeName, awayName),
        source: "manual",
      });
    });
    return rows;
  }

  const schedules = [
    ...[
      ["World Cup", "Round 1", "Sled Dawgs", "0 - 3", "Reef Donkeys", "Reef Donkeys", ""],
      ["World Cup", "Round 1", "Hoosier Daddy", "1 - 3", "Bigger Nehavior", "Bigger Nehavior", ""],
      ["World Cup", "Round 2", "Sled Dawgs", "3 - 2", "Hoosier Daddy", "Sled Dawgs", ""],
      ["World Cup", "Round 2", "Reef Donkeys", "3 - 1", "Bigger Nehavior", "Reef Donkeys", "12 - 5 aggregate"],
      ["World Cup", "Round 3", "Bigger Nehavior", "3 - 2", "Sled Dawgs", "Bigger Nehavior", ""],
      ["World Cup", "Round 3", "Hoosier Daddy", "0 - 3", "Reef Donkeys", "Reef Donkeys", ""],
      ["World Cup", "Championship", "Reef Donkeys", "4 - 0", "Bigger Nehavior", "Reef Donkeys", ""],
    ].map(([season, round, home, result, away, winner, note]) => ({
      season,
      stage: "overall",
      round,
      dateRange: "",
      home: team(home),
      result,
      away: team(away),
      winner: team(winner),
      note,
      pool: "",
      source: "manual",
    })),
    ...parseScheduleBlock("S1", "regular", `
Game 1
WIN	Two Inches Deep	3-0	Mostly Gay	LOSS
WIN	Coming, Melissa!	3-0	Demon Semen	LOSS
LOSS	2 Goals, 1 Cup	1-3	Glizzy Gobblers	WIN
Game 2
LOSS	Demon Semen	0-3	Two Inches Deep	WIN
WIN	Glizzy Gobblers	3-0	Mostly Gay	LOSS
LOSS	2 Goals, 1 Cup	1-3	Coming, Melissa!	WIN
Game 3
WIN	Two Inches Deep	3-1	Glizzy Gobblers	LOSS
WIN	Demon Semen	3-2	2 Goals, 1 Cup	LOSS
LOSS	Mostly Gay	0-3	Coming, Melissa!	WIN
Game 4
LOSS	2 Goals, 1 Cup	0-3	Two Inches Deep	WIN
LOSS	Coming, Melissa!	2-3	Glizzy Gobblers	WIN
WIN	Mostly Gay	3-1	Demon Semen	LOSS
Game 5
WIN	Two Inches Deep	3-1	Coming, Melissa!	LOSS
WIN	Mostly Gay	3-1	2 Goals, 1 Cup	LOSS
WIN	Glizzy Gobblers	3-0	Demon Semen	LOSS
Game 6
WIN	Two Inches Deep	3-0	Mostly Gay	LOSS
WIN	Coming, Melissa!	3-0	Demon Semen	LOSS
WIN	Glizzy Gobblers	3-0	2 Goals, 1 Cup	LOSS
Game 7
Demon Semen	0-0	Two Inches Deep
WIN	Glizzy Gobblers	3-1	Mostly Gay	LOSS
LOSS	2 Goals, 1 Cup	1-3	Coming, Melissa!	WIN
Game 8
LOSS	Two Inches Deep	1-3	Glizzy Gobblers	WIN
LOSS	Demon Semen	2-3	2 Goals, 1 Cup	WIN
LOSS	Mostly Gay	0-3	Coming, Melissa!	WIN
Game 9
WIN	2 Goals, 1 Cup	0-3	Two Inches Deep	WIN
LOSS	Coming, Melissa!	2-3	Glizzy Gobblers	WIN
WIN	Mostly Gay	3-0	Demon Semen	LOSS
Game 10
LOSS	Two Inches Deep	1-3	Coming, Melissa!	WIN
Mostly Gay	0-0	2 Goals, 1 Cup
WIN	Glizzy Gobblers	3-1	Demon Semen	LOSS
`),
    ...parseScheduleBlock("S2", "regular", `
Game 1
WIN	Epstein's Waitlist	(15) 3-1 (10)	Rough Sax	LOSS
WIN	Gravy Stain Boys	(8) 3-1 (5)	MegaWatt	LOSS
WIN	Smooth Jizz	(13) 3-2 (10)	Win-Dixies	LOSS
Game 2
WIN	Epstein's Waitlist	(7) 3-0 (1)	Gravy Stain Boys	LOSS
WIN	Rough Sax	(17) 3-2 (13)	Smooth Jizz	LOSS
LOSS	MegaWatt	(7) 0-3 (11)	Win-Dixies	WIN
Game 3
WIN	Epstein's Waitlist	(13) 3-1 (4)	MegaWatt	LOSS
WIN	Rough Sax	(10) 3-0 (5)	Win-Dixies	LOSS
WIN	Gravy Stain Boys	(9) 3-2 (5)	Smooth Jizz	LOSS
Game 4
WIN	Epstein's Waitlist	(7) 3-0 (4)	Smooth Jizz	LOSS
WIN	Rough Sax	(9) 3-0 (4)	MegaWatt	LOSS
WIN	Gravy Stain Boys	(10) 3-0 (1)	Win-Dixies	LOSS
Game 5
WIN	Epstein's Waitlist	(9) 3-0 (3)	Win-Dixies	LOSS
LOSS	Rough Sax	(7) 1-3 (12)	Gravy Stain Boys	WIN
LOSS	MegaWatt	(4) 0-3 (7)	Smooth Jizz	WIN
Game 6
LOSS	Rough Sax	(7) 0-3 (12)	Epstein's Waitlist	WIN
LOSS	MegaWatt	(9) 1-3 (11)	Gravy Stain Boys	WIN
LOSS	Win-Dixies	(4) 0-3 (7)	Smooth Jizz	WIN
Game 7
WIN	Gravy Stain Boys	(9) 3-1 (4)	Epstein's Waitlist	LOSS
LOSS	Smooth Jizz	(10) 2-3 (12)	Rough Sax	WIN
WIN	Win-Dixies	(12) 3-1 (9)	MegaWatt	LOSS
Game 8
LOSS	MegaWatt	(5) 1-3 (8)	Epstein's Waitlist	WIN
WIN	Win-Dixies	(12) 3-2 (9)	Rough Sax	LOSS
LOSS	Smooth Jizz	(4) 0-3 (11)	Gravy Stain Boys	WIN
Game 9
LOSS	Smooth Jizz	(8) 2-3 (12)	Epstein's Waitlist	WIN
LOSS	MegaWatt	(3) 0-3 (11)	Rough Sax	WIN
WIN	Win-Dixies	(8) 3-2 (14)	Gravy Stain Boys	LOSS
Game 10
LOSS	Win-Dixies	(2) 0-3 (8)	Epstein's Waitlist	WIN
WIN	Gravy Stain Boys	(14) 3-0 (3)	Rough Sax	LOSS
LOSS	Smooth Jizz	(12) 2-3 (15)	MegaWatt	WIN
`),
    ...parseScheduleBlock("S3", "regular", `
Game 1
WIN	Orange Cat Behavior	(7) 3-1 (4)	Wave Crash	LOSS
LOSS	Syndicate O' Scallywags	(10) 2-3 (14)	Dead In The Water	WIN
WIN	The Lamplighters	(10) 3-1 (4)	The Donald Bumps	LOSS
LOSS	Midwest Cornstars	(12) 1-3 (14)	Red Rockets SC	WIN
WIN	The Honkers	(13) 3-0 (4)	Cool	LOSS
Game 2
WIN	Orange Cat Behavior	(11) 3-0 (6)	Syndicate O' Scallywags	LOSS
LOSS	Wave Crash	(2) 1-3 (9)	The Lamplighters	WIN
WIN	Dead In The Water	(12) 3-2 (7)	Midwest Cornstars	LOSS
LOSS	The Donald Bumps	(12) 2-3 (13)	The Honkers	WIN
WIN	Red Rockets SC	(14) 3-1 (10)	Cool	LOSS
Game 3
WIN	The Lamplighters	(12) 3-2 (14)	Orange Cat Behavior	LOSS
LOSS	Syndicate O' Scallywags	(11) 1-3 (13)	Midwest Cornstars	WIN
LOSS	The Honkers	(8) 1-3 (12)	Wave Crash	WIN
LOSS	Cool	(10) 1-3 (15)	Dead In The Water	WIN
WIN	Red Rockets SC	(10) 3-1 (5)	The Donald Bumps	LOSS
Game 4
LOSS	Orange Cat Behavior	(5) 0-3 (11)	Midwest Cornstars	WIN
LOSS	The Honkers	(3) 0-3 (9)	The Lamplighters	WIN
LOSS	Cool	(9) 1-3 (20)	Syndicate O' Scallywags	WIN
WIN	Wave Crash	(14) 3-1 (12)	Red Rockets SC	LOSS
LOSS	Dead In The Water	(6) 0-3 (11)	The Donald Bumps	WIN
Game 5
WIN	The Honkers	(13) 3-1 (9)	Orange Cat Behavior	LOSS
WIN	Midwest Cornstars	(13) 3-0 (3)	Cool	LOSS
WIN	The Lamplighters	(10) 3-2 (11)	Red Rockets SC	LOSS
WIN	Syndicate O' Scallywags	(11) 3-1 (8)	The Donald Bumps	LOSS
LOSS	Dead In The Water	(12) 2-3 (11)	Wave Crash	WIN
Game 6
WIN	Orange Cat Behavior	(15) 3-0 (3)	Cool	LOSS
WIN	Red Rockets SC	(14) 3-2 (11)	The Honkers	LOSS
LOSS	The Donald Bumps	(7) 0-3 (11)	Midwest Cornstars	WIN
WIN	Dead In The Water	(8) 3-0 (1)	The Lamplighters	LOSS
WIN	Wave Crash	(14) 3-2 (12)	Syndicate O' Scallywags	LOSS
Game 7
WIN	Red Rockets SC	(13) 3-1 (9)	Orange Cat Behavior	LOSS
LOSS	Cool	(3) 0-3 (9)	The Donald Bumps	WIN
WIN	The Honkers	(10) 3-1 (8)	Dead In The Water	LOSS
LOSS	Midwest Cornstars	(11) 2-3 (16)	Wave Crash	WIN
WIN	The Lamplighters	(15) 3-2 (13)	Syndicate O' Scallywags	LOSS
Game 8
LOSS	Orange Cat Behavior	(1) 0-3 (4)	The Donald Bumps	WIN
LOSS	Dead In The Water	(6) 1-3 (12)	Red Rockets SC	WIN
WIN	Wave Crash	(18) 3-0 (3)	Cool	LOSS
WIN	Syndicate O' Scallywags	(13) 3-2 (18)	The Honkers	LOSS
WIN	The Lamplighters	(10) 3-2 (12)	Midwest Cornstars	LOSS
Game 9
LOSS	Dead In The Water	(5) 1-3 (7)	Orange Cat Behavior	WIN
WIN	The Donald Bumps	(12) 3-1 (9)	Wave Crash	LOSS
WIN	Red Rockets SC	(14) 3-1 (7)	Syndicate O' Scallywags	LOSS
LOSS	Cool	(9) 2-3 (11)	The Lamplighters	WIN
LOSS	The Honkers	(8) 2-3 (13)	Midwest Cornstars	WIN
`),
    ...parseScheduleBlock("S4", "regular", `
Week 1	3/24-3/30
LOSS	Bean Bandits	(10) 1-3 (11)	Team Kawaii	WIN
DNP	Cock N' Load	(0) 0-0 (0)	Passing's 4 Wimps SC	DNP
LOSS	Cucksirs	(8) 1-3 (14)	Stinky Pinkies	WIN
WIN	Team ZAZ	(9) 3-1 (6)	The Autisticats	LOSS
WIN	Tire Benders	(8) 3-2 (7)	Open Net A-Miss-Ianados	LOSS
LOSS	Three Inch Fury	(7) 1-3 (10)	Sweaty Sweepers	WIN
Bye: Brock & The Brockettes
Week 2	3/31-4/06
WIN	Sweaty Sweepers	(14) 3-1 (10)	The Autisticats	LOSS
WIN	Brock & The Brockettes	(15) 3-2 (15)	Stinky Pinkies	LOSS
LOSS	Three Inch Fury	(12) 2-3 (13)	Passing's 4 Wimps SC	WIN
WIN	Tire Benders	(13) 3-2 (11)	Team Kawaii	LOSS
WIN	Cucksirs	(9) 3-0 (2)	Cock N' Load	LOSS
DNP	Team ZAZ	(0) 0-0 (0)	Bean Bandits	DNP
Bye: Open Net A-Miss-Ianados
Week 3	4/07-4/13
WIN	Team Kawaii	(8) 3-1 (6)	Passing's 4 Wimps SC	LOSS
LOSS	Bean Bandits	(3) 0-3 (13)	Stinky Pinkies	WIN
LOSS	Cock N' Load	(8) 1-3 (11)	The Autisticats	WIN
WIN	Cucksirs	(10) 3-2 (9)	Open Net A-Miss-Ianados	LOSS
LOSS	Team ZAZ	(3) 0-3 (9)	Sweaty Sweepers	WIN
WIN	Tire Benders	(10) 3-0 (6)	Brock & The Brockettes	LOSS
Bye: Three Inch Fury
Week 4	4/14-4/20
LOSS	Open Net A-Miss-Ianados	(8) 1-3 (14)	Stinky Pinkies	WIN
WIN	Sweaty Sweepers	(13) 3-0 (3)	Passing's 4 Wimps SC	LOSS
WIN	Brock & The Brockettes	(14) 3-2 (10)	Team Kawaii	LOSS
DNP	Three Inch Fury	(0) 0-0 (0)	Bean Bandits	DNP
WIN	Tire Benders	(12) 3-1 (10)	Cock N' Load	LOSS
LOSS	Team ZAZ	(12) 2-3 (13)	Cucksirs	WIN
Bye: The Autisticats
Week 5	4/21-4/27
WIN	Passing's 4 Wimps SC	(24) 3-2 (21)	Stinky Pinkies	LOSS
LOSS	Team Kawaii	(9) 1-3 (13)	The Autisticats	WIN
WIN	Bean Bandits	(10) 3-1 (6)	Open Net A-Miss-Ianados	LOSS
LOSS	Cock N' Load	(8) 1-3 (16)	Sweaty Sweepers	WIN
DNP	Cucksirs	(0) 0-0 (0)	Brock & The Brockettes	DNP
LOSS	Team ZAZ	(15) 2-3 (17)	Three Inch Fury	WIN
Bye: Tire Benders
Week 6	4/28-5/04
WIN	The Autisticats	(11) 3-1 (6)	Passing's 4 Wimps SC	LOSS
WIN	Open Net A-Miss-Ianados	(10) 3-0 (3)	Team Kawaii	LOSS
WIN	Sweaty Sweepers	(13) 3-2 (14)	Bean Bandits	LOSS
WIN	Brock & The Brockettes	(11) 3-0 (2)	Cock N' Load	LOSS
LOSS	Three Inch Fury	(4) 0-3 (8)	Cucksirs	WIN
LOSS	Tire Benders	(7) 1-3 (12)	Team ZAZ	WIN
Bye: Stinky Pinkies
Week 7	5/05-5/11
WIN	Stinky Pinkies	(11) 3-1 (6)	The Autisticats	LOSS
WIN	Passing's 4 Wimps SC	(8) 3-2 (6)	Open Net A-Miss-Ianados	LOSS
LOSS	Team Kawaii	(4) 0-3 (13)	Sweaty Sweepers	WIN
WIN	Bean Bandits	(11) 3-1 (7)	Brock & The Brockettes	LOSS
DNP	Cock N' Load	(0) 0-0 (0)	Three Inch Fury	DNP
LOSS	Cucksirs	(8) 1-3 (12)	Tire Benders	WIN
Bye: Team ZAZ
Week 8	5/26-6/01
WIN	Stinky Pinkies	(12) 3-0 (4)	Team Kawaii	LOSS
DNP	The Autisticats	(0) 0-0 (0)	Bean Bandits	DNP
DNP	Open Net A-Miss-Ianados	(0) 0-0 (0)	Cock N' Load	DNP
WIN	Sweaty Sweepers	(9) 3-0 (5)	Cucksirs	LOSS
DNP	Brock & The Brockettes	(0) 0-0 (0)	Team ZAZ	DNP
LOSS	Three Inch Fury	(5) 0-3 (8)	Tire Benders	WIN
Bye: Passing's 4 Wimps SC
Week 9	6/02-6/08
WIN	The Autisticats	(7) 3-2 (6)	Open Net A-Miss-Ianados	LOSS
LOSS	Stinky Pinkies	(7) 0-3 (12)	Sweaty Sweepers	WIN
LOSS	Passing's 4 Wimps SC	(12) 2-3 (17)	Brock & The Brockettes	WIN
LOSS	Team Kawaii	(14) 2-3 (14)	Three Inch Fury	WIN
LOSS	Bean Bandits	(3) 0-3 (14)	Tire Benders	WIN
WIN	Cock N' Load	(15) 3-1 (7)	Team ZAZ	LOSS
Bye: Cucksirs
Week 10	6/09-6/15
DNP	Passing's 4 Wimps SC	(0) 0-0 (0)	Bean Bandits	DNP
LOSS	Stinky Pinkies	(14) 2-3 (16)	Cock N' Load	WIN
LOSS	The Autisticats	(2) 0-3 (12)	Cucksirs	WIN
LOSS	Open Net A-Miss-Ianados	(3) 2-3 (11)	Team ZAZ	WIN
LOSS	Sweaty Sweepers	(5) 1-3 (10)	Tire Benders	WIN
LOSS	Brock & The Brockettes	(10) 2-3 (15)	Three Inch Fury	WIN
Bye: Team Kawaii
Week 11	6/16-6/22
LOSS	Open Net A-Miss-Ianados	(8) 0-3 (12)	Sweaty Sweepers	WIN
LOSS	The Autisticats	(8) 1-3 (11)	Brock & The Brockettes	WIN
LOSS	Stinky Pinkies	(9) 2-3 (11)	Three Inch Fury	WIN
WIN	Passing's 4 Wimps SC	(10) 3-2 (9)	Tire Benders	LOSS
LOSS	Team Kawaii	(7) 1-3 (8)	Team ZAZ	WIN
DNP	Bean Bandits	(0) 0-0 (0)	Cucksirs	DNP
Bye: Cock N' Load
Week 12	6/23-6/29
WIN	Team Kawaii	(13) 3-1 (10)	Cock N' Load	LOSS
WIN	Passing's 4 Wimps SC	(9) 3-0 (4)	Cucksirs	LOSS
WIN	Stinky Pinkies	(8) 3-0 (3)	Team ZAZ	LOSS
LOSS	The Autisticats	(5) 1-3 (16)	Tire Benders	WIN
WIN	Open Net A-Miss-Ianados	(19) 3-2 (17)	Three Inch Fury	LOSS
WIN	Sweaty Sweepers	(11) 3-0 (5)	Brock & The Brockettes	LOSS
Bye: Bean Bandits
Week 13	6/30-7/06
WIN	Brock & The Brockettes	(5) 3-2 (8)	Open Net A-Miss-Ianados	LOSS
WIN	Three Inch Fury	(7) 3-1 (7)	The Autisticats	LOSS
WIN	Tire Benders	(10) 3-1 (7)	Stinky Pinkies	LOSS
WIN	Team ZAZ	(18) 3-2 (14)	Passing's 4 Wimps SC	LOSS
WIN	Cucksirs	(15) 3-1 (6)	Team Kawaii	LOSS
DNP	Cock N' Load	(0) 0-0 (0)	Bean Bandits	DNP
Bye: Sweaty Sweepers
`),
    ...parseScheduleBlock("S5", "split1", `
Week 1	10/12-10/18
Win	Danger Pings	(9) 3-1 (7)	Weenie Hut Jrs.	Loss
Loss	D' n' the V's	(7) 0-3 (10)	Wouldabeendope	Win
Loss	The Hornets	(14) 2-3 (14)	Big Musty Milkers	Win
Win	Bird Bath Bombers	(10) 3-0 (1)	Pitch Pirates	Loss
Win	Weenie Hut Jrs.	(13) 3-2 (6)	Triple Scoop	Loss
Week 2	10/12-10/18
Loss	Danger Pings	(6) 2-3 (10)	D' n' the V's	Win
Win	Big Musty Milkers	(10) 3-2 (6)	Milk Before Cereal	Loss
Loss	The Hornets	(5) 0-3 (17)	Bird Bath Bombers	Win
Win	Triple Scoop	(11) 3-1 (10)	Wouldabeendope	Loss
Week 3	10/19-10/25
Win	Weenie Hut Jrs.	(12) 3-2 (12)	D' n' the V's	Loss
Loss	Milk Before Cereal	(5) 0-3 (10)	Pitch Pirates	Win
Win	Big Musty Milkers	(16) 3-2 (11)	Bird Bath Bombers	Loss
Loss	D' n' the V's	(4) 0-3 (11)	Triple Scoop	Win
Week 4	10/26-11/1
Win	Wouldabeendope	(9) 3-0 (4)	Danger Pings	Loss
Loss	Bird Bath Bombers	(11) 2-3 (13)	Milk Before Cereal	Win
Loss	Pitch Pirates	(7) 1-3 (10)	The Hornets	Win
Win	Triple Scoop	(13) 3-2 (10)	Danger Pings	Loss
Week 5	11/2-11/8
Loss	Wouldabeendope	(5) 1-3 (10)	Weenie Hut Jrs.	Win
Win	Milk Before Cereal	(12) 3-0 (5)	The Hornets	Loss
Loss	Pitch Pirates	(7) 2-3 (8)	Big Musty Milkers	Win
`),
    ...parseScheduleBlock("S5", "split2", `
Week 6	11/9-11/15
Loss	Danger Pings	(5) 2-3 (9)	Pitch Pirates	Win
Win	Bird Bath Bombers	(20) 3-2 (11)	D' n' the V's	Loss
Win	Big Musty Milkers	(11) 3-0 (4)	Wouldabeendope	Loss
Loss	Triple Scoop	(3) 0-3 (9)	Weenie Hut Jrs	Win
Loss	Pitch Pirates	(7) 1-3 (11)	The Hornets	Win
Week 7	11/16-11/22
Loss	Danger Pings	(9) 0-3 (15)	Bird Bath Bombers	Win
Loss	Wouldabeendope	(5) 0-3 (11)	Milk Before Cereal	Win
Loss	Big Musty Milkers	(4) 0-3 (10)	Triple Scoop	Win
Win	The Hornets	(10) 3-1 (6)	D' n' the V's	Loss
Week 8	11/23-11/29
Win	Pitch Pirates	(11) 3-2 (12)	Bird Bath Bombers	Loss
Loss	Milk Before Cereal	(12) 2-3 (15)	Weenie Hut Jrs	Win
Loss	Wouldabeendope	(6) 1-3 (8)	Triple Scoop	Win
Win	D' n' the V's	(10) 3-2 (6)	Danger Pings	Loss
Week 9	11/30-12/6
Loss	Bird Bath Bombers	(10) 0-3 (15)	The Hornets	Win
Win	Weenie Hut Jrs	(12) 3-2 (8)	Big Musty Milkers	Loss
Win	Triple Scoop	(7) 3-0 (2)	Milk Before Cereal	Loss
Loss	D' n' the V's	(11) 2-3 (15)	Pitch Pirates	Win
Week 10	12/7-12/13
Win	The Hornets	(9) 3-0 (4)	Danger Pings	Loss
Win	Weenie Hut Jrs	(12) 3-2 (9)	Wouldabeendope	Loss
Loss	Milk Before Cereal	(9) 1-3 (15)	Big Musty Milkers	Win
`),
    ...parseScheduleBlock("S5", "swiss", `
Round 1
Weenie Hut Jrs	(10) 3-0 (2)	Danger Pings
Triple Scoop	(13) 3-2 (10)	D' n' the V's
Bird Bath Bombers	(15) 3-1 (9)	Wouldabeendope
Pitch Pirates	(10) 3-0 (6)	Milk Before Cereal
Round 2
Weenie Hut Jrs	(15) 3-0 (7)	Pitch Pirates
Triple Scoop	(12) 3-1 (10)	Bird Bath Bombers
Milk Before Cereal	(10) 3-0 (7)	Danger Pings
Wouldabeendope	(3) 0-3 (12)	D' n' the V's
`),
    ...[
      ["Results", "Weenie Hut Jrs", "", "", "2-0 / Upper"],
      ["Results", "Triple Scoop", "", "", "2-0 / Upper"],
      ["Results", "Pitch Pirates", "", "", "1-1 / Lower"],
      ["Results", "Bird Bath Bombers", "", "", "1-1 / Lower"],
      ["Results", "Milk Before Cereal", "", "", "1-1 / Lower"],
      ["Results", "D' n' the V's", "", "", "1-1 / Lower"],
      ["Results", "Wouldabeendope", "", "", "0-2 / Eliminated"],
      ["Results", "Danger Pings", "", "", "0-2 / Eliminated"],
      ["Split Winners", "Big Musty Milkers", "", "", "Split Winners / Upper"],
      ["Split Winners", "The Hornets", "", "", "Split Winners / Upper"],
    ].map(([round, home, result, away, note]) => ({
      season: "S5",
      stage: "swiss",
      round,
      dateRange: "",
      home: team(home),
      result,
      away: team(away),
      winner: "",
      note,
      pool: "",
      source: "manual",
    })),
    ...parseScheduleBlock("S6", "group", `
Week 1
Loss	Crossbar Cartel	(6) 0-3 (11)	The Cox	Win
Loss	Deceptitards	(11) 2-3 (10)	Supernova Abyss	Win
Win	Past Our Prime	(15) 3-2 (14)	Ball Chasin & Sauce Tastin	Loss
ESC	(0) 0-0 (0)	Giga's In Paris
Win	Hook Line & Blinker	(12) 3-2 (8)	Quack Wok	Loss
Byes: Spirit Airlines, Best Friends Club
Week 2
Hook Line & Blinker	(0) 0-0 (0)	Giga's In Paris
Win	Best Friends Club	(12) 3-2 (13)	Spirit Airlines	Loss
Win	Quack Wok	(6) 3-0 (3)	ESC	Loss
Ball Chasin & Sauce Tastin	(0) 0-0 (0)	The Cox
Crossbar Cartel	(0) 0-0 (0)	Past Our Prime
Byes: Supernova Abyss, Deceptitards
Week 3
Win	Ball Chasin & Sauce Tastin	(12) 3-2 (15)	Deceptitards	Loss
Supernova Abyss	(0) 0-0 (0)	Crossbar Cartel
The Cox	(0) 0-0 (0)	Past Our Prime
Spirit Airlines	(0) 0-0 (0)	ESC
Quack Wok	(0) 0-0 (0)	Best Friends Club
Byes: Hook Line & Blinker, Giga's In Paris
Week 4
Win	ESC	(20) 3-2 (7)	Best Friends Club	Loss
Loss	Spirit Airlines	(6) 0-3 (12)	Hook Line & Blinker	Win
Win	Giga's In Paris	(15) 3-1 (5)	Quack Wok	Loss
Supernova Abyss	(0) 0-0 (0)	Ball Chasin & Sauce Tastin
Past Our Prime	(0) 0-0 (0)	Deceptitards
Byes: Crossbar Cartel, The Cox
Week 5
Loss	Crossbar Cartel	(5) 1-3 (11)	Ball Chasin & Sauce Tastin	Win
Loss	Deceptitards	(4) 0-3 (13)	The Cox	Win
Win	Past Our Prime	(12) 3-2 (11)	Supernova Abyss	Loss
Win	Giga's In Paris	(8) 3-0 (2)	Spirit Airlines	Loss
Loss	Best Friends Club	(8) 2-3 (15)	Hook Line & Blinker	Win
Byes: Quack Wok, ESC
Week 6
Hook Line & Blinker	(0) 0-0 (0)	ESC
Loss	Best Friends Club	(5) 1-3 (11)	Giga's In Paris	Win
Quack Wok	(0) 0-0 (0)	Spirit Airlines
Loss	The Cox	(12) 1-3 (14)	Supernova Abyss	Win
Loss	Deceptitards	(13) 2-3 (14)	Crossbar Cartel	Win
Byes: Past Our Prime, Ball Chasin & Sauce Tastin
`),
    ...parseScheduleBlock("S6", "swiss", `
Round 1
G1	(0) 0-0 (0)	T6
G2	(0) 0-0 (0)	T5
G3	(0) 0-0 (0)	T4
T1	(0) 0-0 (0)	G6
T2	(0) 0-0 (0)	G5
T3	(0) 0-0 (0)	G4
Round 2
(0) 0-0 (0)
(0) 0-0 (0)
(0) 0-0 (0)
Round 3
(0) 0-0 (0)
(0) 0-0 (0)
(0) 0-0 (0)
Round 4
(0) 0-0 (0)	Promoted Team
(0) 0-0 (0)
(0) 0-0 (0)
Demoted Team	(0) 0-0 (0)
(0) 0-0 (0)
`),
    ...[
      ["Round 2", "1-0 Match 1", "(0) 0 - 0 (0)", "1-0 Match 2", ""],
      ["Round 2", "1-0 Match 3", "(0) 0 - 0 (0)", "1-0 Match 4", ""],
      ["Round 2", "1-0 Match 5", "(0) 0 - 0 (0)", "1-0 Match 6", ""],
      ["Round 2", "0-1 Match 1", "(0) 0 - 0 (0)", "0-1 Match 2", ""],
      ["Round 2", "0-1 Match 3", "(0) 0 - 0 (0)", "0-1 Match 4", ""],
      ["Round 2", "0-1 Match 5", "(0) 0 - 0 (0)", "0-1 Match 6", ""],
      ["Round 3", "2-0 Bye 1", "", "", "+2"],
      ["Round 3", "2-0 Bye 2", "", "", "+2"],
      ["Round 3", "2-0 Bye 3", "", "", "+2"],
      ["Round 3", "1-1 Match 1", "(0) 0 - 0 (0)", "1-1 Match 2", ""],
      ["Round 3", "1-1 Match 3", "(0) 0 - 0 (0)", "1-1 Match 4", ""],
      ["Round 3", "1-1 Match 5", "(0) 0 - 0 (0)", "1-1 Match 6", ""],
      ["Round 3", "0-2 Bye 1", "", "", "+0"],
      ["Round 3", "0-2 Bye 2", "", "", "+0"],
      ["Round 3", "0-2 Bye 3", "", "", "+0"],
      ["Round 4", "2-0 Team", "(0) 0 - 0 (0)", "Promoted Team", "Highest 2-1 team by points is promoted to play highest 2-0 team by points."],
      ["Round 4", "2-0 Team", "(0) 0 - 0 (0)", "2-1 Team", ""],
      ["Round 4", "2-1 Team", "(0) 0 - 0 (0)", "2-1 Team", ""],
      ["Round 4", "1-2 Team", "(0) 0 - 0 (0)", "1-2 Team", ""],
      ["Round 4", "Demoted Team", "(0) 0 - 0 (0)", "0-2 Team", "Lowest 1-2 team by points is demoted to play lowest 0-2 team by points."],
      ["Round 4", "0-2 Team", "(0) 0 - 0 (0)", "0-2 Team", "Winners/losers feed U, Q, L, E slots after Round 4."],
    ].map(([round, home, result, away, note]) => ({
      season: "S6",
      stage: "swiss",
      round,
      dateRange: "",
      home,
      result,
      away,
      winner: "",
      note,
      pool: "",
      source: "manual",
    })),
  ];

  const playoffs = [
    ["S1 Playoffs", "Note", "See Keppen for details.", "", ""],
    ["S2 Playoffs", "Placements", "WIN-DIXIES", "4 - 0", "SMOOTH JIZZ"],
    ["S2 Playoffs", "Placements", "ROUGH SAX", "1 - 4", "MEGAWATT"],
    ["S2 Playoffs", "Semi-Finals", "EPSTEIN'S WAITLIST", "4 - 0", "MEGAWATT"],
    ["S2 Playoffs", "Semi-Finals", "GRAVY STAIN BOYS", "4 - 2", "WIN-DIXIES"],
    ["S2 Playoffs", "Championship", "EPSTEIN'S WAITLIST", "1 - 4", "GRAVY STAIN BOYS"],
    ["S3 Playoffs", "Play-In", "ORANGE CAT BEHAVIOR", "1 - 3", "COOL"],
    ["S3 Playoffs", "Play-In", "DEAD IN THE WATER", "2 - 3", "SYNDICATE O' SCALLYWAGS"],
    ["S3 Playoffs", "Quarter-Finals", "THE LAMPLIGHTERS", "2 - 4", "COOL"],
    ["S3 Playoffs", "Quarter-Finals", "MIDWEST CORNSTARS", "1 - 4", "SYNDICATE O' SCALLYWAGS"],
    ["S3 Playoffs", "Quarter-Finals", "RED ROCKETS SC", "4 - 1", "THE HONKERS"],
    ["S3 Playoffs", "Quarter-Finals", "WAVE CRASH", "1 - 4", "THE DONALD BUMPS"],
    ["S3 Playoffs", "Semi-Finals", "RED ROCKETS SC", "4 - 0", "SYNDICATE O' SCALLYWAGS"],
    ["S3 Playoffs", "Semi-Finals", "THE DONALD BUMPS", "1 - 4", "COOL"],
    ["S3 Playoffs", "Championship", "RED ROCKETS SC", "4 - 0", "COOL"],
    ["S4 Playoffs", "Elimination", "Passing's 4 Wimps SC", "4 - 1", "The Autisticats"],
    ["S4 Playoffs", "Elimination", "Team ZAZ", "3 - 4", "Team Kawaii"],
    ["S4 Playoffs", "Elimination", "Three Inch Fury", "4 - 2", "Open Net A-Miss-Ianados"],
    ["S4 Playoffs", "Quarter-Finals", "Sweaty Sweepers", "4 - 1", "Passing's 4 Wimps SC"],
    ["S4 Playoffs", "Quarter-Finals", "Tire Benders", "4 - 2", "Team Kawaii"],
    ["S4 Playoffs", "Quarter-Finals", "Stinky Pinkies", "2 - 4", "Three Inch Fury"],
    ["S4 Playoffs", "Quarter-Finals", "Cucksirs", "4 - 0", "Brock & The Brockettes"],
    ["S4 Playoffs", "Semi-Finals", "Sweaty Sweepers", "4 - 2", "Cucksirs"],
    ["S4 Playoffs", "Semi-Finals", "Tire Benders", "3 - 4", "Three Inch Fury"],
    ["S4 Playoffs", "Championship", "Sweaty Sweepers", "Champion", "Three Inch Fury"],
    ["S5 Playoffs", "Elimination", "Weenie Hut Jrs", "(9) 4 - 0 (4)", "The Hornets"],
    ["S5 Playoffs", "Elimination", "Bird Bath Bombers", "(8) 0 - 4 (12)", "Milk Before Cereal"],
    ["S5 Playoffs", "Elimination", "Big Musty Milkers", "(15) 4 - 0 (9)", "Triple Scoop"],
    ["S5 Playoffs", "Elimination", "Pitch Pirates", "(14) 4 - 1 (10)", "D' n' the V's"],
    ["S5 Playoffs", "Quarter-Finals", "Triple Scoop", "(17) 4 - 1 (5)", "Milk Before Cereal"],
    ["S5 Playoffs", "Quarter-Finals", "The Hornets", "(11) 1 - 4 (17)", "Pitch Pirates"],
    ["S5 Playoffs", "Semi-Finals", "Weenie Hut Jrs", "(17) 4 - 1 (9)", "Triple Scoop"],
    ["S5 Playoffs", "Semi-Finals", "Big Musty Milkers", "(13) 4 - 1 (3)", "Pitch Pirates"],
    ["S5 Playoffs", "Championship", "Weenie Hut Jrs", "4 - 2", "Big Musty Milkers", "", "4 - 2", "Ramen"],
    ["S5 Playoffs", "Championship Game", "Weenie Hut Jrs", "4 - 0", "Big Musty Milkers", "1", "1 - 0", "Ramen"],
    ["S5 Playoffs", "Championship Game", "Weenie Hut Jrs", "3 - 2", "Big Musty Milkers", "2", "2 - 0", "Ramen"],
    ["S5 Playoffs", "Championship Game", "Weenie Hut Jrs", "3 - 1", "Big Musty Milkers", "3", "3 - 0", "Ramen"],
    ["S5 Playoffs", "Championship Game", "Weenie Hut Jrs", "0 - 3", "Big Musty Milkers", "4", "3 - 1", "Aximov"],
    ["S5 Playoffs", "Championship Game", "Weenie Hut Jrs", "1 - 7", "Big Musty Milkers", "5", "3 - 2", "Aximov"],
    ["S5 Playoffs", "Championship Game", "Weenie Hut Jrs", "1 - 0", "Big Musty Milkers", "6", "4 - 2", "Ramen"],
  ].map(([season, round, teamA, result, teamB, game = "", series = "", mvp = ""]) => ({
    season,
    round,
    game,
    teamA: team(teamA),
    result,
    teamB: team(teamB),
    series,
    mvp: player(mvp),
    source: "manual",
  }));

  function applyTeamRecordsToPlayers() {
    const teamsBySeason = new Map(teams.map((row) => [`${row.season}|${row.name}`, row]));
    players.forEach((row) => {
      const teamName = (row.teams || [])[0];
      const teamRow = teamsBySeason.get(`${row.season}|${teamName}`);
      if (!teamRow) return;
      row.wins = teamRow.wins || 0;
      row.losses = teamRow.losses || 0;
      row.gameWins = typeof teamRow.gameWins === "number" ? teamRow.gameWins : row.wins;
      row.gameLosses = typeof teamRow.gameLosses === "number" ? teamRow.gameLosses : row.losses;
    });
  }

  teams.forEach(finalizeCommon);
  applyTeamRecordsToPlayers();
  players.forEach(finalizeCommon);
  const schedulePairKey = (home, away) => [team(home), team(away)].sort().join("|");
  const s6GroupVods = new Map([
    [schedulePairKey("Deceptitards", "Supernova Abyss"), "https://www.youtube.com/watch?v=Y7nUHphGQFI"],
    [schedulePairKey("Past Our Prime", "Supernova Abyss"), "https://www.youtube.com/watch?v=wSkg_r4RAbQ"],
    [schedulePairKey("The Cox", "Crossbar Cartel"), "https://www.youtube.com/watch?v=txE-LvdOnQQ"],
    [schedulePairKey("ESC", "Best Friends Club"), "https://www.youtube.com/watch?v=uWLodujT-r4"],
    [schedulePairKey("Spirit Airlines", "Hook Line & Blinker"), "https://www.youtube.com/watch?v=VHpBSBQgAa8"],
    [schedulePairKey("Best Friends Club", "Spirit Airlines"), "https://www.youtube.com/watch?v=sX44mwvKDEU"],
    [schedulePairKey("Hook Line & Blinker", "Quack Wok"), "https://www.youtube.com/watch?v=fEsYbXPfkFg"],
    [schedulePairKey("Past Our Prime", "Ball Chasin & Sauce Tastin"), "https://www.youtube.com/watch?v=z_EsuN_HO4I"],
    [schedulePairKey("Giga's In Paris", "Best Friends Club"), "https://www.youtube.com/watch?v=uovRVsUuQXE"],
  ]);
  schedules.forEach((row) => {
    if (row.season !== "S6" || row.stage !== "group") return;
    const vod = s6GroupVods.get(schedulePairKey(row.home, row.away));
    if (vod) row.vod = vod;
  });

  window.RL_MANUAL_HISTORY = { teams, players, teamInfo, playoffs, draft, schedules };
})();
