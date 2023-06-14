import React from 'react'
import { mount } from 'enzyme'

import HeaderCell from '../HeaderCell'

describe('modules/ui/FixedTable/HeaderCell', () => {
  describe('with optional properties', () => {
    const $ = mount(
      <HeaderCell width="1rem" className="myClass">
        <span id="test" />
      </HeaderCell>
    )

    it('should render the table header cell', () => {
      expect($.find('.c-fixed-table__header-cell').exists()).toBe(true)
    })

    it('should render its children', () => {
      expect($.find('#test').exists()).toBe(true)
    })

    it('should apply the width', () => {
      expect($.find('.c-fixed-table__header-cell').prop('style').width).toBe('1rem')
    })

    it('should apply className', () => {
      expect($.find('.c-fixed-table__header-cell').hasClass('myClass')).toBe(true)
    })
  })

  describe('without optional properties', () => {
    const $ = mount(
      <HeaderCell>
        <span id="test" />
      </HeaderCell>
    )

    it('should have no style property if width not specified', () => {
      expect(Object.prototype.hasOwnProperty.call($.find('.c-fixed-table__header-cell').props(), 'style')).toBe(false)
    })

    it('should have no additional classes if no className specified', () => {
      expect($.find('.c-fixed-table__header-cell').props().className).toBe('c-fixed-table__header-cell')
    })
  })
})
