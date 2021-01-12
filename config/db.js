var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './sqlite/sys.db',
  },
  useNullAsDefault: true,
})

module.exports = knex
