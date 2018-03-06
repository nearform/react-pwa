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
  dispatch({
    type: ACTION_TYPES.FETCH_STORIES
  })

  return axios.get(`${HOST}/api/stories`)
    .then(response => dispatch(updateStories(response.data)))
    .then(() => getState())
}

module.exports = {
  ACTION_TYPES,
  fetchStories
}
