addEventToElem('submit-button', 'click', makePost);
addEventToWindow('load', getPostsFromDatabase);

function makePost(e) {
  e.preventDefault();
  const dateOfPost = new Date();
  const blogPostText = document.getElementById('blogpost').value;
  document.getElementById('blogpost').value = null;
  const hashTags = findHashTags(blogPostText);
  const queryString = makeQueryString(dateOfPost, blogPostText, hashTags);
  makeXhrRequest(queryString, 'POST', '/add-post', 'application/x-www-form-urlencoded', createPostsOnDashboard)
}

function getPostsFromDatabase() {
  makeXhrRequest('', 'GET', '/get-posts', 'text/json', createPostsOnDashboard)
}

function makeQueryString(date,text,hashtags) {
  return `date=${date}&text=${text}&hashtags=${hashtags}`;
}

function findHashTags(text) {
  const regex = /\S*#(?:\[[^\]]+\]|\S+)/g;
  const hashTagArray = text.match(regex);
  return hashTagArray ? hashTagArray.join(',') : null;
}

function addEventToElem(elemId, event, cb) {
  document.getElementById(elemId).addEventListener(event, cb);
}

function addEventToWindow(event, cb) {
  window.addEventListener(event, cb);
}
