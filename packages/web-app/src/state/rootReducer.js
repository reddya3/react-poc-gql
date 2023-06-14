import { combineReducers } from 'redux'

import items from './ducks/items'
import user from './ducks/user'

const rootReducer = combineReducers({ items, user })

export default rootReducer
