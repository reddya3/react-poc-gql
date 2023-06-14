import React from 'react'
import T from 'prop-types'

const Table = ({ children, dragging, label, className }) => (
  <div
    className={`c-fixed-table ${dragging ? 'is-dragging' : ''} ${className != null ? className : ''} `}
    aria-label={label}
    role="table"
  >
    {children}
  </div>
)

Table.propTypes = {
  children: T.node.isRequired,
  dragging: T.bool,
  label: T.string,
  className: T.string
}

Table.defaultProps = {
  dragging: false,
  label: null,
  className: null
}

export default Table
