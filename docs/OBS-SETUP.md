# OBS Setup Guide

This guide explains how to add GSCRL overlays to your OBS scenes.

## Hosted URLs

Once deployed, your overlays will be available at:

**GitHub Pages:**
```
https://[username].github.io/gscrl-obs/overlays/[overlay-name].html
```

**Cloudflare Pages:**
```
https://gscrl-obs.pages.dev/overlays/[overlay-name].html
```

## Adding an Overlay to OBS

### Step 1: Add a Browser Source

1. Open OBS Studio
2. In your scene, click **+** in the Sources panel
3. Select **Browser**
4. Give it a name (e.g., "Break Timer")
5. Click **OK**

### Step 2: Configure the Browser Source

**URL:** Enter the full overlay URL
```
https://gscrl-obs.pages.dev/overlays/break-timer.html
```

**Dimensions:** Set based on overlay type (see table below)

| Overlay | Width | Height |
|---------|-------|--------|
| Break Timer | 400 | 450 |
| Match Info | 1920 | 200 |
| Countdown | 1920 | 1080 |
| Lower Third | 1920 | 200 |
| Bracket | 1920 | 1080 |
| Sponsors | 400 | 150 |

### Step 3: Enable Transparency

Add this to the **Custom CSS** field:

```css
body { background: transparent !important; }
```

This ensures the overlay composites properly over your video sources.

### Step 4: Additional Settings

- **Control audio via OBS:** Check this if the overlay has sound effects
- **Refresh browser when scene becomes active:** Enable for countdown overlays
- **Shutdown source when not visible:** Enable to save resources

## URL Parameters

Configure overlays without opening settings panels by using URL parameters:

### Break Timer Parameters

| Parameter | Description | Default | Example |
|-----------|-------------|---------|---------|
| `duration` | Minutes | 10 | `?duration=15` |
| `label` | Display text | BE RIGHT BACK | `?label=BACK%20SOON` |
| `color` | Hex color (no #) | FF6B6B | `?color=4ECDC4` |
| `autostart` | Start on load | false | `?autostart=true` |
| `hidecontrols` | Hide buttons | false | `?hidecontrols=true` |

**Example URL:**
```
.../break-timer.html?duration=10&label=BRB&color=FF6B6B&hidecontrols=true&autostart=true
```

## Accessing Settings Panel

Each overlay has a gear icon in the top-right corner. Click it to open the settings panel where you can adjust:

- Duration/timing
- Text labels
- Accent colors
- Control visibility

Settings are saved to localStorage and persist across browser refreshes.

**Tip:** To hide the settings gear in production, add this to OBS Custom CSS:
```css
.settings-toggle { display: none !important; }
```

## Recommended Scene Organization

```
Scenes:
├── Starting Soon
│   └── break-timer.html (with custom "STARTING SOON" label)
│
├── Match View
│   ├── Camera source
│   ├── match-info.html (lower portion)
│   └── arena-overlay (optional)
│
├── Pre-Match Countdown
│   └── countdown.html (fullscreen, triggered before fights)
│
├── Bracket View
│   └── bracket.html (fullscreen)
│
├── Break/Intermission
│   ├── break-timer.html
│   └── sponsors.html
│
└── End Screen
    └── lower-third.html (with winner announcement)
```

## Interacting with Overlays

### Method 1: OBS Interact
Right-click the browser source → **Interact**

This opens a window where you can click buttons and adjust settings.

### Method 2: Separate Browser Window
Open the overlay URL in Chrome/Firefox to configure settings, then use the same URL in OBS.

### Method 3: URL Parameters
Pre-configure everything via URL so no interaction is needed during the stream.

## Keyboard Shortcuts (Countdown Overlay)

When the countdown overlay is focused:
- **Spacebar** — Start countdown
- **R** — Reset countdown

## Troubleshooting

### Overlay appears black
- Ensure the URL is correct
- Check that Custom CSS includes `background: transparent`
- Try refreshing the source (right-click → Refresh)

### Settings don't persist
- localStorage may be blocked
- If you change the URL (even parameters), localStorage resets
- Use URL parameters for persistent configuration

### Controls visible during stream
Add to Custom CSS:
```css
.controls, .settings-toggle, .settings-panel {
  display: none !important;
}
```

### Overlay looks blurry
- Set browser source dimensions to match the overlay's recommended size
- Avoid scaling browser sources up significantly

### Audio not playing
- OBS may block autoplay audio
- Add `?audio=true` parameter or interact with the overlay first
- Check "Control audio via OBS" in source properties

## Refreshing Overlays

To update an overlay during a stream:
1. Right-click the browser source
2. Select **Refresh**

Or use keyboard shortcut if you've set one up in OBS.

## Multiple Instances

You can have multiple instances of the same overlay with different configurations:

```
break-timer.html?duration=5&label=SHORT%20BREAK
break-timer.html?duration=30&label=LUNCH%20BREAK
```

Each instance maintains its own settings.
