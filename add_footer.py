import os
import re

path = r'C:\Users\User\Documents\antigravity\web-chomms-house\src\app\page.tsx'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add import Footer
if 'import Footer from' not in content:
    content = content.replace("import { useState", 'import Footer from "@/components/Footer";\nimport { useState')

# Add <Footer /> after the main closing tag, which is before the sticky bottom bar
# The sticky bottom bar is: <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95
# Wait, no. The main tag is <main ...> ... </main>. Let's put it right after </main>.
content = content.replace('</main>', '</main>\n\n      <Footer />\n')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Added Footer to Shop page")
