const pgClient = require('./pgClient.js')

function createUserRecord(newRecord, callback) {
  var client = pgClient();
  var userName = newRecord.userName;
  var email = newRecord.email;
  var password = newRecord.password;
  client.query("INSERT INTO users(username, email, password) values ($1, $2, $3) RETURNING username",
    [userName, email, password],
      function(err, result) {
        if (err) {
          console.log(err);
          callback(err);
        } else {
          callback(err, result.rows[0].username);
        }
      client.end();
      });
}

module.exports = createUserRecord
