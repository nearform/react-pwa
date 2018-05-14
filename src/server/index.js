import fastify from 'fastify'
import { existsSync, readFileSync } from 'fs'
import { resolve } from 'path'
import { routes } from '../client/routes'
import { fetchComments, fetchStories } from './api'
import { renderPage } from './page.html'

const nodeFetch = require('node-fetch')

function detectHttps() {
  const certPath = resolve(process.cwd(), 'ssl/certificate.pem')
  const keyPath = resolve(process.cwd(), 'ssl/private-key.pem')
  if (!existsSync(certPath) || !existsSync(keyPath)) return {}

  return { https: { key: readFileSync(keyPath), cert: readFileSync(certPath) }, http2: true }
}

function setupFetch(server) {
  global.fetch = async function(url, params) {
    // External call, just use node-fetch
    if (!url.startsWith('/api')) return nodeFetch(url, params)

    // Local fetching, serve with fastify.inject
    const response = await server.inject({ method: 'GET', url, ...params })

    response.status = response.statusCode
    response.statusText = response.statusMessage
    return new nodeFetch.Response(response.payload, response)
  }
}

function main() {
  console.log(process.cwd(), resolve(process.cwd(), './dist'))

  // Create the instance
  const server = fastify({ logger: { prettyPrint: true }, ...detectHttps() })

  // Add routes
  for (const [path, component] of Object.entries(routes)) {
    for (const suffix of ['', '/page/:page']) {
      server.route({
        method: 'GET',
        url: `${path}${suffix}` || '/',
        handler: renderPage,
        config: {
          component
        }
      })
    }
  }

  server.get('/api/stories', fetchStories)
  server.get('/api/comments', fetchComments)

  // Add application assets and manifest.json serving
  server.register(require('fastify-static'), { root: resolve(process.cwd(), 'dist'), prefix: '/' })
  server.register(require('fastify-compress'))
  server.decorateRequest('apiCache', require('memory-cache'))

  // Add server side support for fetch
  setupFetch(server)

  // Run the server!
  server.listen(3000, '0.0.0.0', function(err) {
    if (err) throw err
  })
}

main()
