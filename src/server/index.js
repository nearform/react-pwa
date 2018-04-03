const path = require('path')
const express = require('express')
const appShellHandler = require('./app-shell-handler')
const appManifest = require('../app/manifest.json')
const axios = require('axios')

const app = express()

app.use((req, res, next) => {
  console.log(`req.url: ${req.url}`)
  next()
})
app.use(express.static(path.join(__dirname, '../../build/public'), {
  maxAge: '1d'
}))
// host sw.js
app.use(express.static(path.join(__dirname, '../../build/public/js')))

// TODO reuse routes.js paths? depends on the server framework being used
app.get('/', appShellHandler)
app.get('/newest', appShellHandler)
app.get('/newcomments', appShellHandler)
app.get('/show', appShellHandler)
app.get('/ask', appShellHandler)
app.get('/jobs', appShellHandler)
app.get('/app-shell', appShellHandler)
app.get('/manifest.json', (request, response) => response.json(appManifest))
app.get('/api/stories', (request, response) => {

  const { sort = 'rank', filter } = request.query || {}
  const API_URL = 'https://www.graphqlhub.com/graphql/'
  let queryType, offset = 0

  switch(filter) {
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

  let query = `
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

  let payload = {
    query
  }

  axios.post(API_URL, payload).then((result) => {
    response.send(result.data.data.hn[queryType])
  })

})

function init () {
  let server
  return Promise.resolve(app)
    .then(app => {
      server = app.listen(3000, (err) => {
        if (err) throw err
      })
    })
    .then(() => ({ app, server }))
}

module.exports = {
  init
}
