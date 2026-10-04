import os
import re

files = [
    r'src/app/contact/page.tsx',
    r'src/app/gallery/page.tsx',
    r'src/app/workshop/page.tsx',
    r'src/app/our-story/page.tsx'
]

footer_regex = re.compile(r'<footer.*?</footer>', re.DOTALL)

for file in files:
    path = os.path.join(r'C:\Users\User\Documents\antigravity\web-chomms-house', file)
    if not os.path.exists(path):
        continue
    
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '<footer' in content:
        content = footer_regex.sub('<Footer />', content)
        
        # Add import if missing
        if 'import Footer from' not in content:
            if "'use client';" in content:
                content = content.replace("'use client';", "'use client';\nimport Footer from \"@/components/Footer\";", 1)
            else:
                content = 'import Footer from "@/components/Footer";\n' + content
                
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Replaced footer in {file}")
    else:
        print(f"No <footer tag in {file}")
