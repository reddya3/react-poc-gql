import { setUser, setLoggedOut } from '../actions'
import user, { defaultState } from '../reducer'

describe('state/ducks/user/reducer', () => {
  const unknownAction = { type: 'UNKNOWN' }

  it('should return the default state on an unknown action and no state provided', () => {
    expect(user(undefined, unknownAction)).toBe(defaultState)
  })

  it('should return the previous state on an unknown action', () => {
    const previousState = { hello: 'world' }

    expect(user(previousState, unknownAction)).toBe(previousState)
  })

  it('should decode the jwt and set user details on SET_USER action', () => {
    const state = defaultState
    const decodedJwt = { sub: 'WIBBLE', roles: ['PPE_IC_USER'], featureToggles: ['PPE_IC_TEMPLATE_ITEMS'] }
    expect(user(state, setUser(decodedJwt))).toMatchObject({
      ...state,
      username: 'WIBBLE',
      roles: ['PPE_IC_USER'],
      featureToggles: ['PPE_IC_TEMPLATE_ITEMS']
    })
  })

  it('should decode the jwt and set user details empty roles and features on SET_USER action', () => {
    const state = defaultState
    const decodedJwt = { sub: 'ic-user' }
    expect(user(state, setUser(decodedJwt))).toMatchObject({
      ...state,
      username: 'ic-user',
      roles: [],
      featureToggles: []
    })
  })

  it('should set logged out state on SET_LOGGED_OUT action', () => {
    expect(user(null, setLoggedOut())).toMatchObject({
      ...defaultState,
      loggedOut: true
    })
  })
})
