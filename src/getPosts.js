const pgClient = require('./pgClient.js')

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

module.exports = getPosts
