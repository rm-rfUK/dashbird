var pg = require('pg');
require('env2')('config.env');

function pgClient() {
  pg.defaults.ssl = true;
  var connectionString = process.env.DATABASE_URL;
  var client = new pg.Client(connectionString);
  client.connect((err) => {
    if (err) throw err;
  });
  return client;
}

module.exports = pgClient
