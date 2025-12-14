/**
 * GSCRL-OBS Shared Utilities
 * Common utilities for formatting, animations, and WebSocket handling
 */

// ========================================
// Time Formatting
// ========================================

/**
 * Format seconds into MM:SS display
 * @param {number} totalSeconds - Total seconds
 * @returns {string} Formatted time string (e.g., "05:30")
 */
function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Format seconds into HH:MM:SS display (for longer durations)
 * @param {number} totalSeconds - Total seconds
 * @returns {string} Formatted time string (e.g., "01:05:30")
 */
function formatTimeLong(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return formatTime(totalSeconds);
}

/**
 * Parse time string (MM:SS or HH:MM:SS) to seconds
 * @param {string} timeString - Time string
 * @returns {number} Total seconds
 */
function parseTimeString(timeString) {
  const parts = timeString.split(':').map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  return parseInt(timeString, 10) || 0;
}

// ========================================
// Animation Utilities
// ========================================

/**
 * Smoothly animate a numeric value change
 * @param {HTMLElement} element - Element to update
 * @param {number} start - Starting value
 * @param {number} end - Ending value
 * @param {number} duration - Animation duration in ms
 * @param {Function} formatter - Optional formatter function
 */
function animateValue(element, start, end, duration, formatter = (v) => v) {
  const startTime = performance.now();
  const diff = end - start;

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out quad
    const eased = 1 - (1 - progress) * (1 - progress);
    const current = start + diff * eased;

    element.textContent = formatter(Math.round(current));

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/**
 * Add a CSS class temporarily, then remove it
 * @param {HTMLElement} element - Target element
 * @param {string} className - Class to add
 * @param {number} duration - Duration in ms
 */
function flashClass(element, className, duration = 300) {
  element.classList.add(className);
  setTimeout(() => {
    element.classList.remove(className);
  }, duration);
}

/**
 * Fade element in
 * @param {HTMLElement} element - Target element
 * @param {number} duration - Duration in ms
 * @returns {Promise} Resolves when animation completes
 */
function fadeIn(element, duration = 300) {
  return new Promise((resolve) => {
    element.style.opacity = '0';
    element.style.display = '';
    element.style.transition = `opacity ${duration}ms ease`;

    requestAnimationFrame(() => {
      element.style.opacity = '1';
      setTimeout(resolve, duration);
    });
  });
}

/**
 * Fade element out
 * @param {HTMLElement} element - Target element
 * @param {number} duration - Duration in ms
 * @returns {Promise} Resolves when animation completes
 */
function fadeOut(element, duration = 300) {
  return new Promise((resolve) => {
    element.style.transition = `opacity ${duration}ms ease`;
    element.style.opacity = '0';

    setTimeout(() => {
      element.style.display = 'none';
      resolve();
    }, duration);
  });
}

// ========================================
// DOM Utilities
// ========================================

/**
 * Query selector shorthand
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (default: document)
 * @returns {Element|null}
 */
function $(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * Query selector all shorthand
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (default: document)
 * @returns {NodeList}
 */
function $$(selector, parent = document) {
  return parent.querySelectorAll(selector);
}

/**
 * Create element with attributes and children
 * @param {string} tag - Tag name
 * @param {Object} attrs - Attributes
 * @param {Array|string} children - Child elements or text
 * @returns {HTMLElement}
 */
function createElement(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);

  for (const [key, value] of Object.entries(attrs)) {
    if (key === 'className') {
      el.className = value;
    } else if (key === 'style' && typeof value === 'object') {
      Object.assign(el.style, value);
    } else if (key.startsWith('on') && typeof value === 'function') {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      el.setAttribute(key, value);
    }
  }

  if (typeof children === 'string') {
    el.textContent = children;
  } else if (Array.isArray(children)) {
    children.forEach((child) => {
      if (typeof child === 'string') {
        el.appendChild(document.createTextNode(child));
      } else if (child instanceof Element) {
        el.appendChild(child);
      }
    });
  }

  return el;
}

// ========================================
// WebSocket Manager
// ========================================

/**
 * WebSocket connection manager with auto-reconnect
 */
class WebSocketManager {
  constructor(url, options = {}) {
    this.url = url;
    this.reconnectInterval = options.reconnectInterval || 5000;
    this.maxReconnectAttempts = options.maxReconnectAttempts || 10;
    this.onMessage = options.onMessage || (() => {});
    this.onConnect = options.onConnect || (() => {});
    this.onDisconnect = options.onDisconnect || (() => {});

    this.ws = null;
    this.reconnectAttempts = 0;
    this.isConnecting = false;
  }

  connect() {
    if (this.ws?.readyState === WebSocket.OPEN || this.isConnecting) {
      return;
    }

    this.isConnecting = true;

    try {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        console.log('[WS] Connected to', this.url);
        this.isConnecting = false;
        this.reconnectAttempts = 0;
        this.onConnect();
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.onMessage(data);
        } catch (e) {
          console.warn('[WS] Failed to parse message:', e);
        }
      };

      this.ws.onclose = () => {
        console.log('[WS] Disconnected');
        this.isConnecting = false;
        this.onDisconnect();
        this.scheduleReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('[WS] Error:', error);
        this.isConnecting = false;
      };
    } catch (e) {
      console.error('[WS] Failed to connect:', e);
      this.isConnecting = false;
      this.scheduleReconnect();
    }
  }

  scheduleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log('[WS] Max reconnect attempts reached');
      return;
    }

    this.reconnectAttempts++;
    console.log(`[WS] Reconnecting in ${this.reconnectInterval}ms (attempt ${this.reconnectAttempts})`);

    setTimeout(() => {
      this.connect();
    }, this.reconnectInterval);
  }

  send(data) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.warn('[WS] Cannot send - not connected');
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

// ========================================
// Audio Utilities
// ========================================

/**
 * Preload audio files
 * @param {Object} sounds - Object mapping names to URLs
 * @returns {Object} Object mapping names to Audio elements
 */
function preloadSounds(sounds) {
  const loaded = {};
  for (const [name, url] of Object.entries(sounds)) {
    const audio = new Audio(url);
    audio.preload = 'auto';
    loaded[name] = audio;
  }
  return loaded;
}

/**
 * Play a sound (with error handling for autoplay policies)
 * @param {HTMLAudioElement} audio - Audio element
 * @param {number} volume - Volume (0-1)
 */
function playSound(audio, volume = 1) {
  if (!audio) return;

  audio.volume = volume;
  audio.currentTime = 0;

  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.catch((e) => {
      console.warn('Audio play failed (autoplay policy?):', e);
    });
  }
}

// ========================================
// Misc Utilities
// ========================================

/**
 * Debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Generate a simple unique ID
 * @returns {string} Unique ID
 */
function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Clamp a value between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum
 * @param {number} max - Maximum
 * @returns {number} Clamped value
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// Export for ES modules (if supported)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    formatTime,
    formatTimeLong,
    parseTimeString,
    animateValue,
    flashClass,
    fadeIn,
    fadeOut,
    $,
    $$,
    createElement,
    WebSocketManager,
    preloadSounds,
    playSound,
    debounce,
    generateId,
    clamp
  };
}
