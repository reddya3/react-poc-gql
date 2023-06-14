import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './rootReducer'

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const buildStore = () => createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default buildStore
