import os

path = r'C:\Users\User\Documents\antigravity\web-chomms-house\next.config.ts'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

if 'trailingSlash: true' not in content:
    content = content.replace('output: "export",', 'output: "export",\n  trailingSlash: true,')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Added trailingSlash")
else:
    print("Already there")
