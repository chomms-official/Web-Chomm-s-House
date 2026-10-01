import sys
import re

try:
    with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
        text = f.read()

    # 1. Add import
    if "import { useCartStore }" not in text:
        import_pos = text.find('import HeaderActions')
        if import_pos != -1:
            text = text[:import_pos] + "import { useCartStore } from '@/store/cartStore';\n" + text[import_pos:]
        else:
            import_pos = text.find('import ')
            text = text[:import_pos] + "import { useCartStore } from '@/store/cartStore';\n" + text[import_pos:]

    # 2. Add hook usage
    if "const addToCart = useCartStore(" not in text:
        hook_insert = "  const [qty, setQty] = useState(1);\n  const addToCart = useCartStore((state) => state.addToCart);\n"
        text = text.replace('  const [qty, setQty] = useState(1);\n', hook_insert)

    # 3. Create the add to cart handler function
    handler = """  const handleAddToCart = () => {
    addToCart({
      color: selectedColor,
      size: selectedSize,
      scent: selectedScent,
      packaging: selectedPackaging,
      addon: addLogoSticker,
      price: basePrice,
      quantity: qty,
      image: currentImages[0]
    });
  };
"""
    if "const handleAddToCart" not in text:
        insert_pos = text.find('  const basePrice = 190;')
        text = text[:insert_pos] + handler + text[insert_pos:]

    # 4. Replace setIsOrderSummaryOpen(true) with handleAddToCart()
    text = text.replace('onClick={() => setIsOrderSummaryOpen(true)}', 'onClick={handleAddToCart}')
    
    # 5. Remove the Order Summary Modal UI to avoid confusion, or we can just leave the state there unused.
    # It's better to leave it unused to avoid breaking anything else.

    with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
        f.write(text)

    print('Updated page.tsx to use Cart System.')

except Exception as e:
    print('Error:', e)
