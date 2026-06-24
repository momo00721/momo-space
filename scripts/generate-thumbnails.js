import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const WORKS_DIR = path.resolve('public/works');
const THUMB_WIDTH = 600;

async function generateThumbnail(inputPath, outputPath) {
  if (fs.existsSync(outputPath)) {
    const inputStat = fs.statSync(inputPath);
    const outputStat = fs.statSync(outputPath);
    if (outputStat.mtime > inputStat.mtime) return; // skip if thumbnail is newer
  }

  try {
    await sharp(inputPath)
      .resize(THUMB_WIDTH, undefined, { withoutEnlargement: true })
      .webp({ quality: 85, effort: 6 })
      .withMetadata()
      .toFile(outputPath);
    const origSize = (fs.statSync(inputPath).size / 1024).toFixed(0);
    const thumbSize = (fs.statSync(outputPath).size / 1024).toFixed(0);
    console.log(`  ${path.basename(inputPath)}: ${origSize}KB → ${thumbSize}KB`);
  } catch (err) {
    console.error(`  ERROR processing ${inputPath}: ${err.message}`);
  }
}

async function main() {
  console.log('Generating cover thumbnails...\n');

  const entries = fs.readdirSync(WORKS_DIR, { withFileTypes: true });
  let count = 0;

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name === 'banner' || entry.name === 'fonts') continue;

    const dir = path.join(WORKS_DIR, entry.name);
    const files = fs.readdirSync(dir);

    const coverFile = files.find((f) => f === '封面.webp' || f === 'cover.webp');
    if (!coverFile) {
      console.log(`  SKIP ${entry.name}: no cover image found`);
      continue;
    }

    const inputPath = path.join(dir, coverFile);
    const outputPath = path.join(dir, 'cover-thumb.webp');
    console.log(`${entry.name}:`);
    await generateThumbnail(inputPath, outputPath);
    count++;
  }

  console.log(`\nDone. ${count} thumbnails processed.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
