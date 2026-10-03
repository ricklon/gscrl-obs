# GSCRL TrueFinals service

Part of `gscrl-obs`. Run the commands below from `services/truefinals`, or use
`npm run install:live` and `npm run start:live` from the repository root.
The shared catalog is at `../../config/events.json`.


Live GSCRL broadcast overlays and a match log with YouTube chapter generation.
Express polls TrueFinals on the server; API credentials never reach OBS/browser clients.

## Setup

Use Node.js 22 or newer (or `nvm use`) and pnpm.

```sh
pnpm install --frozen-lockfile
cp .env.example .env
```

Set `TRUEFINALS_USER_ID` and `TRUEFINALS_API_KEY` in `.env`, then run
`pnpm start` (`pnpm dev` for development). The default port is 3000.
Run `npm run check` and `npm test` for local checks.

## Current event

**GSCRL Mechanical Mayhem Season 5 Opener** —
[event listing](https://www.robotcombatevents.com/events/9596).

| Division | TrueFinals bracket | OBS selector |
| --- | --- | --- |
| Fairies | [Bracket](https://truefinals.com/tournament/12d25847dc964a64) | `fairies` |
| Plants | [Bracket](https://truefinals.com/tournament/79b98376f28f4dc5) | `plants` |
| Ants | [Bracket](https://truefinals.com/tournament/2c1a522669b34fec) | `ants` |
| Beetles | [Bracket](https://truefinals.com/tournament/f1bacdd759cd41e1) | `beetles` |

## Broadcast URLs

- `http://localhost:3000/overlay.html` — Now Fighting, Up Next, Last Result.
- `http://localhost:3000/matchbar.html` — horizontal match bar.
- `http://localhost:3000/matchlog.html` — match log and chapter export.

For the live match bar, use a 1920 × 48 OBS Browser Source on a 1920-wide
canvas, with no cropping or scaling. The middle match label is centered in the
full source width; Last Result stays inside the right half. Refresh the browser
source after layout updates. Position the strip at Y=0 for the top, or Y=1032
for the bottom of a 1920 × 1080 canvas.

Append `?tournament=fairies`, `plants`, `ants`, or `beetles` to either overlay
URL to pin a division. `antweight`, `fairyweight`, and `beetleweight` are aliases;
raw tournament IDs also work. Without a selector the overlay follows an active
match, called match, or newest result. An unknown selector shows an empty state
instead of another division's match.

## Transition to another event

1. Add an entry to `../../config/events.json` with a unique event ID, name, optional
   event URL, and divisions (`key`, `name`, `aliases`, `tournamentId`).
2. From the repository root, run `npm run sync:events` after catalog edits. Set `activeEvent` to that event ID. Keep previous entries for reuse.
3. Restart the server and refresh OBS browser sources and the match log.
4. Check `/api/event` and each division's overlay before going live.

For a deployment-specific override, set `EVENT_ID` in `.env`. For example,
`EVENT_ID=nj-champs` selects the previous season finale. Leave it blank to use
the checked-in default. Legacy `TRUEFINALS_TOURNAMENT_IDS` is no longer used;
remove it from existing deployment environments. Stable division URLs need no
edits when bracket IDs change. Stream start and fight offset are saved separately
per event; old global timing values are intentionally not reused.

`/api/story` includes event and division metadata. `/api/matchlog` remains an
array. The server targets a fresh games fetch for every division every 10 seconds.
All authenticated requests share a queue spaced at least 2.5 seconds apart
(24 requests/minute for four divisions). The upstream quota is unconfirmed;
HTTP 429 responses pause the queue according to Retry-After, or 60 seconds if
no usable delay is supplied. Startup and player refreshes share this queue and
can extend a cycle, as can slow API responses.

The match bar checks the local server every 3 seconds. API responses return the
latest cached data immediately, and each division publishes as soon as its fetch
completes. A failed division retains its last successful story while others can
update. Cache is in memory and resets on restart; initial four-division data takes
roughly 20 seconds plus API response time. After changing events, verify all four
divisions have populated before broadcasting.


For existing deployments, first follow [the cutover checklist](../../docs/CONSOLIDATION.md). For PM2 deployments, use `pm2 start ecosystem.config.js` initially, then
`pm2 restart gscrl-truefinals --update-env` after configuration changes.

## Contributing

Follow [AGENTS.md](AGENTS.md). Work on a feature branch, run checks, and open a
pull request against `main`. GitHub Actions runs syntax and regression checks.
Keep `.env` out of Git. `claude.md` contains the original design brief only.
