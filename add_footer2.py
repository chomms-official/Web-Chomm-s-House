import os
import re

path = r'C:\Users\User\Documents\antigravity\web-chomms-house\src\app\page.tsx'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure Footer is imported
if 'import Footer from' not in content:
    content = content.replace("import { useState", 'import Footer from "@/components/Footer";\nimport { useState')

# Insert <Footer />
content = content.replace(
    '<div className="lg:hidden fixed bottom-0 left-0 right-0',
    '<Footer />\n\n      <div className="lg:hidden fixed bottom-0 left-0 right-0'
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Added Footer to Shop page correctly")
