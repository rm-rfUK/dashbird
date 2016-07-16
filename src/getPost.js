const pgClient = require('./pgClient.js')

function getPostById(id, callback) {
  let client = pgClient();
  client.query("SELECT * FROM posts WHERE postid=$1",
    [id],
      function(err, result) {
        if (err) console.log(err);
        callback(result.rows[0]);
        client.end();
      });
}

function getPostByHashtag(hashtag, callback) {
  let client = pgClient();
  client.query("SELECT * FROM posts WHERE hashtags LIKE $1 ORDER BY posts.date DESC",
    ['%' + hashtag + '%'],
      function(err, result) {
        if (err) console.log(err);
        callback(result.rows);
        client.end();
      });
}

function getPostBySearchTerm(searchTerm, callback) {
  let client = pgClient();
  client.query("SELECT * FROM posts WHERE username LIKE $1 OR text LIKE $1 OR hashtags LIKE $1 ORDER BY posts.date DESC",
    ['%' + searchTerm + '%'],
      function(err, result) {
        callback(err, result.rows);
        client.end();
      });
}

function getPosts(category, searchTerm, callback) {
  let client = pgClient();
  let querystring = `SELECT * FROM posts WHERE ${category} `;
  querystring += (category === 'postid') ? '= $1' : 'LIKE $1';
  let queryTerms = (category === 'postid') ? [searchTerm] : ['%' + searchTerm + '%'];
  client.query(querystring, queryTerms, function(err, result) {
    if (err) {
      callback(err);
      client.end();
    } else {
      callback(err, result.rows);
      client.end();
    }
  });
}

module.exports = {
    getPosts : getPosts,
    getPostById : getPostById,
    getPostByHashtag : getPostByHashtag,
    getPostBySearchTerm : getPostBySearchTerm
  }
