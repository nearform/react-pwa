const { ACTION_TYPES: STORY_ACTIONS } = require('../actions/stories')

const INITIAL_STATE = {}

function handleFetchStories (state, action) {
  return {
    ...state,
    isFetching: true,
    filter: action.filter,
    sort: action.sort
  }
}

function handleUpdateStories (state, action) {
  return {
    ...state,
    isFetching: false,
    stories: action.stories
  }
}

module.exports = function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case STORY_ACTIONS.FETCH_STORIES:
      return handleFetchStories(state, action)
    case STORY_ACTIONS.UPDATE_STORIES:
      return handleUpdateStories(state, action)
    default:
      return state
  }
}
