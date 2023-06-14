import React from 'react'

import config from '../../../config'
import authApi from '../../api/auth'
import LoginForm from './LoginForm'
import { Flag } from '../layout'
import HelpButton from '../ui/HelpButton'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loginFailure: false
    }
  }

  doLogin = async (username, password) => {
    const auth = authApi(config.auth.api.path)

    this.setState(prevState => ({ ...prevState, loginFailure: false }))

    try {
      const { jwt } = await auth.login(username, password)
      localStorage.setItem('ppeJwt', jwt)
      this.doWindowReload()
      return true
    } catch ({ response }) {
      if (response.data && response.data.errorType === 'LOGIN_FAILED') {
        this.setState(prevState => ({ ...prevState, loginFailure: true }))
      }
    }
    return false
  }

  doWindowReload = () => {
    window.location.reload()
  }

  render() {
    return (
      <div className="c-login-container">
        <div className="c-login-container__header">
          <Flag.Body className="u-soft-left-md">
            <h2 className="c-toolbar__header">${webapp - name}</h2>
          </Flag.Body>
          <Flag.Component className="u-soft-right-md">
            <HelpButton color="blue" />
          </Flag.Component>
        </div>
        <div className="c-login-container__content">
          <LoginForm login={this.doLogin} loginFailure={this.state.loginFailure} />
        </div>
      </div>
    )
  }
}

export default Login
