"""
StarWhite Portfolio Build Script
Compiles index.html, style.css, and script.js into a self-contained,
production-ready single file in dist/index.html, ready for GitHub Pages or offline browsing.
"""
import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))
DIST = os.path.join(ROOT, "dist")
os.makedirs(DIST, exist_ok=True)

with open(os.path.join(ROOT, "index.html"), "r", encoding="utf-8") as f:
    html = f.read()

with open(os.path.join(ROOT, "style.css"), "r", encoding="utf-8") as f:
    css = f.read()

with open(os.path.join(ROOT, "script.js"), "r", encoding="utf-8") as f:
    js = f.read()

# Replace <link rel="stylesheet" href="style.css"> with inline <style>
html = re.sub(
    r'<link\s+rel="stylesheet"\s+href="style\.css"[^>]*>',
    f"<style>\n{css}\n</style>",
    html
)

# Replace <script src="script.js"></script> with inline <script>
html = re.sub(
    r'<script\s+src="script\.js"[^>]*></script>',
    f"<script>\n{js}\n</script>",
    html
)

dist_file = os.path.join(DIST, "index.html")
with open(dist_file, "w", encoding="utf-8") as f:
    f.write(html)

size_kb = os.path.getsize(dist_file) / 1024
print(f"Build successful! Output: {dist_file} ({size_kb:.1f} KB)")
