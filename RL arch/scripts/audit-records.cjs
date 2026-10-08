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
  for (const era of ['2s', '3s']) {
    for (const scope of ['season', 'game']) {
      for (const entity of ['players', 'teams']) {
        const records = currentArchiveRecords(era, scope, entity);
        assert.ok(records.length > 0);
        assert.ok(records.every(row => !/\\([PT]\\)$/.test(row.record)));
        assert.ok(records.every(row => /^[1-9][0-9]*(, [1-9][0-9]*)*$/.test(row.season)));
        console.log(era + ' ' + scope + ' ' + entity);
        console.table(records.map(({record, value, holder, season}) => ({record, value, holder, season})));
      }
    }
  }
  const seasonRecords = currentArchiveRecords('3s', 'season', 'players');
  assert.ok(seasonRecords.some(row => row.record === 'Goals' && row.value === '91' && row.season === '4'));
  const priorGoals = data.players.find(row => row.season === 'S4' && row.goals === 91);
  const originalGoals = priorGoals.goals;
  priorGoals.goals = 999;
  assert.ok(currentArchiveRecords('3s', 'season', 'players').some(row => row.record === 'Goals' && row.value === '999'));
  priorGoals.goals = originalGoals;
  const newGame = { id: 'records-audit-new-game', players: [{name: 'Ax1mov', team: "Giga's In Paris", score: 9999, goals: 10, assists: 9, saves: 20, shots: 25}], teams: [{team: "Giga's In Paris", score: 19999, goals: 15, assists: 12, saves: 25, shots: 30}] };
  s6SwissSeriesGameStats.push({season:'S6', stage:'Swiss', games:[newGame]});
  assert.ok(currentArchiveRecords('3s', 'game', 'players').some(row => row.record === 'Points' && row.value === '9999'));
  assert.ok(currentArchiveRecords('3s', 'game', 'teams').some(row => row.record === 'Points' && row.value === '19999'));
  s6SwissSeriesGameStats.pop();
  assert.ok(!currentArchiveRecords('3s', 'game', 'players').some(row => row.value === '9999'));
  console.log('Verified all record views, historical benchmarks, and automatic updates after season/game data changes.');
`, context);
