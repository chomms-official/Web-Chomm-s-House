import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix packaging items
content = re.sub(
    r"\{pkg === '(ของใส|ซองใส)'.*?LOGO</div>\}",
    r"{pkg === '\1' && <img src=\"/Web-Chomm-s-House/images/packaging-clear.png\" className=\"w-full h-auto object-contain mix-blend-multiply rounded-xl\" alt=\"ซองใส\" />}",
    content, flags=re.DOTALL
)

content = re.sub(
    r"\{pkg === 'ซองแก้ว'.*?</div>\}",
    r"{pkg === 'ซองแก้ว' && <img src=\"/Web-Chomm-s-House/images/packaging-organza.png\" className=\"w-full h-auto object-contain mix-blend-multiply rounded-xl\" alt=\"ซองแก้ว\" />}",
    content, flags=re.DOTALL
)

content = re.sub(
    r"\{pkg === 'กล่องลิ้นชัก'.*?</div>\}",
    r"{pkg === 'กล่องลิ้นชัก' && <img src=\"/Web-Chomm-s-House/images/packaging-box.png\" className=\"w-full h-auto object-contain mix-blend-multiply rounded-xl\" alt=\"กล่องลิ้นชัก\" />}",
    content, flags=re.DOTALL
)

content = content.replace(
    "className={`py-6 flex flex-col items-center justify-center rounded-2xl transition-all ${",
    "className={`p-2 flex flex-col items-center justify-center rounded-2xl transition-all h-full min-h-[140px] ${"
)

# And fix the image arrays!
# Light Green
content = re.sub(
    r"'light-green': \[[^\]]+\]",
    r"'light-green': [\n        '/Web-Chomm-s-House/images/light-green-front-v3.png',\n        '/Web-Chomm-s-House/images/light-green-left-v3.png',\n        '/Web-Chomm-s-House/images/light-green-right-v3.png',\n        '/Web-Chomm-s-House/images/light-green-top-v3.png',\n        '/Web-Chomm-s-House/images/light-green-back-v3.png',\n        '/Web-Chomm-s-House/images/light-green-bottom-v3.png'\n      ]",
    content
)
# Lime
content = re.sub(
    r"'lime': \[[^\]]+\]",
    r"'lime': [\n        '/Web-Chomm-s-House/images/lime-front-v2.png',\n        '/Web-Chomm-s-House/images/lime-left-v2.png',\n        '/Web-Chomm-s-House/images/lime-right-v2.png',\n        '/Web-Chomm-s-House/images/lime-top-v2.png',\n        '/Web-Chomm-s-House/images/lime-back-v2.png',\n        '/Web-Chomm-s-House/images/lime-bottom-v2.png'\n      ]",
    content
)

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Regex replacements done.')
