const qs = require('qs')
const fetch = require('cross-fetch')

const isBrowser = typeof window !== 'undefined'
const HOST = isBrowser
  ? ''
  : process.env.NOW_URL || 'http://localhost:3000'

async function fetchStories ({ sort, filter, page } = {}) {
  const params = qs.stringify({
    sort,
    filter,
    page
  })
  const res = await fetch(`${HOST}/api/stories?${params}`)
  const data = await res.json()
  if (data.message && data.stack && data.statusCode) {
    throw data
  }
  return {data}
}

module.exports = {
  fetchStories
}
