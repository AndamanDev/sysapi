const pino = require('pino')
const moment = require('moment')
const errorLogStream = require('./error-stream')
const accessLogStream = require('./access-stream')

moment.locale('th')
const config = {
  timestamp: () => {
    return `,"time": "${moment().format()}"`
  },
}

const errorLogger = pino(config, errorLogStream)
const accessLogger = pino(config, accessLogStream)

module.exports = {
  errorLogger,
  accessLogger,
}