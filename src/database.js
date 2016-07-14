var pg = require('pg');
pg.defaults.ssl = true;
var connectionString = 'postgres://offlqpmqxhyutg:oaFSW5OBBnHQkrxVuf6ZU5dNgp@ec2-54-243-55-26.compute-1.amazonaws.com:5432/d23jepi7vhlk8h'

function makePost(post) {
  var client = new pg.Client(connectionString);
  client.connect((err) => {
    if (err) throw err;
  });
  var date = post.date.slice(0, -24);
  var time = post.date.slice(16, 34);
  var text = post.text;
  var hashTags = post.hashTags;
  var username = post.userName;
  client.query("INSERT INTO posts(date, time, post, hashtags, username) values($1, $2, $3, $4, $5) RETURNING postid",
    [date, time, text, hashTags, username],
      function(err, result) {
        if (err) console.log(err);
        console.log('post inserted with postid: ' + result.rows[0].postid);
        client.end();
      });
  client.end();
}

var fakePost = {
  date: 'Wed Jul 13 2016',
  time: '08:55:03 GMT 0100',
  text: 'Do a coding bootcamp they said. It will be easy they said...',
  hashTags: '',
  username: 'Rory'
}

makePost(fakePost)
