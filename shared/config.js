/**
 * GSCRL-OBS Shared Configuration
 * Central configuration for colors, fonts, API endpoints, and defaults
 */

const GSCRLConfig = {
  // Storage Keys (localStorage)
  // ========================================
  storageKeys: {
    breakTimerSettings: 'gscrl-break-timer-settings',
    matchInfoSettings: 'gscrl-match-info-settings',
    countdownSettings: 'gscrl-countdown-settings',
    lowerThirdSettings: 'gscrl-lower-third-settings',
    globalTheme: 'gscrl-global-theme'
  }
=======
  // ========================================
  // Storage Keys (localStorage)
  // ========================================
  storageKeys: {
    breakTimerSettings: 'gscrl-break-timer-settings',
    matchInfoSettings: 'gscrl-match-info-settings',
    countdownSettings: 'gscrl-countdown-settings',
    lowerThirdSettings: 'gscrl-lower-third-settings',
    globalTheme: 'gscrl-global-theme'
  }Overlay Defaults
  // ========================================
  overlays: {
    breakTimer: {
      defaultDuration: 10, // minutes
      defaultLabel: 'BE RIGHT BACK',
      presets: [5, 10, 15, 20, 30],
      showControls: true
    },
    matchInfo: {
      defaultWeightClass: '3lb',
      weightClasses: ['150g', '1lb', '3lb', '12lb', '30lb'],
      showRecord: true
    },
    countdown: {
      defaultSeconds: 3,
      finalText: 'FIGHT!',
      soundEnabled: false
    },
    lowerThird: {
      animationDuration: 500, // ms
      displayDuration: 5000, // ms (0 = indefinite)
      style: 'default'
    },
    sponsors: {
      rotationInterval: 10000, // ms
      transition: 'fade'
    }
  },
=======
  // ========================================
  // Overlay Defaults
  // ========================================
  overlays: {
    breakTimer: {
      defaultDuration: 10, // minutes
      defaultLabel: 'BE RIGHT BACK',
      presets: [5, 10, 15, 20, 30],
      showControls: true
    },
    matchInfo: {
      defaultWeightClass: '3lb',
      weightClasses: ['150g', '1lb', '3lb', '12lb', '30lb'],
      defaultStatus: 'UPCOMING',
      statusOptions: ['UPCOMING', 'IN PROGRESS', 'COMPLETED'],
      showRecord: true,
      showEventName: true,
      defaultTimer: '03:00'
    },
    countdown: {
      defaultSeconds: 3,
      finalText: 'FIGHT!',
      soundEnabled: false
    },
    lowerThird: {
      animationDuration: 500, // ms
      displayDuration: 5000, // ms (0 = indefinite)
      style: 'default'
    },
    sponsors: {
      rotationInterval: 10000, // ms
      transition: 'fade'
    }
  },========================================
  // Brand Colors
  // ========================================
  colors: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    dark: '#1a1a2e',
    darker: '#0f0f1a',
    light: '#ffffff',
    gray: '#888899',
    success: '#4ECDC4',
    warning: '#FFE66D',
    danger: '#FF6B6B',
    info: '#45B7D1'
  },

  // ========================================
  // Typography
  // ========================================
  fonts: {
    display: "'Russo One', 'Impact', sans-serif",
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace"
  },

  // Google Fonts URL for overlays that need it
  fontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Russo+One&display=swap',

  // ========================================
  // API Endpoints (for True Finals integration)
  // ========================================
  api: {
    trueFinals: {
      baseUrl: 'https://api.truefinals.com',
      // Placeholder - replace with actual tournament ID
      tournamentId: null
    },
    // WebSocket server for real-time updates (when running control server)
    websocket: {
      url: 'ws://localhost:8080',
      reconnectInterval: 5000
    }
  },

  // ========================================
  // Overlay Defaults
  // ========================================
  overlays: {
    breakTimer: {
      defaultDuration: 10, // minutes
      defaultLabel: 'BE RIGHT BACK',
      presets: [5, 10, 15, 20, 30],
      showControls: true
    },
    matchInfo: {
      defaultWeightClass: '3lb',
      weightClasses: ['150g', '1lb', '3lb', '12lb', '30lb'],
      showRecord: true
    },
    countdown: {
      defaultSeconds: 3,
      finalText: 'FIGHT!',
      soundEnabled: false
    },
    lowerThird: {
      animationDuration: 500, // ms
      displayDuration: 5000, // ms (0 = indefinite)
      style: 'default'
    },
    sponsors: {
      rotationInterval: 10000, // ms
      transition: 'fade'
    }
  },

  // ========================================
  // Storage Keys (localStorage)
  // ========================================
  storageKeys: {
    breakTimerSettings: 'gscrl-break-timer-settings',
    matchInfoSettings: 'gscrl-match-info-settings',
    countdownSettings: 'gscrl-countdown-settings',
    lowerThirdSettings: 'gscrl-lower-third-settings',
    globalTheme: 'gscrl-global-theme'
  }
};

/**
 * Parse URL parameters for overlay configuration
 * @returns {Object} Parsed parameters
 */
function parseUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const result = {};

  for (const [key, value] of params) {
    // Handle boolean strings
    if (value === 'true') {
      result[key] = true;
    } else if (value === 'false') {
      result[key] = false;
    } else if (!isNaN(value) && value !== '') {
      // Handle numbers
      result[key] = Number(value);
    } else {
      result[key] = value;
    }
  }

  return result;
}

/**
 * Apply color from URL parameter (hex without #)
 * @param {string} colorParam - Hex color without # prefix
 * @returns {string} Properly formatted hex color
 */
function parseColorParam(colorParam) {
  if (!colorParam) return null;
  // Remove # if accidentally included
  const hex = colorParam.replace('#', '');
  // Validate hex format
  if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
    return '#' + hex;
  }
  return null;
}

/**
 * Load settings from localStorage with defaults
 * @param {string} key - Storage key
 * @param {Object} defaults - Default values
 * @returns {Object} Merged settings
 */
function loadSettings(key, defaults = {}) {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return { ...defaults, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.warn('Failed to load settings from localStorage:', e);
  }
  return defaults;
}

/**
 * Save settings to localStorage
 * @param {string} key - Storage key
 * @param {Object} settings - Settings to save
 */
function saveSettings(key, settings) {
  try {
    localStorage.setItem(key, JSON.stringify(settings));
  } catch (e) {
    console.warn('Failed to save settings to localStorage:', e);
  }
}

/**
 * Apply theme color to CSS custom property
 * @param {string} color - Hex color
 * @param {string} property - CSS property name (default: --gscrl-primary)
 */
function applyThemeColor(color, property = '--gscrl-primary') {
  if (color) {
    document.documentElement.style.setProperty(property, color);
    // Also update glow color if primary is changed
    if (property === '--gscrl-primary') {
      document.documentElement.style.setProperty('--glow-color', color);
    }
  }
}

// Export for ES modules (if supported)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    GSCRLConfig,
    parseUrlParams,
    parseColorParam,
    loadSettings,
    saveSettings,
    applyThemeColor
  };
}
