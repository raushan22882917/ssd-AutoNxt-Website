/**
 * convert-to-webp.mjs
 * Converts ALL large PNG/JPG images in /public to WebP using sharp.
 * - Skips files already converted (idempotent)
 * - Skips files under 50 KB (not worth converting)
 * - Keeps originals in place (safe to run multiple times)
 * - Prints a summary of bytes saved
 */

import { readdirSync, existsSync, statSync, mkdirSync } from "fs"
import { join, extname, basename, dirname } from "path"
import { fileURLToPath } from "node:url"

if (process.env.VERCEL === "1" || process.env.NETLIFY === "1" || process.env.CI === "true") {
  console.log("CI/CD environment detected. Skipping image conversion. WebP assets should be committed directly to Git.");
  process.exit(0);
}

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch (err) {
  console.warn("⚠️ Warning: 'sharp' dependency is not installed or could not be loaded.");
  console.warn("   Skipping WebP image conversion. Ensure WebPs are generated locally.");
  process.exit(0);
}

const __dir = fileURLToPath(new URL("..", import.meta.url))
const PUBLIC = join(__dir, "public")

sharp.cache(false)
sharp.concurrency(4)

const MAX_PIXELS = 1_200_000_000 // 1.2 GP — handles very large images
const MIN_SIZE_BYTES = 50 * 1024  // Skip files < 50 KB

// Directory → max pixel width for that context
const DIR_CONFIG = [
  // Root-level public images (big language feature images)
  { dir: PUBLIC,                                  maxWidth: 1600, skip: ["test.png", "screen.png", "opengraph.jpg"] },
  // Subdirectories
  { dir: join(PUBLIC, "images"),                  maxWidth: 1200 },
  { dir: join(PUBLIC, "images", "facility"),      maxWidth: 1400 },
  { dir: join(PUBLIC, "images", "industry"),      maxWidth: 1000 },
  { dir: join(PUBLIC, "images", "products"),      maxWidth: 900  },
  { dir: join(PUBLIC, "images", "implement"),     maxWidth: 900  },
  { dir: join(PUBLIC, "images", "gallery"),       maxWidth: 1200 },
  { dir: join(PUBLIC, "images", "gallery-1"),     maxWidth: 1200 },
  { dir: join(PUBLIC, "images", "partners"),      maxWidth: 400  },
  { dir: join(PUBLIC, "images", "team"),          maxWidth: 600  },
  { dir: join(PUBLIC, "images", "events"),        maxWidth: 1200 },
  { dir: join(PUBLIC, "images", "app"),           maxWidth: 900  },
  { dir: join(PUBLIC, "images", "blog"),          maxWidth: 1000 },
  { dir: join(PUBLIC, "images", "ev-blog"),       maxWidth: 1000 },
  { dir: join(PUBLIC, "News"),                    maxWidth: 900  },
  { dir: join(PUBLIC, "News", "News_daily"),      maxWidth: 900  },
]

// Also scan any directory not listed above recursively
const SCANNED_DIRS = new Set(DIR_CONFIG.map(d => d.dir))

function* walkDir(dir) {
  if (!existsSync(dir)) return
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) yield* walkDir(full)
    else yield full
  }
}

let totalOriginalBytes = 0
let totalSavedBytes = 0
let convertedCount = 0
let skippedCount = 0

async function convertFile(inputPath, maxWidth, skipList = []) {
  const ext = extname(inputPath).toLowerCase()
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return

  const file = basename(inputPath)
  if (skipList.includes(file)) return

  const origSize = statSync(inputPath).size
  if (origSize < MIN_SIZE_BYTES) return

  const outputPath = join(dirname(inputPath), basename(file, ext) + ".webp")

  if (existsSync(outputPath)) {
    skippedCount++
    return
  }

  try {
    const info = await sharp(inputPath, { limitInputPixels: MAX_PIXELS })
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality: 80, effort: 4 })
      .toFile(outputPath)

    const reduction = Math.round((1 - info.size / origSize) * 100)
    const savedKB = Math.round((origSize - info.size) / 1024)
    console.log(
      `  ✓  ${file.slice(0, 40).padEnd(40)}  ${Math.round(origSize / 1024).toString().padStart(5)}KB → ${Math.round(info.size / 1024).toString().padStart(4)}KB  (-${reduction}%)  saved ${savedKB}KB`
    )
    totalOriginalBytes += origSize
    totalSavedBytes += origSize - info.size
    convertedCount++
  } catch (err) {
    console.error(`  ✗  ${file}: ${err.message}`)
  }
}

console.log("🔄 Converting images to WebP...\n")

for (const { dir, maxWidth, skip = [] } of DIR_CONFIG) {
  if (!existsSync(dir)) continue

  // Only process direct children (not recursive — subdirs handled by their own config)
  let entries
  try { entries = readdirSync(dir, { withFileTypes: true }) } catch { continue }

  for (const entry of entries) {
    if (entry.isDirectory()) continue
    await convertFile(join(dir, entry.name), maxWidth, skip)
  }
}

// Catch-all: scan any image files in unregistered directories
for (const filePath of walkDir(PUBLIC)) {
  const dir = dirname(filePath)
  if (SCANNED_DIRS.has(dir)) continue
  const ext = extname(filePath).toLowerCase()
  if (![".jpg", ".jpeg", ".png"].includes(ext)) continue
  await convertFile(filePath, 1200)
}

console.log(`\n${"─".repeat(70)}`)
if (convertedCount > 0) {
  const pct = Math.round((totalSavedBytes / totalOriginalBytes) * 100)
  console.log(`  ✅ Converted ${convertedCount} files`)
  console.log(`  💾 Saved ${Math.round(totalSavedBytes / 1024 / 1024 * 10) / 10} MB out of ${Math.round(totalOriginalBytes / 1024 / 1024 * 10) / 10} MB (${pct}% reduction)`)
} else {
  console.log(`  ✅ All WebP files already up to date (${skippedCount} skipped)`)
}
