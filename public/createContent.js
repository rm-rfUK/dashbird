var globalArray = [];

function createContent(post) {
  removeElementsByClass("post");
  globalArray.push(post);
  globalArray.forEach(function(element, index) {
    console.log(element);
    createPostDiv(element.date, element.text);
  });
}

function createPostDiv(date, text) {
  var post = document.createElement('div');
  post.className = "post";
  var dateLine = document.createElement('p');
  var dateContent = document.createTextNode(date);
  var textLine = document.createElement('p');
  var textContent = document.createTextNode(text);
  post.appendChild(dateLine).appendChild(dateContent);
  post.appendChild(textLine).appendChild(textContent);
  document.getElementById('post-container').appendChild(post);
}

// function appendContentToPost(node, content)

function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}
//Onload go to the database and get back the last ten posts
//Put them into an array of objects

//When a post is made, add to the array
//Loop through the array and call createNode() for each element in the array
