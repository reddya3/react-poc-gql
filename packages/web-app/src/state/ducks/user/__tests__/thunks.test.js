import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'

import config from '../../../../../config'
import { setLoggedOut } from '../actions'
import { logout } from '../thunks'
import { LOGOUT_ENDPOINT } from '../../../../api/auth'

describe('state/ducks/user/thunks', () => {
  describe('logout', () => {
    const axiosMock = new AxiosMockAdapter(axios)

    afterEach(axiosMock.reset)

    it('should set logged out once called', async () => {
      axiosMock.onPost(`${config.auth.api.path}/${LOGOUT_ENDPOINT}`).reply(200)
      const mockDispatch = jest.fn()

      await logout()(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith(setLoggedOut())
    })
  })
})
