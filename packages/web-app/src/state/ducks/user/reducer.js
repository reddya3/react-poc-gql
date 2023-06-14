import { SET_USER, SET_LOGGED_OUT } from './actions'

export const defaultState = {
  username: '',
  roles: [],
  featureToggles: [],
  loggedOut: false
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        username: action.payload.decodedJwt.sub,
        roles: action.payload.decodedJwt.roles || [],
        featureToggles: action.payload.decodedJwt.featureToggles || []
      }
    }
    case SET_LOGGED_OUT: {
      return {
        ...defaultState,
        loggedOut: true
      }
    }
    default:
      return state
  }
}

export default reducer
