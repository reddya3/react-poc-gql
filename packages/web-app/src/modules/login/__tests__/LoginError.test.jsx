import React from 'react'
import { mount } from 'enzyme'
import LoginError from '../LoginError'

describe('modules/login/LoginError', () => {
  it('should render the error message provided', async () => {
    const message = 'Error Message'
    const $ = mount(<LoginError message={message} />)
    expect($.html().includes('Sorry,'))
    expect($.html().includes(message)).toBe(true)
  })

  it('should render the error title and message provided', async () => {
    const title = 'Error Title'
    const message = 'Error Message'
    const $ = mount(<LoginError title={title} message={message} />)
    expect($.html().includes(title)).toBe(true)
    expect($.html().includes(message)).toBe(true)
  })
})
