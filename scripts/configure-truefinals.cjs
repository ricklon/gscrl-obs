const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline/promises');
const { loadEvent } = require('../config/event-catalog.cjs');
const { sync, renderEvent } = require('./sync-events.cjs');
function parseTournament(input) {
  const value = input.trim();
  if (/^[a-f0-9]{16}$/i.test(value)) return value.toLowerCase();
  let url;
  try { url = new URL(value); } catch { throw new Error('Enter a TrueFinals bracket URL or 16-character tournament ID.'); }
  if (url.protocol !== 'https:' || !/^(www\.)?truefinals\.com$/i.test(url.hostname) || url.username || url.password) throw new Error('Use an HTTPS link on truefinals.com.');
  const ids = [...new Set((url.pathname + '/' + url.search + '/' + url.hash).match(/(?<![a-f0-9])[a-f0-9]{16}(?![a-f0-9])/gi) || [])];
  if (ids.length !== 1) throw new Error('Could not identify one tournament ID. Paste the ID instead.');
  return ids[0].toLowerCase();
}
function updateCatalog(catalog, eventId, assignments) {
  const next = structuredClone(catalog);
  const event = loadEvent(eventId, next, { requireBrackets: false });
  for (const division of event.divisions) {
    if (!Object.hasOwn(assignments, division.key)) throw new Error('Missing bracket: ' + division.key);
    division.tournamentId = parseTournament(assignments[division.key]);
  }
  loadEvent(eventId, next);
  return next;
}
async function main() {
  const file = path.resolve(__dirname, '../config/events.json');
  const catalog = JSON.parse(fs.readFileSync(file, 'utf8'));
  const eventId = process.argv[2] || catalog.activeEvent;
  const event = loadEvent(eventId, catalog, { requireBrackets: false });
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    console.log('Configure brackets for ' + event.name + ' (' + eventId + ')');
    console.log('Blank input or "not ready" cancels without changes.');
    const assignments = {}, ids = new Set();
    for (const division of event.divisions) {
      while (true) {
        const input = (await rl.question(division.name + ' [' + division.key + '] — bracket URL or ID: ')).trim();
        if (!input || input.toLowerCase() === 'not ready') return;
        try {
          const id = parseTournament(input);
          if (ids.has(id)) throw new Error('Each division needs a different bracket.');
          assignments[division.key] = id; ids.add(id); break;
        } catch (error) { console.log(error.message); }
      }
    }
    const next = updateCatalog(catalog, eventId, assignments);
    console.log(JSON.stringify(assignments, null, 2));
    if ((await rl.question('Checked the event and class assignments? Type yes to save: ')).trim().toLowerCase() !== 'yes') return;
    for (const id of Object.keys(next.events)) {
      const candidate = loadEvent(id, next, { requireBrackets: false });
      if (candidate.staticDirectory) renderEvent(candidate);
    }
    fs.writeFileSync(file, JSON.stringify(next, null, 2) + '\n');
    sync(false, next);
    console.log('Saved shared catalog and static event output. Restart the live service and rebuild the static site to apply.');
  } finally { rl.close(); }
}
module.exports = { parseTournament, updateCatalog };
if (require.main === module) main().catch(error => { console.error(error.message); process.exitCode = 1; });
