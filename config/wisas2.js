var wisas = require('knex')({
  client: 'mssql',
  connection: {
    server: process.env.MSSQL_WISAS2_HOST,
    user: process.env.MSSQL_WISAS2_USER,
    password: process.env.MSSQL_WISAS2_PWD,
    database: process.env.MSSQL_WISAS2_DB,
    options: {
      port: 1433,
      encrypt: false,
      enableArithAbort: true,
    },
  },
})

module.exports = wisas
