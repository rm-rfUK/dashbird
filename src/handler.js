const fs = require('fs');
const querystring = require('querystring');
const createUserRecord = require('./createUserRecord.js');
const makePost = require('./makePost.js');
const getPosts = require('./getPosts.js');

function handler(request, response) {
  let endpoint = request.url;
  if (endpoint === '/') {
    let pathToIndex = __dirname + '/../public/index.html';
    fs.readFile(pathToIndex, function (error, file) {
      if (error) throw error;
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(file);
      response.end();
    });
  } else if (endpoint === '/add-user-record') {
    let data = '';
    request.on('data', function (chunk) {
      data += chunk;
    });
    request.on('end', function () {
      let newRecord = querystring.parse(data);
      createUserRecord(newRecord, responder);
    });
  } else if (endpoint === '/add-post') {
    let data = '';
    request.on('data', function (chunk) {
      data += chunk;
    });
    request.on('end', function () {
      let newPost = querystring.parse(data);
      makePost(newPost, responder);
    });
  } else if (endpoint.indexOf('/get-posts') !== -1) {
    let searchTerm = endpoint.split('=')[1];
    let category = searchTerm[0] === '#' ? 'hashtags' : 'text';
    getPosts(category, searchTerm, responder);
  } else {
    let pathToFile = __dirname + '/../public' + endpoint;
    let fileExtensionArray = endpoint.split('.');
    let fileExtension = fileExtensionArray[1];
    fs.readFile(pathToFile, function (error, file) {
      if (error) throw error;
      response.writeHead(200, { 'Content-Type': 'text/' + fileExtension });
      response.write(file);
      response.end();
    });
  }
  function responder(err, reply) {
    if (err) {
      let error = err.detail || err;
      response.writeHead(400, { 'Content-Type': 'text/plain' });
      response.write(error);
      response.end();
    } else {
      response.writeHead(200, { 'Content-Type': 'text/json' });
      response.write(JSON.stringify(reply));
      response.end();
    }
  }
}

module.exports = handler;
