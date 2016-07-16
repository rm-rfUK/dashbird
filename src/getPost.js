const pgClient = require('./pgClient.js')

function getPostById(id, callback) {
  var client = pgClient();
  client.query("SELECT * FROM posts WHERE postid=$1",
    [id],
      function(err, result) {
        if (err) console.log(err);
        callback(result.rows[0]);
        client.end();
      });
}

function getPostByHashtag(hashtag, callback) {
  var client = pgClient();
  client.query("SELECT * FROM posts WHERE hashtags LIKE $1 ORDER BY posts.date DESC",
    ['%' + hashtag + '%'],
      function(err, result) {
        if (err) console.log(err);
        callback(result.rows);
        client.end();
      });
}

function getPostBySearchTerm(searchTerm, callback) {
  var client = pgClient();
  client.query("SELECT * FROM posts WHERE username LIKE $1 OR text LIKE $1 OR hashtags LIKE $1 ORDER BY posts.date DESC",
    ['%' + searchTerm + '%'],
      function(err, result) {
        callback(err, result.rows);
        client.end();
      });
}

// function getPosts(searchTerm, category, callback) {
//   var client = new pg.Client(connectionString);
//   client.connect((err) => {
//     if (err) throw err;
//   });
// }

module.exports = {
    getPostById : getPostById,
    getPostByHashtag : getPostByHashtag,
    getPostBySearchTerm : getPostBySearchTerm
  }
