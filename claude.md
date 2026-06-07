# CLAUDE.md — gscrl-obs

## What this project is

Static HTML pages hosted on GitHub Pages for GSCRL (Garden State Combat Robotics League) live events. The pages serve as OBS browser sources — overlays for streaming that display event info, match details, schedules, and timing.

## Repository layout

```
gscrl-obs/
├── index.html              # top-level overlay index with links to all events
├── events/
│   └── june-jumble/        # one directory per event
│       ├── index.html      # overlay index for that event (cards + copy URLs)
│       ├── event-info.html # schedule, stats, sponsors overlay
│       ├── match-info.html # lower-third match bar
│       ├── welcome-screen.html
│       ├── waiting-screen.html
│       └── break-timer.html
├── overlays/               # generic/reusable overlay templates
├── shared/
│   └── styles.css          # shared design tokens and base styles
└── assets/
```

## How it works

Pages are deployed via GitHub Pages. Each overlay is a standalone HTML file loaded as a browser source in OBS. URL parameters (`?day=1`, `?view=schedule`, `?color=FF6B6B`) control which content is shown.

## Adding a new event

Copy an existing event directory (e.g. `events/june-jumble/`) and update the event-specific data — names, dates, competitor counts, schedule times, weight classes — in each file's JS config block. Add a link to the new event from `index.html`.

## Future

- TrueFinals integration for live bracket/queue data
- Additional overlay types as needed
