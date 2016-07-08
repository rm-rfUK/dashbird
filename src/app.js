var redis = require('redis');

var client = redis.createClient();

var newPost = {
 date: '1467994412124',
 text: 'hi #fri',
 hashtags: '#fri'
}


function addToList(listName, newPost) {
  var date = newPost.date;
  client.lpush(listName, date);
}

addToList('dateIDs', newPost);
