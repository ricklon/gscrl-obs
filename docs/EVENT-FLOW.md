# GSCRL Streaming Event Flow & Visual Story

This document outlines the complete visual storytelling flow for GSCRL streaming events, mapping out every key moment from pre-stream to post-event with the appropriate overlays and visual elements.

## 🎬 Event Timeline Overview

```
PRE-STREAM → EVENT LAUNCH → PRE-MATCH → MATCH → BETWEEN MATCHES → BREAKS → POST-EVENT
```

## 📋 Complete Event Flow with Overlays

### 1. 🕒 PRE-STREAM PHASE (30-60 minutes before event)
**Purpose:** Build anticipation, test stream, engage early viewers

#### **1.1. Waiting for Stream (Technical Setup)**
- **Overlay:** `waiting-screen.html` (NEW)
- **Duration:** Indefinite (until stream starts)
- **Content:**
  - "Stream Starting Soon" message
  - Animated loading indicator
  - Event logo/branding
  - Social media handles
  - Countdown to estimated start time
  - Technical info (audio/video test patterns)
- **Design:** Clean, professional, minimal animation
- **URL Example:**
  ```
  waiting-screen.html?event=Summer%20Showdown&start=14:30&color=FF6B6B
  ```

#### **1.2. Early Viewer Engagement**
- **Overlay:** `early-viewers.html` (NEW)
- **Duration:** 15-30 minutes before official start
- **Content:**
  - "Thanks for joining early!"
  - Event countdown timer
  - Early viewer shoutouts
  - Event schedule preview
  - Sponsor logos (rotating)
  - Chat engagement prompts
- **Design:** Friendly, welcoming, interactive feel
- **URL Example:**
  ```
  early-viewers.html?event=Summer%20Showdown&start=14:30&sponsors=logo1,logo2
  ```

### 2. 🚀 EVENT LAUNCH PHASE (Official Start)
**Purpose:** Grand opening, set the tone, welcome audience

#### **2.1. Event Welcome Screen**
- **Overlay:** `welcome-screen.html` (NEW)
- **Duration:** 60-90 seconds
- **Content:**
  - "WELCOME TO [EVENT NAME]" animated title
  - Event logo with entrance animation
  - Date, location, sponsors
  - Host/commentator names
  - Social media hashtags
  - "Today's Schedule" preview
- **Design:** High-energy, cinematic, branded
- **URL Example:**
  ```
  welcome-screen.html?event=Summer%20Showdown&date=2024-06-15&hosts=John,Jane
  ```

#### **2.2. Event Introduction**
- **Overlay:** `event-intro.html` (NEW)
- **Duration:** 2-3 minutes
- **Content:**
  - Event theme/reason (charity, championship, etc.)
  - Weight classes being competed
  - Number of competitors
  - Prize information
  - Special rules/format
  - Sponsor acknowledgments
- **Design:** Informative slideshow with smooth transitions

### 3. ⏳ PRE-MATCH PHASE (Between matches)
**Purpose:** Keep audience engaged, provide context, build excitement

#### **3.1. General Event Info**
- **Overlay:** `event-info.html` (NEW)
- **Duration:** 30-60 seconds
- **Content:**
  - Current event status
  - Upcoming match preview
  - Standings/bracket progress
  - Fun facts/stats
  - Sponsor messages
  - Social media prompts
- **Design:** Clean info panels with event branding
- **URL Example:**
  ```
  event-info.html?event=Summer%20Showdown&next=John%20vs%20Jane&weight=12lb
  ```

#### **3.2. Upcoming Match Preview**
- **Overlay:** `match-preview.html` (NEW - variant of Match Info)
- **Duration:** 60-90 seconds
- **Content:**
  - "NEXT MATCH" header
  - Red vs Blue team intros
  - Player/bot stats
  - Head-to-head history
  - Weight class info
  - Predictions/polls
- **Design:** Exciting, competitive, anticipatory
- **URL Example:**
  ```
  match-preview.html?redplayer=John&redbot=Crusher&blueplayer=Jane&bluebot=Spinner
  ```

#### **3.3. Pre-Match Countdown**
- **Overlay:** `countdown.html` (PLANNED)
- **Duration:** 10-15 seconds
- **Content:**
  - Large countdown (5-4-3-2-1-FIGHT!)
  - Team names
  - Weight class
  - Dramatic sound effects
  - Screen shake/flash effects
- **Design:** High-intensity, cinematic, immersive

### 4. ⚔️ MATCH PHASE (Active competition)
**Purpose:** Provide real-time match information

#### **4.1. Active Match Info**
- **Overlay:** `match-info.html` (COMPLETED)
- **Duration:** Entire match
- **Content:**
  - Red vs Blue team info
  - Player names, bot names
  - Weight class, round
  - Match timer
  - Match status
  - Optional: Live stats
- **Design:** Clear, readable, non-intrusive
- **URL Example:**
  ```
  match-info.html?redplayer=John&redbot=Crusher&blueplayer=Jane&bluebot=Spinner
  &matchstatus=IN%20PROGRESS&timer=05:00
  ```

#### **4.2. Live Score/Stats** (Future)
- **Overlay:** `live-stats.html` (FUTURE)
- **Content:**
  - Damage counters
  - Aggression stats
  - Time in control
  - Hit/miss ratios

### 5. 🔄 BETWEEN MATCHES PHASE
**Purpose:** Transition smoothly, maintain engagement

#### **5.1. Quick Break (1-5 minutes)**
- **Overlay:** `break-timer.html` (COMPLETED - enhanced)
- **Duration:** Configurable (1-10 minutes)
- **Content:**
  - Countdown timer
  - "BE RIGHT BACK" or custom message
  - Optional: Next match teaser
  - Optional: Sponsor spotlight
- **Design:** Simple, clear, branded
- **URL Example:**
  ```
  break-timer.html?duration=5&label=QUICK%20BREAK&color=4ECDC4
  ```

#### **5.2. Match Results Recap**
- **Overlay:** `match-results.html` (NEW)
- **Duration:** 30-60 seconds
- **Content:**
  - Winning team highlight
  - Final score/stats
  - Winning move replay info
  - Updated standings
  - Next match preview
- **Design:** Celebratory, informative
- **URL Example:**
  ```
  match-results.html?winner=John&winbot=Crusher&method=KO&time=2:45
  ```

### 6. ☕ EXTENDED BREAKS PHASE
**Purpose:** Handle longer downtime professionally

#### **6.1. Extended Break (20+ minutes)**
- **Overlay:** `extended-break.html` (NEW)
- **Duration:** 20-60 minutes
- **Content:**
  - Large countdown timer
  - "EXTENDED BREAK" header
  - Event schedule reminder
  - Sponsor rotations
  - Behind-the-scenes content
  - Social media engagement
  - Trivia/questions
- **Design:** Engaging, informative, branded
- **URL Example:**
  ```
  extended-break.html?duration=30&event=Summer%20Showdown&sponsors=logo1,logo2
  ```

#### **6.2. Lunch Break / Intermission**
- **Overlay:** `intermission.html` (NEW)
- **Duration:** 30-90 minutes
- **Content:**
  - "INTERMISSION" header
  - Countdown to return
  - Event recap so far
  - Standings/bracket update
  - Sponsor features
  - Audience Q&A prompts
  - Music playlist info
- **Design:** Relaxed, informative, engaging

### 7. 🏆 SPECIAL MOMENTS
**Purpose:** Highlight key event milestones

#### **7.1. Championship Match Introduction**
- **Overlay:** `championship-intro.html` (NEW)
- **Duration:** 2-3 minutes
- **Content:**
  - Dramatic "CHAMPIONSHIP MATCH" title
  - Finalists' journey recap
  - Road to finals highlights
  - Prize information
  - Special rules reminder
- **Design:** Epic, cinematic, high-stakes

#### **7.2. Winner Announcement**
- **Overlay:** `winner-announcement.html` (NEW)
- **Duration:** 60-90 seconds
- **Content:**
  - "AND THE WINNER IS..." build-up
  - Winning team reveal
  - Trophy presentation
  - Prize details
  - Confetti/celebration animations
  - Social media sharing prompts
- **Design:** Celebratory, memorable, shareable

### 8. 🎉 POST-EVENT PHASE
**Purpose:** Wrap up professionally, thank audience

#### **8.1. Event Recap & Highlights**
- **Overlay:** `event-recap.html` (NEW)
- **Duration:** 2-3 minutes
- **Content:**
  - "EVENT RECAP" header
  - Final standings
  - MVP/award winners
  - Memorable moments
  - Stats summary
  - Thank you message
- **Design:** Reflective, appreciative

#### **8.2. Closing Credits**
- **Overlay:** `closing-credits.html` (NEW)
- **Duration:** 60-90 seconds
- **Content:**
  - "THANK YOU" header
  - Event staff credits
  - Sponsor acknowledgments
  - Social media handles
  - Next event teaser
  - "DON'T GO YET" chat prompt
  - Post-event survey link
- **Design:** Warm, appreciative, professional

#### **8.3. Stream Ending**
- **Overlay:** `stream-ending.html` (NEW)
- **Duration:** Indefinite (until stream ends)
- **Content:**
  - "STREAM ENDED" message
  - Event replay info
  - Highlight clips availability
  - Social media follow prompts
  - Next event countdown
  - "Thanks for watching!"
- **Design:** Clean, informative, branded

## 🎨 Visual Storytelling Principles

### 1. **Consistent Branding**
- All overlays use GSCRL color scheme and fonts
- Unified design language across all screens
- Consistent animation styles and timing

### 2. **Emotional Arc**
```
Anticipation → Excitement → Engagement → Celebration → Reflection
```

### 3. **Information Hierarchy**
- **Primary:** Current action/phase (large, central)
- **Secondary:** Contextual info (supporting details)
- **Tertiary:** Additional engagement (social, sponsors)

### 4. **Pacing & Timing**
- **Fast phases:** Countdowns, match intros (high energy)
- **Medium phases:** Match info, results (steady engagement)
- **Slow phases:** Breaks, intermissions (relaxed engagement)

## 🔧 Technical Implementation Plan

### Overlay Development Priority
1. **High Priority (Event-Critical):**
   - `waiting-screen.html` - Pre-stream waiting
   - `welcome-screen.html` - Event launch
   - `event-info.html` - General event info
   - `extended-break.html` - Long breaks
   - `match-results.html` - Post-match recap

2. **Medium Priority (Enhancement):**
   - `early-viewers.html` - Early engagement
   - `match-preview.html` - Upcoming match
   - `championship-intro.html` - Special matches
   - `winner-announcement.html` - Celebrations
   - `event-recap.html` - Post-event summary

3. **Low Priority (Polish):**
   - `closing-credits.html` - Professional ending
   - `stream-ending.html` - Clean exit
   - `intermission.html` - Themed breaks

### Shared Components Strategy
- **Base Template:** Common HTML structure
- **Shared Styles:** Consistent CSS variables
- **Utility Functions:** Reusable JavaScript
- **Configuration:** Centralized settings
- **Animation Library:** Standardized effects

### URL Parameter Strategy
Each overlay will support:
- **Content parameters** (text, names, etc.)
- **Display parameters** (show/hide elements)
- **Styling parameters** (colors, themes)
- **Timing parameters** (durations, delays)

## 🎯 Event Flow Coordination

### OBS Scene Organization
```
Scenes/
├── Pre-Stream/
│   ├── Waiting Screen
│   └── Early Viewers
├── Event Launch/
│   ├── Welcome
│   └── Introduction
├── Pre-Match/
│   ├── Event Info
│   ├── Match Preview
│   └── Countdown
├── Match/
│   └── Match Info (persistent)
├── Between Matches/
│   ├── Results Recap
│   ├── Quick Break
│   └── Match Preview
├── Extended Breaks/
│   ├── Extended Break Timer
│   └── Intermission
└── Post-Event/
    ├── Event Recap
    ├── Closing Credits
    └── Stream Ending
```

### Coordination Methods
1. **Manual Control:** URL parameters + OBS scene switching
2. **Semi-Automated:** Browser source refresh with new URLs
3. **Fully Automated:** WebSocket control + event scheduler

## 📊 Example Event Timeline

```
13:00 - 13:30 : Waiting Screen (Technical Setup)
13:30 - 14:00 : Early Viewers (Engagement)
14:00 - 14:05 : Welcome Screen (Event Launch)
14:05 - 14:10 : Event Introduction
14:10 - 14:15 : Event Info (Schedule)
14:15 - 14:20 : Match Preview (Match 1)
14:20 - 14:25 : Countdown
14:25 - 14:35 : Match 1 (Match Info Overlay)
14:35 - 14:40 : Match Results + Quick Break
14:40 - 14:45 : Match Preview (Match 2)
14:45 - 14:50 : Countdown
14:50 - 15:00 : Match 2 (Match Info Overlay)
...
15:30 - 16:00 : Extended Break (Lunch)
16:00 - 16:05 : Event Info (Afternoon Schedule)
...
17:30 - 17:45 : Championship Intro
17:45 - 18:00 : Championship Match
18:00 - 18:10 : Winner Announcement
18:10 - 18:15 : Event Recap
18:15 - 18:20 : Closing Credits
18:20 - 18:30 : Stream Ending
```

## 🎨 Design System for Event Flow

### Color Coding by Phase
- **Pre-Stream:** Blues (calm, anticipatory)
- **Event Launch:** Golds/Oranges (exciting, warm)
- **Pre-Match:** Greens (preparation, readiness)
- **Match:** Reds (intensity, competition)
- **Breaks:** Purples (relaxation, transition)
- **Post-Event:** Teals (reflection, closure)

### Typography Hierarchy
- **Titles:** Russo One, 48-72px, uppercase
- **Subtitles:** Russo One, 24-36px, uppercase
- **Body:** Inter, 16-20px, sentence case
- **Meta:** Inter, 12-14px, uppercase

### Animation Patterns
- **Entrances:** Slide/fade from appropriate direction
- **Exits:** Fade/shrink to center or edge
- **Transitions:** Smooth crossfades (300-500ms)
- **Highlights:** Pulse/glow on important elements

## 🚀 Implementation Roadmap

### Phase 1: Core Event Flow (Current)
- [x] Break Timer (enhanced for between matches)
- [x] Match Info (active match display)
- [ ] Waiting Screen (pre-stream)
- [ ] Welcome Screen (event launch)
- [ ] Event Info (general updates)
- [ ] Extended Break (long downtime)

### Phase 2: Enhanced Engagement
- [ ] Early Viewers (pre-event engagement)
- [ ] Match Preview (upcoming match hype)
- [ ] Match Results (post-match recap)
- [ ] Championship Intro (special matches)
- [ ] Winner Announcement (celebration)

### Phase 3: Professional Polish
- [ ] Countdown (pre-match excitement)
- [ ] Intermission (themed breaks)
- [ ] Event Recap (post-event summary)
- [ ] Closing Credits (professional ending)
- [ ] Stream Ending (clean exit)

## 🎯 Success Metrics

### Visual Storytelling Goals
✅ **Smooth Transitions** - No jarring cuts between phases
✅ **Clear Communication** - Audience always knows what's happening
✅ **Consistent Branding** - Professional GSCRL identity throughout
✅ **Engagement Maintenance** - No dead air or confusion
✅ **Information Hierarchy** - Important info always visible
✅ **Emotional Journey** - Builds and releases tension appropriately

### Technical Requirements
✅ **OBS Compatibility** - All overlays work with transparency
✅ **Performance** - No lag or stutter during transitions
✅ **Responsive Design** - Works at various resolutions
✅ **URL Control** - All overlays configurable via URL
✅ **Settings Persistence** - LocalStorage for quick adjustments
✅ **Error Handling** - Graceful fallbacks for all scenarios

## 📋 Checklist for Event Producers

### Pre-Event Preparation
- [ ] Configure all overlay URLs with event-specific data
- [ ] Set up OBS scenes for each event phase
- [ ] Test all transitions between scenes
- [ ] Prepare backup URLs with default settings
- [ ] Verify all sponsor logos and event info

### During Event
- [ ] Monitor overlay performance
- [ ] Adjust timers as needed
- [ ] Update match info between rounds
- [ ] Handle unexpected delays gracefully
- [ ] Engage with chat using overlay prompts

### Post-Event
- [ ] Save successful URL configurations
- [ ] Gather feedback on overlay effectiveness
- [ ] Identify areas for improvement
- [ ] Archive event-specific assets
- [ ] Update documentation with lessons learned

## 🎉 Conclusion

This comprehensive event flow ensures that GSCRL streaming events have a **professional, engaging, and visually cohesive** presentation from start to finish. Each overlay serves a specific purpose in the overall narrative, creating a seamless experience for viewers while providing essential information to commentators and production staff.

The system is designed to be **flexible, scalable, and maintainable**, allowing for easy updates and expansions as event requirements evolve. With this complete visual storytelling framework, GSCRL events will have production quality rivaling major esports broadcasts.