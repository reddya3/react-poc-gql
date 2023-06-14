import React from 'react'
import T from 'prop-types'

const HeaderRow = ({ children }) => (
  <div className="c-fixed-table__header-row" role="row">
    {children}
  </div>
)

HeaderRow.propTypes = {
  children: T.node.isRequired
}

export default HeaderRow
