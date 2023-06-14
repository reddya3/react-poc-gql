import React from 'react'
import { mount } from 'enzyme'

import Body from '../Body'

describe('modules/layout/Body', () => {
  const $ = mount(
    <Body className="test-class">
      <span id="test" />
    </Body>
  )

  it('should render a flag body', () => {
    expect($.find('.o-flag__body').exists()).toBe(true)
  })

  it("should render it's children", () => {
    expect($.find('#test').exists()).toBe(true)
  })

  it('should apply the className prop', () => {
    expect($.find('.test-class').exists()).toBe(true)
  })
})
