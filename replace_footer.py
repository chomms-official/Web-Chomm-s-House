import os
import re

files = [
    r'src/app/contact/page.tsx',
    r'src/app/gallery/page.tsx',
    r'src/app/workshop/page.tsx',
    r'src/app/our-story/page.tsx'
]

footer_regex = re.compile(r'<!-- Footer -->.*?</footer>', re.DOTALL)
footer_jsx_regex = re.compile(r'\{\/\*\s*Footer\s*\*\/\}.*?</footer>', re.DOTALL)

for file in files:
    path = os.path.join(r'C:\Users\User\Documents\antigravity\web-chomms-house', file)
    if not os.path.exists(path):
        continue
    
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # replace footer HTML with <Footer />
    if footer_jsx_regex.search(content):
        content = footer_jsx_regex.sub('<Footer />', content)
    elif footer_regex.search(content):
        content = footer_regex.sub('<Footer />', content)
    
    # make sure import Footer exists
    if 'import Footer from "@/components/Footer";' not in content:
        # put it after the first import or after use client
        if "'use client';" in content:
            content = content.replace("'use client';", "'use client';\nimport Footer from \"@/components/Footer\";", 1)
        else:
            content = 'import Footer from "@/components/Footer";\n' + content
            
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Replaced footer in all files.")
