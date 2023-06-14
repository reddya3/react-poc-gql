import React from 'react'
import { mount } from 'enzyme'

import Flag from '../Flag'

describe('modules/layout/Flag', () => {
  const $ = mount(
    <Flag className="test-class">
      <span id="test" />
    </Flag>
  )

  it('should render a flag', () => {
    expect($.find('.o-flag').exists()).toBe(true)
  })

  it("should render it's children", () => {
    expect($.find('#test').exists()).toBe(true)
  })

  it('should apply the className prop', () => {
    expect($.find('.test-class').exists()).toBe(true)
  })
})
