/**
 * Google Analytics 4 Configuration for Percentrade
 * 
 * Requires config.js to be loaded first (provides window.ENV).
 * In development mode, analytics are completely disabled.
 */

// ========================================
// Measurement ID comes from config.js
// ========================================

// Check if user has consented to analytics cookies
function hasAnalyticsConsent() {
    try {
        const consent = localStorage.getItem('percentrade_cookie_consent');
        if (consent) {
            const consentData = JSON.parse(consent);
            return consentData.accepted === true;
        }
    } catch (e) {
        log.error('Error checking analytics consent:', e);
    }
    return false;
}

// Initialize Google Analytics only if user has consented AND we're in production
function initializeAnalytics() {
    // Skip entirely in development mode
    if (window.ENV && !window.ENV.ENABLE_ANALYTICS) {
        log.debug('Google Analytics disabled in', window.ENV.MODE, 'mode');
        return;
    }

    if (!hasAnalyticsConsent()) {
        log.debug('Google Analytics not loaded: User has not consented to cookies');
        return;
    }

    const GA_MEASUREMENT_ID = (window.ENV && window.ENV.GA_MEASUREMENT_ID) || '';
    if (!GA_MEASUREMENT_ID) {
        log.debug('Google Analytics: No measurement ID configured');
        return;
    }

    // Load Google Analytics gtag.js
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    
    // Configure GA4 with privacy settings
    gtag('config', GA_MEASUREMENT_ID, {
        'anonymize_ip': true,
        'cookie_flags': 'SameSite=None;Secure',
        'allow_google_signals': true,
        'allow_ad_personalization_signals': false
    });

    window.gtag = gtag;
    
    log.debug('Google Analytics initialized with ID:', GA_MEASUREMENT_ID);
}

// Listen for consent changes
window.addEventListener('storage', function(e) {
    if (e.key === 'percentrade_cookie_consent') {
        if (hasAnalyticsConsent() && !window.gtag) {
            initializeAnalytics();
        }
    }
});

// Initialize on page load if consent is given
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAnalytics);
} else {
    initializeAnalytics();
}

// Custom event tracking helper functions
window.trackEvent = function(eventName, eventParams) {
    if (window.gtag) {
        window.gtag('event', eventName, eventParams || {});
    }
};

// Track page views for single-page applications
window.trackPageView = function(pagePath, pageTitle) {
    if (window.gtag) {
        window.gtag('event', 'page_view', {
            page_path: pagePath,
            page_title: pageTitle
        });
    }
};
