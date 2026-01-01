# Roumate Subdomain Indexing Setup Guide

## Files Created
- `roumate-robots.txt` → Deploy as `robots.txt` at roumate.percentrade.com
- `roumate-sitemap.xml` → Deploy as `sitemap.xml` at roumate.percentrade.com

## Deployment Steps

### 1. Upload Files to Roumate Subdomain
Upload these files to the root directory of your roumate.percentrade.com web application:
- `roumate-robots.txt` → rename to `robots.txt`
- `roumate-sitemap.xml` → rename to `sitemap.xml`

### 2. Verify Files Are Accessible
Test that these URLs are accessible:
- https://roumate.percentrade.com/robots.txt
- https://roumate.percentrade.com/sitemap.xml

### 3. Add Meta Tags to HTML
Add these to the `<head>` section of your main roumate HTML file:

```html
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://roumate.percentrade.com/">
<meta name="description" content="Roumate - Advanced roulette statistics and analysis platform with real-time tracking, pattern recognition, and comprehensive data visualization.">
```

### 4. Google Search Console Setup

#### Step 1: Add Property
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add Property"
3. Choose "URL prefix"
4. Enter: `https://roumate.percentrade.com`
5. Verify ownership using one of these methods:
   - HTML file upload (Google will provide a file)
   - HTML tag (add to `<head>` section)
   - Google Analytics (if already installed)
   - DNS record (TXT record in your domain settings)

#### Step 2: Submit Sitemap
1. In Google Search Console, go to "Sitemaps" (left menu)
2. Enter: `sitemap.xml`
3. Click "Submit"

#### Step 3: Request Indexing
1. Use "URL Inspection" tool
2. Enter: `https://roumate.percentrade.com`
3. Click "Request Indexing"

### 5. Update Main Site
Add a reference to the roumate subdomain in your main percentrade.com sitemap:

Edit `percentrade/sitemap.xml` to add:
```xml
<url>
    <loc>https://roumate.percentrade.com/</loc>
    <lastmod>2026-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
</url>
```

Also link to roumate from your main site's robots.txt:
```
Sitemap: https://roumate.percentrade.com/sitemap.xml
```

### 6. Internal Linking
Ensure your main site (percentrade.com) has clear links to roumate.percentrade.com:
- ✓ Already linked from `/roulette-statistics/` page
- Consider adding to main navigation if appropriate

### 7. Monitor Indexing
- Check Google Search Console regularly for:
  - Coverage reports
  - Index status
  - Any errors or warnings
- Typically takes 1-7 days for Google to index new pages
- Use: `site:roumate.percentrade.com` in Google to check indexed pages

## Additional SEO Recommendations

### Structured Data
Add JSON-LD structured data to roumate pages:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Roumate",
  "applicationCategory": "UtilitiesApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Advanced roulette statistics and analysis platform"
}
</script>
```

### Performance
- Ensure fast loading times
- Optimize images and videos
- Enable HTTPS (SSL certificate)
- Use compression (gzip/brotli)

### Content
- Add unique, valuable content
- Include keywords naturally
- Regular updates to keep content fresh
- Consider adding a blog or help section

## Verification Checklist
- [ ] robots.txt deployed and accessible
- [ ] sitemap.xml deployed and accessible
- [ ] Meta tags added to HTML
- [ ] Google Search Console property created
- [ ] Ownership verified
- [ ] Sitemap submitted to GSC
- [ ] Initial indexing requested
- [ ] Main site links to subdomain
- [ ] Monitor GSC for 7 days for indexing progress
