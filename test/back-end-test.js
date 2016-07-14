const tape = require('tape');
const shot = require('shot');
const handler = require('../src/handler.js');
const makePost = require('../src/database.js');
const getPostById = require('../src/getPost.js');

tape('tests for / endpoint', t => {
  shot.inject(handler, { method: 'get', url: '/' }, (res) => {
    t.equal(res.statusCode, 200, '/ has status code of 200');
    t.ok(res.payload.includes('<title>dashbird</title>'), 'finds the correct file (Website)');
    t.equal(res.headers['Content-Type'], 'text/html', 'response type is html');
    t.end();
  });
});

tape('Test post function', t => {
  let postIdToTest = null;

  const fakePost = {
    date: 'Wed Jul 13 2016 08:54:44 GMT 0100 (BST)',
    text: 'I hope we can get our app working by #Friday',
    hashtags: '#Friday'
  }

  makePost(fakePost, setPostIdToTest);

  function setPostIdToTest (postid) {
    postIdToTest = postid;
    getPostById(postIdToTest, function(post){
      t.deepEqual(post,
        { date: new Date('Wed Jul 13 2016'),
          hashtags: '#Friday',
          postid: postIdToTest,
          text: 'I hope we can get our app working by #Friday',
          time: '08:54:44',
          username: null },
      'makePost should send a post to the database');
      t.end();
    });
  }
});

//
// function makePost(client, post, cb){
//   client.get('tweetID', function(err, id) {
//     if (err) console.log(err);
//     client.hmset(id, ['date', post.date,'text', post.text, 'hashTags', post.hashtags]);
//     client.hgetall(id, function(err, obj) {
//       if(err)console.log(err);
//       console.log(obj);
//       return cb(obj)
//     });
//   });
// }

// function getPost(client, id, cb) {
//   client.hgetall(id, function(error, reply){
//     if(error)console.log(error);
//     console.log(reply);
//     return cb(reply)
//   });
// }
