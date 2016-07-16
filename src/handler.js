const fs = require('fs');
const querystring = require('querystring');
const createUserRecord = require('./createUserRecord.js');
const makePost = require('./makePost.js');
const getPosts = require('./getPosts.js');
const responder = require('./responder.js');

function handler(request, response) {
  var endpoint = request.url;
  if (endpoint === '/') {
    var pathToIndex = __dirname + '/../public/index.html';
    fs.readFile(pathToIndex, function (error, file) {
      if (error) throw error;
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(file);
      response.end();
    });
  } else if (endpoint === '/add-user-record') {
    var data = '';
    request.on('data', function (chunk) {
      data += chunk;
    });
    request.on('end', function () {
      var newRecord = querystring.parse(data);
      createUserRecord(newRecord, responder);
    });
  } else if (endpoint === '/add-post') {
    var data = '';
    request.on('data', function (chunk) {
      data += chunk;
    });
    request.on('end', function () {
      var newPost = querystring.parse(data);
      makePost(newPost, responder);
    });
  } else if (endpoint.indexOf('/get-posts') !== -1) {
    let searchTerm = endpoint.split('=')[1];
    let category = searchTerm[0] === '#' ? 'hashtags' : 'text';
    getPosts(category, searchTerm, responder);
  } else {
    var pathToFile = __dirname + '/../public' + endpoint;
    var fileExtensionArray = endpoint.split('.');
    var fileExtension = fileExtensionArray[1];
    fs.readFile(pathToFile, function (error, file) {
      if (error) throw error;
      response.writeHead(200, { 'Content-Type': 'text/' + fileExtension });
      response.write(file);
      response.end();
    });
  }
}

module.exports = handler;
