# Combined broadcast project

Read README.md and docs/CONSOLIDATION.md before changes.

- Static overlays stay independently usable; preserve existing URLs, transparent backgrounds, and OBS scene layouts.
- config/events.json is the canonical event catalog. Preserve historical events and stable division keys/aliases.
- Edit event display metadata in the catalog, then run npm run sync:events. Do not hand-edit generated event-config.js.
- The live service lives in services/truefinals; follow its AGENTS.md as well.
- Credentials belong only in services/truefinals/.env or host secrets. Never print or commit them.
- Publish only the allowlisted dist/site export, never the repository root with backend files.
- All authenticated TrueFinals calls must use the existing server-side rate limiter.
- Explicit division selection must never fall back to a different division. Scope persisted timing by event ID.
- Preserve pre-existing local changes. Use a feature branch and pull request; never push directly to main.
- Run npm test and npm run build:static before publishing. Add meaningful regression coverage for configuration, API, and polling changes.
- Update operation and event-transition documentation when behavior changes.
