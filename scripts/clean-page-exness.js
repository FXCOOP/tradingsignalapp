const fs = require('fs');
const path = require('path');

console.log('🧹 Cleaning page.tsx from Exness references...\n');

const filePath = path.join(__dirname, '..', 'src', 'app', 'page.tsx');

if (!fs.existsSync(filePath)) {
  console.log('❌ File not found:', filePath);
  process.exit(1);
}

let content = fs.readFileSync(filePath, 'utf8');
const originalLength = content.length;

console.log('📝 Applying replacements...\n');

// 1. Replace Exness URLs
console.log('1. Replacing Exness URLs...');
content = content.replace(
  /https:\/\/one\.exnessonelink\.com\/[^\s'"]+/g,
  '#'
);
content = content.replace(
  /https:\/\/one\.exnesstrack\.net\/[^\s'"]+/g,
  '#'
);

// 2. Replace API tracking calls
console.log('2. Removing Exness tracking API calls...');
content = content.replace(
  /\/api\/track\/exness-click/g,
  '/api/track/broker-click'
);

// 3. Replace comments about Exness
console.log('3. Updating Exness comments...');
content = content.replace(
  /\/\/ Open Exness with click_id/g,
  '// Open broker with click_id'
);
content = content.replace(
  /\/\/ TRUSTED BROKER: Only Exness \(user requested\)/g,
  '// TRUSTED BROKER: Configure your preferred broker'
);
content = content.replace(
  /\/\/ Rotate Exness widget versions every 30 seconds/g,
  '// Rotate broker widget versions every 30 seconds'
);
content = content.replace(
  /\/\/ {2,}if \(!popupDismissed\['exness'\]\)/g,
  "// if (!popupDismissed['broker'])"
);

// 4. Replace broker configuration
console.log('4. Replacing broker configuration...');
content = content.replace(
  /name:\s*['"]Exness['"]/g,
  "name: 'Your Broker'"
);

// 5. Replace text content mentioning Exness
console.log('5. Updating text content...');
content = content.replace(
  /Popular GCC forex brokers: Exness, FBS, XM/g,
  'Popular GCC forex brokers: Choose your preferred broker'
);
content = content.replace(
  /platforms like Exness, IG, and CMC Markets/g,
  'major trading platforms'
);
content = content.replace(
  /'New trader opens Exness demo with/g,
  "'New trader opens demo account with"
);

// 6. Replace component titles/headings
console.log('6. Updating headings and titles...');
content = content.replace(
  /\{\/\* Exness Video Section \*\/\}/g,
  '{/* Broker Information Section */}'
);
content = content.replace(
  /💎 Why Trade with Exness\?/g,
  '💎 Why Choose This Broker?'
);
content = content.replace(
  /Watch how Exness provides the best trading conditions/g,
  'Learn about the best trading conditions'
);
content = content.replace(
  /For Exness Clients/g,
  'Free for Members'
);
content = content.replace(
  /\{\/\* Rotating Exness Banner \*\/\}/g,
  '{/* Rotating Broker Banner */}'
);

// 7. Replace state variables
console.log('7. Updating state variables...');
content = content.replace(
  /hasExnessAccount/g,
  'hasBrokerAccount'
);
content = content.replace(
  /showExnessPopup/g,
  'showBrokerPopup'
);

const changesMade = originalLength !== content.length || content !== fs.readFileSync(filePath, 'utf8');

if (changesMade) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('\n✅ Successfully cleaned page.tsx');
  console.log(`📊 File size: ${originalLength} → ${content.length} bytes`);
} else {
  console.log('\n⚠️ No changes made to page.tsx');
}

console.log('\n⚠️ IMPORTANT:');
console.log('• Review the changes with git diff src/app/page.tsx');
console.log('• Update placeholder broker name with your actual broker');
console.log('• Update # URLs with actual broker links');
console.log('• Create /api/track/broker-click route if needed');
console.log('\n✨ Done!\n');
