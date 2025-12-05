import re
import glob

files = glob.glob('C:/Users/alexa/Desktop/percentrade/**/*.html', recursive=True)
for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    # Revert ../directory/index.html back to ../directory/
    content = re.sub(r'href="../([\w-]+)/index\.html"', r'href="../\1/"', content)
    # Revert directory/index.html back to directory/ (for root files)
    content = re.sub(r'href="([\w-]+)/index\.html"', r'href="\1/"', content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8', newline='') as f:
            f.write(content)
        print(f'Fixed: {filepath}')

print("Done!")
