import { spawn } from 'child_process'
import fs from 'fs'
import playwright from 'playwright'
import sharp from 'sharp'

import { getAllPostSlugs } from './fileUtils'
import { languages } from './i18n'

async function capture(url: string, file: string) {
  try {
    const browser = await playwright.chromium.launch({
      headless: true,
    })
    const page = await browser.newPage({
      viewport: {
        width: 1200,
        height: 630,
      },
    })
    await page.goto(url, {
      timeout: 15 * 1000,
    })
    const data = await page.screenshot({
      omitBackground: true,
      type: 'png',
    })
    sharp(data).toFile(file)
    await browser.close()
  } catch (e) {
    console.log(e)
  }
}
async function loopAll() {
  const post = getAllPostSlugs()
  for (const l of languages) {
    for (const p of post) {
      const slug = p.join('/')
      const dir = process.cwd() + `/out/images/og/${slug}`
      fs.mkdirSync(dir, { recursive: true })
      const filename = `${dir}/${l}.png`

      console.log(`🖼️ Creating ${filename} from http://localhost:3000/og/${l}/${slug}`)
      await capture(`http://localhost:3000/og/${l}/${slug}`, filename)
    }
  }
}

try {
  const child = spawn('pnpm', ['dev'])

  child.stdout.on('data', (data) => {
    const txt: string = data.toString()
    if (txt.includes('started server')) {
      loopAll()
        .then(() => {
          child.kill()
        })
        .catch((e) => {
          // Add error handling for loopAll()
          console.error('Error executing loopAll:', e)
          child.kill()
        })
    }
  })

  child.stderr.on('data', (data) => {
    console.error(`🚨 stderr: ${data}`)
  })

  child.on('error', (error) => {
    console.error(`🚨 error: ${error.message}`)
  })

  // Handling close event
  child.on('close', (code) => {
    console.log(`🚀 Child process exited with code ${code}`)
  })
} catch (e) {
  console.log(e)
}
