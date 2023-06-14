const config = require('../config')
const buildApp = require('./buildApp')
const buildLogger = require('./buildLogger')

const logger = buildLogger()
const app = buildApp({ logger })

app.listen(config.authMock.port, () => logger.info(`Auth Mock listening on port ${config.authMock.port}`))
