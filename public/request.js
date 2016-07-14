addEventToElem('submit-button', 'click', makePost);
addEventToElem('sign-in-button', 'click', recordUserDetails);
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

function recordUserDetails(e) {
  e.preventDefault();
  const userName = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const queryString = makeUserQueryString(userName,email,password);
  makeXhrRequest(queryString, 'POST', '/add-user-record', 'application/x-www-form-urlencoded', hideSignIn)
}

function hideSignIn(username) {
  document.getElementsByClassName('sign-in')[0].classList.add('hidden');
  //issue creating a div here
  var signedIn = document.createElement('div');
  signedIn.className = 'signed-in-as';
  appendContentToDiv(signedIn, `Signed in as ${username}`);
  document.getElementById('heading').appendChild(signedIn);
}

function getPostsFromDatabase() {
  makeXhrRequest('', 'GET', '/get-posts', 'text/json', createPostsOnDashboard)
}

function makeQueryString(date,text,hashtags) {
  return `date=${date}&text=${text}&hashtags=${hashtags}`;
}

function makeUserQueryString(userName, email, password) {
  return `userName=${userName}&email=${email}&password=${password}`
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
