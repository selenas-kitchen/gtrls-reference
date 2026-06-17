(function () {
  const playerAliases = new Map([
    ["AXIMOV", "Ax1mov"],
    ["AXIM0V", "Ax1mov"],
    ["AX1MOV", "Ax1mov"],
    ["DIASTRIKO", "Ax1mov"],
    ["EPONTIOUS", "EPo -_-"],
    ["THELAKEEFFEKT", "TheLakeEffekt"],
    ["ATOWNSTEELERS", "AtownSteelers"],
    ["DUKEOFDOPE7", "Dukeofdope7"],
    ["DIALCOWGS94", "dailcowgs94"],
    ["DAILCOWGS94", "dailcowgs94"],
    ["VAL3NOR", "Val-enor"],
    ["VALENOR", "Val-enor"],
    ["LILHATEDONE", "LIL HATED ONE"],
    ["MADJANITOR88", "MadJanitor88"],
    ["COALTRAINLLC", "CoalTrainLLC"],
    ["POOLNOODLE412", "PoolnoodlE_412"],
    ["SIRVANTZZZ", "Sir_vantzzz"],
    ["SELENAGOMEZ415", "Selena Gomez"],
    ["SKITTLEZ", "SirSkittleZ"],
    ["HATEDONE", "LIL HATED ONE"],
    ["LILHATEDONE", "LIL HATED ONE"],
    ["THELAKEEFFEKT", "TheLakeEffekt"],
    ["MADJANITOR", "MadJanitor88"],
    ["IMmABLURR", "IMMa_Blurr"],
    ["IMMABLURR", "IMMa_Blurr"],
    ["GOIG", "go1g_"],
    ["GTDAIL", "GTdail"],
  ]);

  const teamAliases = new Map([
    ["GIGASINPARIS", "GIGAS IN PARIS"],
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

  function teamRow(season, name, games, gameRecord, score, goals, goalsAgainst, assists, saves, shots, extra = {}) {
    const [wins, losses] = record(gameRecord);
    return {
      season,
      name: team(name),
      games,
      gameWins: wins,
      gameLosses: losses,
      wins,
      losses,
      standingsPoints: Number(extra.standingsPoints ?? score ?? 0),
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
    row.winPct = Math.round(((row.wins || 0) / games) * 1000) / 10;
    row.avgScore = Math.round(((row.score || 0) / games) * 10) / 10;
    row.goalsPerGame = Math.round(((row.goals || 0) / games) * 100) / 100;
    row.assistsPerGame = Math.round(((row.assists || 0) / games) * 100) / 100;
    row.savesPerGame = Math.round(((row.saves || 0) / games) * 100) / 100;
    row.shotsPerGame = Math.round(((row.shots || 0) / games) * 100) / 100;
    row.shotsConcededPerGame = Math.round(((row.shotsConceded || 0) / games) * 100) / 100;
    row.goalsConcededPerGame = Math.round(((row.goalsConceded || 0) / games) * 100) / 100;
    row.per = typeof row.per === "number" ? row.per : Math.round(((0.1 * (row.goals || 0)) + (0.05 * (row.assists || 0)) + ((2 / 30) * (row.saves || 0)) + (0.01 * (row.shots || 0)) - (games * 0.1)) * 100) / 100;
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
    ["Two Inches Deep", "Troy", "SlapShots1324", 32, "23-9", 17328, 58, 30, 39, 144],
    ["Two Inches Deep", "Kellen", "TheLakeEffekt", 32, "23-9", 16427, 73, 12, 36, 130],
    ["Coming, Melissa!", "Brock", "AtownSteelers", 31, "20-11", 20202, 74, 22, 58, 161],
    ["Coming, Melissa!", "Garcia", "DukeofDope7", 31, "20-11", 13371, 33, 26, 50, 79],
    ["2 Goals, 1 Cup", "Duncan", "Dunkappotamusrex", 31, "7-24", 11379, 34, 17, 25, 84],
    ["2 Goals, 1 Cup", "Logan", "Kuhlbeans", 31, "7-24", 12157, 30, 14, 43, 81],
    ["Glizzy Gobblers", "Seth", "Diastriko", 35, "25-10", 23193, 99, 29, 42, 186],
    ["Glizzy Gobblers", "Clayton", "Gonslinger", 35, "25-10", 16667, 50, 48, 35, 109],
    ["Demon Semen", "Riley", "Rickbob12", 26, "7-19", 11521, 38, 8, 34, 84],
    ["Demon Semen", "Drew", "Lil_Otter13", 26, "7-19", 6173, 12, 11, 20, 42],
    ["Mostly Gay", "Dail", "dailcowgs94", 31, "11-20", 11486, 29, 15, 36, 56],
    ["Mostly Gay", "Jonah", "godfatherjones", 31, "11-20", 14651, 41, 14, 45, 103],
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
  ];

  function addAggregatedTeamRowsFromPlayers(players) {
    const byTeam = new Map();
    players.forEach((row) => {
      const keyName = `${row.season}|${row.teams[0]}`;
      if (!byTeam.has(keyName)) {
        byTeam.set(keyName, teamRow(row.season, row.teams[0], row.games, `${row.wins}-${row.losses}`, 0, 0, 0, 0, 0, 0, { standingsPoints: 0 }));
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
  ];

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
    ["S5", "D' n' the V's", "Dail", "Estadio Vida", "US E", 647.7, "Train", "Train"],
    ["S5", "Big Musty Milkers", "Aximov", "Mannfield Park (Not Day)", "US E", 647.7, "Gravy", "Gravy"],
    ["S5", "Wouldabeendope", "KWNSquid", "Farmstead", "US E", 647.3, "Train", "Gravy"],
    ["S5", "Bird Bath Bombers", "Bubbles3913", "Fordidden Temple", "US E", 647.0, "Gravy", "Train"],
    ["S5", "The Hornets", "Atownsteelers", "Rivals Arena", "US E", 646.3, "Gravy", "Train"],
    ["S5", "Pitch Pirates", "Original_6_Hawks", "Beckwith Park", "US E", 646.3, "Gravy", "Train"],
    ["S5", "Triple Scoop", "Epontious", "Salty Shores Night", "US E", 644.0, "Train", "Gravy"],
    ["S5", "Weenie Hut Jrs", "Ramen", "Aquadome", "US E", 642.3, "Train", "Gravy"],
    ["S5", "Milk Before Cereal", "RoyalxRenegade", "Neo Tokyo (Arcade)", "US E", 640.3, "Gravy", "Gravy"],
    ["S5", "Danger Pings", "JulietAlphaRomeo", "Deadeye Canyon (Oasis)", "US E", 637.3, "Train", "Train"],
  ].map(([season, teamName, captain, homeStadium, homeServer, averageMmr, firstSplitPool, secondSplitPool]) => ({
    season,
    team: team(teamName),
    captain: player(captain),
    homeStadium,
    homeServer,
    averageMmr,
    firstSplitPool,
    secondSplitPool,
  }));
  teamInfo.push(...s5TeamInfo);

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

  const playoffs = [
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
    ["S5 Playoffs", "Playoffs", "BMM", "4 - 0", "Triple Scoop"],
    ["S5 Playoffs", "Playoffs", "BMM", "4 - 1", "Pitch Pirates"],
    ["S5 Playoffs", "Championship", "Weenie Hut Jrs", "Champion", "BMM"],
  ].map(([season, round, teamA, result, teamB]) => ({ season, round, teamA: team(teamA), result, teamB: team(teamB), source: "manual" }));

  teams.forEach(finalizeCommon);
  players.forEach(finalizeCommon);

  window.RL_MANUAL_HISTORY = { teams, players, teamInfo, playoffs, draft, schedules: [] };
})();
