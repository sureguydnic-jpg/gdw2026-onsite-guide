import os
from PIL import Image, ImageDraw, ImageFont

# Set up paths
base_dir = r"X:\02.Antigravity2.0\08.GDW 2026 On-Site Guide"

# 1. Generate Favicon PNG (64x64) and SVG
fav_size = 64
fav_img = Image.new("RGBA", (fav_size, fav_size), (0, 0, 0, 0))
fav_draw = ImageDraw.Draw(fav_img)

# Draw rounded rect background
fav_draw.rounded_rectangle([2, 2, 62, 62], radius=16, fill=(17, 24, 21, 255), outline=(16, 185, 129, 255), width=2)
# Inner emerald gradient accent
fav_draw.ellipse([12, 12, 52, 52], fill=(16, 185, 129, 40))

# Try loading font or default
try:
    font_bold_lg = ImageFont.truetype("arialbd.ttf", 26)
    font_bold_sm = ImageFont.truetype("arialbd.ttf", 16)
except:
    font_bold_lg = ImageFont.load_default()
    font_bold_sm = ImageFont.load_default()

fav_draw.text((32, 32), "GDW", fill=(52, 211, 153, 255), font=font_bold_sm, anchor="mm")
fav_img.save(os.path.join(base_dir, "favicon.png"))

# Create SVG Favicon
favicon_svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect x="2" y="2" width="60" height="60" rx="16" fill="#111815" stroke="#10b981" stroke-width="2"/>
  <circle cx="32" cy="32" r="20" fill="rgba(16, 185, 129, 0.2)"/>
  <text x="32" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="bold" fill="#34d399" text-anchor="middle">GDW</text>
</svg>'''

with open(os.path.join(base_dir, "favicon.svg"), "w", encoding="utf-8") as f:
    f.write(favicon_svg_content)


# 2. Generate Open Graph Image (1200x630 PNG)
width, height = 1200, 630
og_img = Image.new("RGBA", (width, height), (10, 15, 13, 255))
og_draw = ImageDraw.Draw(og_img)

# Background subtle radial gradient glow effect
for r in range(500, 0, -5):
    alpha = int(25 * (1 - r / 500))
    og_draw.ellipse([600 - r, 315 - r, 600 + r, 315 + r], fill=(16, 185, 129, alpha))

# Card container
og_draw.rounded_rectangle([60, 50, 1140, 580], radius=32, fill=(17, 24, 21, 230), outline=(34, 48, 42, 255), width=2)
# Top accent border line
og_draw.line([120, 50, 1080, 50], fill=(16, 185, 129, 255), width=4)

# Load fonts
try:
    font_badge = ImageFont.truetype("arialbd.ttf", 22)
    font_title = ImageFont.truetype("arialbd.ttf", 64)
    font_subtitle = ImageFont.truetype("malgunbd.ttf", 36)
    font_info = ImageFont.truetype("malgun.ttf", 26)
    font_menu = ImageFont.truetype("malgunbd.ttf", 22)
except Exception as e:
    font_badge = ImageFont.load_default()
    font_title = ImageFont.load_default()
    font_subtitle = ImageFont.load_default()
    font_info = ImageFont.load_default()
    font_menu = ImageFont.load_default()

# Top Badge
og_draw.rounded_rectangle([100, 100, 480, 145], radius=20, fill=(16, 185, 129, 30), outline=(16, 185, 129, 100), width=1)
og_draw.text((290, 122), "GOYANG DESTINATION WEEK 2026", fill=(52, 211, 153, 255), font=font_badge, anchor="mm")

# Main Title
og_draw.text((100, 220), "GDW 2026 On-Site Guide", fill=(243, 244, 246, 255), font=font_title, anchor="lm")

# Subtitle (Korean)
og_draw.text((100, 290), "고양 데스티네이션 위크 2026 현장 안내 포탈", fill=(156, 163, 175, 255), font=font_subtitle, anchor="lm")

# Info Bar
og_draw.text((100, 360), "DATE: 2026.08.26 (Wed) - 08.29 (Sat)   |   VENUE: 고양꽃전시관", fill=(52, 211, 153, 255), font=font_info, anchor="lm")

# Divider
og_draw.line([100, 410, 1100, 410], fill=(34, 48, 42, 255), width=2)

# Shortcut Features Pills
features = [
    "📖 e-Program Book",
    "📶 Venue Wi-Fi",
    "🎧 AI Live Interpretation",
    "📲 CVENT App",
    "📝 Daily Survey"
]

x_pos = 100
for feat in features:
    bbox = font_menu.getbbox(feat)
    w = bbox[2] - bbox[0] + 36
    og_draw.rounded_rectangle([x_pos, 445, x_pos + w, 505], radius=16, fill=(25, 34, 30, 255), outline=(16, 185, 129, 60), width=1)
    og_draw.text((x_pos + w // 2, 475), feat, fill=(243, 244, 246, 255), font=font_menu, anchor="mm")
    x_pos += w + 16

og_img.convert("RGB").save(os.path.join(base_dir, "og-image.png"))
print("Successfully generated favicon.svg, favicon.png, and og-image.png!")
