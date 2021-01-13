var wisas = require('knex')({
  client: 'mssql',
  connection: {
    server: 'localhost',
    user: 'sa',
    password: 'a',
    database: 'Wisas',
    options: {
      port: 1433,
      encrypt: true,
      enableArithAbort: true,
    },
  },
})

module.exports = wisas
