addEventToElem('sign-in-button', 'click', recordUserDetails);

function recordUserDetails(e) {
  e.preventDefault();
  const userName = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const queryString = makeUserQueryString(userName, email, password);
  makeXhrRequest(queryString, 'POST', '/add-user-record', 'application/x-www-form-urlencoded', hideSignIn)
}

function hideSignIn(username) {
  document.getElementsByClassName('sign-in')[0].classList.add('hidden');
  //issue creating a div here
  globalUser = username;
  var signedIn = document.createElement('div');
  signedIn.className = 'signed-in-as';
  appendContentToDiv(signedIn, `Signed in as ${globalUser}`);
  document.getElementById('heading').appendChild(signedIn);
}

function makeUserQueryString(userName, email, password) {
  return `userName=${userName}&email=${email}&password=${password}`
}
