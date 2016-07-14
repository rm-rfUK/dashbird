var pg = require('pg');
pg.defaults.ssl = true;
require('env2')('config.env');
//this connection string will be hidden as environment variables
var connectionString = process.env.DATABASE_URL;

function getPostById(id, callback) {
  var client = new pg.Client(connectionString);
  client.connect((err) => {
    if (err) throw err;
  });
  client.query("SELECT * FROM posts WHERE postid=$1",
    [id],
      function(err, result) {
        if (err) console.log(err);
        callback(result.rows[0]);
        client.end();
      });
}

module.exports = getPostById;
