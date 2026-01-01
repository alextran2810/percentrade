# Google Analytics Setup Guide for Percentrade

## ✅ Installation Complete!

Google Analytics 4 has been integrated into your website. Follow these steps to activate it:

---

## 📋 Setup Steps

### Step 1: Create Google Analytics Account
1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring" or "Admin" (gear icon)

### Step 2: Create Property
1. Click "Create Property"
2. Property name: **Percentrade**
3. Time zone: Select your timezone
4. Currency: Select your currency
5. Click "Next"

### Step 3: Business Information
1. Industry category: Select appropriate category
2. Business size: Select your size
3. How do you intend to use Google Analytics: Check relevant options
4. Click "Create"
5. Accept Terms of Service

### Step 4: Set Up Data Stream
1. Choose platform: **Web**
2. Website URL: `https://percentrade.com`
3. Stream name: **Percentrade Website**
4. Click "Create stream"

### Step 5: Get Your Measurement ID
1. After creating the stream, you'll see your **Measurement ID**
   - Format: `G-XXXXXXXXXX`
2. **Copy this ID**

### Step 6: Update Your Website
1. Open `google-analytics.js` file
2. Find this line:
   ```javascript
   const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
   ```
3. Replace `G-XXXXXXXXXX` with your actual Measurement ID
4. Save the file
5. Upload to your website

### Step 7: Verify Installation
1. In Google Analytics, go to **Reports** → **Realtime**
2. Visit your website in another tab
3. You should see your visit appear in real-time within 30 seconds

---

## 📊 What You Can Track

### Automatic Tracking:
- ✅ Page views
- ✅ Unique visitors
- ✅ Session duration
- ✅ Bounce rate
- ✅ Device types (mobile, desktop, tablet)
- ✅ Operating systems and browsers
- ✅ Geographic location (country, city)
- ✅ Traffic sources (direct, organic search, social, referral)
- ✅ New vs returning visitors

### Available Reports:
1. **Realtime** - See visitors on your site right now
2. **User Acquisition** - Where visitors come from
3. **Engagement** - Most viewed pages, time on site
4. **Demographics** - Age, gender, interests
5. **Technology** - Devices, browsers, OS
6. **Events** - Custom tracked actions

---

## 🎯 Custom Event Tracking (Optional)

The setup includes helper functions for custom tracking. Examples:

### Track Button Clicks:
```html
<button onclick="trackEvent('button_click', {button_name: 'Launch Roumate'})">
    Launch Roumate
</button>
```

### Track Form Submissions:
```javascript
document.querySelector('form').addEventListener('submit', function() {
    trackEvent('form_submit', {form_name: 'contact_form'});
});
```

### Track External Link Clicks:
```javascript
trackEvent('outbound_link', {
    destination: 'https://roumate.percentrade.com',
    link_text: 'Launch Web App'
});
```

---

## 🔒 Privacy & Compliance

The implementation includes:
- ✅ IP anonymization enabled
- ✅ Respects cookie consent (only loads when user accepts)
- ✅ No ad personalization
- ✅ GDPR compliant
- ✅ Transparent disclosure in cookie banner

---

## 🔗 Link Google Analytics to Search Console

1. In Google Analytics, go to **Admin**
2. Under **Property**, click **Product links**
3. Click **Search Console links**
4. Click **Link**
5. Choose your Search Console property
6. Click **Confirm**

This connects GA4 with Google Search Console for search performance data.

---

## 📈 Recommended Setup in GA4

### 1. Create Custom Events (Optional)
**Admin** → **Events** → **Create event**
- Track video plays
- Track downloads
- Track scroll depth

### 2. Set Up Conversions
Mark important events as conversions:
- Form submissions
- Button clicks (e.g., "Launch Web App")
- Page views of important pages

### 3. Create Audiences
**Admin** → **Audiences** → **New audience**
- Returning users
- High-engagement users
- Mobile users

### 4. Set Up Goals
Define what success looks like:
- Contact form submission
- Roumate page visit
- Time on site > 2 minutes

---

## 🛠️ Troubleshooting

### Analytics not showing data?
1. **Check Measurement ID** - Ensure it's correctly entered in `google-analytics.js`
2. **Accept cookies** - Visit your site and accept the cookie banner
3. **Check browser console** - Look for any JavaScript errors
4. **Wait 24 hours** - Some reports take time to populate
5. **Use Realtime report** - This shows data immediately

### How to test if it's working?
1. Open your website
2. Accept cookies
3. Open browser console (F12)
4. Look for message: "Google Analytics initialized with ID: G-..."
5. Check Realtime report in GA4

---

## 📞 Need Help?

- [Google Analytics Help Center](https://support.google.com/analytics/)
- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)
- [GA4 Reports Overview](https://support.google.com/analytics/answer/9212670)

---

## ✨ What's Included in Your Setup

**Files Added:**
- `google-analytics.js` - Main tracking script

**Files Modified:**
- `index.html` - Analytics added
- `home.html` - Analytics added
- `about/index.html` - Analytics added
- `contact/index.html` - Analytics added
- `roulette-statistics/index.html` - Analytics added
- `cookie-consent.js` - Updated to mention Google Analytics

**Features:**
- ✅ Consent-based loading (respects user privacy)
- ✅ Automatic page view tracking
- ✅ Custom event tracking helpers
- ✅ Privacy-friendly configuration
- ✅ Integration with cookie consent system

---

## 🎉 You're All Set!

Once you add your Measurement ID, Google Analytics will start tracking visitors automatically. Check your reports after 24-48 hours for comprehensive data!
