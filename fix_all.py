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
    
    # 1. Replace hardcoded footer with <Footer />
    if '<footer' in content:
        content = footer_regex.sub('<Footer />', content)
        if 'import Footer from' not in content:
            if "'use client';" in content:
                content = content.replace("'use client';", "'use client';\nimport Footer from \"@/components/Footer\";", 1)
            else:
                content = 'import Footer from "@/components/Footer";\n' + content
                
    # 2. Add flex-1 w-full to the root div wrapper
    content = content.replace('className="min-h-screen bg-[#fafaf9] text-stone-900 font-sans flex flex-col selection:bg-stone-200"', 'className="min-h-screen bg-[#fafaf9] text-stone-900 font-sans flex flex-col flex-1 w-full selection:bg-stone-200"')
    content = content.replace('className="min-h-screen flex flex-col bg-white text-stone-900 font-sans selection:bg-stone-200"', 'className="min-h-screen flex flex-col flex-1 w-full bg-white text-stone-900 font-sans selection:bg-stone-200"')
    # Also handle if they don't have flex flex-col yet
    content = content.replace('className="min-h-screen bg-white text-stone-900 font-sans pb-24 lg:pb-16 selection:bg-stone-200"', 'className="min-h-screen flex flex-col flex-1 w-full bg-white text-stone-900 font-sans selection:bg-stone-200"')
    content = content.replace('className="min-h-screen bg-[#fafaf9] text-stone-900 font-sans pb-24 lg:pb-16 selection:bg-stone-200"', 'className="min-h-screen flex flex-col flex-1 w-full bg-[#fafaf9] text-stone-900 font-sans selection:bg-stone-200"')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Processed {file}")
