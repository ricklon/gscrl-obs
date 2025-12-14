# Customization Guide

Learn how to customize GSCRL overlays for your own branding.

## Quick Customization (No Code)

### URL Parameters
The easiest way to customize overlays without editing code:

```
?color=4ECDC4&label=YOUR%20TEXT
```

### Settings Panel
Click the gear icon on any overlay to access live settings.

### OBS Custom CSS
Add custom styles in OBS browser source properties:

```css
/* Change accent color */
:root { --primary: #00ff00 !important; }

/* Hide controls during stream */
.controls, .settings-toggle { display: none !important; }

/* Custom font */
.timer-time { font-family: 'Your Font', sans-serif !important; }
```

## Theme Variables

All overlays use CSS custom properties for theming. Edit `shared/styles.css` or override in individual overlays:

```css
:root {
  /* Brand Colors */
  --gscrl-primary: #FF6B6B;    /* Main accent (coral red) */
  --gscrl-secondary: #4ECDC4;  /* Secondary accent (teal) */
  --gscrl-dark: #1a1a2e;       /* Dark background */
  --gscrl-darker: #0f0f1a;     /* Darker background */
  --gscrl-light: #ffffff;      /* Light text */
  --gscrl-gray: #888899;       /* Muted text */

  /* Semantic Colors */
  --color-success: #4ECDC4;
  --color-warning: #FFE66D;
  --color-danger: #FF6B6B;
  --color-info: #45B7D1;

  /* Typography */
  --font-display: 'Russo One', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Effects */
  --glow-color: var(--gscrl-primary);
  --glow-intensity: 0 0 20px;
}
```

## Changing Brand Colors

### Option 1: Edit CSS Variables

In your overlay HTML or `shared/styles.css`:

```css
:root {
  --gscrl-primary: #your-brand-color;
  --gscrl-secondary: #your-secondary-color;
}
```

### Option 2: URL Parameter

```
?color=HEXCODE
```

Note: Hex without the `#` symbol.

### Option 3: Settings Panel

Use the color picker in each overlay's settings panel.

## Custom Fonts

### Using Google Fonts

1. Find your font at [fonts.google.com](https://fonts.google.com)
2. Add the `<link>` tag in the overlay's `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

3. Update CSS variable:

```css
:root {
  --font-display: 'Your Font', sans-serif;
}
```

### Using Local Fonts

1. Add font files to `assets/fonts/`
2. Define `@font-face` in your overlay:

```css
@font-face {
  font-family: 'CustomFont';
  src: url('../assets/fonts/customfont.woff2') format('woff2');
}

:root {
  --font-display: 'CustomFont', sans-serif;
}
```

## Modifying Overlays

### Break Timer Customization

**Change ring size:**
```css
.timer-ring-wrapper {
  width: 350px;  /* Smaller */
  height: 350px;
}
```

**Change ring thickness:**
```css
.timer-ring-bg,
.timer-ring-progress {
  stroke-width: 12;  /* Thicker ring */
}
```

**Different glow effect:**
```css
.timer-ring-progress {
  filter: drop-shadow(0 0 20px var(--primary))
          drop-shadow(0 0 40px var(--primary));
}
```

**Square timer instead of circle:**
```css
.timer-ring-wrapper {
  border: 4px solid var(--primary);
  border-radius: 12px;
}
.timer-ring { display: none; }
```

## Adding Your Logo

### In Break Timer

Add after the timer container:

```html
<img src="../assets/logos/your-logo.png"
     class="logo"
     style="position: absolute; bottom: 20px; width: 100px;">
```

### As Background Watermark

```css
body::before {
  content: '';
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 150px;
  height: 50px;
  background: url('../assets/logos/your-logo.png') no-repeat center/contain;
  opacity: 0.3;
}
```

## Creating Preset Configurations

### For Different Events

Create bookmarks or OBS browser sources with preset URLs:

**Weekly Events:**
```
break-timer.html?duration=10&label=WEEKLY%20BATTLES&color=FF6B6B
```

**Championships:**
```
break-timer.html?duration=15&label=CHAMPIONSHIP&color=FFD700
```

**Casual Streams:**
```
break-timer.html?duration=5&label=QUICK%20BREAK&color=4ECDC4
```

## Dark Mode / Light Mode

The overlays default to dark styling. For light mode, override:

```css
:root {
  --gscrl-dark: #f5f5f5;
  --gscrl-darker: #ffffff;
  --gscrl-light: #1a1a2e;
  --gscrl-gray: #666677;
}
```

## Animation Customization

### Disable Animations

```css
*, *::before, *::after {
  animation: none !important;
  transition: none !important;
}
```

### Slower Animations

```css
:root {
  --transition-fast: 300ms ease;
  --transition-base: 600ms ease;
  --transition-slow: 1000ms ease;
}
```

### Custom Pulse Effect

```css
@keyframes custom-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

.timer-container.expired .timer-time {
  animation: custom-pulse 1.5s ease-in-out infinite;
}
```

## Forking for Full Customization

For extensive changes:

1. Fork the repository
2. Edit files directly
3. Deploy your fork to GitHub Pages or Cloudflare Pages
4. Use your custom URLs in OBS

### Files to Customize

| File | Purpose |
|------|---------|
| `shared/styles.css` | Global theme variables |
| `shared/config.js` | Default values, API endpoints |
| `overlays/*.html` | Individual overlay logic |
| `assets/logos/` | Your logos and images |
| `index.html` | Landing page branding |

## Best Practices

1. **Test in OBS** — Browser rendering can differ
2. **Keep backups** — Save original files before editing
3. **Use variables** — Makes global changes easier
4. **Optimize images** — Large logos slow loading
5. **Check transparency** — Verify overlays composite correctly
