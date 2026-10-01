import os
import subprocess

# 1. Checkout the clean file
subprocess.run(['git', 'checkout', 'src/app/page.tsx'], check=True)

# 2. Read content safely
with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 3. Update colors
content = content.replace(
    "{ id: 'white', hex: '#FDFBF7', label: 'White' }",
    "{ id: 'white', hex: '#FDFBF7', label: 'Natural' }"
)
content = content.replace(
    "{ id: 'light-green', hex: '#D2DAC5', label: 'Light Green' }",
    "{ id: 'light-green', hex: '#D2DAC5', label: 'Pandan' }"
)
content = content.replace(
    "{ id: 'lime', hex: '#DCE495', label: 'Lime' }",
    "{ id: 'lime', hex: '#DCE495', label: 'Turmeric' }"
)

# 4. Update imageMap for light-green
old_lg = """      'light-green': [
        '/Web-Chomm-s-House/images/light-green-front-v2.png',
        '/Web-Chomm-s-House/images/light-green-left-v2.png',
        '/Web-Chomm-s-House/images/light-green-right-v2.png',
        '/Web-Chomm-s-House/images/light-green-top-v2.png',
        '/Web-Chomm-s-House/images/light-green-back-v2.png',
        '/Web-Chomm-s-House/images/light-green-bottom-v2.png'
      ],"""
new_lg = """      'light-green': [
        '/Web-Chomm-s-House/images/light-green-front-v3.png',
        '/Web-Chomm-s-House/images/light-green-left-v3.png',
        '/Web-Chomm-s-House/images/light-green-right-v3.png',
        '/Web-Chomm-s-House/images/light-green-top-v3.png',
        '/Web-Chomm-s-House/images/light-green-back-v3.png',
        '/Web-Chomm-s-House/images/light-green-bottom-v3.png'
      ],"""
content = content.replace(old_lg, new_lg)

# 5. Update imageMap for lime
old_lime = """      'lime': [
        getPlaceholder('Lime - Front'),
        getPlaceholder('Lime - Left'),
        getPlaceholder('Lime - Right'),
        getPlaceholder('Lime - Top'),
        getPlaceholder('Lime - Back'),
        getPlaceholder('Lime - Bottom')
      ],"""
new_lime = """      'lime': [
        '/Web-Chomm-s-House/images/lime-front-v2.png',
        '/Web-Chomm-s-House/images/lime-left-v2.png',
        '/Web-Chomm-s-House/images/lime-right-v2.png',
        '/Web-Chomm-s-House/images/lime-top-v2.png',
        '/Web-Chomm-s-House/images/lime-back-v2.png',
        '/Web-Chomm-s-House/images/lime-bottom-v2.png'
      ],"""
content = content.replace(old_lime, new_lime)

# 6. Update packaging buttons
content = content.replace(
    'className={py-6 flex flex-col items-center justify-center rounded-2xl transition-all',
    'className={p-2 flex flex-col items-center justify-center rounded-2xl transition-all h-full min-h-[120px]'
)

content = content.replace(
    "{pkg === '?????' && <div className=\"w-8 h-8 rounded border border-stone-200 mb-2 flex items-center justify-center text-[8px]\">LOGO</div>}",
    "{pkg === '?????' && <img src=\"/Web-Chomm-s-House/images/packaging-clear.png\" className=\"w-full h-auto object-contain mix-blend-multiply rounded-xl\" alt=\"?????\" />}"
)

content = content.replace(
    "{pkg === '???????' && <div className=\"w-8 h-8 rounded border border-stone-200 mb-2 transform rotate-45 scale-75\"></div>}",
    "{pkg === '???????' && <img src=\"/Web-Chomm-s-House/images/packaging-organza.png\" className=\"w-full h-auto object-contain mix-blend-multiply rounded-xl\" alt=\"???????\" />}"
)

content = content.replace(
    "{pkg === '????????????' && <div className=\"w-8 h-6 rounded bg-stone-700 mb-2\"></div>}",
    "{pkg === '????????????' && <img src=\"/Web-Chomm-s-House/images/packaging-box.png\" className=\"w-full h-auto object-contain mix-blend-multiply rounded-xl\" alt=\"????????????\" />}"
)

content = content.replace(
    "<span className=\"text-xs font-medium\">{pkg}</span>",
    "{/* removed redundant text */}"
)

# Also fix the inline display of color label in the cart summary
content = content.replace(
    " selectedColor === 'charcoal' ? '???????? (Charcoal)' : selectedColor}",
    " colors.find(c => c.id === selectedColor)?.label}"
)
content = content.replace(
    "<span className=\"text-xs text-stone-400 font-medium capitalize\">{selectedColor}</span>",
    "<span className=\"text-xs text-stone-400 font-medium capitalize\">{colors.find(c => c.id === selectedColor)?.label}</span>"
)

# 7. Write content back safely
with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done!')
