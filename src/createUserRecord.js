var pg = require('pg');
pg.defaults.ssl = true;
require('env2')('config.env');
var connectionString = process.env.DATABASE_URL;

function createUserRecord(newRecord, callback) {
  var client = new pg.Client(connectionString);
  client.connect((err) => {
    if (err) throw err;
  });
  var userName = newRecord.userName;
  var email = newRecord.email;
  var password = newRecord.password;
  client.query("INSERT INTO users(username, email, password) values ($1, $2, $3) RETURNING username",
    [userName, email, password],
      function(err, result) {
        if (err) console.log(err);
        console.log(result.rows[0].username);
        callback(result.rows[0].username);
        client.end();
      });
}

module.exports = createUserRecord
