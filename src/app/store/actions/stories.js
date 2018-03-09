const qs = require('qs')
const axios = require('axios')

const HOST = process.NODE_ENV === 'production'
  ? ''
  : 'http://localhost:3000'

const ACTION_TYPES = {
  FETCH_STORIES: 'FETCH_STORIES',
  UPDATE_STORIES: 'UPDATE_STORIES'
}

const updateStories = (stories) => ({
  type: ACTION_TYPES.UPDATE_STORIES,
  stories
})

const fetchStories = (args) => (dispatch, getState) => {
  const { sort, filter } = args || {}

  dispatch({
    type: ACTION_TYPES.FETCH_STORIES,
    sort,
    filter
  })

  const params = qs.stringify({
    sort,
    filter
  })

  return axios.get(`${HOST}/api/stories?${params}`)
    .then(response => dispatch(updateStories(response.data)))
    .then(() => getState())
}

// more actions for each fetch
// more reducers to set 'filter' and sort properties to the store

module.exports = {
  ACTION_TYPES,
  fetchStories
}
