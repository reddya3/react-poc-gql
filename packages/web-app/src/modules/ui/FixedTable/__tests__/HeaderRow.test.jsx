import React from 'react'
import { mount } from 'enzyme'

import HeaderRow from '../HeaderRow'

describe('modules/ui/FixedTable/HeaderRow', () => {
  const $ = mount(
    <HeaderRow>
      <span id="test" />
    </HeaderRow>
  )

  it('should render the table header row', () => {
    expect($.find('.c-fixed-table__header-row').exists()).toBe(true)
  })

  it("should render it's children", () => {
    expect($.find('#test').exists()).toBe(true)
  })
})
