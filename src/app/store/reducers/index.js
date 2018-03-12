const { routerReducer } = require('react-router-redux')

module.exports = {
  navigation: require('./navigation'),
  pageLoader: require('./page-loader'),
  router: routerReducer
}
