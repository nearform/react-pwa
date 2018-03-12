const qs = require('qs')
const axios = require('axios')

const HOST = process.NODE_ENV === 'production'
  ? ''
  : 'http://localhost:3000'

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
