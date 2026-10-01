import sys

with open('src/app/page.tsx', 'rb') as f:
    content = f.read()

text = content.decode('utf-8')

try:
    original_bytes = text.encode('windows-1252')
    fixed_text = original_bytes.decode('utf-8')
    with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
        f.write(fixed_text)
    print("Successfully reversed mojibake!")
except Exception as e:
    print("Error reversing encoding:", e)
