import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'

import config from '../../../../../config'
import { setLoading, setItems, setError } from '../actions'
import { load } from '../thunks'

describe('state/ducks/items/thunks', () => {
  describe('load', () => {
    const item = { name: 'Hello World' }
    const axiosMock = new AxiosMockAdapter(axios)

    afterEach(axiosMock.reset)

    it("it should flag that it's loading", async () => {
      const mockDispatch = jest.fn()

      await load()(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith(setLoading())
    })

    it('should set the items once loaded', async () => {
      axiosMock.onGet(`${config.bff.api.path}/items`, null).reply(200, [item])
      const mockDispatch = jest.fn()

      await load()(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith(setItems([item]))
    })

    it('should set error on an unsuccessful response', async () => {
      axiosMock.onGet(`${config.bff.api.path}/items`, null).reply(500)
      const mockDispatch = jest.fn()

      await load()(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith(setError(new Error('Request failed with status code 500')))
    })
  })
})
