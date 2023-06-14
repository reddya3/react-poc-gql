import { SET_LOADING, SET_ERROR, SET_ITEMS } from './actions'

export const defaultState = {
  items: [],
  error: null,
  loading: true
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...defaultState,
        loading: true
      }
    case SET_ERROR:
      return {
        ...defaultState,
        error: action.payload.error
      }
    case SET_ITEMS:
      return {
        ...defaultState,
        items: action.payload.items,
        loading: false
      }
    default:
      return state
  }
}

export default reducer
