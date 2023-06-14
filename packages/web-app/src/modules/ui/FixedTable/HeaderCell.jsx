import React from 'react'
import T from 'prop-types'

const HeaderCell = ({ children, width, className }) => {
  const attributes = {
    role: 'columnHeader',
    className: 'c-fixed-table__header-cell'
  }

  if (width) {
    attributes.style = { width }
  }

  if (className) {
    attributes.className = `${attributes.className} ${className}`
  }

  return <div {...attributes}>{children}</div>
}

HeaderCell.propTypes = {
  children: T.node,
  width: T.string,
  className: T.string
}

HeaderCell.defaultProps = {
  width: null,
  children: null,
  className: ''
}

export default HeaderCell
