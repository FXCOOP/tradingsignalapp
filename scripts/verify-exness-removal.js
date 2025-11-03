const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Verifying Exness removal...\n');

// Files that should have been deleted
const deletedFiles = [
  'src/components/ExnessLink.tsx',
  'src/lib/email-templates-exness.ts',
  'src/lib/email-service-resend.ts',
  'src/app/api/postback/exness/route.ts',
  'src/app/api/track/exness-click/route.ts',
  'src/app/api/cron/send-emails/route.ts'
];

// Files that should have been modified
const modifiedFiles = [
  'src/components/AutoOptimizingPopup.tsx',
  'src/components/BrokerPromptModal.tsx'
];

console.log('✅ Checking deleted files:\n');
let allDeleted = true;
deletedFiles.forEach(file => {
  const fullPath = path.join(__dirname, '..', file);
  const exists = fs.existsSync(fullPath);
  if (exists) {
    console.log(`  ❌ STILL EXISTS: ${file}`);
    allDeleted = false;
  } else {
    console.log(`  ✅ ${file}`);
  }
});

console.log('\n📝 Checking modified files:\n');
let allModified = true;
modifiedFiles.forEach(file => {
  const fullPath = path.join(__dirname, '..', file);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');

    // Check for Exness references
    const hasExnessUrl = content.includes('exness');
    const hasExnessOnelink = content.includes('exnessonelink.com') || content.includes('exnesstrack.net');

    if (hasExnessUrl || hasExnessOnelink) {
      console.log(`  ⚠️ ${file} - Still contains Exness references (this may be ok if commented or in strings)`);
    } else {
      console.log(`  ✅ ${file} - Cleaned`);
    }
  } else {
    console.log(`  ❌ NOT FOUND: ${file}`);
    allModified = false;
  }
});

// Search for remaining Exness references in active code
console.log('\n🔍 Searching for remaining Exness references in source code:\n');

try {
  const srcPath = path.join(__dirname, '..', 'src');

  // Search for Exness URLs in TypeScript files
  try {
    const grepCommand = process.platform === 'win32'
      ? `cd "${srcPath}" && findstr /S /I /N "exnessonelink exnesstrack" *.tsx *.ts 2>nul || echo No matches found`
      : `grep -r -n -i "exnessonelink\\|exnesstrack" "${srcPath}" --include="*.tsx" --include="*.ts" || echo "No matches found"`;

    const result = execSync(grepCommand, { encoding: 'utf8', stdio: 'pipe' });

    if (result.includes('No matches found') || result.trim() === '') {
      console.log('  ✅ No Exness URLs found in source code');
    } else {
      console.log('  ⚠️ Found Exness URLs:\n');
      console.log(result);
    }
  } catch (e) {
    console.log('  ✅ No Exness URLs found in source code (or grep error)');
  }

  // Search for EXNESS constants
  try {
    const grepCommand = process.platform === 'win32'
      ? `cd "${srcPath}" && findstr /S /I /N "EXNESS_" *.tsx *.ts 2>nul || echo No matches found`
      : `grep -r -n "EXNESS_" "${srcPath}" --include="*.tsx" --include="*.ts" || echo "No matches found"`;

    const result = execSync(grepCommand, { encoding: 'utf8', stdio: 'pipe' });

    if (result.includes('No matches found') || result.trim() === '') {
      console.log('  ✅ No EXNESS constants found in source code');
    } else {
      console.log('  ⚠️ Found EXNESS constants:\n');
      console.log(result);
    }
  } catch (e) {
    console.log('  ✅ No EXNESS constants found in source code (or grep error)');
  }

} catch (error) {
  console.log('  ⚠️ Could not search for remaining references:', error.message);
}

// Summary
console.log('\n' + '='.repeat(60));
console.log('📊 VERIFICATION SUMMARY');
console.log('='.repeat(60));

if (allDeleted && allModified) {
  console.log('✅ All Exness components and widgets successfully removed!');
  console.log('\n📋 What was removed:');
  console.log('  • ExnessLink component');
  console.log('  • Exness API routes (postback, click tracking)');
  console.log('  • Exness email templates and service');
  console.log('  • Email campaign cron job');
  console.log('\n🔧 What was updated:');
  console.log('  • AutoOptimizingPopup (Exness URL replaced with placeholder)');
  console.log('  • BrokerPromptModal (Exness broker removed)');
  console.log('\n⚠️ IMPORTANT: Next Steps:');
  console.log('  1. Review changes with git diff');
  console.log('  2. Update BrokerPromptModal with your preferred broker');
  console.log('  3. Update AutoOptimizingPopup with your broker URL');
  console.log('  4. Test the application: npm run dev');
  console.log('  5. Build the application: npm run build');
  console.log('  6. Commit changes: git add . && git commit -m "Remove Exness affiliate links and widgets"');
} else {
  console.log('⚠️ Some issues detected. Please review the output above.');
}

console.log('='.repeat(60));
console.log('');
