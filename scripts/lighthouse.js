const { exec } = require('child_process')
const lighthouse = require('lighthouse')
const puppeteer = require('puppeteer')
const { parse: parseUrl } = require('url')
const { promisify } = require('util')
const waitOn = promisify(require('wait-on'))

function unhandledRejectionHandler(error) {
  console.error(error)
  process.exit(1)
}

async function main() {
  const url = process.argv[2] || 'http://localhost:3000'
  const parsedUrl = parseUrl(url)

  // Launch the server and wait for the port to be available
  const server = exec('npm run start')
  await waitOn({ resources: [`tcp:${parsedUrl.port}`] })

  // Launch chrome
  const browser = await puppeteer.launch({ headless: process.env.VIEW !== 'true', args: ['--no-sandbox', '--show-paint-rects'] })

  // Execute lighthouse
  const results = await lighthouse(url, { port: parseUrl(browser.wsEndpoint()).port, output: 'json' })
  delete results.report
  delete results.artifacts

  // Kill everything
  await browser.close()
  server.kill('SIGTERM')

  // Show results
  console.log(JSON.stringify(results, null, 2))
}

process.on('unhandledRejection', unhandledRejectionHandler)
main().catch(unhandledRejectionHandler)
