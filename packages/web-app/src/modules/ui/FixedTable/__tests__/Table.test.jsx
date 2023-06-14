import React from 'react'
import { mount } from 'enzyme'

import Table from '../Table'

describe('modules/ui/FixedTable/Table', () => {
  describe('rendering without custom class name', () => {
    const $ = mount(
      <Table dragging label="test table">
        <span id="test" />
      </Table>
    )

    it('should render the table', () => {
      expect($.find('.c-fixed-table').exists()).toBe(true)
    })

    it('should render its children', () => {
      expect($.find('#test').exists()).toBe(true)
    })

    it('should apply the label', () => {
      expect($.find('[aria-label="test table"]').exists()).toBe(true)
    })

    it('should apply the dragging modifier', () => {
      expect($.find('.is-dragging').exists()).toBe(true)
    })
  })

  describe('rendering with custom class name', () => {
    it('should apply custom class name to rendered table', () => {
      const $ = mount(
        <Table label="label" className="special-class">
          <span />
        </Table>
      )
      expect($.find('div').hasClass('special-class')).toBe(true)
    })

    it('should apply custom class name in addition to class name added for dragging', () => {
      const $ = mount(
        <Table label="label" className="special-class" dragging>
          <span />
        </Table>
      )
      expect($.find('div').hasClass('special-class')).toBe(true)
      expect($.find('div').hasClass('is-dragging')).toBe(true)
    })
  })
})
