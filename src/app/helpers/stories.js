import axios from 'axios'
import qs from 'qs'

const isBrowser = typeof window !== 'undefined'
const HOST = isBrowser
  ? ''
  : process.env.NOW_URL || 'http://localhost:3000'

export function fetchStories ({ sort, filter, page } = {}) {
  const params = qs.stringify({
    sort,
    filter,
    page
  })
  return axios.get(`${HOST}/api/stories?${params}`)
}
