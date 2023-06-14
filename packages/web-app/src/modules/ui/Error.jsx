import React from 'react'
import T from 'prop-types'

const Error = ({ children }) => (
  <div className="c-error">
    <span>{children}</span>
  </div>
)

Error.propTypes = {
  children: T.string.isRequired
}

export default Error
