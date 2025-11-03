const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'app', 'page.tsx');

console.log('Reading file:', filePath);
let content = fs.readFileSync(filePath, 'utf8');

// Remove all ExnessLink components (including multi-line components)
// This regex matches <ExnessLink ... > content </ExnessLink>
content = content.replace(/<ExnessLink[\s\S]*?<\/ExnessLink>/g, '');

// Remove duplicate import statement if exists (line 1965)
const lines = content.split('\n');
const filteredLines = lines.filter((line, index) => {
  // Remove duplicate ExnessLink import
  if (line.includes("import { ExnessLink }") && index > 100) {
    return false;
  }
  return true;
});

content = filteredLines.join('\n');

console.log('Writing cleaned file...');
fs.writeFileSync(filePath, content, 'utf8');

console.log('✅ Removed all ExnessLink widgets from page.tsx');
