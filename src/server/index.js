const path = require('path')
const express = require('express')
const appShellHandler = require('./app-shell-handler')
const appManifest = require('../app/manifest.json')
const fetch = require('cross-fetch')
const Parser = require('rss-parser')
const sanitizeHtml = require('sanitize-html')

const app = express()

app.use((req, res, next) => {
  console.log(`req.url: ${req.url}`)
  next()
})
app.use(
  express.static(path.join(__dirname, '../../build/public'), { maxAge: '1d' })
)
// host sw.js
app.use(express.static(path.join(__dirname, '../../build/public/js')))

// TODO reuse routes.js paths? depends on the server framework being used
app.get('/', appShellHandler)
app.get('/page/:pageNumber?', appShellHandler)
app.get('/newest/:page?/:pageNumber?', appShellHandler)
app.get('/newcomments/:page?/:pageNumber?', appShellHandler)
app.get('/show/:page?/:pageNumber?', appShellHandler)
app.get('/ask/:page?/:pageNumber?', appShellHandler)
app.get('/jobs/:page?/:pageNumber?', appShellHandler)
app.get('/app-shell', appShellHandler)
app.get('/manifest.json', (request, response) => response.json(appManifest))
app.get('/api/stories', (request, response) => {
  const { filter, page } = request.query || {}

  if (filter === 'comments') {
    return RSSResponse(page, response)
  }

  return graphQLResponse(filter, page, response)
})

function sanitizeItemContent (items) {
  return items.map(({ content, ...rest }) => {
    let cleanContent = sanitizeHtml(content)
    return { content: cleanContent, ...rest }
  })
}

function RSSResponse (page, response) {
  const RSS_URL = 'https://hnrss.org/newcomments?count=100'
  const parser = new Parser()
  parser.parseURL(RSS_URL).then(feed => {
    let startingItem = page ? (page - 1) * 30 : 0
    const items = feed.items
      .filter(item => item.title)
      .slice(startingItem, startingItem + 30)
    response.send(sanitizeItemContent(items))
  })
}

async function graphQLResponse (filter, page, response) {
  const API_URL = 'https://www.graphqlhub.com/graphql/'
  const offset = page > 1 ? (page - 1) * 30 : 0
  let queryType

  switch (filter) {
    case 'show':
      queryType = 'showStories'
      break
    case 'ask':
      queryType = 'askStories'
      break
    case 'jobs':
      queryType = 'jobStories'
      break
    case 'rank':
      queryType = 'newStories'
      break
    case 'new':
      queryType = 'newStories'
      break
    case 'best':
    default:
      queryType = 'topStories'
  }

  const query = `
    query {
      hn {
        ${queryType}(limit: 30, offset: ${offset}) {
          by {
            id
          }
          dead
          deleted
          id
          kids {
            id
          }
          score
          text
          title
          type
          url
        }
      }
    }`

  const payload = JSON.stringify({ query })

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: payload
    })
    const result = await res.json()

    response.send(result.data.hn[queryType])
  } catch (error) {
    error.statusCode = error.statusCode || 500

    response.status(error.statusCode)

    // return json error
    return response.json({
      name: error.name,
      message: error.message,
      stack: error.stack,
      statusCode: error.statusCode
    })
  }
}

function init () {
  let server
  return Promise
    .resolve(app)
    .then(app => {
      server = app.listen(3000, err => {
        if (err) throw err
      })
    })
    .then(() => ({ app, server }))
}

module.exports = { init }
