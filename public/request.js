addEventToElem('submit-button', 'click', makePost);

function addEventToElem(elemId, event, cb) {
  document.getElementById(elemId).addEventListener(event, cb);
}

function makePost(e) {
  e.preventDefault();
  const xhr = new XMLHttpRequest();
  const dateOfPost = Date.now();
  const blogPostText = document.getElementById('blogpost').value;
  document.getElementById('blogpost').value = null;
  const hashTags = findHashTags(blogPostText);
  xhr.open('POST', '/add-post', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(makeQueryString(dateOfPost, blogPostText, hashTags));
}

function makeXhrRequest(params, method, endpoint, contentType, cb) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystate = function onReadyStateChange() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log('hello');
      console.log(xhr.responseText);
      cb(JSON.parse(xhr.responseText));
    }
  };
  xhr.open(method, endpoint, true);
  xhr.setRequestHeader('Content-Type', contentType);
  xhr.send(params);
}

function makeQueryString(date,text,hashtags) {
  return `date=${date}&text=${text}&hashtags=${hashtags}`;
}

function findHashTags(text) {
  const regex = /\S*#(?:\[[^\]]+\]|\S+)/g;
  const hashTagArray = text.match(regex);
  return hashTagArray ? hashTagArray.join(',') : null;
}

function displayTweet(tweet) {
  var node = document.getElementById('post-container');
  var date = document.createTextNode(tweet.date);
  var text = document.createTextNode(tweet.text);
  var hashtags = document.createTextNode(tweet.hashtags);
  node.appendChild(date);
  node.appendChild(text);
  node.appendChild(hashtags);
}
