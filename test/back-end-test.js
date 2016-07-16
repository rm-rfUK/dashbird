const tape = require('tape');
const shot = require('shot');
const handler = require('../src/handler.js');
const makePost = require('../src/makePost.js');
const getPosts = require('../src/getPosts.js');
const createUserRecord = require('../src/createUserRecord.js');


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

  let fakePost = {
    date: 'Wed Jul 13 2016 08:54:44 GMT 0100 (BST)',
    text: 'I hope we can get our app working by #Friday',
    hashtags: '#Friday'
  }

  makePost(fakePost, setPostIdToTest);

  function setPostIdToTest (err, postid) {
    postIdToTest = postid;
    getPosts('postid', postIdToTest, function(err, posts){
      t.deepEqual(posts[0],
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

tape('Test get function works with text', t => {
  let randomTextString = String(Math.random());

  let fakePost = {
    date: 'Wed Jul 13 2016 08:54:44 GMT 0100 (BST)',
    text: randomTextString,
    hashtags: '#Friday'
  }

  makePost(fakePost, setPostIdToTest);

  function setPostIdToTest (err, postid) {
    postIdToTest = postid;
    getPosts('text', randomTextString, function(err, posts){
      t.equal(posts[0].text, randomTextString, 'getPosts should return a post with the correct text');
      t.equal(posts.length, 1, 'If text is unique, getPosts should return only one post');
      t.equal(posts[0].postid, postIdToTest, 'The post returned should be the correct one');
      t.end();
    });
  }
});

tape('Test get function works with hashtags', t => {
  let randomTextString = '#' + String(Math.random());

  let fakePost = {
    date: 'Wed Jul 13 2016 08:54:44 GMT 0100 (BST)',
    text: 'I hope we can get our app working by #Friday',
    hashtags: randomTextString
  }

  makePost(fakePost, setPostIdToTest);

  function setPostIdToTest (err, postid) {
    postIdToTest = postid;
    getPosts('hashtags', randomTextString, function(err, posts){
      t.equal(posts[0].hashtags, randomTextString, 'getPosts should return a post with the correct hashtag');
      t.equal(posts.length, 1, 'If hashtag is unique, getPosts should return only one post');
      t.equal(posts[0].postid, postIdToTest, 'The post returned should be the correct one');
      t.end();
    });
  }
});


tape('if new user gets created', t => {
  const randomUserName = String(Math.random());

  const fakeUser = {
    userName: randomUserName,
    email: 'a@g.com',
    password: 'isanidiot'
  }

  createUserRecord(fakeUser, testUserName);

  function testUserName(err, userName) {
    t.equal(userName, fakeUser.userName, 'usernames match');
    t.end();
  }

})

tape('checking if the same user name can be added twice', t => {
  const randomUserName = String(Math.random());

  const fakeUser = {
    userName: randomUserName,
    email: 'a@g.com',
    password: 'isanidiot'
  }

  const errorMessage = `Key (username)=(${randomUserName}) already exists.`;
  createUserRecord(fakeUser, function(){});
  createUserRecord(fakeUser, checkDuplicates);

  function checkDuplicates(err, userName) {
    t.equals(err.detail, errorMessage, 'no duplicates in the username column');
    t.end();
  }

})
