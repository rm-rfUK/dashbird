const fs = require('fs');
const querystring = require('querystring');
const makePost = require('./database.js')
// var redis = require('redis');
// var client = redis.createClient();
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
      makePost(newPost, sendResponse);
      function sendResponse(error, reply) {
        if(error)console.log(error);
        response.writeHead(200, { 'Content-Type': 'text/json' });
        response.write(JSON.stringify(newPost));
        response.end();
      }
  });



  } else if (endpoint === '/get-posts') {
    // var pathToJSON = __dirname + '/posts.json';
    //
    // fs.readFile(pathToJSON, function (error, blogposts) {
    //   if (error) {
    //     throw error;
    //   }
      var fakePosts = [{
        date: 'Wed Jul 13 2016 08:54:44 GMT 0100 (BST)',
        text: 'I hope we can get our app working by #Friday',
        hashTags: '#Friday'
      },{
        date: 'Wed Jul 13 2016 08:55:03 GMT 0100 (BST)',
        text: 'Do a coding bootcamp they said. It will be easy they said...',
        hashTags: ''
      }];
      response.writeHead(200, { 'Content-Type': 'text/json' });
      response.write(JSON.stringify(fakePosts));
      response.end();
    // });
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

module.exports = handler;
