addEventToElem('submit-button', 'click', makePost(e, 'blogpost'));

function addEventToElem(elemId, event, cb) {
  document.getElementById(elemId).addEventListener(event, cb);
}

function makePost(e, elemId) {
  e.preventDefault();
  const dateOfPost = new Date();
  const blogPostText = getBlogAndResetTextArea(elemId);
  const hashTags = findHashTags(blogPostText);
  const params = makeQueryString(dateOfPost, blogPostText, hashTags);
  makeXhrRequest(params, 'POST', '/add-post', 'application/x-www-form-urlencoded', cb);
}

function getBlogAndResetTextArea(elemId){
  const elem = document.getElementById(elemId);
  const blogPostText = elem.value;
  elem.value = null;
  return blogPostText;
}

function makeXhrRequest(params, method, endpoint, contentType, cb) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystate = function onReadyStateChange() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      cb(xhr.responseText);
    }
  };
  xhr.open(method, endpoint, true);
  xhr.setRequestHeader('Content-Type', contentType);
  xhr.send(params);
}

function makeQueryString(date, text, hashtags) {
  return `date=${date}&text=${text}&hashtags=${hashtags}`;
}

function findHashTags(text) {
  const regex = /\S*#(?:\[[^\]]+\]|\S+)/g;
  const hashTagArray = text.match(regex);
  return hashTagArray ? hashTagArray.join(',') : null;
}
