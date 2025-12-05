# Red and Blue Color Theme Update Script
$files = Get-ChildItem -Path "C:\Users\alexa\Desktop\percentrade" -Recurse -Filter "*.html"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Replace gradient backgrounds (dark backgrounds)
    $content = $content -replace 'linear-gradient\(135deg, #1a1a1a 0%, #2d2d2d 100%\)', 'linear-gradient(135deg, #1e3a8a 0%, #7f1d1d 100%)'
    $content = $content -replace 'linear-gradient\(135deg, #191919 0%, #232323 100%\)', 'linear-gradient(135deg, #1e40af 0%, #991b1b 100%)'
    $content = $content -replace 'linear-gradient\(135deg, #0d0d0d 0%, #1a1a1a 100%\)', 'linear-gradient(135deg, #1e3a8a 0%, #7f1d1d 100%)'
    
    # Replace intro page gradient (light backgrounds)
    $content = $content -replace 'linear-gradient\(135deg, #f0fdfa 0%, #ccfbf1 100%\)', 'linear-gradient(135deg, #dbeafe 0%, #fee2e2 100%)'
    
    # Replace teal colors with blue
    $content = $content -replace '#0f766e', '#1e40af'
    $content = $content -replace '#0d9488', '#2563eb'
    $content = $content -replace 'rgba\(13, 148, 136,', 'rgba(37, 99, 235,'
    
    # Replace gold/yellow accent with red accent
    $content = $content -replace '#ffd700', '#dc2626'
    $content = $content -replace '#f59e0b', '#dc2626'
    $content = $content -replace '#fbbf24', '#dc2626'
    
    # Replace dark grays with navy blues
    $content = $content -replace '#1a1a1a', '#1e3a8a'
    $content = $content -replace '#2d2d2d', '#1e40af'
    $content = $content -replace '#191919', '#1e3a8a'
    $content = $content -replace '#232323', '#1e40af'
    $content = $content -replace '#0d0d0d', '#172554'
    
    # Replace medium grays with lighter blues
    $content = $content -replace '#4b5563', '#3b82f6'
    $content = $content -replace '#666', '#60a5fa'
    
    # Update shadow colors
    $content = $content -replace 'drop-shadow\(0 0 30px rgba\(13, 148, 136, 0.3\)\)', 'drop-shadow(0 0 30px rgba(37, 99, 235, 0.3))'
    $content = $content -replace 'drop-shadow\(0 0 40px rgba\(13, 148, 136, 0.5\)\)', 'drop-shadow(0 0 40px rgba(220, 38, 38, 0.5))'
    
    # Save the file
    Set-Content -Path $file.FullName -Value $content -NoNewline
    Write-Host "Updated: $($file.Name)"
}

Write-Host "`nColor theme updated to Red and Blue across all pages!"
