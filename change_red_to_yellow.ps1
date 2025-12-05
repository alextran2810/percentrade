# PowerShell script to change all red colors to yellow and make buttons transparent

# Get all HTML files
$htmlFiles = Get-ChildItem -Path . -Recurse -Filter "*.html"

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.FullName)"
    
    $content = Get-Content $file.FullName -Raw
    
    # Change all red color variations to yellow (#fbbf24)
    $content = $content -replace 'color:\s*#dc2626', 'color: #fbbf24'
    $content = $content -replace 'color:\s*#991b1b', 'color: #fbbf24'
    $content = $content -replace 'color:\s*#7f1d1d', 'color: #fbbf24'
    $content = $content -replace 'color:\s*#b91c1c', 'color: #fbbf24'
    $content = $content -replace 'color:\s*#ef4444', 'color: #fbbf24'
    
    # Change button backgrounds from solid colors to transparent
    # CTA buttons
    $content = $content -replace '(\.cta-button\s*\{[^}]*?)background:\s*#dc2626;', '$1background: transparent; border: 2px solid #fbbf24;'
    $content = $content -replace '(\.cta-button:hover\s*\{[^}]*?)background:\s*#1e40af;', '$1background: rgba(251, 191, 36, 0.1);'
    
    # Regular buttons
    $content = $content -replace '(\.btn-link\s*\{[^}]*?)background:\s*#dc2626;', '$1background: transparent; border: 2px solid #fbbf24;'
    $content = $content -replace '(\.btn-link:hover\s*\{[^}]*?)background:\s*#1e40af;', '$1background: rgba(251, 191, 36, 0.1);'
    
    # Get Started button in roulette-statistics
    $content = $content -replace '(\.get-started-btn\s*\{[^}]*?)background:\s*#dc2626;', '$1background: transparent; border: 2px solid #fbbf24;'
    $content = $content -replace '(\.get-started-btn:hover\s*\{[^}]*?)background:\s*#1e40af;', '$1background: rgba(251, 191, 36, 0.1);'
    
    # Contact form buttons (keep the existing gold style but make more transparent)
    $content = $content -replace '(\.contact-form button\s*\{[^}]*?)background:\s*rgba\(255,\s*215,\s*0,\s*0\.22\);', '$1background: transparent;'
    
    # Change inline style red colors to yellow
    $content = $content -replace 'style="([^"]*?)color:\s*#dc2626;', 'style="$1color: #fbbf24;'
    
    Set-Content -Path $file.FullName -Value $content -NoNewline
}

Write-Host ""
Write-Host "All red colors changed to yellow (#fbbf24) and button backgrounds made transparent!" -ForegroundColor Green
Write-Host "Files updated: $($htmlFiles.Count)" -ForegroundColor Cyan
