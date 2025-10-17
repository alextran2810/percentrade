# Legal Documents Update Summary
**Date:** October 11, 2025

## Changes Made

### 1. ✅ Added Comprehensive Consent Provisions

Both `terms-of-use.html` and `privacy-policy.html` now include detailed sections on:

#### Terms of Use - Section 11: User Consent and Communications
- **Consent for Communications** - Explicit consent requirements for email, phone, and social media
- **Types of Communications** - Transactional (essential), Marketing (opt-in), and Support
- **Opt-In Requirements** - Checkboxes and explicit consent mechanisms
- **Opt-Out/Unsubscribe Rights** - Clear instructions on how to withdraw consent
- **Record of Consent** - Documentation of when/how consent was obtained (timestamp, IP, consent type)
- **Social Media Consent** - Platform-specific consent handling

#### Privacy Policy - Section 3: Consent and Communication Preferences
- **How We Obtain Consent** - Account registration, opt-in checkboxes, phone consent, social media consent
- **Consent Records** - Timestamped records with IP addresses
- **Types of Communications** - Essential, Marketing, Support classifications
- **Your Communication Rights** - Opt-in/opt-out, unsubscribe, withdrawal rights

### 2. ✅ Merged Content from Old Files

**Content merged from `terms.html` (Algotic Statistics):**
- Device limitations and subscription restrictions
- Advertising policies for free/paid plans
- Payment processor details (Stripe, Apple Pay, Google Pay)
- No refund policy language
- GDPR and CCPA rights

**Content merged from `privacy.html` (Algotic Statistics):**
- Detailed data collection categories (device ID, browser info, usage data)
- Payment and subscription data handling
- Ad provider specifics (Google AdSense/AdMob)
- Cookie and advertising ID policies
- Data retention policies
- Security measures

### 3. ✅ File Consolidation

**Active Files (Current):**
- `terms-of-use.html` - Updated with consent provisions and merged content
- `privacy-policy.html` - Updated with consent provisions and merged content

**Deprecated Files (Redirected):**
- `terms.html` - Now redirects to `terms-of-use.html`
- `privacy.html` - Now redirects to `privacy-policy.html`

### 4. ✅ Updated Dates
- Both active files updated to: October 11, 2025

## Key Compliance Features Now Included

### Proof of Consent (Opt-In)
✅ **Email:** Explicit opt-in checkboxes, separate for marketing vs transactional
✅ **Phone:** Consent required if phone number provided, limited to account-related calls unless marketing consent given
✅ **Social Media:** Consent implied by initiating contact, can be withdrawn

### Record Keeping
✅ Timestamped consent records
✅ IP address logging for verification
✅ Type of consent tracked (marketing, transactional, etc.)
✅ Retention period: 3-7 years for compliance

### User Rights
✅ Opt-out/unsubscribe mechanisms clearly stated
✅ Withdrawal of consent without affecting account
✅ Communication preference management
✅ GDPR and CCPA compliant rights listed

### Third-Party Disclosures
✅ Payment processors (Stripe, Apple Pay, Google Pay)
✅ Ad networks (Google AdSense/AdMob)
✅ No selling of personal data - explicitly stated

## Recommendations for Implementation

### Technical Requirements
1. **Registration Form Updates:**
   - Add separate opt-in checkbox for marketing emails
   - Add optional phone number field with consent notice
   - Timestamp and log all consent actions with IP

2. **Database Changes:**
   - Add consent tracking fields (consent_type, timestamp, ip_address, consent_method)
   - Add communication preference fields (email_marketing, sms_marketing, etc.)
   - Add consent_withdrawn_at timestamp field

3. **Email System:**
   - Include unsubscribe link in all marketing emails
   - Separate transactional vs marketing email lists
   - Honor opt-out requests immediately

4. **Account Settings:**
   - Add communication preferences page
   - Allow users to view consent history
   - Provide easy opt-out toggles

### Legal Considerations
- Consider adding cookie consent banner for EU users
- May need to specify governing jurisdiction (currently says "applicable laws")
- Consider adding dispute resolution/arbitration details
- Update contact email from placeholder to actual support email

## Files Modified
1. `terms-of-use.html` - Major updates (added Section 11, renumbered sections 12-19)
2. `privacy-policy.html` - Major updates (added Section 3, renumbered sections 4-12)
3. `terms.html` - Converted to redirect page
4. `privacy.html` - Converted to redirect page

## Next Steps
- [ ] Review with legal counsel if required by jurisdiction
- [ ] Implement database schema for consent tracking
- [ ] Update registration/signup forms with opt-in checkboxes
- [ ] Configure email system with unsubscribe functionality
- [ ] Add communication preferences to user account settings
- [ ] Test redirect pages (terms.html and privacy.html)
- [ ] Consider cookie consent banner implementation

---

## Update: October 16, 2025 — SMS Opt-In and Proof of Consent Policy

### Summary
- Added new file: `sms-opt-in-policy.html` documenting SMS OTP verification usage, consent capture, proof-of-consent records, STOP/HELP keywords, message frequency, carrier rates, retention, privacy, and contact.
- Cross-references added:
   - `privacy-policy.html`: Communication Rights now links to the SMS Opt-In Policy.
   - `terms-of-use.html`: Communication Types now links to the SMS Opt-In Policy.

### Compliance Notes
- Policy clarifies that SMS is used for OTP/security only (no marketing SMS without separate consent).
- Proof-of-consent records include: consent event type, timestamps, IP, user agent, provider delivery status; OTP codes are not stored in plaintext.
- STOP/HELP handling and re-opt-in guidance included.

### Suggested Engineering Tasks
- Ensure backend logs consent events with timestamps, IP, UA, and delivery status; avoid storing plaintext OTP.
- Add STOP/HELP keyword handling with confirmation messaging.
- Expose re-opt-in flow in account settings.
