const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const context = { window: {}, document: { querySelector: () => ({}), querySelectorAll: () => [] }, localStorage: { getItem: () => null }, console, assert };
vm.createContext(context);
for (const file of ['dashboard-data.js', 'manual-history.js', 's6-round4-data.js', 's6-playin-data.js', 's6-playoffs-data.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
}
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
vm.runInContext(app.slice(0, app.indexOf('els.seasonSelect.addEventListener')), context);
vm.runInContext(`
  state.s6Stage = 'overall';
  state.season = 'S6';
  const rawCount = data.playerGames.length;
  let advancedSeries = 0;
  for (const series of s6SwissSeriesGameStats) {
    const hasNewStats = /Semifinals|Grand Finals/i.test(series.round || '');
    for (const game of series.games) {
      for (const row of [...game.players, ...game.teams]) {
        for (const field of optionalGameStats) {
          if (!hasNewStats) assert.ok(row[field] == null, series.round + ' invented ' + field);
          else assert.equal(typeof row[field], 'number', series.round + ' missing ' + field);
        }
      }
    }
    for (const row of [...aggregateSeriesPlayers(series), ...aggregateSeriesTeams(series)]) {
      for (const field of optionalGameStats) {
        assert.equal(isUnavailableValue(row, field), !hasNewStats, series.round + ' total availability ' + field);
      }
    }
    if (hasNewStats) advancedSeries++;
  }
  assert.equal(advancedSeries, 3, 'Semifinals and finals should have the new stats');
  const earlierSeries = s6SwissSeriesGameStats.find(series => series.round === 'Round 1');
  assert.ok(seriesPlayerSectionsMarkup(earlierSeries).includes('n/a'));
  const knownZero = { clears: 0, centers: 0, aerialHits: 0, epicSaves: 0, firstTouches: 0, flipResets: 0 };
  assert.equal(sumAvailableSeriesStats({}, [knownZero]).clears, 0, 'A tracked zero must stay zero');
  assert.equal(sumAvailableSeriesStats({}, [knownZero, {}]).clears, null, 'Incomplete totals must not turn into zero');
  let checked = 0;
  for (const player of s6StagePlayerRows('overall', 'overall')) {
    const logs = playerSeasonGames(player.name, 'S6');
    const imported = s6SwissSeriesGameStats.filter(series => series.stage !== 'Playoffs')
      .flatMap(series => series.games).filter(game => game.players.some(row => canonicalPlayerName(row.name) === player.name));
    assert.equal(new Set(logs.map(row => row.replayId)).size, logs.length, player.name + ' duplicate games');
    for (const game of imported) {
      const log = logs.find(row => row.replayId === game.id);
      assert.ok(log, player.name + ' missing game ' + game.id);
      const source = game.players.find(row => canonicalPlayerName(row.name) === player.name);
      for (const stat of ['score', 'goals', 'assists', 'saves', 'shots']) assert.equal(log[stat], source[stat]);
      assert.equal(log.result, canonicalTeamName(game.winner) === log.team ? 'win' : 'loss');
      assert.ok(scheduleGameData(log.__gameAction), 'Game action does not resolve');
      checked++;
    }
    state.s6Stage = 'swiss';
    assert.ok(playerSeasonGames(player.name, 'S6').every(row => row.stage === 'Swiss'));
    state.s6Stage = 'group';
    assert.ok(playerSeasonGames(player.name, 'S6').every(row => row.stage === 'Group Stage'));
    state.s6Stage = 'overall';
  }
  state.season = 'S6 Playoffs';
  const playoffPlayers = s6PlayoffPlayerRows();
  for (const player of playoffPlayers) {
    assert.ok(playerPlayoffCareer(player.name).some(row => row.season === 'S6 Playoffs'));
    assert.ok(playerCareer(player.name).every(row => !isPlayoffSeason(row.season)));
    const logs = playerSeasonGames(player.name, 'S6 Playoffs');
    assert.equal(logs.length, player.games, player.name + ' playoff GP');
    assert.ok(logs.every(row => row.stage === 'Playoffs'));
  }
  state.season = 'S1';
  assert.equal(playerSeasonGames('Ax1mov', 'S1').length, 0, 'Manual totals must not become invented games');
  assert.equal(data.playerGames.length, rawCount, 'Source data was changed');
  console.log('Verified ' + checked + ' imported player-game rows, all playoff logs, stage filters, and game drill-down links.');
`, context);
