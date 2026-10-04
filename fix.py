file = r'C:\Users\User\Documents\antigravity\web-chomms-house\src\app\our-story\page.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()
if '<Footer />' not in content:
    content = content.replace("    </div>\n  );\n}", "      <Footer />\n    </div>\n  );\n}")
    if 'import Footer' not in content:
        content = content.replace("'use client';", "'use client';\nimport Footer from \"@/components/Footer\";", 1)
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
print("Done")
