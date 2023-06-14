import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'

import config from '../../../../config'
import { buildStore } from '../../../state'
import { waitAndUpdate } from '../../../helpers/async'
import Items from '../Items.container'

describe('modules/items/Items.displayItems', () => {
  const axiosMock = new AxiosMockAdapter(axios)

  afterEach(axiosMock.reset)

  // Setup stocklist articles
  const item = { name: 'Fred', value: 'Red' }
  axiosMock.onGet(`${config.bff.api.path}/items`).reply(200, [item])

  const store = buildStore()

  const $ = mount(
    <Provider store={store}>
      <Items />
    </Provider>
  )

  it('should start fetching and render the loading indicator while fetching articles when mounted', () => {
    expect($.find('#loadingIndicator').exists()).toBe(true)
  })

  it('should render the loaded items once the loading is complete', async () => {
    await waitAndUpdate($)

    const html = $.html()

    expect(html.includes('Fred')).toBe(true)
    expect(html.includes('Red')).toBe(true)
  })
})
