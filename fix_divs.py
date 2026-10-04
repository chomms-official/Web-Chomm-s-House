import os
import re

path = r'C:\Users\User\Documents\antigravity\web-chomms-house\src\components\Footer.tsx'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add the two missing </div>s before the <footer
content = content.replace(
    '      <footer className="w-full bg-[#3b3228]',
    '         </div>\n      </div>\n      <footer className="w-full bg-[#3b3228]'
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed missing closing divs")
