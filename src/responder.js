function responder(err, reply) {
  if (err) {
    let error = err.detail || err;
    response.writeHead(400, { 'Content-Type': 'text/plain' });
    response.write(error);
    response.end();
  } else {
    response.writeHead(200, { 'Content-Type': 'text/json' });
    response.write(JSON.stringify(reply));
    response.end();
  }
}

module.exports = responder;
