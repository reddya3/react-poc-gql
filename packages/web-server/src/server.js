require('newrelic')

const path = require('path')

const buildApp = require('./buildApp')
const buildLogger = require('./buildLogger')
const config = require('../config')

const appConfig = {
  publicPath: path.join(process.cwd(), process.env.PUBLIC_DIR || config.webServer.publicDir),
  spaRootFilename: 'index.html'
}

const logger = buildLogger()
const app = buildApp(appConfig)

app.listen(config.webServer.port, () => logger.info(`Web server listening on port ${config.webServer.port}`))
