import React from 'react'
import { mount } from 'enzyme'
import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'

import { waitAndUpdate } from '../../../helpers/async'
import { LOGIN_ENDPOINT } from '../../../api/auth'
import config from '../../../../config'
import Login from '../Login'

describe('modules/login/Login', () => {
  describe('verify initial state', () => {
    const $ = mount(<Login />)
    it('should render LoginForm with login function and no loginFailure', () => {
      expect($.find('LoginForm').props()).toMatchObject({ login: expect.any(Function), loginFailure: false })
    })
  })

  describe('login behaviours', () => {
    const axiosMock = new AxiosMockAdapter(axios)
    const USERNAME = 'user'
    const VALID_PASSWORD = 'valid'
    const MOCK_HEADERS = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }

    global.location.reload = jest.fn()

    beforeEach(() => {
      global.location.reload.mockReset()
    })

    axiosMock
      .onPost(
        `${config.auth.api.path}/${LOGIN_ENDPOINT}`,
        { username: USERNAME, password: VALID_PASSWORD },
        MOCK_HEADERS
      )
      .reply(200, { jwt: 'PPE_JWT' })

    it('should reload current page on login success', async () => {
      const $ = mount(<Login />)
      const loginFunction = $.find('LoginForm').prop('login')

      loginFunction(USERNAME, VALID_PASSWORD)
      await waitAndUpdate($)

      expect(global.location.reload).toHaveBeenCalled()
    })

    it('should set login failure prop on LoginForm on login failure', async () => {
      const $ = mount(<Login />)
      const loginFunction = $.find('LoginForm').prop('login')

      axiosMock
        .onPost(`${config.auth.api.path}/${LOGIN_ENDPOINT}`, { username: USERNAME, password: 'invalid' }, MOCK_HEADERS)
        .reply(401, { errorType: 'LOGIN_FAILED' })

      loginFunction(USERNAME, 'invalid')
      await waitAndUpdate($)

      expect(global.location.reload).not.toHaveBeenCalled()
      expect($.find('LoginForm').props()).toMatchObject({ loginFailure: true })
    })

    it('should reset login failure prop on new login', async () => {
      const $ = mount(<Login />)
      const loginFunction = $.find('LoginForm').prop('login')

      axiosMock
        .onPost(`${config.auth.api.path}/${LOGIN_ENDPOINT}`, { username: USERNAME, password: 'invalid' }, MOCK_HEADERS)
        .reply(401, { errorType: 'LOGIN_FAILED' })

      loginFunction(USERNAME, 'invalid')
      await waitAndUpdate($)

      expect($.find('LoginForm').props()).toMatchObject({ loginFailure: true })

      loginFunction(USERNAME, 'invalid')
      $.update()

      expect($.find('LoginForm').props()).toMatchObject({ loginFailure: false })
    })
  })
})
