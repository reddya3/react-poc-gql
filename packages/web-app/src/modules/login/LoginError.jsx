import React from 'react'
import T from 'prop-types'

import WarningIcon from '../../assets/icons/warning.svg'
import HelpButton from '../ui/HelpButton'
import { Flag } from '../layout'

const LoginError = ({ title, message }) => (
  <div className="c-login-container">
    <div className="c-login-container__header">
      <Flag.Body className="u-soft-left-md">PPE ${webapp - name}</Flag.Body>
      <Flag.Component className="u-soft-right-md">
        <HelpButton color="blue" />
      </Flag.Component>
    </div>
    <div className="c-login-container__content">
      <div className="c-login-form__border">
        <div className="c-login-form">
          <div className="c-login-error__content">
            <p>
              <WarningIcon alt="Alert" className="c-icon c-icon--xxl c-login-error__warning-icon" />
              <span className="c-login-error__warning-heading">{title || 'Sorry,'}</span>
            </p>
            <p className="c-login-error__warning-text">{message}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)
LoginError.propTypes = {
  message: T.string.isRequired,
  title: T.string
}

LoginError.defaultProps = {
  title: ''
}

export default LoginError
