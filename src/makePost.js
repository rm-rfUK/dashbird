const pgClient = require('./pgClient.js')

function makePost(post, callback) {
  var client = pgClient();
  var date = post.date.slice(0, -18);
  var time = post.date.slice(16, 25);
  var text = post.text;
  var hashtags = post.hashtags;
  var username = post.username;
  client.query("INSERT INTO posts(date, time, text, hashtags, username) values($1, $2, $3, $4, $5) RETURNING postid",
    [date, time, text, hashtags, username],
      function(err, result) {
        if (err) {
          callback(err);
        } else {
          callback(err, result.rows[0].postid);
          console.log('post inserted with postid: ' + result.rows[0].postid);
        }
        client.end();
      });
}

module.exports = makePost;
