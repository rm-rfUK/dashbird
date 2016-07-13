var http = require('http');

var handler = require('./src/handler.js');

var server = http.createServer(handler);

var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log(`Server is listening on ${port}`);
})
