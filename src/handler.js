const fs = require('fs');
const querystring = require('querystring');
var redis = require('redis');
var client = redis.createClient();
// var makePost = require('./makePost');

function handler(request, response) {
  var endpoint = request.url;

  if (endpoint === '/') {
    var pathToIndex = __dirname + '/../public/index.html';

    fs.readFile(pathToIndex, function (error, file) {
      if (error) {
        throw error;
      }
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(file);
      response.end();
    });
  } else if (endpoint === '/add-post') {
    var data = '';

    request.on('data', function (chunk) {
      data += chunk;
    });

    request.on('end', function () {
      var newPost = querystring.parse(data);
      console.log('New Post:', newPost);

//For each new post we need to increment tweetID.  Then create the newHash with the newest tweetID.


client.set('tweetID', 1, function settingTweetIDCounter() {
  client.incr('tweetID', function incrementTweetID(err, reply) {
    console.log('TweetID: ', reply);
    client.get('tweetID', function createTweetHashInRedis(err, id){
      if (err) throw err;
      console.log('Id: ', id);
      client.hmset(id, {
          'date': newPost.date,
          'text': newPost.text,
          'hashTags': newPost.hashtags
        })
        client.hgetall(id, function getTweetHashFromRedis(error, reply){
          if(error)console.log(error);
          console.log(reply);
        });
      });
    });
    });
  });

  } else if (endpoint === '/get-posts') {
    var pathToJSON = __dirname + '/posts.json';

    fs.readFile(pathToJSON, function (error, blogposts) {
      if (error) {
        throw error;
      }
      response.writeHead(200, { 'Content-Type': 'text/json' });
      response.write(blogposts);
      response.end();
    });
  } else {
    var pathToFile = __dirname + '/../public' + endpoint;
    var fileExtensionArray = endpoint.split('.');
    var fileExtension = fileExtensionArray[1];

    fs.readFile(pathToFile, function (error, file) {
      if (error) {
        throw error;
      }
      response.writeHead(200, { 'Content-Type': 'text/' + fileExtension });
      response.write(file);
      response.end();
    });
  }
}

// function

module.exports = handler;
