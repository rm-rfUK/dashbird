const tape = require("tape");
const shot = require("shot");
const handler = require("../src/handler.js");

tape("tests for / endpoint ", t => {
  shot.inject(handler, { method: 'get', url: '/' }, (res) => {
    t.equal(res.statusCode, 200, '/ has status code of 200');
    t.ok(res.payload.includes('<title>dashbird</title>'), 'finds the correct file (Website)');
    t.equal(res.headers['Content-Type'], 'text/html', 'response type is html');
    t.end();
  });
})

tape("tests for /add-post endpoint", t => {
  shot.inject(handler, { method: 'post', payload: 'asdflksdfkjhsdfk',url: '/add-post' }, (res) => {
    t.equal(res.statusCode, 302, '/add-post has status code of 302');
    t.end();
  });
})
