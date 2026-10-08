const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const context = {
  window: {},
  document: { querySelector: () => ({}), querySelectorAll: () => [] },
  localStorage: { getItem: () => null },
  console,
  assert,
};
vm.createContext(context);
for (const file of ['dashboard-data.js', 'manual-history.js', 's6-round4-data.js', 's6-playin-data.js', 's6-playoffs-data.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
}
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
vm.runInContext(app.slice(0, app.indexOf('els.seasonSelect.addEventListener')), context);
vm.runInContext(`
  const group = new Map(s6StageTeamRows('group', 'overall').map(row => [row.name, row]));
  const overall = s6StageTeamRows('overall', 'overall');
  const expectedSwiss = new Map();
  const seenSeries = new Set();
  for (const series of s6SwissSeriesGameStats.filter(series => series.stage === 'Swiss')) {
    const home = canonicalTeamName(series.home);
    const away = canonicalTeamName(series.away);
    const key = [series.round, ...[home, away].sort()].join('|');
    assert.ok(!seenSeries.has(key), 'Duplicate Swiss series: ' + key);
    seenSeries.add(key);
    const games = [...new Map(series.games.map(game => [game.id, game])).values()];
    const homeWins = games.filter(game => canonicalTeamName(game.winner) === home).length;
    const awayWins = games.filter(game => canonicalTeamName(game.winner) === away).length;
    for (const [team, won, lost] of [[home, homeWins, awayWins], [away, awayWins, homeWins]]) {
      const total = expectedSwiss.get(team) || { wins: 0, losses: 0, gameWins: 0, gameLosses: 0, sweeps: 0, gameFiveLosses: 0 };
      total.wins += won > lost ? 1 : 0;
      total.losses += lost > won ? 1 : 0;
      total.gameWins += won;
      total.gameLosses += lost;
      total.sweeps += won === 3 && lost === 0 ? 1 : 0;
      total.gameFiveLosses += won === 2 && lost === 3 ? 1 : 0;
      expectedSwiss.set(team, total);
    }
  }
  assert.equal(s6PendingSwissScheduleResults().length, 0, 'Some Swiss results lack game data');
  const swiss = new Map(s6StageTeamRows('swiss', 'overall').map(row => [row.name, row]));
  const players = s6StagePlayerRows('overall', 'overall');
  for (const row of overall) {
    const baseline = group.get(row.name);
    const addition = swiss.get(row.name);
    const expected = expectedSwiss.get(row.name);
    for (const key of ['wins', 'losses', 'gameWins', 'gameLosses', 'sweeps', 'gameFiveLosses']) {
      assert.equal(row[key], baseline[key] + (expected?.[key] || 0), row.name + ' ' + key);
    }
    for (const key of ['games', 'score', 'goals', 'assists', 'saves', 'shots', 'goalsConceded', 'shotsConceded']) {
      assert.equal(row[key], baseline[key] + (addition?.[key] || 0), row.name + ' combined ' + key);
    }
    assert.equal(row.matchRecord, row.wins + ' - ' + row.losses, row.name + ' record');
    assert.equal(row.games, row.gameWins + row.gameLosses, row.name + ' GP');
    assert.equal(row.matchWinPct, Math.round(row.wins / (row.wins + row.losses) * 1000) / 10, row.name + ' Match Win %');
    assert.equal(row.gameWinPct, Math.round(row.gameWins / row.games * 1000) / 10, row.name + ' Game Win %');
    const playerPer = players.filter(player => player.teams.includes(row.name)).reduce((sum, player) => sum + player.per, 0);
    assert.equal(row.per, Math.round(playerPer * 100) / 100, row.name + ' PER');
    assert.equal(row.standingsPoints, baseline.standingsPoints + (addition?.standingsPoints || 0), row.name + ' League Score');
  }
  console.log('Verified all 12 teams against ' + seenSeries.size + ' Swiss/play-in series, plus the group-stage baseline.');
  console.table(s6StageTeamRows('overall', 'overall').map(row => ({
    team: row.name, record: row.matchRecord, wins: row.wins, losses: row.losses,
    gameWins: row.gameWins, gameLosses: row.gameLosses, games: row.games,
    leagueScore: row.standingsPoints,
  })));
`, context);
