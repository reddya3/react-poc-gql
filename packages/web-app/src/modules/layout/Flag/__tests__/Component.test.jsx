import React from 'react'
import { mount } from 'enzyme'

import Component from '../Component'

describe('modules/layout/Component', () => {
  const $ = mount(
    <Component className="test-class">
      <span id="test" />
    </Component>
  )

  it('should render a flag component', () => {
    expect($.find('.o-flag__component').exists()).toBe(true)
  })

  it("should render it's children", () => {
    expect($.find('#test').exists()).toBe(true)
  })

  it('should apply the className prop', () => {
    expect($.find('.test-class').exists()).toBe(true)
  })
})
