import React from 'react'
import T from 'prop-types'

const Cell = ({ children, width, className }) => {
  const attributes = {
    role: 'cell',
    className: 'c-fixed-table__cell'
  }

  if (width) {
    attributes.style = { width }
  }

  if (className) {
    attributes.className = `${attributes.className} ${className}`
  }

  return <div {...attributes}>{children}</div>
}

Cell.propTypes = {
  children: T.node,
  width: T.string,
  className: T.string
}

Cell.defaultProps = {
  width: null,
  children: null,
  className: ''
}

export default Cell
