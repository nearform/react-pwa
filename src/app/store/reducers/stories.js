const { ACTION_TYPES: STORY_ACTIONS } = require('../actions/stories')

const INITIAL_STATE = {}

function handleUpdateStories (state, action) {
  return {
    stories: action.stories
  }
}

module.exports = function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case STORY_ACTIONS.UPDATE_STORIES:
      return handleUpdateStories(state, action)
    default:
      return state
  }
}
