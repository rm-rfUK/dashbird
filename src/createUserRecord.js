const pgClient = require('./pgClient.js')

function createUserRecord(newRecord, callback) {
  let client = pgClient();
  let userName = newRecord.userName;
  let email = newRecord.email;
  let password = newRecord.password;
  client.query("INSERT INTO users(username, email, password) values ($1, $2, $3) RETURNING username",
    [userName, email, password],
      function(err, result) {
        if (err) {
          callback(err);
          client.end();
        } else {
          callback(err, result.rows[0].username);
          client.end();
        }
      });
}

module.exports = createUserRecord
