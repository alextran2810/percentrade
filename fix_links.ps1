Get-ChildItem -Path "C:\Users\alexa\Desktop\percentrade" -Recurse -Filter "*.html" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    
    # Fix directory links to include index.html for local viewing
    $content = $content -replace 'href="../about/"', 'href="../about/index.html"'
    $content = $content -replace 'href="../contact/"', 'href="../contact/index.html"'
    $content = $content -replace 'href="../privacy-policy/"', 'href="../privacy-policy/index.html"'
    $content = $content -replace 'href="../terms-of-use/"', 'href="../terms-of-use/index.html"'
    $content = $content -replace 'href="../roulette-statistics/"', 'href="../roulette-statistics/index.html"'
    $content = $content -replace 'href="../sms-opt-in-policy/"', 'href="../sms-opt-in-policy/index.html"'
    $content = $content -replace 'href="../cookie-policy/"', 'href="../cookie-policy/index.html"'
    
    # For root level files (home.html)
    $content = $content -replace 'href="about/"', 'href="about/index.html"'
    $content = $content -replace 'href="contact/"', 'href="contact/index.html"'
    $content = $content -replace 'href="privacy-policy/"', 'href="privacy-policy/index.html"'
    $content = $content -replace 'href="terms-of-use/"', 'href="terms-of-use/index.html"'
    $content = $content -replace 'href="roulette-statistics/"', 'href="roulette-statistics/index.html"'
    $content = $content -replace 'href="sms-opt-in-policy/"', 'href="sms-opt-in-policy/index.html"'
    $content = $content -replace 'href="cookie-policy/"', 'href="cookie-policy/index.html"'
    
    Set-Content -Path $_.FullName -Value $content -NoNewline
    Write-Host "Fixed: $($_.Name)"
}

Write-Host "All directory links now point to index.html files!"
