import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const WORKS_DIR = path.resolve('public/works');
const MAX_WIDTH = 2000;
const QUALITY = 82;

let totalSaved = 0;
let totalOriginal = 0;
let count = 0;

async function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await processDir(fullPath);
    } else if (/\.(png|jpe?g)$/i.test(entry.name)) {
      await optimizeImage(fullPath);
    }
  }
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath);
  const baseName = path.basename(filePath, ext);
  const dir = path.dirname(filePath);
  const origSize = fs.statSync(filePath).size;
  totalOriginal += origSize;

  // Generate optimized WebP at full size (max 2000px)
  const fullPath = path.join(dir, `${baseName}.webp`);
  try {
    await sharp(filePath)
      .resize(MAX_WIDTH, undefined, { withoutEnlargement: true, fit: 'inside' })
      .webp({ quality: QUALITY })
      .toFile(fullPath);
    const newSize = fs.statSync(fullPath).size;
    totalSaved += origSize - newSize;
    count++;
    process.stdout.write(`\r  ${count} images optimized...`);
  } catch (err) {
    console.error(`\n  Error processing ${filePath}: ${err.message}`);
  }
}

console.log('Optimizing images in public/works/...\n');
await processDir(WORKS_DIR);

const savedMB = (totalSaved / 1024 / 1024).toFixed(1);
const origMB = (totalOriginal / 1024 / 1024).toFixed(1);
const pct = ((totalSaved / totalOriginal) * 100).toFixed(1);

console.log(`\n\nDone! ${count} images converted to WebP.`);
console.log(`  Before: ${origMB} MB → After: ~${((totalOriginal - totalSaved) / 1024 / 1024).toFixed(1)} MB`);
console.log(`  Saved: ${savedMB} MB (${pct}%)`);
