#!/usr/bin/env python3
"""
Replace all remaining Exness <a> tags with <ExnessLink> component
Handles complex cases with styling and dynamic hrefs
"""

import re

# Read the file
with open('../src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = 0

# Pattern to find <a> tags with exness links
# This matches multi-line <a> tags with exness URLs
pattern = r'<a\s+([^>]*href=\{[^}]*exness[^}]*\}[^>]*)>([\s\S]*?)</a>'

def replace_link(match):
    global replacements
    attrs = match.group(1)
    children = match.group(2)

    # Extract href
    href_match = re.search(r'href=(\{[^}]+\})', attrs)
    if not href_match:
        return match.group(0)  # No href found, skip

    href = href_match.group(1)

    # Extract other attributes (target, rel, style, etc.)
    other_attrs = attrs.replace(href_match.group(0), '').strip()

    # Determine source based on context or line number
    # For now, use generic sources
    if 'platform=mobile' in href:
        source = 'widget_banner'
    else:
        source = 'widget_banner'

    replacements += 1

    # Build the ExnessLink component
    return f'<ExnessLink\n                  href={href}\n                  source="{source}"\n                  {other_attrs}>\n{children}</ExnessLink>'

# Replace all matches
content = re.sub(pattern, replace_link, content)

# Write back
with open('../src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print(f'✅ Replaced {replacements} dynamic Exness links')
print('✅ All Exness links now use ExnessLink component!')
