const http = require('http');
const static = require('node-static');
const file = new static.Server('.', {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET',
    'Access-Control-Allow-Headers': 'Content-Type'
  }
});

http.createServer(function(req, res) {
  file.serve(req, res);
})
  .listen(8080);

console.log('Server running on port 8080');
