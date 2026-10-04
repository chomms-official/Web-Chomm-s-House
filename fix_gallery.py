import re

file = r'src/app/gallery/page.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'src:\s*(?:\`?)\$\{BASE\}`?(/[^,]+)', r'src: `${BASE}\1`', content)
with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
print("Done")
