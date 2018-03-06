const { routerReducer } = require('react-router-redux')

module.exports = {
  navigation: require('./navigation'),
  stories: require('./stories'),
  router: routerReducer
}
