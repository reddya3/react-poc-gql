import React, { Fragment } from 'react'
import T from 'prop-types'

import AlertIcon from '../../assets/icons/alert.svg'
import FieldError from './FieldError'
import { Flag } from '../layout'
import { LoadingIndicator } from '../ui'

const ENTER_KEY = 13

class LoginForm extends React.Component {
  static propTypes = {
    login: T.func.isRequired,
    loginFailure: T.bool
  }

  static defaultProps = {
    loginFailure: false
  }

  constructor(props) {
    super(props)

    this.state = {
      validationErrors: {
        userId: '',
        password: ''
      },
      isValid: false,
      userId: '',
      password: '',
      loading: false
    }
  }

  nextFieldOnEnter = event => {
    if (event.keyCode === ENTER_KEY) {
      const {
        target: { form }
      } = event
      const index = Array.prototype.indexOf.call(form.elements, event.target)
      form.elements[index + 1].focus()
      event.preventDefault()
    }
  }

  submitOnEnter = event => {
    if (event.keyCode === ENTER_KEY) {
      const {
        target: { form }
      } = event
      const index = Array.prototype.indexOf.call(form.elements, event.target)
      form.elements[index + 1].click()
      event.preventDefault()
    }
  }

  handleSignIn = async () => {
    this.setState(prevState => ({ ...prevState, loading: true }))
    const success = await this.props.login(this.state.userId, this.state.password)
    if (!success) this.setState(prevState => ({ ...prevState, loading: false }))
  }

  validateInputField(evt, msg) {
    const {
      target: { value },
      target: { id }
    } = evt

    const validationErrors = Object.assign({}, this.state.validationErrors)
    delete validationErrors[id]

    if (!value || !value.trim()) {
      validationErrors[id] = msg
    }

    const isValid = Object.keys(validationErrors).length === 0

    this.setState({ validationErrors, isValid, [id]: value })

    return isValid
  }

  render() {
    const { validationErrors, isValid, loading } = this.state
    return (
      <div className="c-login-form__border">
        <div className="c-login-form">
          <div className="c-login-form__intro">
            <h2>Sign in</h2>
            <p>Use your organisation account details to sign in.</p>
          </div>
          <div className="c-login-form__form">
            <form>
              <label htmlFor="userId">
                User ID
                <input
                  id="userId"
                  type="text"
                  className={validationErrors.userId ? 'invalid' : ''}
                  onChange={event => this.validateInputField(event, 'A user ID must be specified')}
                  onBlur={event => this.validateInputField(event, 'A user ID must be specified')}
                  onKeyDown={this.nextFieldOnEnter}
                  value={this.state.userId}
                />
              </label>
              <FieldError error={validationErrors.userId || ''} />
              <label htmlFor="password">
                Password
                <input
                  id="password"
                  type="password"
                  className={validationErrors.password ? 'invalid' : ''}
                  onChange={event => this.validateInputField(event, 'A password must be specified')}
                  onBlur={event => this.validateInputField(event, 'A password must be specified')}
                  onKeyDown={this.submitOnEnter}
                  value={this.state.password}
                />
              </label>
              <FieldError error={validationErrors.password || ''} />
              <Flag.Flag className="c-login-form__submit">
                <Flag.Component>
                  <button
                    type="button"
                    className="c-button c-button--blue"
                    aria-label="Sign in"
                    disabled={!isValid || loading}
                    onClick={() => this.handleSignIn()}
                  >
                    {loading ? <LoadingIndicator /> : <Fragment>Sign in</Fragment>}
                  </button>
                </Flag.Component>
                {this.props.loginFailure && !loading ? (
                  <Flag.Body className="c-login-form__loginFailure">
                    <Flag.Flag>
                      <Flag.Component>
                        <div className="c-login-form__submit-alert">
                          <AlertIcon alt="Alert" className="c-icon c-icon--xs" />
                        </div>
                      </Flag.Component>
                      <Flag.Body>
                        <div className="formFieldError">
                          <div>Sign in failed.</div>
                          <div>Incorrect user ID or password.</div>
                        </div>
                      </Flag.Body>
                    </Flag.Flag>
                  </Flag.Body>
                ) : null}
              </Flag.Flag>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm
