var pg = require('pg');
pg.defaults.ssl = true;
require('env2')('config.env');
//this connection string will be hidden as environment variables
var connectionString = process.env.DATABASE_URL;

function makePost(post, callback) {
  var client = new pg.Client(connectionString);
  client.connect((err) => {
    if (err) throw err;
  });
  var date = post.date.slice(0, -18);
  var time = post.date.slice(16, 25);
  var text = post.text;
  var hashtags = post.hashtags;
  var username = post.userName;
  client.query("INSERT INTO posts(date, time, text, hashtags, username) values($1, $2, $3, $4, $5) RETURNING postid",
    [date, time, text, hashtags, username],
      function(err, result) {
        if (err) console.log(err);
        callback(result);
        console.log('post inserted with postid: ' + result.rows[0].postid);
        client.end();
      });
}

module.exports = makePost;
