import sharp from "sharp"
import { readFileSync, writeFileSync } from "fs"
import { join } from "path"
import { fileURLToPath } from "node:url"

const ROOT = fileURLToPath(new URL("../public", import.meta.url))

async function optimizeImage(relPath, width, quality = 80) {
  const file = join(ROOT, relPath)
  try {
    const buffer = readFileSync(file)
    const info = await sharp(buffer)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toBuffer()
    writeFileSync(file, info)
    console.log(`Optimized ${relPath}: width ${width}, quality ${quality}, size ${Math.round(info.length / 1024)}KB`)
  } catch (err) {
    console.error(`Failed to optimize ${relPath}:`, err)
  }
}

async function run() {
  // Root level public images
  await optimizeImage("image-en.webp", 900, 75)
  await optimizeImage("image-hi.webp", 900, 75)
  await optimizeImage("image-mr.webp", 900, 75)
  await optimizeImage("image-te.webp", 900, 75)

  // Placeholder & logo
  await optimizeImage("images/3dtractorplaceholder.webp", 880, 80)
  await optimizeImage("images/partners/jsl-sm.webp", 55, 75)

  // Products
  await optimizeImage("images/products/x25h2.webp", 600, 75)
  await optimizeImage("images/products/x45h2.webp", 600, 75)

  // Facility images
  await optimizeImage("images/facility/right-wall.webp", 380, 75)
  await optimizeImage("images/facility/left-wall.webp", 950, 75)

  // Events images
  await optimizeImage("images/events/event-1.webp", 600, 75)
  await optimizeImage("images/events/event-2.webp", 600, 75)
  await optimizeImage("images/events/event-5.webp", 600, 75)
  await optimizeImage("images/events/event-7.webp", 600, 75)
}

run()
