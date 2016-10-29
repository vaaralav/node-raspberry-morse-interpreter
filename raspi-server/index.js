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
  const morseCode = morse.encode(req.body.text);
  const response = {
    status: 'ok',
    result: morseCode,
    time: morseGpio.estimateTime(morseCode)
  };
  console.log(response);
  res.json(response);
  morseGpio.blinkMorseCode(morseCode, 17);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
