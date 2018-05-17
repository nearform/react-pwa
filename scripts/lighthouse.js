const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')
const serverFactory = require('../src/server')

function unhandledRejectionHandler(error) {
  console.error(error)
  process.exit(1)
}

async function main() {
  const opts = {
    chromeFlags: ['--show-paint-rects', '--headless', '--disable-gpu', '--no-sandbox']
  }

  // Launch the server
  const server = await serverFactory()

  // Launch chrome
  const chrome = await chromeLauncher.launch({ chromeFlags: opts.chromeFlags })
  opts.port = chrome.port

  // Execute lighthouse
  const results = await lighthouse('http://localhost:3000/', opts)
  delete results.artifacts

  // Kill everything
  await chrome.kill()
  await server.close()
  console.log(results)
}

process.on('unhandledRejection', unhandledRejectionHandler)
main().catch(unhandledRejectionHandler)
