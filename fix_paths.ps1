Get-ChildItem -Path "C:\Users\alexa\Desktop\percentrade" -Recurse -Filter "*.html" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $dir = $_.DirectoryName
    $isSubdir = $dir -ne "C:\Users\alexa\Desktop\percentrade"
    
    if ($isSubdir) {
        # For subdirectory files
        $content = $content -replace 'href="/"', 'href="../index.html"'
        $content = $content -replace 'href="/index\.html"', 'href="../index.html"'
        $content = $content -replace 'href="/home\.html"', 'href="../home.html"'
        $content = $content -replace 'href="/about/"', 'href="../about/"'
        $content = $content -replace 'href="/contact/"', 'href="../contact/"'
        $content = $content -replace 'href="/privacy-policy/"', 'href="../privacy-policy/"'
        $content = $content -replace 'href="/terms-of-use/"', 'href="../terms-of-use/"'
        $content = $content -replace 'href="/roulette-statistics/"', 'href="../roulette-statistics/"'
        $content = $content -replace 'href="/sms-opt-in-policy/"', 'href="../sms-opt-in-policy/"'
        $content = $content -replace 'href="/cookie-policy/"', 'href="../cookie-policy/"'
        $content = $content -replace 'src="/percentrade_logo\.png"', 'src="../percentrade_logo.png"'
        $content = $content -replace 'src="/roumate_logo\.png"', 'src="../roumate_logo.png"'
        $content = $content -replace 'href="/percentrade_logo\.png"', 'href="../percentrade_logo.png"'
        $content = $content -replace 'href="/global\.css"', 'href="../global.css"'
        $content = $content -replace 'src="/cookie-consent\.js"', 'src="../cookie-consent.js"'
        $content = $content -replace "window\.location\.replace\('/index\.html'\)", "window.location.replace('../index.html')"
    } else {
        # For root files
        $content = $content -replace 'href="/percentrade_logo\.png"', 'href="percentrade_logo.png"'
        $content = $content -replace 'src="/percentrade_logo\.png"', 'src="percentrade_logo.png"'
        $content = $content -replace 'src="/roumate_logo\.png"', 'src="roumate_logo.png"'
        $content = $content -replace 'href="/global\.css"', 'href="global.css"'
        $content = $content -replace 'src="/cookie-consent\.js"', 'src="cookie-consent.js"'
        $content = $content -replace "window\.location\.href = '/home\.html'", "window.location.href = 'home.html'"
    }
    
    Set-Content -Path $_.FullName -Value $content -NoNewline
    Write-Host "Fixed: $($_.Name)"
}

Write-Host "All paths fixed for local viewing!"
