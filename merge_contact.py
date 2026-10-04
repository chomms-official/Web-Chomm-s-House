import os
import re

contact_path = r'C:\Users\User\Documents\antigravity\web-chomms-house\src\app\contact\page.tsx'
footer_path = r'C:\Users\User\Documents\antigravity\web-chomms-house\src\components\Footer.tsx'

with open(contact_path, 'r', encoding='utf-8') as f:
    contact_content = f.read()

# Extract the contact section content
# We will match the entire block starting with <div className="flex-grow flex flex-col items-center justify-center px-4 py-20">
# But we don't want flex-grow for the footer version.
match = re.search(r'(<div className="flex-grow flex flex-col items-center justify-center px-4 py-20">)(.*?)(</div>\s*</div)', contact_content, re.DOTALL)
if match:
    contact_section_inner = match.group(2)
else:
    print("Failed to extract contact section")
    exit(1)

# Now, we construct the new contact section block for Footer
new_contact_block = f"""
      <div className="w-full flex flex-col items-center justify-center px-4 py-16 bg-[#fafaf9] z-10 relative border-t border-stone-200">
        {contact_section_inner}
      </div>
"""

with open(footer_path, 'r', encoding='utf-8') as f:
    footer_content = f.read()

# Insert new_contact_block right before <footer className="w-full bg-[#3b3228]...
footer_content = footer_content.replace(
    '<footer className="w-full bg-[#3b3228]',
    new_contact_block + '\n      <footer className="w-full bg-[#3b3228]'
)

with open(footer_path, 'w', encoding='utf-8') as f:
    f.write(footer_content)

print("Merged contact section into Footer.tsx")
