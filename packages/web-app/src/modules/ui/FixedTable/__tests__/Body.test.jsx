import React from 'react'
import { mount } from 'enzyme'

import Body from '../Body'

describe('modules/ui/FixedTable/Body', () => {
  const $ = mount(
    <Body>
      <span id="test" />
    </Body>
  )

  it('should render the table body', () => {
    expect($.find('.c-fixed-table__body').exists()).toBe(true)
  })

  it("should render it's children", () => {
    expect($.find('#test').exists()).toBe(true)
  })
})
