function createContent(post) {
  createNode('post-container',post.date);
  createNode('post-container',post.text);
}

function createNode(parent, text) {
  var newParagraph = document.createElement('p');
  newParagraph.textContent = text;
  document.getElementById(parent).appendChild(newParagraph);
}
