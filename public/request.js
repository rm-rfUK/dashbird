const button = document.getElementById('submit-button');
button.addEventListener('click', makePost);

function makePost(e) {
  e.preventDefault();
  const xhr = new XMLHttpRequest();
  const dateOfPost = new Date();
  const blogPostText = document.getElementById('blogpost').value;
  const params = `date=${dateOfPost}&text=${blogPostText}`;
  xhr.open('POST', '/add-post', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('Content-length', params.length);
  xhr.setRequestHeader('Connection', 'close');
  xhr.send(params);
}
