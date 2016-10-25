var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    morse = require('morse');

// Parse body
app.use(bodyParser.json());

// Logger
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.send(morse.encode('Hello World!'));
});

app.post('/morse', function(req, res) {
  res.json({status: 'ok', result: morse.encode(req.body.text)});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
