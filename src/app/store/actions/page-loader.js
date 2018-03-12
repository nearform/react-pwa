const ACTION_TYPES = {
  FETCH_PAGE_DATA: 'FETCH_PAGE_DATA',
  UPDATE_PAGE_DATA: 'UPDATE_PAGE_DATA'
}

const updatePageData = ({ match, route, data }) => ({
  type: ACTION_TYPES.UPDATE_PAGE_DATA,
  match,
  route,
  data
})

const fetchPageData = ({ route, match }) => (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.FETCH_PAGE_DATA,
    route,
    match
  })

  return route.fetcher()
    .then(response => dispatch(updatePageData({
      match,
      route,
      data: response.data
    })))
}

module.exports = {
  ACTION_TYPES,
  fetchPageData,
  updatePageData
}
