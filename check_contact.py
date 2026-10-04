import os
import re

contact_path = r'C:\Users\User\Documents\antigravity\web-chomms-house\src\app\contact\page.tsx'

with open(contact_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the whole Main Content block with a spacer
# from {/* Main Content */} down to just before </div> which closes the main wrapper (before </nav>? No, wait. Navbar is at the top.)
# The file structure is:
# <div wrapper>
#   <nav>...</nav>
#   {isMobileMenuOpen ... }
#   {/* Main Content */}
#   <div className="flex-grow...
#   ...
#   </div>
# </div>

# Let's replace from {/* Main Content */} to the second to last </div> with <div className="flex-grow"></div>\n<Footer />
match = re.search(r'\{/\* Main Content \*/\}(.*?)(</div>\s*)$', content, re.DOTALL)
if match:
    # Wait, contact/page.tsx doesn't actually render `<Footer />` at the bottom currently?
    # Let me check if `Footer` is rendered in contact/page.tsx!
    pass
