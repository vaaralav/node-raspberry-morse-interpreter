var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    morseGpio = require('./morse-gpio.js'),
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

app.post('/blink', function(req, res) {
  const blinkMorseCode = morse.encode(req.body.text);
  res.json({status: 'ok', result: morseCode});
  morseGpio.blinkMorseCode(morseCode, 17);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
