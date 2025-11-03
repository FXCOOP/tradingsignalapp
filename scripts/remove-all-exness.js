const fs = require('fs');
const path = require('path');

console.log('🧹 Starting Exness removal process...\n');

// Files to process
const filesToProcess = [
  {
    path: path.join(__dirname, '..', 'src', 'app', 'page.tsx'),
    description: 'Main page - Remove ExnessLink widgets',
    process: (content) => {
      console.log('  → Removing ExnessLink widgets from page.tsx...');

      // Remove ExnessLink imports
      content = content.replace(/import\s+\{[^}]*ExnessLink[^}]*\}\s+from\s+['"][^'"]+['"]\s*\n?/g, '');

      // Remove all ExnessLink components (single and multi-line)
      content = content.replace(/<ExnessLink[\s\S]*?<\/ExnessLink>/g, '');

      // Remove standalone ExnessLink self-closing tags
      content = content.replace(/<ExnessLink[^>]*\/>/g, '');

      return content;
    }
  },
  {
    path: path.join(__dirname, '..', 'src', 'components', 'AutoOptimizingPopup.tsx'),
    description: 'AutoOptimizingPopup - Replace Exness URL with placeholder',
    process: (content) => {
      console.log('  → Replacing Exness URL in AutoOptimizingPopup...');

      // Replace Exness URL constant
      content = content.replace(
        /const EXNESS_URL = ['"][^'"]+['"]/,
        "const BROKER_URL = '#' // Replace with your broker link"
      );

      // Update references to EXNESS_URL
      content = content.replace(/EXNESS_URL/g, 'BROKER_URL');

      // Update redirect comment
      content = content.replace(/\/\/ Redirect to Exness/, '// Redirect to broker');

      return content;
    }
  },
  {
    path: path.join(__dirname, '..', 'src', 'components', 'BrokerPromptModal.tsx'),
    description: 'BrokerPromptModal - Remove Exness broker option',
    process: (content) => {
      console.log('  → Removing Exness from BrokerPromptModal...');

      // Replace the brokers array with an empty array
      content = content.replace(
        /const brokers = \[\s*\{[\s\S]*?\}\s*\]/,
        `const brokers = [
    // Add your broker configuration here
    // {
    //   name: 'Broker Name',
    //   logo: '🏦',
    //   minDeposit: '$10',
    //   benefits: 'List benefits here',
    //   link: 'https://your-broker-link.com'
    // }
  ]`
      );

      // Remove the tracking API call for Exness
      content = content.replace(
        /\/\/ Track click[\s\S]*?catch \(error\) \{[\s\S]*?\}/,
        `// Track click if needed
                  // Add your tracking logic here`
      );

      return content;
    }
  }
];

// Components to delete
const componentsToDelete = [
  {
    path: path.join(__dirname, '..', 'src', 'components', 'ExnessLink.tsx'),
    description: 'ExnessLink component'
  }
];

// API routes to delete
const apiRoutesToDelete = [
  {
    path: path.join(__dirname, '..', 'src', 'app', 'api', 'postback', 'exness', 'route.ts'),
    description: 'Exness postback API route'
  },
  {
    path: path.join(__dirname, '..', 'src', 'app', 'api', 'track', 'exness-click', 'route.ts'),
    description: 'Exness click tracking API route'
  }
];

// Process files
let processedCount = 0;
let errorCount = 0;

console.log('📝 Processing files:\n');

filesToProcess.forEach(file => {
  try {
    if (fs.existsSync(file.path)) {
      console.log(`Processing: ${file.description}`);
      let content = fs.readFileSync(file.path, 'utf8');
      const processedContent = file.process(content);

      // Only write if content changed
      if (processedContent !== content) {
        fs.writeFileSync(file.path, processedContent, 'utf8');
        console.log(`  ✅ Updated successfully\n`);
        processedCount++;
      } else {
        console.log(`  ⚠️ No changes needed\n`);
      }
    } else {
      console.log(`  ⚠️ File not found: ${file.path}\n`);
    }
  } catch (error) {
    console.error(`  ❌ Error processing ${file.description}:`, error.message, '\n');
    errorCount++;
  }
});

// Delete components
console.log('🗑️  Deleting components:\n');

componentsToDelete.forEach(file => {
  try {
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
      console.log(`✅ Deleted: ${file.description}`);
      processedCount++;
    } else {
      console.log(`⚠️ Already deleted or not found: ${file.description}`);
    }
  } catch (error) {
    console.error(`❌ Error deleting ${file.description}:`, error.message);
    errorCount++;
  }
});

console.log('');

// Delete API routes
console.log('🗑️  Deleting API routes:\n');

apiRoutesToDelete.forEach(file => {
  try {
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
      console.log(`✅ Deleted: ${file.description}`);
      processedCount++;

      // Try to delete parent directories if empty
      const parentDir = path.dirname(file.path);
      try {
        const files = fs.readdirSync(parentDir);
        if (files.length === 0) {
          fs.rmdirSync(parentDir);
          console.log(`  → Removed empty directory: ${path.basename(parentDir)}`);
        }
      } catch (e) {
        // Directory not empty or can't be removed, that's ok
      }
    } else {
      console.log(`⚠️ Already deleted or not found: ${file.description}`);
    }
  } catch (error) {
    console.error(`❌ Error deleting ${file.description}:`, error.message);
    errorCount++;
  }
});

// Summary
console.log('\n' + '='.repeat(60));
console.log('📊 REMOVAL SUMMARY');
console.log('='.repeat(60));
console.log(`✅ Successfully processed: ${processedCount} items`);
console.log(`❌ Errors encountered: ${errorCount} items`);
console.log('='.repeat(60));

console.log('\n⚠️  NEXT STEPS:');
console.log('1. Review the changes in your version control');
console.log('2. Update BrokerPromptModal with your preferred broker');
console.log('3. Update AutoOptimizingPopup with your broker URL');
console.log('4. Remove any remaining Exness references in:');
console.log('   - Email templates (src/lib/email-templates-exness.ts)');
console.log('   - Database migration files (*.sql files)');
console.log('   - Documentation files (*.md, *.html files)');
console.log('5. Test the application thoroughly');
console.log('6. Run: npm run build');
console.log('\n✨ Exness removal process complete!\n');
