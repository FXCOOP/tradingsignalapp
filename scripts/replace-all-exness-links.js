#!/usr/bin/env node
/**
 * Replace ALL Exness links with ExnessLink component
 * This script automatically updates page.tsx to use tracked links
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');
let replacements = 0;

console.log('🔍 Searching for Exness links...\n');

// Step 1: Add import at the top (after other imports)
if (!content.includes("import { ExnessLink }")) {
  const importLine = "import { ExnessLink } from '@/components/ExnessLink'";

  // Find a good place to insert (after existing imports)
  const lastImportIndex = content.lastIndexOf("import ");
  const nextNewlineIndex = content.indexOf('\n', lastImportIndex);

  content = content.slice(0, nextNewlineIndex + 1) + importLine + '\n' + content.slice(nextNewlineIndex + 1);
  console.log('✅ Added ExnessLink import');
  replacements++;
}

// Step 2: Replace the 30-minute popup link (already has onClick tracking)
// Find the specific link in the 30-min popup
const popup30MinPattern = /<a\s+href="https:\/\/one\.exnesstrack\.org\/a\/ckdhtel03"[\s\S]*?onClick=\{async \(\) => \{[\s\S]*?\}\}[\s\S]*?>\s*🎁 Claim Your Bonus Now\s*<\/a>/;

if (popup30MinPattern.test(content)) {
  content = content.replace(popup30MinPattern, (match) => {
    console.log('✅ Replacing 30-minute popup link');
    replacements++;

    return `<ExnessLink
              href="https://one.exnesstrack.org/a/ckdhtel03"
              source="30min_popup"
              style={{
                display: 'inline-block',
                background: 'white',
                color: '#667eea',
                padding: '18px 50px',
                borderRadius: '50px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                textDecoration: 'none',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease'
              }}
            >
              🎁 Claim Your Bonus Now
            </ExnessLink>`;
  });
}

// Step 3: Replace footer link
const footerPattern = /<a href="https:\/\/one\.exnessonelink\.com\/a\/c_8f0nxidtbt" rel="sponsored">Exness broker<\/a>/;

if (footerPattern.test(content)) {
  content = content.replace(footerPattern,
    '<ExnessLink href="https://one.exnessonelink.com/a/c_8f0nxidtbt" source="footer_link" rel="sponsored">Exness broker</ExnessLink>'
  );
  console.log('✅ Replaced footer link');
  replacements++;
}

// Step 4: Replace all other exness links (simplified approach)
// Find patterns like: href={...exnessonelink...} or href="...exnessonelink..."

// Pattern for dynamic hrefs with ternary
const dynamicHrefPattern = /href=\{\s*isMobile\s*\?\s*"([^"]*exness[^"]*)"\s*:\s*"([^"]*exness[^"]*)"\s*\}/gi;

const dynamicMatches = [...content.matchAll(dynamicHrefPattern)];
console.log(`\n📍 Found ${dynamicMatches.length} dynamic Exness links`);

// We'll need to replace these more carefully
// For now, let's just report them
dynamicMatches.forEach((match, i) => {
  const fullMatch = match[0];
  const mobileUrl = match[1];
  const desktopUrl = match[2];

  console.log(`   ${i + 1}. Mobile: ${mobileUrl.substring(0, 50)}...`);
  console.log(`      Desktop: ${desktopUrl.substring(0, 50)}...`);
});

// Save the file
fs.writeFileSync(filePath, content, 'utf8');

console.log(`\n✅ Done! Made ${replacements} replacements`);
console.log('\n⚠️  NOTE: Dynamic links (with isMobile ternary) need manual replacement.');
console.log('   Check the locations listed above and update them manually.');
console.log('\n📝 Manual replacement template:');
console.log(`
<ExnessLink
  href={isMobile ? "MOBILE_URL" : "DESKTOP_URL"}
  source="YOUR_SOURCE_NAME"
>
  Link Text
</ExnessLink>
`);
