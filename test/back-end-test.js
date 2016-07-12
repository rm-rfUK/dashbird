const tape = require('tape');
const shot = require('shot');
const handler = require('../src/handler.js');
const fakeredis = require('fakeredis');

tape('tests for / endpoint', t => {
  shot.inject(handler, { method: 'get', url: '/' }, (res) => {
    t.equal(res.statusCode, 200, '/ has status code of 200');
    t.ok(res.payload.includes('<title>dashbird</title>'), 'finds the correct file (Website)');
    t.equal(res.headers['Content-Type'], 'text/html', 'response type is html');
    t.end();
  });
});

// tape('tests for /add-post endpoint', t => {
//   shot.inject(handler, { method: 'post', payload: 'asdflksdfkjhsdfk', url: '/add-post' }, (res) => {
//     t.equal(res.statusCode, 302, '/add-post has status code of 302');
//     t.end();
//   });
// });

// tape('Test post function', t => {
//   const fakeClient = fakeredis.createClient();
//   const fakePost = {
//     'date': '12347589',
//     'text': 'this is the fake text that we are using to #test',
//     'hashTags': '#test'
//   }
//   fakeClient.set('tweetID', 1);
//   makePost(fakeClient,fakePost, function(response){return response});
//
//   //   // t.deepEqual(
//   //     // getPost(fakeClient, 1, function(response){return response})//,
//   //     // { 'date': '12347589',
//   //     //   'text': 'this is the fake text that we are using to #test',
//   //     //   'hashTags': '#test' },
//   //     // 'client should set and get data');
//   t.end();
// });
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

// client.set('tweetID', 1, function settingTweetIDCounter() {
//   client.incr('tweetID', function incrementTweetID(err, reply) {
//     client.get('tweetID', function createTweetHashInRedis(err, id){
//       if (err) throw err;
//       client.hmset(id, {
//           'date': newPost.date,
//           'text': newPost.text,
//           'hashTags': newPost.hashtags
//         })
        // client.hgetall(id, function getTweetHashFromRedis(error, reply){
        //   if(error)console.log(error);
        //   console.log(reply);
        //   response.writeHead(200, { 'Content-Type': 'text/json' });
        //   response.write(JSON.stringify(reply));
        //   response.end();
        // });
//       });
//     });
//   });
// });
