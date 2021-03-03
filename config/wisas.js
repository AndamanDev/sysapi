var wisas = require('knex')({
  client: 'mssql',
  connection: {
    server: process.env.MSSQL_WISAS_HOST,
    user: process.env.MSSQL_WISAS_USER,
    password: process.env.MSSQL_WISAS_PWD,
    database: process.env.MSSQL_WISAS_DB,
    options: {
      port: 1433,
      encrypt: false,
      enableArithAbort: true,
    },
  },
})

module.exports = wisas
