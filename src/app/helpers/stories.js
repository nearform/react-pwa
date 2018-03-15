const qs = require('qs')
const axios = require('axios')

const isBrowser = typeof window !== 'undefined'
const HOST = isBrowser
  ? ''
  : process.env.NOW_URL || 'http://localhost:3000'

function fetchStories ({ sort, filter } = {}) {
  const params = qs.stringify({
    sort,
    filter
  })
  return axios.get(`${HOST}/api/stories?${params}`)
}

module.exports = {
  fetchStories
}
