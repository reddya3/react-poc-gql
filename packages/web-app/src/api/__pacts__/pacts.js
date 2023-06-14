import { Matchers, Pact } from '@pact-foundation/pact'

import config from '../../../config'
import {
  PACT_OPTIONS_BFF,
  PACT_DEFAULT_RESPONSE_HEADERS,
  PACT_DEFAULT_REQUEST_HEADERS
} from '../../helpers/pact.constants'
import { getItems } from '../items'

describe('api/pacts', () => {
  const pactProvider = new Pact(PACT_OPTIONS_BFF)

  beforeAll(async () => {
    await pactProvider.setup()
  })

  afterEach(() => pactProvider.verify())

  afterAll(async () => {
    await pactProvider.finalize()
  })

  it('should fetch the list of items', async () => {
    const body = { name: 'test1', value: 'red' }
    pactProvider.addInteraction({
      state: 'I have a list of items',
      uponReceiving: 'a request for items',
      withRequest: {
        method: 'GET',
        path: '/api/items',
        PACT_DEFAULT_REQUEST_HEADERS
      },
      willRespondWith: {
        status: 200,
        headers: PACT_DEFAULT_RESPONSE_HEADERS,
        body: Matchers.eachLike(body, { min: 1 })
      }
    })

    const items = await getItems(config.pact.bff.mockProvider.api.path)()

    expect(items[0]).toMatchObject(body)
    pactProvider.verify()
  })
})
