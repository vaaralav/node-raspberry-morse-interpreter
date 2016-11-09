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
var isWaiting = false;

function createMorseEntity(text) {
  return {
    'id': ++id,
    'text': text,
    'morse': morse.encode(text)
  }
};

function getById(id) {
  return queue.find(function(entity) {
    console.log(entity.id, id, entity.id === id);
    return entity.id === id;
  });
}

function deleteById(id) {
  const index = queue.indexOf(getById(id));
  queue.splice(index, 1);
}

// Parse body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 

// Logger
app.use(morgan('combined'));

// Serve client
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

// Serve client static files
app.use(express.static(__dirname + '/client'));

var tryToSend = function tryToSend() {
  if(!isWaiting && queue.length) {
    const morseEntity = queue.slice(0,1)[0];
    isWaiting = true;

    request({
      url: API_URL + '/blink',
      method: 'POST',
      json: morseEntity
    }, function(error, response, body) {
      if(error) {
        console.error(error, response, body);
        isWaiting = false;
      } else {
        console.log(body);
      }
    });
  }
};

var addNewEntity = function addNewEntity(text) {
  queue.push(createMorseEntity(text));
};

// API
// ---

// Create new morse entity
app.post('/api/morse', function(req, res) {
  if(!req.body.text || typeof req.body.text !== 'string' && !(req.body.text instanceof String)) {
    console.log(req.body);
    return res.sendStatus(400);
  }
  addNewEntity(req.body.text);
  tryToSend();
});

// List entities
app.get('/api/morse', function(req, res) {
  res.json(queue);
});

app.get('/api/morse/:id', function(req, res) {
  const entity = getById(+req.params.id);
  console.log(queue, id, entity);
  if(entity) {
    res.json(entity);
  } else {
    res.sendStatus(404);
  }
});

app.delete('/api/morse/:id', function(req, res) {
  if(!getById(+req.params.id)) {
    return res.sendStatus(404);
  }
  console.log('before delete', queue.slice());
  deleteById(+req.params.id);
  console.log('after delete', queue.slice());
  isWaiting = false;
  res.sendStatus(200);
  tryToSend();
});


app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
