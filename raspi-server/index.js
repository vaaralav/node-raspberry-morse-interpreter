var express = require('express');
var app = express();
var morse = require('morse');

app.get('/', function (req, res) {
  res.send(morse.encode('Hello World!'));
});

app.post('/morse', function(req, res) {
  console.log(req);
  res.send('OK');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
