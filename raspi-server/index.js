var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    morseGpio = require('./morse-gpio.js'),
    morse = require('morse'),
    request = require('request'),
    API_URL = require('./config.json').API_URL;

// Parse body
app.use(bodyParser.json());

// Logger
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.send(morse.encode('Hello World!'));
});

function validateRequest(req) {
  const isMorseValid = req.body.morse && (typeof req.body.morse == 'string' || req.body.morse instanceof String);
  const isIdValid = req.body.id && Number.isInteger(req.body.id);
  return isMorseValid && isIdValid;
}

app.post('/blink', function(req, res) {
  if(!validateRequest(req)) {
    console.error(JSON.stringify(req.body));
    res.sendStatus(400);
  }
  res.sendStatus(202);
  morseGpio.blinkMorseCode(req.body.morse, 17);
  request({
    method: 'DELETE',
    url: API_URL + '/morse/' + req.body.id
  })
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
