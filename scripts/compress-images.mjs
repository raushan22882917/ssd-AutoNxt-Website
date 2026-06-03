
import sharp from "sharp"
import { readdirSync, existsSync, statSync } from "fs"
import { join, extname, basename } from "path"
import { fileURLToPath } from "node:url"

// Resolve public/images relative to this script (handles spaces in path)
const ROOT = fileURLToPath(new URL("../public/images", import.meta.url))

sharp.cache(false)
const MAX_PIXELS = 1_200_000_000

const DIRS = [
  { dir: join(ROOT, "team"),     maxWidth: 600  },
  { dir: join(ROOT, "facility"), maxWidth: 1200 },
  { dir: join(ROOT, "events"),   maxWidth: 900  },
  { dir: join(ROOT, "partners"), maxWidth: 600  },
  { dir: join(ROOT, "products"), maxWidth: 800  },
  { dir: join(ROOT, "industry"), maxWidth: 800  },
]

let totalOriginalBytes = 0
let totalSavedBytes    = 0

for (const { dir, maxWidth } of DIRS) {
  if (!existsSync(dir)) continue

  for (const file of readdirSync(dir)) {
    const ext = extname(file).toLowerCase()
    if (![".jpg", ".jpeg", ".png"].includes(ext)) continue

    const inputPath  = join(dir, file)
    const outputName = basename(file, ext) + ".webp"
    const outputPath = join(dir, outputName)

    // Idempotent — skip if the WebP already exists
    if (existsSync(outputPath)) {
      console.log(`  ⏭  Already exists, skipping: ${outputName}`)
      continue
    }

    try {
      const info = await sharp(inputPath, { limitInputPixels: MAX_PIXELS })
        .resize({ width: maxWidth, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outputPath)

      const origSize  = statSync(inputPath).size
      const reduction = Math.round((1 - info.size / origSize) * 100)
      console.log(
        `  ✓  ${file.padEnd(32)} ${Math.round(origSize / 1024)}KB → ${Math.round(info.size / 1024)}KB  (-${reduction}%)`
      )
      totalOriginalBytes += origSize
      totalSavedBytes    += origSize - info.size
    } catch (err) {
      console.error(`  ✗  ${file}: ${err.message}`)
    }
  }
}

if (totalOriginalBytes > 0) {
  const pct = Math.round((totalSavedBytes / totalOriginalBytes) * 100)
  console.log(
    `\n  Done — saved ${Math.round(totalSavedBytes / 1024)} KB ` +
    `out of ${Math.round(totalOriginalBytes / 1024)} KB total (${pct}% reduction)`
  )
} else {
  console.log("\n  All WebP files already up to date — nothing to do.")
}
