import sys
import re

files = [
    'src/app/page.tsx',
    'src/app/our-story/page.tsx',
    'src/app/workshop/page.tsx',
    'src/app/contact/page.tsx'
]

cart_div_pattern = re.compile(r'<div className="relative cursor-pointer hover:text-stone-900 transition-colors p-2 -mr-2">.*?<svg className="w-6 h-6".*?</div>', re.DOTALL)

for filepath in files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            text = f.read()

        # Insert import
        if "import HeaderActions" not in text:
            # find first import
            import_pos = text.find('import ')
            text = text[:import_pos] + "import HeaderActions from '@/components/HeaderActions';\n" + text[import_pos:]

        # Replace cart div
        text = cart_div_pattern.sub('<HeaderActions />', text)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(text)
        print(f'Updated {filepath}')
    except Exception as e:
        print(f'Error processing {filepath}: {e}')
