import axios from 'axios'

import config from '../config'

// Configure axios globally to point to the Pact server
axios.defaults.baseURL = config.pact.bff.mockProvider.url
axios.defaults.headers.Accept = config.bff.api.acceptHeader
