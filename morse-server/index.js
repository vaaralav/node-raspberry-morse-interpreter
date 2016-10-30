var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    morse = require('morse'),
    request = require('request'),
    config = require('./config.json'),
    API_URL = config.API_URL;


// Stuff
var queue = [];
var id = 0;

function createMorseEntity(text) {
  return {
    'id': ++id,
    'text': text,
    'morse': morse.encode(text)
  }
};

function getById(id) {
  return queue.find(function(entity) {
    return entity.id === id;
  });
}

function deleteById(id) {
  const index = queue.indexOf(getById(id));
  queue.splice(index, 1);
}

// Parse body
app.use(bodyParser.json());

// Logger
app.use(morgan('combined'));

// Serve client
app.get('/', function (req, res) {
  res.sendFile('client/index.html');
});

// Serve client static files
app.use(express.static('client/assets'));

// API
// ---

// Create new morse entity
app.post('/api/morse', function(req, res) {
  if(!req.body.text || typeof req.body.text !== 'string' && !(req.body.text instanceof String)) {
    res.send(400);
  }
  var newMorseEntity = createMorseEntity(req.body.text);

  request({
    url: API_URL + '/blink',
    method: 'POST',
    json: newMorseEntity
  }, function(error, response, body) {
    if(error) {
      console.error(error, response, body);
      res.status(500).json(body);
    } else {
      queue.push(newMorseEntity);
      res.status(201).json(newMorseEntity);
    }
  });
});

// List entities
app.get('/api/morse', function(req, res) {
  res.json(queue);
});

app.delete('/api/morse/:id', function(req, res) {
  if(!getById(req.params.id)) {
    res.sendStatus(404);
  }

  deleteById(req.params.id);
  res.sendStatus(200);
});


app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
