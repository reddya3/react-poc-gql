import React from 'react'
import T from 'prop-types'

const Message = ({ children }) => <span className="c-fixed-table__message">{children}</span>

Message.propTypes = {
  children: T.string.isRequired
}

export default Message
