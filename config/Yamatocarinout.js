var Yamatocarinout = require('knex')({
  client: 'mssql',
  connection: {
    server: 'localhost',
    user: 'sa',
    password: 'a',
    database: 'Yamatocarinout',
    options: {
      port: 1433,
      encrypt: true,
      enableArithAbort: true,
    },
  },
})

module.exports = Yamatocarinout
