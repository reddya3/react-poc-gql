import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'

import authApi, { REFRESH_PPE_JWT_ENDPOINT, LOGIN_ENDPOINT, LOGOUT_ENDPOINT } from '../auth'

describe('api/auth', () => {
  const axiosMock = new AxiosMockAdapter(axios)
  const ptsJwt = 'pts'
  const ppeJwt = 'ppe'

  afterEach(axiosMock.reset)

  describe('refreshPpeJwt', () => {
    it('should post to correct endpoint with a bearer token Authorization header and return new jwt', async () => {
      const newPpeJwt = 'new ppe'
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ppeJwt}`
      }
      axiosMock.onPost(`/${REFRESH_PPE_JWT_ENDPOINT}`, undefined, headers).reply(200, { jwt: newPpeJwt })

      const auth = authApi('')
      const { jwt } = await auth.refreshPpeJwt(ppeJwt)

      expect(jwt).toBe(newPpeJwt)
    })
  })

  describe('login', () => {
    it('should post to correct endpoint with a bearer token Authorization header username and password', async () => {
      const newPpeJwt = 'new ppe'
      const username = 'user'
      const password = 'password'
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ptsJwt}`
      }
      axiosMock.onPost(`/${LOGIN_ENDPOINT}`, { username, password }, headers).reply(200, { jwt: newPpeJwt })

      const auth = authApi('')
      const { jwt } = await auth.login(username, password, ptsJwt)

      expect(jwt).toBe(newPpeJwt)
    })

    it('should post to correct endpoint without a bearer token Authorization header and with username and password', async () => {
      const newPpeJwt = 'new ppe'
      const username = 'user'
      const password = 'password'
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
      axiosMock.onPost(`/${LOGIN_ENDPOINT}`, { username, password }, headers).reply(200, { jwt: newPpeJwt })

      const auth = authApi('')
      const { jwt } = await auth.login(username, password, ptsJwt)

      expect(jwt).toBe(newPpeJwt)
    })
  })

  describe('logout', () => {
    it('should post to correct endpoint with a bearer token Authorization header', async () => {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ppeJwt}`
      }
      axiosMock.onPost(`/${LOGOUT_ENDPOINT}`, {}, headers).reply(200)

      const spy = jest.spyOn(axios, 'post')

      const auth = authApi('')
      await auth.logout(ppeJwt)
      expect(spy).toHaveBeenCalled()
    })
  })
})
