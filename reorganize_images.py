import os
import shutil

base_dir = r'C:\Users\User\Documents\antigravity\web-chomms-house\public\images'
gal_dir = os.path.join(base_dir, 'gallery')
ws_dir = os.path.join(base_dir, 'workshop')

# We will move all webp to a temp dir first to avoid overwriting
temp_dir = os.path.join(base_dir, 'temp_images')
os.makedirs(temp_dir, exist_ok=True)

# Move all from gallery and workshop to temp
for f in os.listdir(gal_dir):
    if f.endswith('.webp'):
        shutil.move(os.path.join(gal_dir, f), os.path.join(temp_dir, f))
for f in os.listdir(ws_dir):
    if f.endswith('.webp'):
        shutil.move(os.path.join(ws_dir, f), os.path.join(temp_dir, f))

# Define the logical groupings based on original filenames
workshop = ['g1.webp', 'g16.webp', 'g19.webp', 'g20.webp', 'g35.webp', 'g6.webp', 'w1.webp', 'w2.webp']

gift = ['g11.webp', 'g12.webp', 'g14.webp', 'g17.webp', 'g23.webp', 'g24.webp', 'g25.webp', 'g28.webp', 'g3.webp', 'g34.webp', 'g7.webp', 'w4.webp']

sachet = ['g13.webp', 'g15.webp', 'g22.webp', 'g27.webp', 'g29.webp', 'g30.webp', 'g36.webp', 'g37.webp', 'g39.webp', 'g9.webp', 'w5.webp']
# duplicate g27 to make 12
sachet.append('g27.webp') 

acc = ['g10.webp', 'g18.webp', 'g2.webp', 'g21.webp', 'g26.webp', 'g31.webp', 'g32.webp', 'g33.webp', 'g38.webp', 'g4.webp', 'g40.webp', 'g8.webp', 'w3.webp', 'w7.webp', 'w8.webp']

# Now copy them back to their final destinations
# Workshop: w1 to w8
for i, name in enumerate(workshop):
    src = os.path.join(temp_dir, name)
    dst = os.path.join(ws_dir, f'w{i+1}.webp')
    shutil.copy2(src, dst)

# Gallery: g1 to g39
gallery_mappings = [] # list of (new_name, category)
g_idx = 1

def add_gallery(items, cat):
    global g_idx
    for name in items:
        src = os.path.join(temp_dir, name)
        dst = os.path.join(gal_dir, f'g{g_idx}.webp')
        shutil.copy2(src, dst)
        gallery_mappings.append((f'g{g_idx}.webp', cat))
        g_idx += 1

add_gallery(gift, 'gift')
add_gallery(sachet, 'sachet')
add_gallery(acc, 'accessory')

print("Mappings length:", len(gallery_mappings))
for m in gallery_mappings:
    print(m)

# Clean up temp
shutil.rmtree(temp_dir)
