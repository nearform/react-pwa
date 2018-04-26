require('@babel/polyfill')
const server = require('../lib/server')

const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')

function launchChromeAndRunLighthouse (url, opts, config = null) {
  return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {
    opts.port = chrome.port
    return lighthouse(url, opts, config).then(results => {
      // The gathered artifacts are typically removed as they can be quite large (~50MB+)
      delete results.artifacts
      return chrome.kill().then(() => results)
    })
  })
}

const opts = {
  chromeFlags: ['--show-paint-rects']
}

;(async () => {
  try {
    const { port } = await server.init()
    console.log(`\n\n Server started on port `, port)

    const results = await launchChromeAndRunLighthouse(`http://127.0.0.1:${port}/`, opts)
    console.log(results)
    server.close()
  } catch (err) {
    console.error('Server init or Lighthouse issue:', err)
    throw err
  }
})()
