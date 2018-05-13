const lighthouse = require('lighthouse')
const puppeteer = require('puppeteer')
const { parse } = require('url')
const url = 'http://localhost:3000/'

const audits = ['first-meaningful-paint', 'first-interactive', 'consistently-interactive']

const throttling = {
  edge: { download: 240000, upload: 240000, latency: 840 },
  normal2g: { download: 280000, upload: 256000, latency: 800 },
  slow3g: { download: 400000, upload: 768000, latency: 400 },
  fast3g: { download: 1600000, upload: 768000, latency: 170 },
  normal4g: { download: 9000000, upload: 9000000, latency: 150 },
  lte: { download: 12000000, upload: 12000000, latency: 70 }
}

async function run () {
  const output = {}

  for (const [name, spec] of Object.entries(throttling)) {
    const browser = await puppeteer.launch()

    if (spec) {
      browser.on('targetchanged', async target => {
        const page = await target.page()

        if (page && page.target().url() === url) {
          const client = await page.target().createCDPSession()

          await client.send('Network.emulateNetworkConditions', {
            offline: false,
            latency: spec.latency,
            downloadThroughput: spec.download,
            uploadThroughput: spec.upload
          })
        }
      })
    }

    const flags = {
      extends: 'lighthouse:default',
      settings: {
        throttlingMethod: 'provided',
        throttling: {
          rttMs: 2000
        },
        onlyAudits: audits,
        output: 'json'
      }
    }

    const results = await lighthouse('http://localhost:3000/', { port: parse(browser.wsEndpoint()).port }, flags)

    await browser.close()
    delete results.artifacts

    output[name] = audits.reduce((accu, key) => ({ ...accu, [key]: results.audits[key].rawValue }), {})
  }

  console.log(JSON.stringify(output, null, 2))
}

run().catch(console.error)
