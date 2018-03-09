const path = require('path')
const express = require('express')
const appShellHandler = require('./app-shell-handler')

const app = express()

// temporary fixture data
const newStories = require('../../fixtures/new-stories')
const topStories = require('../../fixtures/top-stories')
const showStories = require('../../fixtures/show-stories')
const askStories = require('../../fixtures/ask-stories')
const jobStories = require('../../fixtures/job-stories')

app.use((req, res, next) => {
  console.log(`req.url: ${req.url}`)
  next()
})
app.use(express.static(path.join(__dirname, '../../build')))

// TODO reuse routes.js paths? depends on the server framework being used
app.get('/', appShellHandler)
app.get('/newest', appShellHandler)
app.get('/newcomments', appShellHandler)
app.get('/show', appShellHandler)
app.get('/ask', appShellHandler)
app.get('/jobs', appShellHandler)
app.get('/app-shell', appShellHandler)
app.get('/api/stories', (request, response) => {
  const { sort = 'rank', filter } = request.query || {}

  if (filter === 'show') {
    return response.json(showStories)
  }

  if (filter === 'ask') {
    return response.json(askStories)
  }

  if (filter === 'jobs') {
    return response.json(jobStories)
  }

  if (sort === 'rank') {
    return response.json(newStories)
  }

  if (sort === 'newest') {
    return response.json(topStories)
  }
})

app.get('/api/topstories')
app.get('/api/newstories')

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
