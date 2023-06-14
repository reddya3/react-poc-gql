import React from 'react'
import { mount } from 'enzyme'

import FieldError from '../FieldError'

describe('modules/login/FieldError', () => {
  it('Should render a field error', () => {
    const errorMsg = 'An error'
    const $ = mount(<FieldError error={errorMsg} />)

    expect($.text().includes(errorMsg)).toBe(true)
  })

  it('Should render nothing on no error property', () => {
    const $ = mount(<FieldError />)

    expect($.html()).toBe(null)
  })

  it('Should render nothing on empty string error property', () => {
    const $ = mount(<FieldError error="" />)

    expect($.html()).toBe(null)
  })
})
