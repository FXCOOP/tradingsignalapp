const fs = require('fs');
const path = require('path');

console.log('🧹 Removing Exness/Broker video sections and fixing broker partners...\n');

const filePath = path.join(__dirname, '..', 'src', 'app', 'page.tsx');

if (!fs.existsSync(filePath)) {
  console.log('❌ File not found:', filePath);
  process.exit(1);
}

let content = fs.readFileSync(filePath, 'utf8');
const originalLength = content.length;

console.log('📝 Applying changes...\n');

// 1. Remove the entire "Why Choose This Broker?" video section
console.log('1. Removing video section (Why Choose This Broker?)...');
const videoSectionRegex = /{\/\* Broker Information Section \*\/}[\s\S]*?<iframe[\s\S]*?brandfolder\.com[\s\S]*?<\/iframe>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g;
content = content.replace(videoSectionRegex, '');

// Alternative: More specific regex to target the exact section
const specificVideoRegex = /<div style=\{\{[\s\S]*?marginTop: '48px',[\s\S]*?💎 Why Choose This Broker\?[\s\S]*?<iframe[\s\S]*?brandfolder\.com[\s\S]*?<\/iframe>[\s\S]*?<\/div>\s*<\/div>/g;
content = content.replace(specificVideoRegex, '');

console.log('✅ Video section removed');

// 2. Fix the brokerPartners data to show a placeholder
console.log('2. Updating brokerPartners configuration...');
content = content.replace(
  /const brokerPartners = \[[\s\S]*?\{[\s\S]*?id: 1,[\s\S]*?name: 'Your Broker',[\s\S]*?\}[\s\S]*?\]/,
  `const brokerPartners = [
    {
      id: 1,
      name: 'Your Broker Name',
      logo: '💎',
      rating: 4.8,
      reviews: 12500,
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      bonus: 'Special Offer',
      popular: true,
      commission: 'Contact for details',
      platform: 'Multiple Platforms',
      minDeposit: 'Contact for details',
      color: '#3B82F6'
    }
  ]`
);

console.log('✅ Broker configuration updated with placeholder');

const changesMade = originalLength !== content.length;

if (changesMade) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('\n✅ Successfully cleaned page.tsx');
  console.log(`📊 File size: ${originalLength} → ${content.length} bytes (${originalLength - content.length} bytes removed)`);
} else {
  console.log('\n⚠️ No changes made to page.tsx (section may already be removed)');
}

console.log('\n⚠️ IMPORTANT:');
console.log('• The video section has been removed');
console.log('• Broker partner section now shows a generic placeholder');
console.log('• Update brokerPartners array with your actual broker details');
console.log('• Review the changes with: git diff src/app/page.tsx');
console.log('\n✨ Done!\n');
