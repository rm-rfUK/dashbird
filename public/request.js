addEventToElem('submit-button', 'click', makePost);

function addEventToElem(elemId, event, cb) {
  document.getElementById(elemId).addEventListener(event, cb);
}

function makePost(e) {
  e.preventDefault();
  const xhr = new XMLHttpRequest();
  const dateOfPost = new Date();
  const blogPostText = document.getElementById('blogpost').value;
  const params = `date=${dateOfPost}&text=${blogPostText}`;
  xhr.open('POST', '/add-post', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(params);
}
