/* eslint-disable no-console */
const path = require('path')
const pact = require('@pact-foundation/pact-node')

const config = require('../config')

const options = {
  consumerVersion: config.pact.consumerVersion,
  pactBroker: config.pact.brokerUrl,
  pactFilesOrDirs: [path.join(process.cwd(), 'packages/web-app/pacts')]
}

pact
  .publishPacts(options)
  .then(() => console.info('Published pacts!'))
  .catch(error => console.error(error))
