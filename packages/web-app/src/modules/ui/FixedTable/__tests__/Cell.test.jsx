import React from 'react'
import { mount } from 'enzyme'

import Cell from '../Cell'

describe('modules/ui/FixedTable/Cell', () => {
  describe('with optional properties', () => {
    const $ = mount(
      <Cell width="1rem" className="myClass">
        <span id="test" />
      </Cell>
    )

    it('should render the table cell', () => {
      expect($.find('.c-fixed-table__cell').exists()).toBe(true)
    })

    it('should render its children', () => {
      expect($.find('#test').exists()).toBe(true)
    })

    it('should apply the width', () => {
      expect($.find('.c-fixed-table__cell').prop('style').width).toBe('1rem')
    })

    it('should apply className', () => {
      expect($.find('.c-fixed-table__cell').hasClass('myClass')).toBe(true)
    })
  })

  describe('without optional properties', () => {
    const $ = mount(
      <Cell>
        <span id="test" />
      </Cell>
    )

    it('should have no style property if width not specified', () => {
      expect(Object.prototype.hasOwnProperty.call($.find('.c-fixed-table__cell').props(), 'style')).toBe(false)
    })

    it('should have no additional classes if no className specified', () => {
      expect($.find('.c-fixed-table__cell').props().className).toBe('c-fixed-table__cell')
    })
  })
})
