/* eslint-disable no-console */

const path = require('path')
const fs = require('mz/fs')
const { Verifier } = require('@pact-foundation/pact')
const getPort = require('get-port')

const config = require('../../config')
const buildApp = require('../buildApp')

describe('Pact contracts', () => {
  let port = null
  let server = null

  beforeAll(async () => {
    port = await getPort()
    server = buildApp({ mockFilename: 'mock.pact.json', performUpdates: false }).listen(port, () =>
      console.log(`BFF Mock listening on port ${port} for Pact tests`)
    )
  })

  afterAll(() => {
    server.close()
  })

  it('should be met', async () => {
    const pactsDir = path.join(process.cwd(), '../web-app/pacts')
    const pactUrls = (await fs.readdir(pactsDir)).map(filename => path.join(pactsDir, filename))

    if (pactUrls.length === 0) {
      console.warn('No pacts to verify!')
    } else {
      const options = {
        providerBaseUrl: `http://localhost:${port}`,
        provider: config.pact.providerName,
        pactUrls
      }
      await new Verifier().verifyProvider(options)

      server.close()
    }
  })
})
