import React from 'react'
import { mount } from 'enzyme'

import Grid from '../Grid'

describe('modules/ui/FixedTable/Grid', () => {
  const $ = mount(
    <Grid>
      <span id="test" />
    </Grid>
  )

  it('should render the table grid', () => {
    expect($.find('.c-fixed-table__grid').exists()).toBe(true)
  })

  it("should render it's children", () => {
    expect($.find('#test').exists()).toBe(true)
  })
})
