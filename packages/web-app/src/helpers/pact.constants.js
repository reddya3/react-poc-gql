import path from 'path'
import { Matchers } from '@pact-foundation/pact'
import config from '../../config'

export const PACT_OPTIONS_BFF = {
  consumer: config.pact.bff.consumerName,
  provider: config.pact.bff.providerName,
  port: config.pact.bff.mockProvider.port,
  log: path.resolve(process.cwd(), config.pact.bff.mockProvider.log.filename),
  dir: path.resolve(process.cwd(), config.pact.bff.pactFolder),
  logLevel: config.pact.bff.mockProvider.log.level,
  spec: config.pact.bff.mockProvider.spec
}

export const PACT_DEFAULT_RESPONSE_HEADERS = {
  'Content-Type': Matchers.term({
    generate: config.bff.api.contentType,
    matcher: config.pact.bff.mockProvider.api.matchers.contentType
  })
}

export const PACT_DEFAULT_REQUEST_HEADERS = { Accept: config.bff.api.acceptHeader }
