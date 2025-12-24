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
| [Welcome Screen](overlays/welcome-screen.html) | Ready | Cinematic event launch with animated logo, host intros, event details, and sponsor acknowledgments |
| [Waiting Screen](overlays/waiting-screen.html) | Ready | Pre-stream screen with countdown, event info, and loading animation |
| [Break Timer](overlays/break-timer.html) | Ready | Countdown timer with circular progress ring |
| [Match Info](overlays/match-info.html) | Ready | Current match display (players, bots, weight class, status) |
| [Event Info](overlays/event-info.html) | Ready | Versatile overlay for schedule, standings, sponsors, and engagement prompts |
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

GitHub Pages is the simplest way to host these overlays for free.

#### Setup Steps

1. Go to your repository on GitHub
2. Click **Settings** (gear icon in the top menu)
3. In the left sidebar, click **Pages** (under "Code and automation")
4. Under **Build and deployment**:
   - **Source:** Select `Deploy from a branch`
   - **Branch:** Select `main` (or `master`)
   - **Folder:** Select `/ (root)`
5. Click **Save**

#### GitHub Pages Settings Summary

| Setting | Value |
|---------|-------|
| Source | Deploy from a branch |
| Branch | `main` |
| Folder | `/ (root)` |

After saving, GitHub will build and deploy your site. This takes 1-2 minutes. Your overlays will be available at:

```
https://ricklon.github.io/gscrl-obs/
https://ricklon.github.io/gscrl-obs/overlays/break-timer.html
```

#### Custom Domain (Optional)

To use a custom domain like `obs.gscrl.org`:

1. In **Pages** settings, enter your custom domain
2. Add a CNAME record in your DNS pointing to `ricklon.github.io`
3. Enable **Enforce HTTPS** once DNS propagates

### Cloudflare Pages (Alternative)

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Click **Create a project** > **Connect to Git**
3. Select this repository
4. Build settings:
   - **Build command:** (leave empty)
   - **Build output directory:** `/`
5. Click **Save and Deploy**

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

### Welcome Screen

| Parameter | Description | Default | Example |
|-----------|-------------|---------|---------|
| `logo` | Event logo text | GSCRL | `?logo=GSCRL%202024` |
| `subtitle` | Event subtitle | ROBOT COMBAT LEAGUE | `?subtitle=SUMMER%20CHAMPIONSHIP` |
| `welcometitle` | Welcome title | WELCOME TO | `?welcometitle=GREETINGS%20FROM` |
| `event` | Event name (highlight) | SUMMER SHOWDOWN | `?event=NATIONAL%20INVITATIONAL` |
| `final` | Final message | LET'S GET READY TO RUMBLE | `?final=IT%27S%20SHOWTIME` |
| `date` | Event date | JUNE 15, 2024 | `?date=AUGUST%2010,%202024` |
| `location` | Event location | VIRTUAL ARENA | `?location=ATLANTIC%20CITY` |
| `weights` | Weight classes | 3LB • 12LB • 30LB | `?weights=1LB%20•%203LB%20•%2012LB` |
| `matches` | Number of matches | 12 MATCHES | `?matches=8%20MATCHES` |
| `competitors` | Number of competitors | 24 COMPETITORS | `?competitors=16%20COMPETITORS` |
| `host1name` | Host 1 name | JOHN DOE | `?host1name=JOHN%20SMITH` |
| `host1role` | Host 1 role | PLAY-BY-PLAY | `?host1role=MAIN%20COMMENTATOR` |
| `host2name` | Host 2 name | JANE SMITH | `?host2name=JANE%20DOE` |
| `host2role` | Host 2 role | COLOR COMMENTARY | `?host2role=CO-HOST` |
| `host3name` | Host 3 name | MIKE JONES | `?host3name=MIKE%20JOHNSON` |
| `host3role` | Host 3 role | RINGSIDE ANALYST | `?host3role=TECHNICAL%20ANALYST` |
| `twitter` | Twitter handle | @GSCRL | `?twitter=@GSCRL_League` |
| `facebook` | Facebook handle | /GSCRL | `?facebook=/GSCRLOfficial` |
| `instagram` | Instagram handle | @GSCRL | `?instagram=@GSCRL_Gram` |
| `twitch` | Twitch handle | GSCRL | `?twitch=GSCRL_TV` |
| `showhosts` | Show hosts section | true | `?showhosts=false` |
| `showsocial` | Show social media | true | `?showsocial=false` |
| `showsponsors` | Show sponsors | true | `?showsponsors=false` |
| `color` | Accent color (hex) | FF6B6B | `?color=4ECDC4` |

### Waiting Screen

| Parameter | Description | Default | Example |
|-----------|-------------|---------|---------|
| `message` | Main message | STREAM STARTING SOON | `?message=WE%20WILL%20BEGIN%20SHORTLY` |
| `start` | Estimated start time | 14:30 | `?start=15:00` |
| `label` | Countdown label | ESTIMATED START TIME | `?label=STREAM%20BEGins%20AT` |
| `loading` | Loading text | LOADING STREAM | `?loading=PREPARING%20BROADCAST` |
| `logo` | Event logo text | GSCRL | `?logo=GSCRL%202024` |
| `subtitle` | Event subtitle | ROBOT COMBAT LEAGUE | `?subtitle=SUMMER%20CHAMPIONSHIP` |
| `event` | Event name | Summer Showdown | `?event=Annual%20Invitational` |
| `date` | Event date | June 15, 2024 | `?date=August%2010,%202024` |
| `location` | Event location | Virtual Arena | `?location=New%20Jersey` |
| `weights` | Weight classes | 3lb, 12lb, 30lb | `?weights=1lb,%203lb,%2012lb` |
| `twitter` | Twitter handle | @GSCRL | `?twitter=@GSCRL_League` |
| `facebook` | Facebook handle | /GSCRL | `?facebook=/GSCRLOfficial` |
| `instagram` | Instagram handle | @GSCRL | `?instagram=@GSCRL_Gram` |
| `twitch` | Twitch handle | GSCRL | `?twitch=GSCRL_TV` |
| `showinfo` | Show event info | true | `?showinfo=false` |
| `showsocial` | Show social media | true | `?showsocial=false` |
| `showtech` | Show technical info | true | `?showtech=false` |
| `color` | Accent color (hex) | FF6B6B | `?color=4ECDC4` |

### Break Timer

| Parameter | Description | Default | Example |
|-----------|-------------|---------|---------|
| `duration` | Minutes | 10 | `?duration=15` |
| `label` | Display text | BE RIGHT BACK | `?label=BRB` |
| `color` | Hex color (no #) | FF6B6B | `?color=4ECDC4` |
| `autostart` | Start on load | false | `?autostart=true` |
| `hidecontrols` | Hide buttons | false | `?hidecontrols=true` |

### Match Info

| Parameter | Description | Default | Example |
|-----------|-------------|---------|---------|
| `event` | Event name | GSCRL EVENT | `?event=Summer%20Showdown` |
| `weightclass` | Weight class | 3lb | `?weightclass=12lb` |
| `round` | Match round | 1 | `?round=2` |
| `matchstatus` | Match status | UPCOMING | `?matchstatus=IN%20PROGRESS` |
| `timer` | Match timer (MM:SS) | 03:00 | `?timer=05:00` |
| `redplayer` | Red player name | Player 1 | `?redplayer=John%20Doe` |
| `redbot` | Red bot name | Bot A | `?redbot=Crusher` |
| `redrecord` | Red record (W-L) | 0-0 | `?redrecord=5-2` |
| `blueplayer` | Blue player name | Player 2 | `?blueplayer=Jane%20Smith` |
| `bluebot` | Blue bot name | Bot B | `?bluebot=Spinner` |
| `bluerecord` | Blue record (W-L) | 0-0 | `?bluerecord=3-1` |
| `showrecords` | Show player records | true | `?showrecords=false` |
| `showevent` | Show event name | true | `?showevent=false` |
| `color` | Accent color (hex) | FF6B6B | `?color=4ECDC4` |

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
- [x] **Phase 2: Core Overlays** — Match info ✓, countdown, lower third
- [ ] **Phase 3: Integration** — True Finals API, WebSocket control
- [ ] **Phase 4: Polish** — Sponsors, sound effects, animations

## Event Info Overlay

The Event Info overlay is a versatile, multi-purpose overlay designed to provide general updates, schedule information, sponsor messages, and engagement prompts throughout the streaming event.

### Features

- **Multiple Content Types**: Schedule, Standings, Sponsors, Engagement
- **URL Parameter Control**: Full configuration via URL parameters
- **Settings Panel**: Comprehensive customization with localStorage persistence
- **Smooth Animations**: Professional transitions between content
- **Responsive Design**: Works on all screen sizes
- **Real-time Updates**: Clock and timer functionality

### Content Types

#### 1. Schedule Display
Shows upcoming matches with times, weight classes, and round information.

#### 2. Standings/Bracket
Displays current standings table with competitor names, records, and points.

#### 3. Sponsor Showcase
Rotating sponsor messages with logos, CTAs, and social media links.

#### 4. Engagement Prompts
Interactive polls and questions for viewer participation.

### URL Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `type` | Content type | `?type=standings` |
| `event` | Event name | `?event=National%20Invitational` |
| `status` | Event status | `?status=INTERMISSION` |
| `nextmatch` | Next match info | `?nextmatch=Bot%20A%20vs%20Bot%20B` |
| `nexttime` | Estimated time | `?nexttime=15:00` |
| `weightclass` | Weight class | `?weightclass=12lb` |
| `schedule` | Schedule data (JSON) | `?schedule=[...]` |
| `standings` | Standings data (JSON) | `?standings=[...]` |
| `sponsor` | Sponsor data (JSON) | `?sponsor=[...]` |
| `sponsormessage` | Simple sponsor message | `?sponsormessage=Thanks%20to%20our%20sponsors` |
| `engagement` | Engagement data (JSON) | `?engagement=[...]` |
| `prompt` | Simple engagement prompt | `?prompt=Who%20will%20win?` |
| `showheader` | Show header | `?showheader=false` |
| `showfooter` | Show footer | `?showfooter=false` |
| `showtimer` | Show countdown timer | `?showtimer=true` |
| `timer` | Timer duration (seconds) | `?timer=600` |
| `color` | Accent color (hex) | `?color=4ECDC4` |

### Example URLs

**Basic Schedule:**
```
overlays/event-info.html
```

**Standings View:**
```
overlays/event-info.html?type=standings&event=Summer%20Showdown
```

**Custom Schedule Data:**
```
overlays/event-info.html?schedule=[{"match":"Team%20A%20vs%20Team%20B","time":"15:00","weight":"12lb","round":"Final"}]
```

**Sponsor Message:**
```
overlays/event-info.html?type=sponsor&sponsormessage=Presented%20by%20Our%20Amazing%20Sponsors!
```

**Engagement Prompt:**
```
overlays/event-info.html?type=engagement&prompt=WHO%20WILL%20WIN%20THE%20NEXT%20MATCH?
```

**Complex Configuration:**
```
overlays/event-info.html?event=National%20Championship&type=schedule&schedule=[{"match":"Match%201","time":"14:00","weight":"3lb","round":"Quarterfinal"},{"match":"Match%202","time":"14:30","weight":"12lb","round":"Quarterfinal"}]&standings=[{"name":"Competitor%201","wins":2,"losses":0,"points":6},{"name":"Competitor%202","wins":1,"losses":1,"points":3}]&color=4ECDC4
```

### Settings Panel

Press **Ctrl+S** to open the settings panel for comprehensive configuration:

- **General Settings**: Event title, status
- **Content Settings**: Active content type selection
- **Schedule Settings**: JSON editor for schedule data
- **Display Options**: Show/hide header, footer
- **Styling**: Custom accent colors
- **Data Management**: Import/export configuration

### JSON Data Formats

**Schedule Data:**
```json
[
  {
    "match": "John Doe vs Jane Smith",
    "time": "14:30",
    "weight": "3lb",
    "round": "Quarterfinal"
  }
]
```

**Standings Data:**
```json
[
  {
    "name": "John Doe",
    "wins": 3,
    "losses": 1,
    "points": 9
  }
]
```

**Sponsor Data:**
```json
[
  {
    "name": "Acme Robotics",
    "message": "Proud sponsor of the event!",
    "logo": "logo.png",
    "url": "https://acme.com",
    "social": "@AcmeRobotics",
    "cta": "Visit our website!"
  }
]
```

**Engagement Data:**
```json
[
  {
    "prompt": "WHO WILL WIN THE NEXT MATCH?",
    "options": ["Team A", "Team B"],
    "hashtag": "#GSCRLVote",
    "social": "@GSCRL on Twitter",
    "timer": 60
  }
]
```

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
