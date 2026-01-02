/**
 * Percentrade Cookie Consent Banner
 * GDPR/CCPA Compliant Cookie Consent Management
 */

(function() {
    'use strict';

    const COOKIE_CONSENT_KEY = 'percentrade_cookie_consent';
    const CONSENT_VERSION = '1.0'; // Update this when cookie policy changes

    // Check if user has already given consent
    function hasConsent() {
        try {
            const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
            if (consent) {
                const consentData = JSON.parse(consent);
                return consentData.version === CONSENT_VERSION && consentData.accepted !== undefined;
            }
        } catch (e) {
            console.error('Error reading cookie consent:', e);
        }
        return false;
    }

    // Save user's consent choice
    function saveConsent(accepted) {
        const consentData = {
            accepted: accepted,
            version: CONSENT_VERSION,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };
        
        try {
            localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData));
            
            // If user declined, remove non-essential cookies
            if (!accepted) {
                removeNonEssentialCookies();
            }
        } catch (e) {
            console.error('Error saving cookie consent:', e);
        }
    }

    // Remove non-essential cookies if user declined
    function removeNonEssentialCookies() {
        // List of essential cookies to keep
        const essentialCookies = ['percentradeVisited', 'sessionID', 'CSRF_token', COOKIE_CONSENT_KEY];
        
        // Remove all localStorage items except essential ones
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (!essentialCookies.includes(key)) {
                localStorage.removeItem(key);
            }
        });

        // Note: You may need to also remove third-party cookies here
        // This would require additional logic for analytics/advertising scripts
    }

    // Create and inject the cookie consent banner
    function createConsentBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.innerHTML = `
            <div class="cookie-consent-content">
                <div class="cookie-consent-message">
                    <p>
                        <strong>🍪 We Value Your Privacy</strong><br>
                        We use cookies and Google Analytics to enhance your experience, analyze site traffic, and understand how visitors interact with our website. 
                        By clicking "Accept All", you consent to our use of cookies and analytics. 
                        <a href="/cookie-policy/" target="_blank">Learn more about our Cookie Policy</a>.
                    </p>
                </div>
                <div class="cookie-consent-buttons">
                    <button id="cookie-accept-all" class="cookie-btn cookie-btn-accept">Accept All</button>
                    <button id="cookie-decline" class="cookie-btn cookie-btn-decline">Decline</button>
                </div>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            #cookie-consent-banner {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgba(30, 58, 138, 0.95);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                color: #ffffff;
                padding: 20px;
                box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
                border-top: 2px solid rgba(251, 191, 36, 0.3);
                z-index: 9999;
                animation: slideUp 0.4s ease-out;
            }

            @keyframes slideUp {
                from {
                    transform: translateY(100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            .cookie-consent-content {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 20px;
                flex-wrap: wrap;
            }

            .cookie-consent-message {
                flex: 1;
                min-width: 300px;
            }

            .cookie-consent-message p {
                margin: 0;
                font-size: 14px;
                line-height: 1.6;
                color: rgba(255, 255, 255, 0.9);
            }

            .cookie-consent-message strong {
                color: #fbbf24;
                font-size: 16px;
            }

            .cookie-consent-message a {
                color: #fbbf24;
                text-decoration: underline;
                transition: color 0.3s;
            }

            .cookie-consent-message a:hover {
                color: #fcd34d;
            }

            .cookie-consent-buttons {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
            }

            .cookie-btn {
                padding: 12px 24px;
                border: none;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                white-space: nowrap;
            }

            .cookie-btn-accept {
                background: rgba(251, 191, 36, 0.2);
                border: 2px solid #fbbf24;
                color: #fbbf24;
            }

            .cookie-btn-accept:hover {
                background: #fbbf24;
                color: #1e3a8a;
                transform: translateY(-1px);
                box-shadow: 0 4px 6px -1px rgba(251, 191, 36, 0.3), 0 2px 4px -1px rgba(251, 191, 36, 0.2);
            }

            .cookie-btn-decline {
                background: rgba(255, 255, 255, 0.1);
                color: rgba(255, 255, 255, 0.8);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }

            .cookie-btn-decline:hover {
                background: rgba(255, 255, 255, 0.2);
                border-color: rgba(255, 255, 255, 0.4);
                color: #ffffff;
            }

            /* Mobile responsive */
            @media (max-width: 768px) {
                #cookie-consent-banner {
                    padding: 15px;
                }

                .cookie-consent-content {
                    flex-direction: column;
                    align-items: stretch;
                }

                .cookie-consent-message {
                    min-width: auto;
                }

                .cookie-consent-message p {
                    font-size: 13px;
                }

                .cookie-consent-buttons {
                    flex-direction: column;
                    width: 100%;
                }

                .cookie-btn {
                    width: 100%;
                    padding: 14px;
                }
            }

            /* Close animation */
            #cookie-consent-banner.hiding {
                animation: slideDown 0.4s ease-out forwards;
            }

            @keyframes slideDown {
                from {
                    transform: translateY(0);
                    opacity: 1;
                }
                to {
                    transform: translateY(100%);
                    opacity: 0;
                }
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(banner);

        // Add event listeners
        document.getElementById('cookie-accept-all').addEventListener('click', function() {
            saveConsent(true);
            closeBanner();
        });

        document.getElementById('cookie-decline').addEventListener('click', function() {
            saveConsent(false);
            closeBanner();
        });
    }

    // Close banner with animation
    function closeBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.add('hiding');
            setTimeout(() => {
                banner.remove();
            }, 400);
        }
    }

    // Initialize on page load
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // Skip cookie banner on the introduction page (index.html)
        const currentPath = window.location.pathname;
        const isIntroPage = currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('/percentrade/') || currentPath.endsWith('/percentrade/index.html');
        
        if (isIntroPage) {
            return; // Don't show cookie banner on intro page
        }

        // Only show banner if user hasn't given consent yet
        if (!hasConsent()) {
            // Small delay to ensure page is fully loaded
            setTimeout(createConsentBanner, 500);
        }
    }

    // Start initialization
    init();

    // Expose function to check consent status (for analytics scripts)
    window.percentradeCookieConsent = {
        hasConsent: hasConsent,
        getConsent: function() {
            try {
                const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
                if (consent) {
                    return JSON.parse(consent);
                }
            } catch (e) {
                console.error('Error reading cookie consent:', e);
            }
            return null;
        },
        isAccepted: function() {
            const consent = this.getConsent();
            return consent && consent.accepted === true;
        }
    };

})();
