import React from 'react'
import WarningIcon from '../../assets/icons/warning.svg'

const Unauthorised = () => (
  <div className="c-login-container">
    <div className="c-login-container__header">
      <h2 className="c-toolbar__header">
        <b>PPE</b> ${webapp - name}
      </h2>
    </div>
    <div className="c-login-container__content">
      <div className="c-login-form__border">
        <div className="c-login-form c-unauthorised__content">
          <p>
            <WarningIcon alt="Alert" className="c-icon c-icon--xxl c-unauthorised__warning-icon" />
            <span className="c-unauthorised__warning-heading">Sorry,</span>
          </p>
          <p>
            <span>You do not have permission to use this feature.</span>
          </p>
          <hr />
          <p>
            <b>Please contact the system owner if you believe you need to be granted access.</b>
          </p>
        </div>
      </div>
    </div>
  </div>
)

export default Unauthorised
