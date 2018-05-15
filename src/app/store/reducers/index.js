import {routerReducer} from 'react-router-redux'
import {reducer as pageLoaderReducer} from 'react-page-loader-redux'
import Navigation from './navigation'

export const navigation = Navigation
export const pageLoader = pageLoaderReducer
export const router = routerReducer
export default { navigation, pageLoader, router }
