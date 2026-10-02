# Combining GSCRL broadcast projects

## Decision and scope

Use the existing `ricklon/gscrl-obs` repository. Keeping its name and public paths
preserves hosted OBS browser-source URLs. No new repository is needed.

Static overlays remain at the root in their existing directories. The live
application moves to `services/truefinals`, still on port 3000; static previews
remain on port 8010. Manual match displays and live match displays remain
separate choices. No framework, workspace manager, or runtime coupling is added.

## Migration plan

1. Import the TrueFinals application, tests, lockfile, and Stream Deck icons.
2. Move event configuration to root `config/events.json`; generate the current
   static event configuration from the catalog. Preserve historical entries,
   division aliases, and existing event presentation values.
3. Replace the legacy bracket setup handoff with a catalog-aware setup command.
4. Provide root commands for static preview, live startup, and combined checks.
5. Publish an explicit static export; keep credentials and backend files outside it.
6. Validate the combined project and open a feature-branch PR for review.
7. Cut over deployment using the checklist below after review and rehearsal.

Steps 1–5 are implemented in this migration. Step 6 is verified with the checks
recorded in the PR. Deployment cutover remains an operator action; editing the
source does not move or restart an existing process.

## Source provenance and existing work

The service was imported from `ricklon/gscrl-truefinals` commit
`7bb175a` (`feat/reusable-event-configuration`). Its original repository retains
its Git history and remains available for rollback; this is a source import,
not a rewrite of that repository's history. Local Stream Deck icons were also
copied. Credentials and node_modules were not copied.

Existing Mechanical Mayhem static work is retained, including both 12-scene
collections. Their URLs and geometry are unchanged. Existing local fixes to shared configuration and the NJ State Champs overlay
are included because the combined syntax checks depend on them. Unrelated
root image files remain outside the consolidation commit.

## Event configuration

The root catalog combines live division metadata and static display metadata.
The generator writes committed event-config.js files so static hosting needs
no API and no Node runtime. Run `npm run sync:events` after catalog edits;
`npm test` rejects stale generated output. Events can have null bracket IDs
while preparing static screens; the live service refuses incomplete brackets.

The current generator preserves the MechanicalMayhem browser variable for the
existing event pages. A new event template should define its own rendering
contract instead of assuming that every historical event uses this object.
Historical static event pages remain snapshots.

## Deployment cutover and rollback

1. Run `npm test` and `npm run build:static` in the combined checkout.
2. Configure GitHub Pages to use **GitHub Actions**. The Pages workflow publishes
   only dist/site after checks pass on main. Keep the repository name and paths.
3. Install the service with `npm run install:live`. Populate
   services/truefinals/.env privately with the existing credentials. Ensure
   EVENT_ID is blank or selects the intended catalog event.
4. Record the existing service manager and startup command. Stop the old poller
   before starting the new one: two processes could exceed the shared request
   budget. This migration does not alter PM2 or systemd automatically.
5. For PM2, replace the old gscrl-truefinals process with the combined repository's
   `services/truefinals/ecosystem.config.js`, then save the process list after
   verification. The ecosystem file explicitly sets its working directory.
   For systemd, update WorkingDirectory and ExecStart to the new service folder,
   reload the unit, and start it using the existing host's Node executable.
6. Check /api/event, /api/story, all four pinned division URLs, matchlog timing,
   and chapter export. Initial data may take about a minute. Check static
   overlays and both day's collections in OBS, including transparency and sizing.
7. Keep ports 8010 and 3000 and existing origins to preserve browser settings.
   Static preview now serves dist/site; rebuild it after edits. Existing scene
   collections intentionally continue using manual match graphics.
8. Rollback: stop the new live process and restart the original checkout with
   its previous configuration. Restore the previous static deployment if needed.
   Never run both live copies simultaneously. Archive the old repository only
   after a successful event and explicit agreement to retire it.

## Deferred work

Shared theme-token extraction, a unified manual/live match UI, scene-collection
generation, and a single operator dashboard are separate improvements. The
initial consolidation preserves the existing visual styles and polling logic.
