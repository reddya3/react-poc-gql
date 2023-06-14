import React from 'react'
import configureMockStore from 'redux-mock-store'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'

import { setLoggedOut } from '../../../state/ducks/user/actions'
import config from '../../../../config'
import Toolbar from '../Toolbar.container'

describe('modules/toolbar/Toolbar.container', () => {
  const axiosMock = new AxiosMockAdapter(axios)
  axiosMock.onPost(`${config.auth.api.path}/logout`).reply(200)

  const mockStore = configureMockStore([thunk])
  const store = mockStore({
    user: {
      loggedOut: false
    }
  })

  const $ = mount(
    <Provider store={store}>
      <Toolbar />
    </Provider>
  )

  it('should invoke setLoggedOut action on logout fn', async () => {
    const logoutFn = $.find('Toolbar').prop('logout')

    await logoutFn().then(() => {
      expect(store.getActions()).toEqual([setLoggedOut()])
    })
  })
})
