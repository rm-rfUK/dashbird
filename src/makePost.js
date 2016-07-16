const pgClient = require('./pgClient.js')

function makePost(post, callback) {
  let client = pgClient();
  let date = post.date.slice(0, -18);
  let time = post.date.slice(16, 25);
  let text = post.text;
  let hashtags = post.hashtags;
  let username = post.username;
  client.query("INSERT INTO posts(date, time, text, hashtags, username) values($1, $2, $3, $4, $5) RETURNING postid, date, time, text, hashtags, username",
    [date, time, text, hashtags, username],
      function(err, result) {
        if (err) {
          callback(err);
        } else {
          callback(err, result.rows[0]);
        }
        client.end();
      });
}

module.exports = makePost;
