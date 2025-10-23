#!/usr/bin/env node
/**
 * Minify HTML Guides
 *
 * This script minifies all HTML files in the /public directory
 * by removing unnecessary whitespace, comments, and optimizing inline styles.
 */

const fs = require('fs');
const path = require('path');

// Simple HTML minifier function
function minifyHTML(html) {
  let minified = html;

  // Remove HTML comments (but keep IE conditional comments)
  minified = minified.replace(/<!--(?!\[if)[\s\S]*?-->/g, '');

  // Remove whitespace between tags
  minified = minified.replace(/>\s+</g, '><');

  // Remove leading/trailing whitespace in lines
  minified = minified.replace(/^\s+|\s+$/gm, '');

  // Collapse multiple spaces to single space within text
  minified = minified.replace(/\s{2,}/g, ' ');

  // Remove quotes from attributes when safe
  minified = minified.replace(/=["']([a-zA-Z0-9-_]+)["']/g, '=$1');

  // Minify inline CSS
  minified = minified.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (match, css) => {
    let minifiedCSS = css;
    // Remove CSS comments
    minifiedCSS = minifiedCSS.replace(/\/\*[\s\S]*?\*\//g, '');
    // Remove unnecessary whitespace
    minifiedCSS = minifiedCSS.replace(/\s+/g, ' ');
    // Remove space around special characters
    minifiedCSS = minifiedCSS.replace(/\s*([{}:;,])\s*/g, '$1');
    // Remove trailing semicolons
    minifiedCSS = minifiedCSS.replace(/;}/g, '}');
    return `<style>${minifiedCSS.trim()}</style>`;
  });

  // Minify inline JavaScript
  minified = minified.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, (match, js) => {
    if (match.includes('src=')) return match; // Skip external scripts
    let minifiedJS = js;
    // Remove single-line comments
    minifiedJS = minifiedJS.replace(/\/\/.*$/gm, '');
    // Remove multi-line comments
    minifiedJS = minifiedJS.replace(/\/\*[\s\S]*?\*\//g, '');
    // Remove unnecessary whitespace
    minifiedJS = minifiedJS.replace(/\s+/g, ' ');
    return `<script>${minifiedJS.trim()}</script>`;
  });

  return minified.trim();
}

// Get all HTML files in public directory
const publicDir = path.join(__dirname, '../public');
const files = fs.readdirSync(publicDir).filter(file => file.endsWith('.html'));

console.log(`🗜️  Minifying ${files.length} HTML files...\n`);

let totalOriginalSize = 0;
let totalMinifiedSize = 0;

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  const originalContent = fs.readFileSync(filePath, 'utf8');
  const originalSize = Buffer.byteLength(originalContent, 'utf8');

  const minifiedContent = minifyHTML(originalContent);
  const minifiedSize = Buffer.byteLength(minifiedContent, 'utf8');

  // Only write if we actually reduced size
  if (minifiedSize < originalSize) {
    fs.writeFileSync(filePath, minifiedContent, 'utf8');
    const savings = originalSize - minifiedSize;
    const savingsPercent = ((savings / originalSize) * 100).toFixed(1);
    console.log(`✅ ${file}`);
    console.log(`   ${(originalSize / 1024).toFixed(1)} KB → ${(minifiedSize / 1024).toFixed(1)} KB (saved ${(savings / 1024).toFixed(1)} KB, ${savingsPercent}%)`);
  } else {
    console.log(`⏭️  ${file} (already optimized)`);
  }

  totalOriginalSize += originalSize;
  totalMinifiedSize += minifiedSize;
});

const totalSavings = totalOriginalSize - totalMinifiedSize;
const totalSavingsPercent = ((totalSavings / totalOriginalSize) * 100).toFixed(1);

console.log(`\n📊 Summary:`);
console.log(`   Original: ${(totalOriginalSize / 1024).toFixed(1)} KB`);
console.log(`   Minified: ${(totalMinifiedSize / 1024).toFixed(1)} KB`);
console.log(`   Saved: ${(totalSavings / 1024).toFixed(1)} KB (${totalSavingsPercent}%)`);
console.log(`\n✨ Done!`);
