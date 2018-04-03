const { routerReducer } = require('react-router-redux')
const { reducer: pageLoaderReducer } = require('react-page-loader-redux')

module.exports = {
  navigation: require('./navigation'),
  pageLoader: pageLoaderReducer,
  router: routerReducer
}
