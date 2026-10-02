# Mechanical Mayhem Fall — Season 5 opener

Official source: https://www.robotcombatevents.com/events/9596 (checked October 1, 2026).

GSCRL 2026–27 season opener, October 3–4, 2026, at Sussex County Maker Fest.
Venue: Ideal Farm & Garden Center, 222 NJ-15, Lafayette Township, NJ 07848.

Saturday: 150g Fairyweight, 1lb Plastic Antweight, 1lb Standard Antweight.
Sunday: 3lb Beetleweight. Each class competes on its assigned day only.

Both days: doors 8 AM; safety checks/registration 9–10:30 AM; drivers/judges/volunteer meeting 10 AM; competition 11 AM; awards 5–6 PM. All times EDT (America/New_York).
Fairyweight is round robin; other classes use double elimination with a single grand final.

## Local OBS setup

Run from the repository inside WSL:

    npm run dev

Open http://localhost:8010/events/mechanical-mayhem-season-5/index.html on Windows.
Use the Saturday/Sunday buttons, then OBS Scene Collection > Import and select
GSCRL_Mechanical_Mayhem_Season_5_Local.json. Keep the local server running while OBS uses these scenes.
The collection contains 12 scenes: Welcome, Waiting, Match Info, Schedule, and Event Overview for each day; shared Break Timer and Event Partners.
Canvas: 1920×1080. Match browser source: 1920×300 at y=780; timer: 400×450 centered.
These are overlay scenes; add camera and audio sources for the broadcast.

## Hosted setup

Publish the repository to its existing GitHub Pages deployment, then import
GSCRL_Mechanical_Mayhem_Season_5.json. Hosted URLs use
https://ricklon.github.io/gscrl-obs/events/mechanical-mayhem-season-5/.
The new hosted URLs do not work until deployment completes.

## Operator controls

Use ?day=1 for Saturday and ?day=2 for Sunday. Omitted or invalid day values use Saturday; OBS scenes stay pinned to their day.
Match Info defaults to 1lb Saturday and 3lb Sunday. Open a preview without hidecontrols=true to edit players, bots, records, weight class, round, status, and timer.
Preview settings apply to that browser page only. For OBS, use its Interact window after removing hidecontrols=true, or update the Browser Source URL with the same parameters.
For example: match-info.html?day=2&weightclass=3lb&redbot=Example&bluebot=Opponent&hidecontrols=true.
Schedule and Overview use published event information, not live bracket results.
The timer starts at 10 minutes on scene load; imported timer sources restart when activated. Use autostart=false for manual control via Interact, or duration=5 for five minutes.
No event sponsors or registration totals are assumed. Add confirmed sponsors to the event display metadata in config/events.json, then run npm run sync:events and restart the static preview.

## TrueFinals live data

The combined repository includes `services/truefinals`; the shared
`config/events.json` already contains four bracket assignments for this event.

1. Run `npm run install:live` from the repository root.
2. Copy `services/truefinals/.env.example` to `services/truefinals/.env` and populate
   the credentials. Leave EVENT_ID blank to use the catalog's active event.
3. Stop the old deployment before starting the migrated live service. Use
   `npm run start:live` for a foreground run, or follow the PM2 cutover in
   `docs/CONSOLIDATION.md`. Do not run both pollers with the same credentials.
4. Check http://localhost:3000/api/event and http://localhost:3000/api/story.
   Initial loading for four brackets can take about a minute. Check the event,
   all four divisions, and fresh data before using it on stream.
5. Live browser sources remain http://localhost:3000/overlay.html and
   http://localhost:3000/matchbar.html. Pin a division using
   `?tournament=fairies`, `plants`, `ants`, or `beetles`.

To change brackets, run `npm run setup:truefinals`. To configure a different
catalog event, run `npm run setup:truefinals -- EVENT_ID`. This writes the shared
catalog and generated static event data; it does not change credentials, select
an active event, or restart services. Do not use TRUEFINALS_TOURNAMENT_IDS.

Static match overlays remain manual. The existing 12-scene collections retain
their original static sources; add a live source explicitly when ready.
