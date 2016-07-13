var globalArray = [];

function createPostsOnDashboard(postArrayOrObject) {
  removeElementsByClass("post");
  var postArray = postArrayOrObject[0] ? postArrayOrObject : [postArrayOrObject];
  postArray.forEach(function(post) {
    globalArray.push(post);
  });
  globalArray.forEach(function(post) {
    createPostDiv(post.date, post.text);
  });
}

function createPostDiv(date, text) {
  var post = document.createElement('div');
  post.className = "post";
  appendContentToDiv(post, date);
  appendContentToDiv(post, text);
  document.getElementById('post-container').appendChild(post);
}

function appendContentToDiv(node, content) {
  var line = document.createElement('p');
  var content = document.createTextNode(content);
  node.appendChild(line).appendChild(content);
}

function removeElementsByClass(className){
  var elements = document.getElementsByClassName(className);
  while(elements.length > 0){
    elements[0].parentNode.removeChild(elements[0]);
  }
}
