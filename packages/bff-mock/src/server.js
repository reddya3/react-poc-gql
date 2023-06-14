const config = require('../config')
const buildApp = require('./buildApp')
const buildLogger = require('./buildLogger')

const logger = buildLogger()
const app = buildApp({ mockFilename: 'mock.json', performUpdates: true })

app.listen(config.bffMock.port, () => logger.info(`BFF Mock listening on port ${config.bffMock.port}`))
