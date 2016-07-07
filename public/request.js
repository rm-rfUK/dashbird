addEventToElem('submit-button', 'click', makePost);

function addEventToElem(elemId, event, cb) {
  document.getElementById(elemId).addEventListener(event, cb);
}

function makePost(e) {
  e.preventDefault();
  const xhr = new XMLHttpRequest();
  const dateOfPost = new Date();
  const blogPostText = document.getElementById('blogpost').value;
  const hashTags = findHashTags(blogPostText);
  const params = `date=${dateOfPost}&text=${blogPostText}&hashtags=${hashTags}`;
  xhr.open('POST', '/add-post', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(params);
}

function findHashTags(text) {
  const regex = /\S*#(?:\[[^\]]+\]|\S+)/g;
  const hashTagArray = text.match(regex);
  return hashTagArray.join(',');
}
