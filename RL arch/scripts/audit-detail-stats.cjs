const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const context = {
  window: {}, console, assert,
  document: { querySelector: () => ({ classList: { add() {}, remove() {}, toggle() {} } }), querySelectorAll: () => [] },
  localStorage: { getItem: () => null },
};
vm.createContext(context);
for (const file of ['dashboard-data.js', 'manual-history.js', 's6-round4-data.js', 's6-playin-data.js', 's6-playoffs-data.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
}
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
vm.runInContext(app.slice(0, app.indexOf('els.seasonSelect.addEventListener')), context);
vm.runInContext(`
  state.s6Stage = 'overall';
  const originalData = JSON.stringify(data);
  for (const team of s6StageTeamRows('overall', 'overall')) {
    state.view = 'teams';
    state.page = { type: 'team', team: team.name, season: 'S6' };
    state.season = 'S6';
    const regularRows = JSON.stringify(detailContext().rows);
    renderDetailExtras();
    const extras = els.detailExtras.innerHTML;
    assert.ok(extras.includes('Regular Season Team Totals'));
    assert.ok(extras.includes('Playoff Stats'));
    for (const key of ['score', 'goals', 'assists', 'saves', 'shots']) {
      assert.ok(rosterColumns.some(column => column[0] === key));
      assert.ok(extras.includes(escapeHtml(fmt(team[key]))));
    }
    state.season = 'S6 Playoffs';
    state.page.season = 'S6 Playoffs';
    assert.equal(JSON.stringify(detailContext().rows), regularRows, team.name + ' changed regular rows with phase');
    renderDetailExtras();
    assert.equal(els.detailExtras.innerHTML, extras, team.name + ' changed detail sections with phase');
  }
  const allPlayers = s6StagePlayerRows('overall', 'overall');
  for (const player of allPlayers) assert.ok(playerPlayoffCareer(player.name).every(row => isPlayoffSeason(row.season)));
  for (const player of allPlayers.filter(row => ['Ramen', 'Clamp2much', 'CROCOKYLE'].includes(row.name))) {
    state.view = 'players';
    state.page = { type: 'player', player: player.name };
    state.season = 'S6';
    const regularRows = JSON.stringify(detailContext().rows);
    renderDetailExtras();
    const extras = els.detailExtras.innerHTML;
    assert.ok(extras.includes('Playoff Stats'));
    assert.ok(extras.includes('Total Shots'));
    state.season = 'S6 Playoffs';
    assert.equal(JSON.stringify(detailContext().rows), regularRows, player.name + ' changed regular rows with phase');
    renderDetailExtras();
    assert.equal(els.detailExtras.innerHTML, extras, player.name + ' changed detail sections with phase');
    assert.ok(playerPlayoffCareer(player.name).every(row => isPlayoffSeason(row.season)));
  }
  assert.equal(JSON.stringify(data), originalData, 'Detail rendering altered source data');
  console.log('Verified all 12 S6 team detail sections, playoff rows for all players, and phase-independent player rendering.');
`, context);
