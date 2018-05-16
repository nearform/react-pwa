import reduxThunk from 'redux-thunk'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import reducers from './reducers'

const INITIAL_STATE = {}

export default function configureStore ({ initialState = INITIAL_STATE, middleware = [] } = {}) {
  const reducer = combineReducers(reducers)

  return createStore(reducer, initialState, applyMiddleware(...middleware, reduxThunk))
}
