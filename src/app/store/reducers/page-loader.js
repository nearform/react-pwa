const { ACTION_TYPES } = require('../actions/page-loader')
const INITIAL_STATE = {
  isFetching: false,
  data: {},
  renderedRoute: {}
}

function handleFetchPageData (state, action) {
  return {
    ...state,
    isFetching: true
  }
}

function handleUpdatePageData (state, action) {
  return {
    ...state,
    isFetching: false,
    renderedRoute: action.route,
    data: action.data
  }
}

module.exports = function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTION_TYPES.FETCH_PAGE_DATA:
      return handleFetchPageData(state, action)
    case ACTION_TYPES.UPDATE_PAGE_DATA:
      return handleUpdatePageData(state, action)
    default:
      return state
  }
}
