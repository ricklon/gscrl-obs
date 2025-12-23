# GSCRL OBS Development Guide

This guide provides development workflow, coding standards, and best practices for contributing to the GSCRL OBS Overlays project.

## Development Environment Setup

### Prerequisites
- Node.js (v18+) with npm
- Python 3 (for local server)
- Git
- Modern browser (Chrome, Firefox, Edge)
- OBS Studio (for testing overlays)

### Recommended Tools
- VS Code with Live Server extension
- ESLint for JavaScript linting
- Prettier for code formatting
- GitHub Desktop (optional)

## Project Structure

```
gscrl-obs/
├── assets/              # Static assets (fonts, logos, sounds)
├── docs/               # Documentation
├── overlays/           # Individual overlay HTML files
│   ├── break-timer.html # Working break timer overlay
│   ├── match-info.html  # (planned)
│   ├── countdown.html   # (planned)
│   └── ...
├── shared/             # Common resources
│   ├── styles.css       # CSS variables and utilities
│   ├── config.js        # Configuration and constants
│   └── utils.js         # Utility functions
├── index.html          # Landing page/overlay directory
├── README.md           # Project overview
├── DEVELOPMENT.md      # This file
└── .gitignore          # Git ignore rules
```

## Development Workflow

### 1. Local Development

Start a local server for development:

```bash
# Using Python (built-in)
python3 -m http.server 8000

# Using Node.js (npx)
npx serve .

# Using VS Code Live Server extension
```

Access overlays at:
- http://localhost:8000/overlays/break-timer.html
- http://localhost:8000/index.html

### 2. Testing in OBS

1. Open OBS Studio
2. Add a Browser source
3. Set URL to `http://localhost:8000/overlays/break-timer.html`
4. Set dimensions (e.g., 400x450 for break timer)
5. Add custom CSS: `body { background: transparent !important; }`

### 3. Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes, commit
git add .
git commit -m "Add feature: description of changes"

# Push to remote
git push origin feature/your-feature-name

# Create pull request
```

## Coding Standards

### HTML
- Use semantic HTML5 elements
- Follow accessibility best practices (ARIA labels, alt text)
- Keep structure clean and well-commented
- Use data attributes for JavaScript hooks

### CSS
- Use CSS custom properties (variables) from `shared/styles.css`
- Follow BEM-like naming conventions
- Use logical property ordering
- Comment sections clearly
- Prefer CSS animations over JavaScript when possible

### JavaScript
- Use modern ES6+ syntax
- Follow functional programming principles where appropriate
- Use descriptive variable and function names
- Add JSDoc comments for functions
- Handle errors gracefully
- Use event delegation for performance

### File Organization
- Keep overlay-specific code in individual HTML files
- Use shared resources for common functionality
- Document URL parameters and settings

## Overlay Development Checklist

### For New Overlays

1. **Planning**
   - Define purpose and use case
   - Determine dimensions and positioning
   - Plan URL parameters and settings
   - Sketch UI/UX flow

2. **Implementation**
   - Create HTML file in `overlays/`
   - Use shared styles and utilities
   - Implement core functionality
   - Add settings panel
   - Implement URL parameter support
   - Add localStorage persistence

3. **Testing**
   - Test in multiple browsers
   - Test in OBS with transparency
   - Verify URL parameter functionality
   - Test settings persistence
   - Check responsiveness

4. **Documentation**
   - Update README with overlay info
   - Add to index.html landing page
   - Document URL parameters
   - Add usage examples

## Shared Resources Usage

### CSS Variables

Import shared styles in your overlay:

```html
<link rel="stylesheet" href="../shared/styles.css">
```

Use CSS variables for theming:

```css
.element {
  background: var(--gscrl-primary);
  color: var(--gscrl-light);
  font-family: var(--font-display);
}
```

### JavaScript Utilities

Import shared utilities:

```html
<script src="../shared/utils.js"></script>
```

Use utility functions:

```javascript
// Time formatting
const formattedTime = formatTime(300); // "05:00"

// DOM utilities
const element = $('.my-element');

// Animation utilities
fadeIn(element);

// WebSocket management
const wsManager = new WebSocketManager('ws://localhost:8080');
```

### Configuration

Import shared configuration:

```html
<script src="../shared/config.js"></script>
```

Access configuration:

```javascript
// Get default values
const defaultDuration = GSCRLConfig.overlays.breakTimer.defaultDuration;

// Parse URL parameters
const urlParams = parseUrlParams();

// Load/save settings
const settings = loadSettings(GSCRLConfig.storageKeys.breakTimerSettings);
saveSettings(GSCRLConfig.storageKeys.breakTimerSettings, settings);
```

## Best Practices

### Performance
- Minimize DOM manipulations
- Use requestAnimationFrame for animations
- Debounce rapid events (resize, scroll)
- Optimize SVG and image assets

### Accessibility
- Ensure sufficient color contrast
- Add ARIA attributes where needed
- Support keyboard navigation
- Provide text alternatives for visual elements

### OBS Compatibility
- Test with transparency
- Verify dimensions work in OBS
- Check that overlays composite correctly
- Test with different OBS settings

### Error Handling
- Gracefully handle missing elements
- Validate URL parameters
- Provide fallback values
- Log errors to console for debugging

## Debugging Tips

### Common Issues

**Overlay appears black in OBS:**
- Ensure Custom CSS includes `background: transparent !important;`
- Check that the URL is correct
- Verify the server is running

**Settings don't persist:**
- localStorage may be blocked
- URL changes reset localStorage scope
- Check for JSON parsing errors

**Controls visible during stream:**
- Add `.controls, .settings-toggle { display: none !important; }` to OBS Custom CSS
- Use URL parameter `hidecontrols=true`

## Deployment

### GitHub Pages

The project is configured for GitHub Pages deployment:
- Source: Deploy from branch
- Branch: `main`
- Folder: `/ (root)`

After pushing to main, overlays will be available at:
```
https://[username].github.io/gscrl-obs/overlays/[overlay-name].html
```

### Cloudflare Pages

Alternative deployment option with similar configuration.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Follow coding standards
4. Test thoroughly (browser + OBS)
5. Update documentation
6. Submit pull request

## Resources

- [OBS Browser Source Documentation](https://obsproject.com/wiki/Sources-Guide#browser-source)
- [CSS Custom Properties Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [JavaScript Modules Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [WebSocket API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

## Development Roadmap

### Phase 2: Core Overlays (Current Focus)
- [x] Break Timer (completed)
- [ ] Match Info overlay
- [ ] Countdown overlay
- [ ] Lower Third overlay
- [ ] Bracket Display
- [ ] Sponsor Rotation

### Phase 3: Integration
- [ ] True Finals API integration
- [ ] WebSocket control server
- [ ] Remote control interface

### Phase 4: Polish
- [ ] Sound effects
- [ ] Advanced animations
- [ ] Theme customization
- [ ] Performance optimization

## Support

For development questions or issues:
- Check existing issues on GitHub
- Review documentation
- Ask in the GSCRL Discord (if available)
- Open a new issue with detailed information

Happy coding! 🚀