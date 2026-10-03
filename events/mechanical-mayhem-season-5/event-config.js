// Generated from config/events.json by npm run sync:events. Do not edit.
const MechanicalMayhem = {
  "title": "GSCRL: Mechanical Mayhem Fall — Season 5 Opener",
  "season": "2026–27",
  "venue": "Ideal Farm & Garden Center",
  "location": "Lafayette Township, NJ",
  "address": "222 NJ-15, Lafayette Township, NJ 07848",
  "eventUrl": "https://www.robotcombatevents.com/events/9596",
  "timezone": "America/New_York",
  "sponsors": [],
  "days": {
    "1": {
      "date": "2026-10-03",
      "label": "Saturday, October 3",
      "badge": "Season 5 Opener • Saturday, October 3, 2026",
      "classes": [
        "150g Fairyweight",
        "1lb Plastic Antweight",
        "1lb Standard Antweight"
      ],
      "defaultWeightClass": "1lb",
      "tournaments": {
        "fairyweight": "12d25847dc964a64",
        "plasticAntweight": "79b98376f28f4dc5",
        "antweight": "2c1a522669b34fec"
      }
    },
    "2": {
      "date": "2026-10-04",
      "label": "Sunday, October 4",
      "badge": "Season 5 Opener • Sunday, October 4, 2026",
      "classes": [
        "3lb Beetleweight"
      ],
      "defaultWeightClass": "3lb",
      "tournaments": {
        "beetleweight": "f1bacdd759cd41e1"
      }
    }
  },
  "schedule": [
    {
      "time": "8:00 AM EDT",
      "name": "Doors open"
    },
    {
      "time": "9:00–10:30 AM EDT",
      "name": "Safety checks & registration"
    },
    {
      "time": "10:00 AM EDT",
      "name": "Drivers, judges & volunteer meeting"
    },
    {
      "time": "11:00 AM EDT",
      "name": "Competition starts"
    },
    {
      "time": "5:00–6:00 PM EDT",
      "name": "Awards"
    }
  ]
};
// Day defaults to Saturday and stays pinned throughout a live scene.
function getEventDay() { return new URLSearchParams(window.location.search).get('day') === '2' ? 2 : 1; }
function applyEventColor() {
  const color = new URLSearchParams(window.location.search).get('color');
  if (color && /^#?[0-9a-f]{6}$/i.test(color)) {
    const hex = '#' + color.replace('#', '');
    document.documentElement.style.setProperty('--gscrl-primary', hex);
    document.documentElement.style.setProperty('--glow-color', hex);
  }
}
