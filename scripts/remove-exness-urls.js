const fs = require('fs');
const path = require('path');

console.log('🧹 Removing remaining Exness URLs from pages...\n');

const filesToProcess = [
  {
    path: 'src/app/page.tsx',
    replacements: [
      {
        pattern: /(signupUrl|href|url)\s*[:=]\s*['"]https:\/\/one\.exness(?:onelink|track)\.(?:com|net)\/[^'"]*['"]/g,
        replacement: (match) => {
          const prefix = match.split(':')[0].split('=')[0].trim();
          return `${prefix}: '#' // Replace with your broker URL`;
        },
        description: 'Replace Exness URLs with placeholders'
      }
    ]
  },
  {
    path: 'src/app/copy-trading/page.tsx',
    replacements: [
      {
        pattern: /signupUrl:\s*['"]https:\/\/one\.exness(?:onelink|track)\.(?:com|net)\/[^'"]*['"]/g,
        replacement: "signupUrl: '#' // Replace with your broker URL",
        description: 'Replace Exness signup URLs'
      },
      {
        pattern: /<a\s+href=["']https:\/\/one\.exness(?:onelink|track)\.(?:com|net)\/[^"']*["'][^>]*>([^<]+)<\/a>/g,
        replacement: '<a href="#">$1</a>',
        description: 'Remove Exness anchor links'
      }
    ]
  },
  {
    path: 'src/app/education/page.tsx',
    replacements: [
      {
        pattern: /href=["']https:\/\/one\.exness(?:onelink|track)\.(?:com|net)\/[^"']*["']/g,
        replacement: 'href="#"',
        description: 'Replace Exness hrefs'
      }
    ]
  },
  {
    path: 'src/app/signals/page.tsx',
    replacements: [
      {
        pattern: /href=["']https:\/\/one\.exness(?:onelink|track)\.(?:com|net)\/[^"']*["']/g,
        replacement: 'href="#"',
        description: 'Replace Exness hrefs'
      }
    ]
  },
  {
    path: 'src/components/SEOBacklinks.tsx',
    replacements: [
      {
        pattern: /<a\s+href=["']https:\/\/one\.exness(?:onelink|track)\.(?:com|net)\/[^"']*["'][^>]*>([^<]+)<\/a>/g,
        replacement: '<!-- Broker link removed -->',
        description: 'Remove Exness backlinks'
      }
    ]
  },
  {
    path: 'src/components/ProtectedContent.tsx',
    replacements: [
      {
        pattern: /href=\{`https:\/\/www\.exnesspro\.com\/[^`]*`\}/g,
        replacement: 'href="#"',
        description: 'Replace Exness Pro URLs'
      },
      {
        pattern: /process\.env\.NEXT_PUBLIC_EXNESS_PARTNER_ID[^}]*/g,
        replacement: "'your-partner-id'",
        description: 'Replace Exness partner ID references'
      }
    ]
  },
  {
    path: 'src/app/api/broker/postback/route.ts',
    replacements: [
      {
        pattern: /const secret = process\.env\.EXNESS_WEBHOOK_SECRET/g,
        replacement: "const secret = process.env.BROKER_WEBHOOK_SECRET // Update your environment variable",
        description: 'Replace Exness webhook secret'
      },
      {
        pattern: /EXNESS_WEBHOOK_SECRET/g,
        replacement: 'BROKER_WEBHOOK_SECRET',
        description: 'Replace Exness webhook references'
      }
    ]
  },
  {
    path: 'src/app/admin/dashboard/page.tsx',
    replacements: [
      {
        pattern: /\.from\(['"]exness_conversions['"]\)/g,
        replacement: ".from('broker_conversions') // Update table name",
        description: 'Replace exness_conversions table reference'
      },
      {
        pattern: /conv\.exness_user_id/g,
        replacement: 'conv.broker_user_id',
        description: 'Replace exness_user_id field'
      }
    ]
  }
];

let processedCount = 0;
let errorCount = 0;

filesToProcess.forEach(file => {
  const fullPath = path.join(__dirname, '..', file.path);

  try {
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️ File not found: ${file.path}`);
      return;
    }

    console.log(`\n📝 Processing: ${file.path}`);
    let content = fs.readFileSync(fullPath, 'utf8');
    let originalContent = content;
    let changedCount = 0;

    file.replacements.forEach(replacement => {
      const matches = content.match(replacement.pattern);
      if (matches && matches.length > 0) {
        console.log(`  → ${replacement.description} (${matches.length} occurrence(s))`);
        content = content.replace(replacement.pattern, replacement.replacement);
        changedCount += matches.length;
      }
    });

    if (content !== originalContent) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`  ✅ Updated with ${changedCount} change(s)`);
      processedCount++;
    } else {
      console.log(`  ℹ️ No changes needed`);
    }
  } catch (error) {
    console.error(`  ❌ Error processing ${file.path}:`, error.message);
    errorCount++;
  }
});

console.log('\n' + '='.repeat(60));
console.log('📊 REMOVAL SUMMARY');
console.log('='.repeat(60));
console.log(`✅ Files processed: ${processedCount}`);
console.log(`❌ Errors: ${errorCount}`);
console.log('='.repeat(60));
console.log('\n⚠️ NEXT STEPS:');
console.log('1. Review changes: git diff');
console.log('2. Update placeholder URLs with your actual broker links');
console.log('3. Update environment variables:');
console.log('   - Remove: NEXT_PUBLIC_EXNESS_PARTNER_ID, EXNESS_WEBHOOK_SECRET');
console.log('   - Add: BROKER_WEBHOOK_SECRET (if needed)');
console.log('4. Update database table if needed: exness_conversions → broker_conversions');
console.log('5. Test the application: npm run dev');
console.log('6. Run verification: node scripts/verify-exness-removal.js');
console.log('\n✨ Done!\n');
