const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const catalog = require('../config/events.json');
const { loadEvent } = require('../config/event-catalog.cjs');
const { parseTournament, updateCatalog } = require('../scripts/configure-truefinals.cjs');
const { renderEvent } = require('../scripts/sync-events.cjs');
const { build } = require('../scripts/build-static.cjs');

test('bracket setup updates only the selected event and generates matching static divisions', () => {
  const assignments = {fairies:'1111111111111111',plants:'2222222222222222',ants:'3333333333333333',beetles:'4444444444444444'};
  const next = updateCatalog(catalog, catalog.activeEvent, assignments);
  assert.deepEqual(next.events['nj-champs'], catalog.events['nj-champs']);
  assert.notEqual(next.events[next.activeEvent].divisions[0].tournamentId, catalog.events[catalog.activeEvent].divisions[0].tournamentId);
  const context = vm.createContext({});
  vm.runInContext(renderEvent(loadEvent(next.activeEvent, next)), context);
  assert.equal(vm.runInContext('MechanicalMayhem.days[1].tournaments.plasticAntweight', context), assignments.plants);
  assert.equal(vm.runInContext('MechanicalMayhem.days[2].tournaments.beetleweight', context), assignments.beetles);
  assert.throws(() => updateCatalog(catalog, catalog.activeEvent, {...assignments, plants: assignments.ants}), /duplicate/);
  assert.throws(() => updateCatalog(catalog, catalog.activeEvent, {}), /Missing bracket/);
});

test('unassigned brackets allow static screens but prevent live polling startup', () => {
  const next = structuredClone(catalog);
  next.events[next.activeEvent].divisions.forEach(d => d.tournamentId = null);
  const event = loadEvent(next.activeEvent, next, {requireBrackets:false});
  assert.ok(renderEvent(event).includes('"fairyweight": null'));
  assert.throws(() => loadEvent(next.activeEvent, next), /Invalid/);
});

test('bracket input rejects foreign URLs and ambiguous IDs', () => {
  assert.equal(parseTournament('https://truefinals.com/tournament/0123456789ABCDEF'), '0123456789abcdef');
  assert.throws(() => parseTournament('https://truefinals.com.evil.example/0123456789abcdef'));
  assert.throws(() => parseTournament('https://truefinals.com/0123456789abcdef/fedcba9876543210'));
  assert.throws(() => parseTournament('https://www.robotcombatevents.com/events/9596'));
});

test('static export preserves scene paths and excludes backend and hidden credentials', () => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'gscrl-static-'));
  try {
    const out = build(path.join(temp, 'site'));
    for (const name of ['services', 'config', '.env', 'node_modules', '.git']) assert.equal(fs.existsSync(path.join(out, name)), false);
    const eventDir = 'events/mechanical-mayhem-season-5';
    for (const suffix of ['', '_Local']) {
      const collection = JSON.parse(fs.readFileSync(path.join(out, eventDir, 'GSCRL_Mechanical_Mayhem_Season_5' + suffix + '.json')));
      for (const source of collection.sources.filter(s => s.id === 'browser_source')) {
        const url = new URL(source.settings.url);
        assert.ok(fs.existsSync(path.join(out, url.pathname.replace(/^\/gscrl-obs\//, '').replace(/^\//, ''))));
      }
    }
  } finally { fs.rmSync(temp, {recursive:true, force:true}); }
});
