# Apply Roulette Statistics Body Format to All Pages
$sourceFile = "C:\Users\alexa\Desktop\percentrade\roulette-statistics\index.html"
$sourceContent = Get-Content $sourceFile -Raw

# Extract the body styles from roulette-statistics
$bodyStyles = @"
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #ffffff;
            background: linear-gradient(135deg, #1e3a8a 0%, #7f1d1d 100%);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
"@

$headerStyles = @"
        /* Header */
        header {
            background: rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            padding: 1rem 0;
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
        }

        .logo-text {
            color: #fbbf24;
            font-size: 1.35rem;
            font-weight: bold;
            display: inline-block;
            transition: opacity 0.4s ease;
        }

        .nav-links a {
            color: white;
            text-decoration: none;
            transition: color 0.3s;
        }

        .nav-links a:hover {
            color: #fbbf24;
        }
"@

$footerStyles = @"
        /* Footer */
        footer {
            background: rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-top: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            text-align: center;
            padding: 2rem 0;
            margin-top: 60px;
        }

        .footer-links a {
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .footer-links a:hover {
            color: #fbbf24;
        }

        .social-links svg {
            fill: #fbbf24;
            transition: fill 0.3s ease;
        }

        .social-links a:hover {
            color: #fbbf24;
        }

        .social-links a:hover svg {
            fill: #fbbf24;
        }
"@

$cardStyles = @"
        /* Glass-morphism card style */
        .feature-card, .access-card, .screenshot-card, .feature-item {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 15px;
            padding: 2rem;
            transition: all 0.3s;
        }

        .feature-card:hover, .access-card:hover {
            transform: translateY(-10px);
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(251, 191, 36, 0.4);
        }
"@

# Get all HTML files except roulette-statistics
$files = Get-ChildItem -Path "C:\Users\alexa\Desktop\percentrade" -Recurse -Filter "*.html" | 
    Where-Object { $_.FullName -notlike "*roulette-statistics*" }

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Replace body styles
    $content = $content -replace 'body\s*\{[^}]+\}', $bodyStyles
    
    # Update header colors to yellow
    $content = $content -replace '(\.logo-text\s*\{[^}]*color:\s*)#[a-fA-F0-9]{6}', '${1}#fbbf24'
    $content = $content -replace '(\.nav-links\s+a:hover\s*\{[^}]*color:\s*)#[a-fA-F0-9]{6}', '${1}#fbbf24'
    
    # Update footer colors to yellow
    $content = $content -replace '(\.footer-links\s+a:hover\s*\{[^}]*color:\s*)#[a-fA-F0-9]{6}', '${1}#fbbf24'
    $content = $content -replace '(\.social-links\s+svg\s*\{[^}]*fill:\s*)rgba\([^)]+\)', '${1}#fbbf24'
    $content = $content -replace '(\.social-links\s+a:hover\s*\{[^}]*color:\s*)#[a-fA-F0-9]{6}', '${1}#fbbf24'
    $content = $content -replace '(\.social-links\s+a:hover\s+svg\s*\{[^}]*fill:\s*)#[a-fA-F0-9]{6}', '${1}#fbbf24'
    
    # Add backdrop-filter to headers and footers if not present
    if ($content -notmatch 'backdrop-filter:\s*blur') {
        $content = $content -replace '(header\s*\{[^}]*)(background:[^;]+;)', '${1}${2} backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);'
        $content = $content -replace '(footer\s*\{[^}]*)(background:[^;]+;)', '${1}${2} backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);'
    }
    
    # Update card styles to glass-morphism
    $content = $content -replace '(\.feature-card[^{]*\{[^}]*background:\s*)linear-gradient[^;]+', '${1}rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px)'
    
    Set-Content -Path $file.FullName -Value $content -NoNewline
    Write-Host "Updated: $($file.Name)"
}

Write-Host "`nBody format from roulette-statistics applied to all pages!"
Write-Host "Headers and footers now have yellow (#fbbf24) color scheme!"
