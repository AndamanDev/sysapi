const path = require('path')
const rfs = require('rotating-file-stream')
const rootPath = require('../utils/path')

// create a rotating write stream
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(rootPath, 'logs'),
  size: '10M',
})

module.exports = accessLogStream
