const winston = require('winston')

const buildLogger = () => {
  const logger = winston.createLogger({
    transports: [
      new winston.transports.Console({
        level: 'info'
      })
    ]
  })

  return logger
}

module.exports = buildLogger