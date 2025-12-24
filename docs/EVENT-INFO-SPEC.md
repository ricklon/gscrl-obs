# Event Info Overlay Specification

## Overview

The Event Info overlay is a versatile, multi-purpose overlay designed to provide general updates, schedule information, sponsor messages, and engagement prompts throughout the streaming event. It serves as the "Swiss Army knife" of overlays, handling various informational needs between major segments.

## Purpose

**Primary Use Cases:**
- Display current event status and schedule
- Show upcoming match previews
- Provide standings and bracket updates
- Deliver sponsor messages and promotions
- Share fun facts, stats, and engagement prompts
- Handle unexpected delays with filler content

## Design Requirements

### Layout & Structure

**Recommended Dimensions:** 1920x1080 (full screen)
**Layout Type:** Modular card-based system
**Background:** Semi-transparent with gradient overlay
**Typography:** Consistent with GSCRL brand (Russo One for titles, Inter for body)

### Content Sections

#### 1. Header Section
- Event logo and title
- Current time/date
- Event status indicator
- Optional: Live viewer count

#### 2. Main Content Area (Modular)
**Option A: Schedule Display**
- Upcoming matches list
- Time estimates
- Weight class indicators
- Team/bot previews

**Option B: Standings/Bracket**
- Current standings table
- Bracket visualization
- Win/loss records
- Points/rankings

**Option C: Sponsor Message**
- Sponsor logo showcase
- Promotion message
- Call-to-action
- Social media handles

**Option D: Engagement Prompt**
- Poll/question display
- Social media prompts
- Hashtag challenges
- Chat interaction prompts

#### 3. Footer Section
- Social media handles
- Event hashtags
- Next segment preview
- Countdown timer (optional)

### Visual Design

**Color Scheme:**
- Primary: GSCRL brand colors
- Background: Dark gradient with 70% opacity
- Cards: Semi-transparent with subtle borders
- Text: High contrast for readability

**Animations:**
- Smooth transitions between content types
- Card entrance/exit animations
- Subtle hover effects on interactive elements
- Loading indicators for dynamic content

**Responsive Behavior:**
- Adapt to different screen sizes
- Mobile-friendly layouts
- Graceful degradation for older browsers

## Technical Implementation

### HTML Structure

```html
<div class="event-info-container">
  <header class="event-header">
    <!-- Logo, title, status -->
  </header>
  
  <main class="event-content">
    <!-- Modular content area -->
    <div class="content-card active" data-type="schedule">
      <!-- Schedule content -->
    </div>
    <div class="content-card" data-type="standings">
      <!-- Standings content -->
    </div>
    <div class="content-card" data-type="sponsor">
      <!-- Sponsor content -->
    </div>
    <div class="content-card" data-type="engagement">
      <!-- Engagement content -->
    </div>
  </main>
  
  <footer class="event-footer">
    <!-- Social media, next segment, timer -->
  </footer>
</div>
```

### JavaScript State Management

```javascript
const state = {
  activeContent: 'schedule', // schedule, standings, sponsor, engagement
  eventTitle: 'Summer Showdown',
  eventStatus: 'LIVE',
  
  // Schedule data
  upcomingMatches: [],
  
  // Standings data
  standings: [],
  
  // Sponsor data
  sponsors: [],
  activeSponsor: 0,
  sponsorRotation: 10000, // ms
  
  // Engagement data
  engagementPrompts: [],
  activePrompt: 0,
  
  // Display options
  showHeader: true,
  showFooter: true,
  showTimer: false,
  timerDuration: 300, // seconds
  
  // Styling
  accentColor: '#FF6B6B',
  backgroundGradient: 'linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)'
};
```

### URL Parameters

| Parameter | Description | Default | Example |
|-----------|-------------|---------|---------|
| `type` | Content type | schedule | `?type=standings` |
| `event` | Event name | Summer Showdown | `?event=National%20Invitational` |
| `status` | Event status | LIVE | `?status=INTERMISSION` |
| `nextmatch` | Next match info | John vs Jane | `?nextmatch=Bot%20A%20vs%20Bot%20B` |
| `nexttime` | Estimated time | 14:30 | `?nexttime=15:00` |
| `weightclass` | Weight class | 3lb | `?weightclass=12lb` |
| `standings` | Standings data | JSON | `?standings=[...]` |
| `sponsor` | Sponsor message | Thanks to our sponsors | `?sponsor=Presented%20by%20X` |
| `prompt` | Engagement prompt | Follow us on Twitter | `?prompt=Vote%20for%20your%20favorite` |
| `showheader` | Show header | true | `?showheader=false` |
| `showfooter` | Show footer | true | `?showfooter=false` |
| `showtimer` | Show countdown timer | false | `?showtimer=true` |
| `timer` | Timer duration (seconds) | 300 | `?timer=600` |
| `color` | Accent color | FF6B6B | `?color=4ECDC4` |

### Content Types

#### 1. Schedule Display
```json
{
  "type": "schedule",
  "event": "Summer Showdown",
  "status": "LIVE",
  "upcoming": [
    {
      "match": "John Doe vs Jane Smith",
      "time": "14:30",
      "weight": "3lb",
      "round": "Quarterfinal"
    },
    {
      "match": "Bot A vs Bot B",
      "time": "14:45",
      "weight": "12lb",
      "round": "Quarterfinal"
    }
  ],
  "current": "Intermission - Next match in 5 minutes"
}
```

#### 2. Standings/Bracket
```json
{
  "type": "standings",
  "event": "Summer Showdown",
  "standings": [
    {"name": "John Doe", "wins": 3, "losses": 1, "points": 9},
    {"name": "Jane Smith", "wins": 3, "losses": 1, "points": 9},
    {"name": "Mike Jones", "wins": 2, "losses": 2, "points": 6}
  ],
  "bracket": "https://example.com/bracket-image.png"
}
```

#### 3. Sponsor Message
```json
{
  "type": "sponsor",
  "message": "Today's event is brought to you by:",
  "sponsors": [
    {"name": "Sponsor 1", "logo": "logo1.png", "url": "https://sponsor1.com"},
    {"name": "Sponsor 2", "logo": "logo2.png", "url": "https://sponsor2.com"}
  ],
  "rotation": 10000,
  "cta": "Visit our sponsors at their websites!"
}
```

#### 4. Engagement Prompt
```json
{
  "type": "engagement",
  "prompt": "Who will win the next match?",
  "options": ["John Doe", "Jane Smith"],
  "hashtag": "#GSCRLVote",
  "social": "@GSCRL on Twitter",
  "timer": 60
}
```

## Development Plan

### Phase 1: Core Implementation
1. **HTML Structure** - Create base layout with content cards
2. **CSS Styling** - Implement responsive card-based design
3. **JavaScript State** - Set up state management system
4. **Content Switching** - Implement smooth transitions between content types
5. **Basic URL Parsing** - Handle content type selection

### Phase 2: Content Modules
1. **Schedule Module** - Upcoming matches display
2. **Standings Module** - Table and bracket visualization
3. **Sponsor Module** - Rotation system with timers
4. **Engagement Module** - Polls and social prompts

### Phase 3: Enhancements
1. **Animation System** - Smooth transitions and effects
2. **Timer System** - Countdown functionality
3. **Dynamic Data** - JSON parsing for complex content
4. **Responsive Design** - Mobile optimization

### Phase 4: Finalization
1. **Settings Panel** - Comprehensive customization
2. **LocalStorage** - Persistence for settings
3. **Error Handling** - Graceful fallbacks
4. **Documentation** - Usage guides and examples

## Success Criteria

✅ **Versatile Content Display** - Handles all specified content types
✅ **Smooth Transitions** - Professional animations between content
✅ **Responsive Design** - Works on all screen sizes
✅ **URL Control** - Full parameter support
✅ **Settings Persistence** - LocalStorage integration
✅ **Performance** - Optimized for streaming environments
✅ **OBS Compatibility** - Transparency and proper sizing
✅ **Accessibility** - Readable text and proper contrast

## Integration Points

### Shared Resources
- `shared/styles.css` - CSS variables and utilities
- `shared/config.js` - Configuration and constants
- `shared/utils.js` - Utility functions (JSON parsing, animations)

### Configuration Updates
Add to `shared/config.js`:
```javascript
eventInfo: {
  defaultContentType: 'schedule',
  contentTypes: ['schedule', 'standings', 'sponsor', 'engagement'],
  defaultRotation: 10000, // ms for sponsor rotation
  showHeader: true,
  showFooter: true,
  showTimer: false
}
```

## Testing Requirements

### Browser Testing
- Chrome, Firefox, Edge compatibility
- Mobile responsiveness
- Animation performance
- URL parameter handling

### OBS Testing
- Transparency verification
- Dimension accuracy (1920x1080)
- Performance with other overlays
- Scene switching compatibility

## Deployment Strategy

### GitHub Pages
- Add to main branch for automatic deployment
- Verify all URL parameters work correctly
- Test with various content configurations

### Cloudflare Pages
- Alternative deployment option
- Similar configuration to GitHub Pages

## Future Enhancements

1. **Dynamic Data Integration** - True Finals API connection
2. **WebSocket Updates** - Real-time content changes
3. **Interactive Elements** - Poll voting via WebSocket
4. **Advanced Animations** - More sophisticated transitions
5. **Theme Variations** - Different visual styles
6. **Multi-language Support** - International events

## Resources

- **Reference Overlays** - Match Info, Welcome Screen patterns
- **Animation Libraries** - Shared CSS animations
- **Design System** - GSCRL brand guidelines
- **OBS Documentation** - Browser source best practices

## Timeline Estimate

- **Phase 1 (Core):** 2-3 hours
- **Phase 2 (Modules):** 3-4 hours
- **Phase 3 (Enhancements):** 2-3 hours
- **Phase 4 (Finalization):** 1-2 hours
- **Total:** 8-12 hours

This specification provides a comprehensive blueprint for creating a versatile Event Info overlay that will serve as a critical component in the GSCRL streaming event flow system.