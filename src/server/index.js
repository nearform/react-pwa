const path = require('path')
const express = require('express')
const appShellHandler = require('./app-shell-handler')
const appManifest = require('../app/manifest.json')

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

  let section

  switch(filter) {
    case 'show':
      section = 'showstories'
      break
    case 'ask':
      section = 'askstories'
      break
    case 'jobs': 
      section = 'jobstories'
      break
    case 'rank': 
      section = 'newstories'
      break
    case 'new': 
      section = 'newstories'
      break
    case 'best':
    default:
      section = 'topstories'
  }

  console.log('Filter is: ', filter)


  // let url = `${API_URL}${section}.json`

  // // Hit the API
  // console.log('Hitting API: ', url);
  // axios.get(url).then((result) => {
  //   console.log('Got result: ', result.data);
  //   response.send(result.data)
  // })

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
