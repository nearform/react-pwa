const Parser = require('rss-parser')
const sanitizeHtml = require('sanitize-html')

module.exports = async function(fastify, opts) {
  const pageSize = 30

  function computeCacheKey(type, ...args) {
    return `${type}:${args.join('|')}`
  }

  async function fetchStories(request, reply) {
    // Get parameters
    const { filter, page } = request.query || {}
    const cacheKey = computeCacheKey('stories', filter, page)

    // Check cache first
    const cached = request.apiCache.get(cacheKey)
    if (cached) return cached

    // Calculate page offset
    const offset = (Math.max(parseInt(page, 0) || 0, 1) - 1) * pageSize

    // Choose the query type
    let queryType = 'topStories'

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
    }

    // Build the query
    const body = {
      query: `
      query apiQuery($limit: Int, $offset: Int) {
        hn {
          ${queryType}(limit: $limit, offset: $offset) {
            id
            title
            url
            score
            by {
              id
            }
          }
        }
      }
      `,
      variables: {
        limit: pageSize,
        offset
      }
    }

    // Perform the request
    const response = await fetch('https://www.graphqlhub.com/graphql/', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body)
    })

    // Parse the response
    const json = await response.json()
    const data = json.data.hn[queryType]

    // Cache for 5 minutes
    request.apiCache.put(cacheKey, data, 300 * 1000)

    // Return results
    return data
  }

  async function fetchComments(request, reply) {
    // Get parameters
    const { page } = request.query || {}
    const cacheKey = computeCacheKey('comments', page)

    // Check cache first
    const cached = request.apiCache.get(cacheKey)
    if (cached) return cached

    // Get parameters
    const offset = (Math.max(parseInt(page, 0) || 0, 1) - 1) * pageSize

    // Fetch the comments
    const parser = new Parser()
    const response = await parser.parseURL('https://hnrss.org/newcomments?count=100')
    const items = response.items.filter(item => item.title).slice(offset, offset + pageSize)

    // Sanitize comments content
    const data = items.map(({ content, ...rest }) => ({ content: sanitizeHtml(content), ...rest }))

    // Cache for 5 minutes
    request.apiCache.put(cacheKey, data, 300 * 1000)

    return data
  }

  fastify.get('/api/stories', fetchStories)
  fastify.get('/api/comments', fetchComments)
}
