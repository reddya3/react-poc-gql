const winston = require('winston')

const buildLogger = () => {
  const logger = new winston.Logger({
    level: 'info',
    transports: [new winston.transports.Console()]
  })

  return logger
}

module.exports = buildLogger
