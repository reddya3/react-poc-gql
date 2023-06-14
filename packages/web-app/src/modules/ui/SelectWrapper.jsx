import React from 'react'
import T from 'prop-types'
import Select from 'react-select'
import { isIE } from '../../helpers/browser'

const idRegex = /react-select-\d+-input/

class SelectWrapper extends React.Component {
  static propTypes = {
    onBlur: T.func.isRequired
  }

  onBlurFix = e => {
    // Fix for IE11 hiding the menu item when the scroll bar is clicked
    if (
      e.target.id.match(idRegex) &&
      document.activeElement &&
      document.activeElement.classList.contains('c-react-select__menu-list')
    ) {
      e.target.focus()
      const exception = null
      throw exception
    }
    this.props.onBlur()
  }

  focus() {
    this.select.focus()
  }

  render() {
    return (
      <Select
        ref={ref => {
          this.select = ref
        }}
        {...this.props}
        onBlur={isIE ? this.onBlurFix : this.props.onBlur}
        menuContainerStyle={{ zIndex: 5 }}
      />
    )
  }
}

export default SelectWrapper
