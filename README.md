# GSCRL OBS Overlays

Browser-based overlays for Garden State Robot League live streaming production.

## Overview

A collection of self-contained HTML overlays designed for use as OBS browser sources. No build step required — just static files that work anywhere.

## Features

- **Standalone overlays** — Self-contained HTML files with transparent backgrounds
- **Configurable** — Settings panels and URL parameters for on-the-fly adjustments
- **Consistent branding** — Shared color schemes, fonts, and visual style
- **Integration-ready** — Designed to work with True Finals tournament management
- **Low maintenance** — Static files, no backend required

## Available Overlays

| Overlay | Status | Description |
|---------|--------|-------------|
| [Break Timer](overlays/break-timer.html) | Ready | Countdown timer with circular progress ring |
| Match Info | Planned | Current match display (players, bots, arena) |
| Countdown | Planned | Pre-match countdown (3-2-1-FIGHT style) |
| Lower Third | Planned | Customizable lower third graphic |
| Bracket | Planned | Tournament bracket display |
| Sponsors | Planned | Rotating sponsor logos |

## Quick Start

### 1. Open an overlay directly

Visit the deployed site or open an overlay file in your browser to configure it.

### 2. Add to OBS

1. In OBS, add a **Browser** source
2. Set the URL to your overlay (local file or hosted URL)
3. Set dimensions (e.g., 400x450 for Break Timer)
4. Add Custom CSS: `body { background: transparent !important; }`

### 3. Configure via URL parameters

```
break-timer.html?duration=10&label=BRB&color=FF6B6B&hidecontrols=true
```

## Deployment

### GitHub Pages (Recommended)

1. Push this repository to GitHub
2. Go to repository **Settings** > **Pages**
3. Under "Source", select **Deploy from a branch**
4. Choose **main** branch and **/ (root)** folder
5. Click **Save**

Your overlays will be available at:
```
https://[username].github.io/gscrl-obs/overlays/break-timer.html
```

### Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Build settings:
   - **Build command:** (leave empty)
   - **Build output directory:** `/`
3. Deploy

Your overlays will be available at:
```
https://gscrl-obs.pages.dev/overlays/break-timer.html
```

### Local Development

Just open the HTML files directly in your browser — no server required.

For a local server (enables localStorage persistence):
```bash
npx serve .
# or
python -m http.server 8000
```

## Project Structure

```
gscrl-obs/
├── index.html                 # Landing page / overlay directory
├── overlays/
│   ├── break-timer.html       # Countdown timer for breaks
│   ├── match-info.html        # (planned) Current match display
│   ├── countdown.html         # (planned) Pre-match countdown
│   ├── lower-third.html       # (planned) Lower third graphic
│   ├── bracket.html           # (planned) Tournament bracket
│   └── sponsors.html          # (planned) Rotating sponsor logos
├── shared/
│   ├── styles.css             # Common styles, CSS variables
│   ├── config.js              # Shared configuration
│   └── utils.js               # Common utilities
├── assets/
│   ├── fonts/                 # Custom fonts
│   ├── logos/                 # Logo files
│   └── sounds/                # Sound effects
├── docs/
│   ├── OBS-SETUP.md           # OBS configuration guide
│   └── CUSTOMIZATION.md       # Theming and customization
└── README.md
```

## URL Parameters

### Break Timer

| Parameter | Description | Default | Example |
|-----------|-------------|---------|---------|
| `duration` | Minutes | 10 | `?duration=15` |
| `label` | Display text | BE RIGHT BACK | `?label=BRB` |
| `color` | Hex color (no #) | FF6B6B | `?color=4ECDC4` |
| `autostart` | Start on load | false | `?autostart=true` |
| `hidecontrols` | Hide buttons | false | `?hidecontrols=true` |

## Theming

Override CSS variables to customize the look:

```css
:root {
  --gscrl-primary: #FF6B6B;    /* Main accent color */
  --gscrl-secondary: #4ECDC4;  /* Secondary accent */
  --gscrl-dark: #1a1a2e;       /* Dark background */
  --gscrl-light: #ffffff;      /* Light text */
  --font-display: 'Russo One', sans-serif;
}
```

See [CUSTOMIZATION.md](docs/CUSTOMIZATION.md) for detailed theming options.

## Documentation

- [OBS Setup Guide](docs/OBS-SETUP.md) — How to add overlays to OBS
- [Customization Guide](docs/CUSTOMIZATION.md) — Theming and branding

## Development Phases

- [x] **Phase 1: Foundation** — Break timer, repo setup, deployment
- [ ] **Phase 2: Core Overlays** — Match info, countdown, lower third
- [ ] **Phase 3: Integration** — True Finals API, WebSocket control
- [ ] **Phase 4: Polish** — Sponsors, sound effects, animations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test in OBS (not just browser)
5. Submit a pull request

## License

MIT License — feel free to use and modify for your own robot combat events.

---

**Garden State Robot League** — [Website](https://gscrl.org)
