import sys

try:
    for filepath in ['src/app/page.tsx', 'src/app/our-story/page.tsx']:
        with open(filepath, 'r', encoding='utf-8') as f:
            text = f.read()

        # Update desktop Workshop link
        text = text.replace('<a href="#" className="hover:text-stone-900 transition-colors">Workshop</a>', '<a href="/Web-Chomm-s-House/workshop" className="hover:text-stone-900 transition-colors">Workshop</a>')
        text = text.replace('<a href="#" className="hidden md:block hover:text-stone-900 transition-colors">Workshop</a>', '<a href="/Web-Chomm-s-House/workshop" className="hidden md:block hover:text-stone-900 transition-colors">Workshop</a>')
        
        # Update desktop Contact link
        text = text.replace('<a href="#" className="hidden md:block hover:text-stone-900 transition-colors">Contact</a>', '<a href="/Web-Chomm-s-House/contact" className="hidden md:block hover:text-stone-900 transition-colors">Contact</a>')

        # Update mobile Workshop link
        text = text.replace('<a href="#" className="block text-stone-500">Workshop</a>', '<a href="/Web-Chomm-s-House/workshop" className="block text-stone-500">Workshop</a>')

        # Update mobile Contact link
        text = text.replace('<a href="#" className="block text-stone-500">Contact</a>', '<a href="/Web-Chomm-s-House/contact" className="block text-stone-500">Contact</a>')

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(text)
            
    print('Updated Navbars successfully.')
except Exception as e:
    print('Error:', e)
