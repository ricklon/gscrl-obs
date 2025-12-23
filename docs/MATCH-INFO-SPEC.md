# Match Info Overlay Specification

## Overview

The Match Info overlay displays current match details for robot combat events. It's designed to be placed in the lower portion of the screen during live matches.

## Requirements

### Core Features
- Display player names (Red vs Blue corners)
- Show robot/bot names
- Indicate weight class
- Show match status (Upcoming, In Progress, Completed)
- Display timer/round information
- Optional: Show player records (Wins-Losses)
- Optional: Show event/tournament name

### Design Specifications
- **Dimensions**: 1920x200 (full width, lower third height)
- **Layout**: Two-column design (Red vs Blue)
- **Color Scheme**: Use GSCRL brand colors with team-specific accents
- **Typography**: Use shared font variables (Russo One for display, Inter for body)
- **Transparency**: Must work with transparent background in OBS

### URL Parameters

| Parameter | Description | Default | Example |
|-----------|-------------|---------|---------|
| `redplayer` | Red corner player name | "Player 1" | `?redplayer=John%20Doe` |
| `redbot` | Red corner bot name | "Bot A" | `?redbot=Crusher` |
| `blueplayer` | Blue corner player name | "Player 2" | `?blueplayer=Jane%20Smith` |
| `bluebot` | Blue corner bot name | "Bot B" | `?bluebot=Spinner` |
| `weightclass` | Weight class | "3lb" | `?weightclass=12lb` |
| `matchstatus` | Match status | "UPCOMING" | `?matchstatus=IN%20PROGRESS` |
| `timer` | Match timer (MM:SS) | "03:00" | `?timer=05:00` |
| `event` | Event name | "GSCRL Event" | `?event=Summer%20Showdown` |
| `showrecords` | Show player records | false | `?showrecords=true` |
| `redrecord` | Red player record | "0-0" | `?redrecord=5-2` |
| `bluerecord` | Blue player record | "0-0" | `?bluerecord=3-1` |
| `color` | Primary accent color | FF6B6B | `?color=4ECDC4` |

### Settings Panel Requirements
- Input fields for all player/bot names
- Weight class dropdown (150g, 1lb, 3lb, 12lb, 30lb)
- Match status selector (Upcoming, In Progress, Completed)
- Timer configuration
- Event name input
- Toggle for showing records
- Color picker for accent color
- Preset configurations for common scenarios

### Data Flow
1. Load default values from `shared/config.js`
2. Parse URL parameters (override defaults)
3. Load saved settings from localStorage
4. Apply theme colors
5. Render match information
6. Handle settings changes and persistence

### Technical Implementation

**HTML Structure:**
```html
<div class="match-info-container">
  <div class="match-header">
    <!-- Event name, weight class, status -->
  </div>
  <div class="match-teams">
    <div class="team red-team">
      <!-- Red team info -->
    </div>
    <div class="team-divider">
      <!-- VS indicator -->
    </div>
    <div class="team blue-team">
      <!-- Blue team info -->
    </div>
  </div>
  <div class="match-timer">
    <!-- Timer display -->
  </div>
</div>
```

**JavaScript State:**
```javascript
const state = {
  redPlayer: "Player 1",
  redBot: "Bot A", 
  redRecord: "0-0",
  bluePlayer: "Player 2",
  blueBot: "Bot B",
  blueRecord: "0-0",
  weightClass: "3lb",
  matchStatus: "UPCOMING",
  timer: "03:00",
  eventName: "GSCRL Event",
  showRecords: false,
  accentColor: "#FF6B6B"
};
```

**CSS Requirements:**
- Use shared styles from `shared/styles.css`
- Team-specific styling (red vs blue accents)
- Responsive layout that works at 1920x200
- Animation for status changes
- Glow effects for active elements

### Integration Points

**Shared Resources to Use:**
- `shared/styles.css` - CSS variables and utilities
- `shared/config.js` - Configuration and defaults
- `shared/utils.js` - Utility functions (formatTime, etc.)

**Configuration Updates Needed:**
Add to `shared/config.js`:
```javascript
matchInfo: {
  defaultWeightClass: '3lb',
  weightClasses: ['150g', '1lb', '3lb', '12lb', '30lb'],
  defaultStatus: 'UPCOMING',
  statusOptions: ['UPCOMING', 'IN PROGRESS', 'COMPLETED'],
  showRecords: false,
  showEventName: true
}
```

### Testing Requirements

**Browser Testing:**
- Verify all URL parameters work correctly
- Test settings panel functionality
- Check responsive behavior
- Validate localStorage persistence

**OBS Testing:**
- Confirm transparency works properly
- Verify dimensions (1920x200)
- Test with different OBS scenes
- Check performance with other overlays

### Accessibility Considerations
- Ensure sufficient color contrast
- Add ARIA attributes where needed
- Support keyboard navigation
- Provide text alternatives for visual elements

### Performance Requirements
- Minimize DOM manipulations
- Use efficient event listeners
- Optimize CSS animations
- Keep bundle size small (no external dependencies)

## Implementation Plan

1. **Update shared configuration** (config.js)
2. **Create HTML structure** with semantic elements
3. **Implement CSS styling** using shared variables
4. **Add JavaScript functionality** for state management
5. **Create settings panel** with form controls
6. **Implement URL parameter parsing**
7. **Add localStorage persistence**
8. **Test thoroughly** in browser and OBS
9. **Update documentation** (README, index.html)

## Success Criteria

✅ Displays match information clearly and attractively
✅ Works correctly in OBS with transparency
✅ Responds to URL parameters for preset configurations
✅ Settings persist across refreshes
✅ Follows established coding standards
✅ Uses shared resources effectively
✅ Performs well with no lag or jank
✅ Accessible to all users

## References

- Break Timer implementation (reference)
- GSCRL branding guidelines
- OBS Browser Source documentation
- Robot combat match formats