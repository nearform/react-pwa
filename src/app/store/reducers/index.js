import { reducer as pageLoaderReducer } from 'react-page-loader-redux'
import { routerReducer } from 'react-router-redux'

export const reducers = {
  navigation: require('./navigation'),
  pageLoader: pageLoaderReducer,
  router: routerReducer
}
