import React from 'react'

import T from 'prop-types'

const FieldError = ({ error }) => (error ? <div className="formFieldError">{error}</div> : null)

FieldError.propTypes = {
  error: T.string
}

FieldError.defaultProps = {
  error: ''
}
export default FieldError
