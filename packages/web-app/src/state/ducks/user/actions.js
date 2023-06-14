export const SET_USER = 'web-app/user/SET_USER'
export const SET_LOGGED_OUT = 'web-app/user/SET_LOGGED_OUT'

export const setUser = decodedJwt => ({
  payload: { decodedJwt },
  type: SET_USER
})

export const setLoggedOut = () => ({
  type: SET_LOGGED_OUT
})
