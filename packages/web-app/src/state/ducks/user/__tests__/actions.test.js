import { SET_USER, setUser, SET_LOGGED_OUT, setLoggedOut } from '../actions'

describe('state/ducks/user/actions', () => {
  describe('setUser', () => {
    it('should create a setUser action', () => {
      const decodedJwt = 'wibble'
      expect(setUser(decodedJwt)).toMatchObject({
        payload: { decodedJwt },
        type: SET_USER
      })
    })
  })

  describe('setLoggedOut', () => {
    it('should create a setLoggedOut action', () => {
      expect(setLoggedOut()).toMatchObject({
        type: SET_LOGGED_OUT
      })
    })
  })
})
