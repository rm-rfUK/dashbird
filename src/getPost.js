var pg = require('pg');
pg.defaults.ssl = true;
require('env2')('config.env');
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

function getPostByHashtag(hashtag, callback) {
  var client = new pg.Client(connectionString);
  client.connect((err) => {
    if (err) throw err;
  });
  client.query("SELECT * FROM posts WHERE hashtags LIKE $1 ORDER BY posts.date DESC",
    ['%' + hashtag + '%'],
      function(err, result) {
        if (err) console.log(err);
        callback(result.rows);
        client.end();
      });
}

function getPostBySearchTerm(searchTerm, callback) {
  var client = new pg.Client(connectionString);
  client.connect((err) => {
    if (err) throw err;
  });
  client.query("SELECT * FROM posts WHERE hashtags LIKE $1 OR name LIKE $1 OR lastname LIKE $1 ORDER BY posts.date DESC",
    ['%' + hashtag + '%'],
      function(err, result) {
        if (err) console.log(err);
        callback(result.rows);
        client.end();
      });
}

module.exports = {
    getPostById : getPostById,
    getPostByHashtag : getPostByHashtag,
    getPostBySearchTerm : getPostBySearchTerm
  }
