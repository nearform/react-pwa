const path = require('path')
const express = require('express')
const appShellHandler = require('./app-shell-handler')
const appManifest = require('../app/manifest.json')
const axios = require('axios')
const Parser = require('rss-parser')

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

function RSSResponse (page, response) {
  const RSS_URL = 'https://hnrss.org/newcomments?count=100'
  const parser = new Parser()
  parser.parseURL(RSS_URL)
    .then(feed => {
      let startingItem = page ? (page - 1) * 30 : 0
      let currentItems = feed.items.slice(startingItem, startingItem + 30)
      response.send(currentItems)
    })
}

/*
{ items:
   [ { creator: 'jernfrost',
       title: 'New comment by jernfrost in "Apple Plans to Use Its Own Chips in Macs from 2020, Replacing Intel"',
       link: 'https://news.ycombinator.com/item?id=16762930',
       pubDate: 'Thu, 05 Apr 2018 08:24:03 +0000',
       'dc:creator': 'jernfrost',
       content: 'Drag and drop almost anything into the CLI produce a sensible result. Open command works as if you double clicked the item in Finder, which means it can be used to open directories, launch a program associated with that file etc.<p>In addition because mac use commad+C, command+V for copy paste rather than ctrl+C and ctrl+V as Linux and Windows, you feel no different working from a CLI than from any other app. You don\'t have to mentally jump in and out of two different ways of working.<p>This extends all the way into GUI apps. Typical CLI commands keys work in all mac GUI apps. I can use readline keys such as ctrl+a, ctrl+e for moving the cursor e.g. Works even in office apps like Keynote and Pages.<p>It is very frustrating to not be able to use these Unix conventions on Linux!!<p>There are lots of little things like this which makes a superior experience IMHO.',
       contentSnippet: 'Drag and drop almost anything into the CLI produce a sensible result. Open command works as if you double clicked the item in Finder, which means it can be used to open directories, launch a program associated with that file etc.In addition because mac use commad+C, command+V for copy paste rather than ctrl+C and ctrl+V as Linux and Windows, you feel no different working from a CLI than from any other app. You don\'t have to mentally jump in and out of two different ways of working.This extends all the way into GUI apps. Typical CLI commands keys work in all mac GUI apps. I can use readline keys such as ctrl+a, ctrl+e for moving the cursor e.g. Works even in office apps like Keynote and Pages.It is very frustrating to not be able to use these Unix conventions on Linux!!There are lots of little things like this which makes a superior experience IMHO.',
       guid: 'https://news.ycombinator.com/item?id=16762930',
       isoDate: '2018-04-05T08:24:03.000Z' },
     { creator: 'calcifer',
       title: 'New comment by calcifer in "Google Workers Urge C.E.O. To Pull Out of Pentagon A.I. Project"',
       link: 'https://news.ycombinator.com/item?id=16762929',
       pubDate: 'Thu, 05 Apr 2018 08:24:01 +0000',
       'dc:creator': 'calcifer',
       content: 'How is that a strawman? You said "it\'s a matter of survival" to "defend yourself" and I\'m saying that\'s not really a valid argument for the country in the article.',
       contentSnippet: 'How is that a strawman? You said "it\'s a matter of survival" to "defend yourself" and I\'m saying that\'s not really a valid argument for the country in the article.',
       guid: 'https://news.ycombinator.com/item?id=16762929',
       isoDate: '2018-04-05T08:24:01.000Z' },
     { creator: 'jamesmcintyre',
       title: 'New comment by jamesmcintyre in "Ask HN: Successful tech startup but find every day emotionally challenging"',
       link: 'https://news.ycombinator.com/item?id=16762928',
       pubDate: 'Thu, 05 Apr 2018 08:23:52 +0000',
       'dc:creator': 'jamesmcintyre',
       content: 'I think a leader displaying calmness, confidence and even a sort of levity towards imposing problems or struggles is very valuable even if this may be a practiced behavior or a kind of "performance" (if only in the beginning). In other words, maybe what\'s most valuable at any given moment is not to have all the answers for everyone in every situation but to exude an attitude which suggests "this too shall pass" and "together we\'ll figure it out". Over the long-haul it is likely more impactful to foster this environment and to calm those around you so that creative solutions have space to emerge instead of stirring anxiety and fear which may in turn be a hostile environment for collaboration and creativity.<p>I know this sounds a little idyllic or lofty and you may be thinking "yea except every day there\'s a problem that could actually kill our startup so I can\'t just act like everything\'s ok all the time" and this is where your role becomes uniquely challenging in that every day the sky may actually be falling, you aren\'t just imagining it- so how can you keep your cool?<p>I don\'t claim to know the answer but I have a feeling it involves striking a balance somewhere between being passionate, being personally invested and seeing the startup as a reflection of yourself and then on the other end centering yourself in a place of "detachment from the outcome", reminding yourself that you\'ll live and that "this is all just information".<p>I can\'t say I know fully how to strike that balance but this is the approach I shoot for. I think there\'s real power in detaching from the outcome of any given arbitrary situation- this gives space for creative solutions, rich contributions and better energy. This doesn\'t mean you don\'t care about the "success" of the startup, you can care deeply; it means you do not fear the land mines, the possible missteps because you know that these seemingly scary foes are actually bits of information, encoded information or even opportunities and that you and your team will be wise enough to see them as such and react appropriately where other\'s may let fear take hold and be blinded.<p>A book comes to mind, if you haven\'t already you should check it out: Antifragile by  Nassim Nicholas Taleb.<p>Hope this helps! Remember... you got this!',
       contentSnippet: 'I think a leader displaying calmness, confidence and even a sort of levity towards imposing problems or struggles is very valuable even if this may be a practiced behavior or a kind of "performance" (if only in the beginning). In other words, maybe what\'s most valuable at any given moment is not to have all the answers for everyone in every situation but to exude an attitude which suggests "this too shall pass" and "together we\'ll figure it out". Over the long-haul it is likely more impactful to foster this environment and to calm those around you so that creative solutions have space to emerge instead of stirring anxiety and fear which may in turn be a hostile environment for collaboration and creativity.I know this sounds a little idyllic or lofty and you may be thinking "yea except every day there\'s a problem that could actually kill our startup so I can\'t just act like everything\'s ok all the time" and this is where your role becomes uniquely challenging in that every day the sky may actually be falling, you aren\'t just imagining it- so how can you keep your cool?I don\'t claim to know the answer but I have a feeling it involves striking a balance somewhere between being passionate, being personally invested and seeing the startup as a reflection of yourself and then on the other end centering yourself in a place of "detachment from the outcome", reminding yourself that you\'ll live and that "this is all just information".I can\'t say I know fully how to strike that balance but this is the approach I shoot for. I think there\'s real power in detaching from the outcome of any given arbitrary situation- this gives space for creative solutions, rich contributions and better energy. This doesn\'t mean you don\'t care about the "success" of the startup, you can care deeply; it means you do not fear the land mines, the possible missteps because you know that these seemingly scary foes are actually bits of information, encoded information or even opportunities and that you and your team will be wise enough to see them as such and react appropriately where other\'s may let fear take hold and be blinded.A book comes to mind, if you haven\'t already you should check it out: Antifragile by  Nassim Nicholas Taleb.Hope this helps! Remember... you got this!',
       guid: 'https://news.ycombinator.com/item?id=16762928',
       isoDate: '2018-04-05T08:23:52.000Z' },
       */

function graphQLResponse (filter, page, response) {
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

  const payload = {
    query
  }

  axios.post(API_URL, payload).then((result) => {
    response.send(result.data.data.hn[queryType])
  })
}

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
