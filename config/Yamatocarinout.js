var Yamatocarinout = require('knex')({
  client: 'mssql',
  connection: {
    server: process.env.MSSQL_CARINOUT_HOST,
    user: process.env.MSSQL_CARINOUT_USER,
    password: process.env.MSSQL_CARINOUT_PWD,
    database: process.env.MSSQL_CARINOUT_DB,
    options: {
      port: 1433,
      encrypt: false,
      enableArithAbort: true,
    },
  },
})

module.exports = Yamatocarinout
