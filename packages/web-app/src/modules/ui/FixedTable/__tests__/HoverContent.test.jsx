import React from 'react'
import { mount } from 'enzyme'

import HoverContent from '../HoverContent'

describe('modules/ui/FixedTable/HoverContent', () => {
  const $ = mount(
    <HoverContent>
      <span id="test" />
    </HoverContent>
  )

  it('should render the table active content', () => {
    expect($.find('.c-fixed-table__hover-content').exists()).toBe(true)
  })

  it("should render it's children", () => {
    expect($.find('#test').exists()).toBe(true)
  })
})
