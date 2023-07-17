import { spawn } from 'child_process'
import fs from 'fs'
import playwright from 'playwright'
import sharp from 'sharp'

import { getAllPostSlugs } from './fileUtils'
import { languages } from './i18n'

type nav = {
  page: playwright.Page
  browser: playwright.Browser
}

async function init(): Promise<nav> {
  const browser = await playwright.chromium.launch({
    headless: true,
  })
  const page = await browser.newPage({
    viewport: {
      width: 1200,
      height: 630,
    },
  })
  return { page, browser }
}

async function capture(url: string, file: string, n: nav) {
  await n.page.goto(url, {
    timeout: 30 * 1000,
  })
  const data = await n.page.screenshot({
    omitBackground: true,
    type: 'png',
  })
  sharp(data).toFile(file)
}

async function loopAll() {
  const post = getAllPostSlugs()
  const pl = await init()
  for (const l of languages) {
    for (const p of post) {
      const slug = p.join('/')
      const dir = process.cwd() + `/out/images/og/${slug}`
      fs.mkdirSync(dir, { recursive: true })
      const filename = `${dir}/${l}.png`

      console.log(`🖼️ Creating ${filename} from http://localhost:3000/og/${l}/${slug}`)
      await capture(`http://localhost:3000/og/${l}/${slug}`, filename, pl)
    }
  }

  pl.browser.close()
}

// Run server and loop screen captures
try {
  const child = spawn('pnpm', ['dev'])

  child.stdout.on('data', (data) => {
    const txt: string = data.toString()
    if (txt.includes('started server')) {
      loopAll()
        .then(() => {
          console.log('⚠️ Trying to kill child')
          child.kill(9)
          console.log('👌 Child killed')
        })
        .catch((e) => {
          // Add error handling for loopAll()
          console.error('🚨 Error executing loopAll:', e)
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
  child.on('close', (code, signal) => {
    console.log(`🚀 Child process exited with code ${code}, ${signal}`)
  })
} catch (e) {
  console.log(e)
}

setTimeout(() => process.exit(), 1000 * 60)
