/**
 * Percentrade Environment Configuration
 * 
 * Auto-detects production vs testing mode based on hostname.
 * - Production: percentrade.com (deployed via GitHub Pages)
 * - Testing:    localhost / 127.0.0.1 / file:// (local dev)
 * 
 * Usage: Include this script FIRST on every page, then access window.ENV
 */

(function () {
    'use strict';

    const hostname = window.location.hostname;

    const isProduction =
        hostname === 'percentrade.com' ||
        hostname === 'www.percentrade.com' ||
        hostname.endsWith('.percentrade.com');

    const isDevelopment = !isProduction;

    // ─── Shared (non-secret) client keys ──────────────────────────
    // NOTE: Supabase anon key and reCAPTCHA site key are PUBLIC by design.
    //       They are safe in front-end code because:
    //       • Supabase anon key is governed by Row Level Security (RLS) on the server
    //       • reCAPTCHA site key is always public; the SECRET key stays on the server
    //       • Google Analytics Measurement ID is public by nature

    const PRODUCTION_CONFIG = {
        SUPABASE_URL:       'https://eqblphvyqfibxhrtniwq.supabase.co',
        SUPABASE_ANON_KEY:  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxYmxwaHZ5cWZpYnhocnRuaXdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4MzcwOTUsImV4cCI6MjA3MzQxMzA5NX0.QaTyuEstLGI3ISGli9ykWwmowSDKCXjiHn6xOf1oKEw',
        RECAPTCHA_SITE_KEY: '6LdLWj4sAAAAAAe5t4WZCfSeuseTugU2YTHe_9tR',
        GA_MEASUREMENT_ID:  'G-6W467GXKLQ',
        ENABLE_ANALYTICS:   true,
        DEBUG:              false,
    };

    // In testing mode: analytics off, debug logging on, reCAPTCHA uses
    // Google's test key that always passes (official Google test key)
    const DEVELOPMENT_CONFIG = {
        SUPABASE_URL:       'https://eqblphvyqfibxhrtniwq.supabase.co',   // same DB – use RLS to protect
        SUPABASE_ANON_KEY:  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxYmxwaHZ5cWZpYnhocnRuaXdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4MzcwOTUsImV4cCI6MjA3MzQxMzA5NX0.QaTyuEstLGI3ISGli9ykWwmowSDKCXjiHn6xOf1oKEw',
        RECAPTCHA_SITE_KEY: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',  // Google's official test key (always passes)
        GA_MEASUREMENT_ID:  '',       // no analytics locally
        ENABLE_ANALYTICS:   false,    // don't send GA events in dev
        DEBUG:              true,     // verbose console logs
    };

    const config = isProduction ? PRODUCTION_CONFIG : DEVELOPMENT_CONFIG;

    // ─── Public API ───────────────────────────────────────────────
    window.ENV = Object.freeze({
        MODE:               isProduction ? 'production' : 'development',
        IS_PRODUCTION:      isProduction,
        IS_DEVELOPMENT:     isDevelopment,
        SUPABASE_URL:       config.SUPABASE_URL,
        SUPABASE_ANON_KEY:  config.SUPABASE_ANON_KEY,
        RECAPTCHA_SITE_KEY: config.RECAPTCHA_SITE_KEY,
        GA_MEASUREMENT_ID:  config.GA_MEASUREMENT_ID,
        ENABLE_ANALYTICS:   config.ENABLE_ANALYTICS,
        DEBUG:              config.DEBUG,
    });

    // ─── Debug helper ─────────────────────────────────────────────
    // Wraps console so debug logs only appear in development mode
    window.log = {
        debug: function () {
            if (window.ENV.DEBUG) console.log.apply(console, arguments);
        },
        info: function () {
            if (window.ENV.DEBUG) console.info.apply(console, arguments);
        },
        warn: function () {
            console.warn.apply(console, arguments);
        },
        error: function () {
            console.error.apply(console, arguments);
        },
    };

    // Banner (only in dev)
    if (isDevelopment) {
        console.log(
            '%c🛠 DEVELOPMENT MODE',
            'background:#facc15;color:#000;font-weight:bold;padding:4px 8px;border-radius:4px;',
            '\nHostname:', hostname,
            '\nAnalytics:', config.ENABLE_ANALYTICS ? 'ON' : 'OFF',
            '\nreCAPTCHA: test key (always passes)'
        );
    }
})();
