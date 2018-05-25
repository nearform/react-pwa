const { exec } = require('child_process')
const { writeFile } = require('fs')
const lighthouse = require('lighthouse')
const { resolve } = require('path')
const puppeteer = require('puppeteer')
const { parse: parseUrl } = require('url')
const { promisify } = require('util')
const createBadge = require('gh-badges')

const waitOn = promisify(require('wait-on'))
const writeFileAsync = promisify(writeFile)

function unhandledRejectionHandler(error) {
  console.error(error)
  process.exit(1)
}

function badgeColor(score) {
  if (score > 90) return 'green'
  else if (score > 80) return 'yellow'
  else if (score > 50) return 'orange'

  return 'red'
}

async function badge(spec) {
  return new Promise((resolve, reject) => {
    createBadge(spec, (svg, err) => {
      if (err) return reject(err)

      resolve(svg)
    })
  })
}

async function createBadgeSvg(category, index) {
  const score = Math.ceil(category.score * 100)

  const svg = await badge({
    text: [`Ligthouse ${category.title} Score`, `${score}/100 `],
    colorscheme: badgeColor(score),
    template: 'flat'
  })

  await writeFileAsync(resolve(process.cwd(), `coverage/badges/lighthouse-${category.id}.svg`), svg, 'utf8')

  return { index, item: `${category.title}: ${score}` }
}

async function main() {
  const url = process.argv[2] || 'http://localhost:3000'
  const parsedUrl = parseUrl(url)

  // Launch the server and wait for the port to be available
  let server = null
  if (!process.argv[2]) {
    // No external host, start the server
    server = exec('npm run start')
    await waitOn({ resources: [`tcp:${parsedUrl.port}`] })
  }

  // Launch chrome
  const browser = await puppeteer.launch({ headless: process.env.VIEW !== 'true', args: ['--no-sandbox', '--show-paint-rects'] })

  // Execute lighthouse
  const results = (await lighthouse(url, { port: parseUrl(browser.wsEndpoint()).port, output: 'json' })).lhr
  delete results.report
  delete results.artifacts

  // Kill everything
  await browser.close()
  if (server) server.kill('SIGTERM')

  // Gather results and build badges
  let outputItems = await Promise.all(Object.values(results.categories).map(createBadgeSvg))
  outputItems = outputItems.sort((a, b) => a.index - b.index).map(i => i.item)

  console.log(`======= Lighthouse Score =======\n${outputItems.join('\n')}\n================================`)

  await writeFileAsync(resolve(process.cwd(), 'coverage/lighthouse.json'), JSON.stringify(results, null, 2), 'utf8')

  process.exit(0) // This is needed on the CI
}

process.on('unhandledRejection', unhandledRejectionHandler)
main().catch(unhandledRejectionHandler)
