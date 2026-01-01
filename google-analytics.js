/**
 * Google Analytics 4 Configuration for Percentrade
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://analytics.google.com/
 * 2. Create a new GA4 property for percentrade.com
 * 3. Copy your Measurement ID (format: G-XXXXXXXXXX)
 * 4. Replace 'G-XXXXXXXXXX' below with your actual Measurement ID
 * 5. Upload this file to your website
 */

// ========================================
// REPLACE THIS WITH YOUR MEASUREMENT ID
// ========================================
const GA_MEASUREMENT_ID = 'G-6W467GXKLQ';
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
        console.error('Error checking analytics consent:', e);
    }
    return false;
}

// Initialize Google Analytics only if user has consented
function initializeAnalytics() {
    if (!hasAnalyticsConsent()) {
        console.log('Google Analytics not loaded: User has not consented to cookies');
        return;
    }

    // Load Google Analytics gtag.js
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    
    // Configure GA4 with privacy settings
    gtag('config', GA_MEASUREMENT_ID, {
        'anonymize_ip': true, // Anonymize IP addresses for privacy
        'cookie_flags': 'SameSite=None;Secure', // Modern cookie settings
        'allow_google_signals': true, // Enable Google signals for demographics
        'allow_ad_personalization_signals': false // Disable ad personalization
    });

    // Custom event tracking examples
    window.gtag = gtag;
    
    console.log('Google Analytics initialized with ID:', GA_MEASUREMENT_ID);
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
window.trackEvent = function(eventName, eventParams = {}) {
    if (window.gtag) {
        window.gtag('event', eventName, eventParams);
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
