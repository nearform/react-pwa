const server = require('../lib/server')

const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')

const fs = require('fs')
const path = require('path')
function launchChromeAndRunLighthouse (url, opts, config = null) {
  return chromeLauncher.launch(opts).then(chrome => {
    opts.port = chrome.port
    return lighthouse(url, opts, config).then(results => {
      // The gathered artifacts are typically removed as they can be quite large (~50MB+)
      delete results.artifacts
      return chrome.kill().then(() => results)
    })
  })
}

const opts = {
  chromeFlags: ['--show-paint-rects', '--headless', '--disable-gpu', '--no-sandbox'],
  chromePath: process.env.LIGHTHOUSE_CHROMIUM_PATH,
  logLevel: 'verbose',
  port: 9222
}

server.init()
  .then(({ app, server }) => {
    console.log('\n\n server started on port 3000')
    launchChromeAndRunLighthouse('http://127.0.0.1:3000/', opts).then(results => {
      console.log('\n\n')
      console.log('=======================')
      console.log('Lighthouse Score:', results.score.toFixed(1))
      console.log('=======================')
      results.reportCategories.forEach((category) => {
        console.log(`${category.name}:`, category.score.toFixed(1))
        console.log('----------------------')
      })
      // console.log(results)
      fs.writeFileSync(path.join(__dirname, '../.reports/lighthouse.json'), JSON.stringify(results))
      server.close()
      process.exit()
    })
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
