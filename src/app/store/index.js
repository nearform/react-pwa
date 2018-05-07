import { applyMiddleware, combineReducers, createStore } from 'redux'
import ReduxThunk from 'redux-thunk'
import { reducers } from './reducers'

const INITIAL_STATE = {}

export function configureStore ({ initialState = INITIAL_STATE, middleware = [] } = {}) {
  const reducer = combineReducers(reducers)

  return createStore(reducer, initialState, applyMiddleware(...middleware, ReduxThunk))
}
