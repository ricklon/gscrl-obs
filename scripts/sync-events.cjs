const fs = require('node:fs');
const path = require('node:path');
const { loadEvent } = require('../config/event-catalog.cjs');
const root = path.resolve(__dirname, '..');
function renderEvent(event) {
  const display = structuredClone(event.display);
  for (const day of Object.values(display.days)) day.tournaments = {};
  for (const division of event.divisions) {
    if (!display.days[division.day] || !division.staticKey) throw new Error('Missing static division mapping: ' + division.key);
    display.days[division.day].tournaments[division.staticKey] = division.tournamentId;
  }
  return '// Generated from config/events.json by npm run sync:events. Do not edit.\n'
    + 'const MechanicalMayhem = ' + JSON.stringify(display, null, 2) + ';\n'
    + fs.readFileSync(path.join(__dirname, 'event-config-helpers.txt'), 'utf8');
}
function sync(check = false, catalog = require('../config/events.json')) {
  for (const id of Object.keys(catalog.events)) {
    const event = loadEvent(id, catalog, { requireBrackets: false });
    if (!event.staticDirectory) continue;
    if (!/^[a-z0-9-]+$/.test(event.staticDirectory)) throw new Error('Invalid static directory');
    const file = path.join(root, 'events', event.staticDirectory, 'event-config.js');
    const output = renderEvent(event);
    if (check) {
      if (fs.readFileSync(file, 'utf8') !== output) throw new Error('Event output is stale. Run npm run sync:events.');
    } else fs.writeFileSync(file, output);
  }
}
module.exports = { renderEvent, sync };
if (require.main === module) sync(process.argv.includes('--check'));
