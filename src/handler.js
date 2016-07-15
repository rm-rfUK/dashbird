const fs = require('fs');
const querystring = require('querystring');
const makePost = require('./makePost.js');
const createUserRecord = require('./createUserRecord.js')
const getPost = require('./getPost.js');

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
  } else if (endpoint === '/add-user-record') {
    var data = '';
    request.on('data', function (chunk) {
      data += chunk;
    });
    request.on('end', function () {
      var newRecord = querystring.parse(data);
      createUserRecord(newRecord, sendUserSuccessResponse);
      function sendUserSuccessResponse(reply) {
        if (reply.name != 'error') {
          response.writeHead(200, { 'Content-Type': 'text/json' });
          response.write(JSON.stringify(reply));
          response.end();
        } else if (reply.name === 'error'){
          response.writeHead(400, { 'Content-Type': 'text/plain' });
          response.write('Username already exists');
          response.end();
        }
      }
    });

  } else if (endpoint === '/add-post') {
    var data = '';
    request.on('data', function (chunk) {
      data += chunk;
    });
    request.on('end', function () {
      var newPost = querystring.parse(data);
      makePost(newPost, sendPostSuccessResponse);
      function sendPostSuccessResponse(reply) {
        if (reply) {
          response.writeHead(200, { 'Content-Type': 'text/json' });
          response.write(JSON.stringify(newPost));
          response.end();
        }
      }
  });

  } else if (endpoint.indexOf('/get-posts') !== -1) {
    var searchTerm = endpoint.split('=')[1];
    getPost.getPostBySearchTerm(searchTerm, sendSearchSuccessResponse);
    function sendSearchSuccessResponse(posts) {
      response.writeHead(200, { 'Content-Type': 'text/json' });
      response.write(JSON.stringify(posts));
      response.end();
    }

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
