var knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '188.166.188.206',
      user : 'root',
      password : 'root_db',
      database : 'sys_db'
    }
  });

module.exports = knex