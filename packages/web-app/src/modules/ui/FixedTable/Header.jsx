import React from 'react'
import T from 'prop-types'

const Header = ({ children }) => <div className="c-fixed-table__header">{children}</div>

Header.propTypes = {
  children: T.node.isRequired
}

export default Header
