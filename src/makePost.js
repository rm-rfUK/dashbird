var redis = require('redis');
var client = redis.createClient();

var tweetID = 1;

function makePost(tweetID) {
  tweetID += 1;
  client.hmset(tweetID, {
  'date': newPost.date,
  'text': newPost.text,
  'hashTags': newPost.hashtags
})
}

module.exports = makePost;
