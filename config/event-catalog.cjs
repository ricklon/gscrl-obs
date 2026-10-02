const catalog = require('./events.json');

function loadEvent(eventId = process.env.EVENT_ID || catalog.activeEvent, source = catalog, { requireBrackets = true } = {}) {
  const event = source.events[eventId];
  if (!event || !event.name || !event.divisions?.length) {
    throw new Error(`Invalid or unknown event: ${eventId}`);
  }
  const selectors = new Set();
  const ids = new Set();
  for (const division of event.divisions) {
    if (!division.name || (division.tournamentId === null ? requireBrackets : (!/^[a-f0-9]{16}$/.test(division.tournamentId) || ids.has(division.tournamentId)))) {
      throw new Error(`Invalid or duplicate tournament in ${eventId}`);
    }
    if (division.tournamentId !== null) ids.add(division.tournamentId);
    for (const key of [division.key, ...(division.aliases || [])]) {
      if (!/^[a-z][a-z0-9-]*$/.test(key) || selectors.has(key)) {
        throw new Error(`Invalid or duplicate division selector: ${key}`);
      }
      selectors.add(key);
    }
  }
  return { id: eventId, ...event };
}

module.exports = { loadEvent };
