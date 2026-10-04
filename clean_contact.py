import os
import re

contact_path = r'C:\Users\User\Documents\antigravity\web-chomms-house\src\app\contact\page.tsx'

with open(contact_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace from {/* Main Content */} down to the closing </div> before {/* Footer */}
pattern = r'\{\/\* Main Content \*\/\}.*?(?=\{\/\* Footer \*\/\})'

new_content = re.sub(pattern, '<div className="flex-grow"></div>\n\n      ', content, flags=re.DOTALL)

with open(contact_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Cleaned contact/page.tsx")
