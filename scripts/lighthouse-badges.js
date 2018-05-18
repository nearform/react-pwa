const badge = require('gh-badges')

const fs = require('fs')
const path = require('path')

const thresholds = [
  ['green', 99],
  ['yellow', 95],
  ['orange', 85],
  ['red', 0]
]

function badgeColor (score) {
  return thresholds.find(e => e[1] <= score)[0]
}

function makeBadge (score, category) {
  // Optional step, to have accurate text width computation.
  const format = {
    text: [`lighthouse${category ? ' ' + category : ''}`, String(score.toFixed(1))],
    colorscheme: badgeColor(score),
    template: 'flat'
  }

  badge(format, (svg, err) => {
    if (err) {
      console.error(`While creating badge ${category}|${score}:`, err)
      process.exit(1)
    }
    // svg is a string containing your badge
    const file = path.join(__dirname, '../.reports/', `lighthouse${category ? '-' + category.toLowerCase().replace(/\s/g, '-') : ''}.svg`)
    fs.writeFileSync(file, svg)
    console.log('File', file, 'created')
  })
}

const results = JSON.parse(fs.readFileSync(path.join(__dirname, '../.reports/lighthouse.json')))
makeBadge(results.score)
results.reportCategories.forEach(c => makeBadge(c.score, c.name))
