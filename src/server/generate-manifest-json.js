const { writeFileSync } = require('fs')
const { resolve } = require('path')
const { colors } = require('../../dist/server/js/styles/common')

const manifestTemplate = `
  {
    "version": "1.1",
    "name": "nearForm Hacker News",
    "short_name": "nearForm HN",
    "icons": [
      {
        "src": "/images/favicon-1024.png",
        "sizes": "1024x1024",
        "type": "image/png"
      }
    ],
    "start_url": "/",
    "display": "standalone",
    "orientation": "portrait",
    "background_color": "${colors.NEARFORM_BRAND_MAIN}",
    "theme_color": "${colors.NEARFORM_BRAND_MAIN}"
  }
`

module.exports = function generateManifestJson() {
  writeFileSync(resolve(process.cwd(), 'dist/client/manifest.json'), manifestTemplate, 'utf8')
}
