var pg = require('pg');
pg.defaults.ssl = true;
//this connection string will be hidden as environment variables
var connectionString = 'postgres://offlqpmqxhyutg:oaFSW5OBBnHQkrxVuf6ZU5dNgp@ec2-54-243-55-26.compute-1.amazonaws.com:5432/d23jepi7vhlk8h'

function makePost(post, callback) {
  var client = new pg.Client(connectionString);
  client.connect((err) => {
    if (err) throw err;
  });
  var date = post.date.slice(0, -18);
  var time = post.date.slice(16, 25);
  var text = post.text;
  var hashTags = post.hashTags;
  var username = post.userName;
  client.query("INSERT INTO posts(date, time, text, hashtags, username) values($1, $2, $3, $4, $5) RETURNING postid",
    [date, time, text, hashTags, username],
      function(err, result) {
        if (err) console.log(err);
        callback(result);
        console.log('post inserted with postid: ' + result.rows[0].postid);
        client.end();
      });
}

module.exports = makePost;
