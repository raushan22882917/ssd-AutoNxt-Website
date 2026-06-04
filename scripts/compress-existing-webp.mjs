import sharp from "sharp"
import { readFileSync, writeFileSync } from "fs"
import { join } from "path"
import { fileURLToPath } from "node:url"

const ROOT = fileURLToPath(new URL("../public/images", import.meta.url))

async function optimizeImage(relPath, width, quality = 80) {
  const file = join(ROOT, relPath)
  try {
    const buffer = readFileSync(file)
    const info = await sharp(buffer)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toBuffer()
    writeFileSync(file, info)
    console.log(`Optimized ${relPath}: width ${width}, quality ${quality}, size \${Math.round(info.length / 1024)}KB`)
  } catch (err) {
    console.error(`Failed to optimize \${relPath}:`, err)
  }
}

async function run() {
  // Placeholder & logo
  await optimizeImage("3dtractorplaceholder.webp", 880, 80)
  await optimizeImage("partners/jsl-sm.webp", 110, 80)

  // Facility images
  await optimizeImage("facility/right-wall.webp", 380, 75)
  await optimizeImage("facility/left-wall.webp", 950, 75)

  // Events images
  await optimizeImage("events/event-1.webp", 600, 75)
  await optimizeImage("events/event-2.webp", 600, 75)
  await optimizeImage("events/event-5.webp", 600, 75)
  await optimizeImage("events/event-7.webp", 600, 75)
}

run()
