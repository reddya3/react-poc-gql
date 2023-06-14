import React from 'react'
import T from 'prop-types'
import jwtDecode from 'jwt-decode'

import config from '../../../config'
import authApi from '../../api/auth'

export const SecureStates = {
  AUTHENTICATED: 'SECURE::AUTHENTICATED',
  LOGIN_REQUIRED: 'SECURE::LOGIN_REQUIRED',
  REJECTED: 'SECURE::REJECTED',
  UNAUTHORISED: 'SECURE::UNAUTHORISED'
}

const AuthorisedRoles = config.webApp.authorisedRoles

class SecureApp extends React.Component {
  static propTypes = {
    children: T.func.isRequired,
    loggedOut: T.bool
  }

  static defaultProps = {
    loggedOut: false
  }

  state = {
    working: true,
    state: null,
    timeout: null
  }

  componentDidMount() {
    this.authorise()
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.loggedOut) {
      if (prevState.timeout) {
        clearTimeout(prevState.timeout)
        return { ...prevState, state: SecureStates.LOGGED_OUT, timeout: null }
      }
    }
    return prevState
  }

  authorise = async () => {
    this.setState(prevState => ({ ...prevState, working: true }))
    const auth = authApi(config.auth.api.path)

    try {
      const { jwt } = await auth.refreshPpeJwt(localStorage.getItem('ppeJwt'))
      this.acceptJwt(jwt)
    } catch (ppeAuthError) {
      this.setState(prevState => ({ ...prevState, state: SecureStates.LOGIN_REQUIRED, timeout: null }))
    }

    this.setState(prevState => ({ ...prevState, working: false }))
  }

  refresh = async () => {
    const auth = authApi(config.auth.api.path)
    try {
      const { jwt } = await auth.refreshPpeJwt(localStorage.getItem('ppeJwt'))
      this.acceptJwt(jwt)
    } catch ({ response }) {
      clearTimeout() // prevent any futher automated jwt refresh
      if (response.data && response.data.errorType === 'LOGIN_REQUIRED') {
        this.setState(prevState => ({ ...prevState, state: SecureStates.LOGIN_REQUIRED, timeout: null }))
      } else {
        this.setState(prevState => ({ ...prevState, state: SecureStates.REJECTED, timeout: null }))
      }
    }
  }

  acceptJwt = jwt => {
    localStorage.setItem('ppeJwt', jwt)

    const authorised = jwtDecode(jwt).roles.some(role => AuthorisedRoles.includes(role))

    if (!authorised) {
      clearTimeout()
    }

    this.setState(prevState => ({
      ...prevState,
      state: authorised ? SecureStates.AUTHENTICATED : SecureStates.UNAUTHORISED,
      timeout: authorised ? this.triggerTimeout() : null
    }))
  }

  clearTimeout() {
    if (this.state.timeout) {
      clearTimeout(this.state.timeout)
    }
  }

  triggerTimeout() {
    // Stop any currently untriggered timeout so we don't end up running multiple ones
    this.clearTimeout()
    // Create a new timeout
    return setTimeout(() => {
      this.refresh()
    }, config.auth.interval)
  }

  render() {
    const { working, state } = this.state

    // Don't render anything while authorising the user
    return working ? null : this.props.children({ state })
  }
}

export default SecureApp
