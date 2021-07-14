const path = require('path')

module.exports = path.dirname(__dirname)
// module.exports = path
//   .dirname(require.main.filename || process.mainModule.filename)
//   .replace(/\/bin/g, '')
//   .replace(/\\bin/g, '')
