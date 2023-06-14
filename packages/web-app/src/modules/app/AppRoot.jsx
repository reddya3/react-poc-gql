import React, { Fragment } from 'react'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'

import { configureAxios } from '../../api/configureAxios'
import { buildStore } from '../../state'
import SecureApp, { SecureStates } from './SecureApp.container'
import Login from '../login/Login'
import Toolbar from '../toolbar/Toolbar.container'
import LoginError from '../login/LoginError'

configureAxios({
  onBffUnauthorized: () => {
    window.document.body.onbeforeunload = null
    window.location.reload()
  }
})

// Build the application state
const store = buildStore()

// Render the root of the application
const AppRoot = () => (
  <Provider store={store}>
    <SecureApp>
      {({ state }) => {
        const secureState = state || SecureStates.REJECTED
        switch (secureState) {
          case SecureStates.AUTHENTICATED:
            return (
              <Fragment>
                <div className="c-app-container">
                  <div className="c-app-container__toolbar">
                    <Toolbar />
                  </div>
                </div>
              </Fragment>
            )
          case SecureStates.LOGIN_REQUIRED:
            return <Login />
          case SecureStates.UNAUTHORISED:
            return <LoginError message={"You don't have permission to access this."} />
          default:
            return <LoginError message="Please try again." />
        }
      }}
    </SecureApp>
  </Provider>
)

export default hot(module)(AppRoot)
