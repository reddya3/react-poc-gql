import React from 'react'
import { mount } from 'enzyme'

import Flood from '../Flood'

describe('modules/layout/Flood', () => {
  const $ = mount(
    <Flood>
      <span id="test" />
    </Flood>
  )

  it('should render a flood object', () => {
    expect($.find('.o-flood').exists()).toBe(true)
  })

  it("should render it's children", () => {
    expect($.find('#test').exists()).toBe(true)
  })
})
