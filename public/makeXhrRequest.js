function makeXhrRequest(params, method, endpoint, contentType, cb) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      cb(JSON.parse(xhr.responseText));
    }
  };
  xhr.open(method, endpoint, true);
  xhr.setRequestHeader('Content-Type', contentType);
  xhr.send(params);
}
