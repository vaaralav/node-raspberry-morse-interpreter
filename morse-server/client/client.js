var morseClient = (function($) {
  var module = {exports: {}};

  module.exports.getMorseQueue = function getMorseQueue(callback) {
    $.getJSON('/api/morse', callback);
  }

  module.exports.submitText = function submitText(text) {
    $.ajax('/api/morse', {
      method: 'POST',
      headers: {
        Accept: "application/json"
      },
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({text: text}),
      accepts: {
        json: 'application/json'
      }
    }
    );
  }
  return module.exports;
})(jQuery);

var morseUI = (function($) {
  var module = {exports: {}};

  module.exports.populateQueue = function populateQueue(queue) {

    $('#queue').empty()
    var $queue = queue.map(function(morseEntity) {
      return $('<li>').append($('<div>').text(morseEntity.text)).append($('<div>').text(morseEntity.morse));
    });
    $('#queue').append($queue);
  };

  return module.exports;
})(jQuery);

$(document).ready(function() {

  const POLL_INTERVAL = 1500;

  morseClient.getMorseQueue(morseUI.populateQueue);

  var pollInterval = setInterval(function() {
    morseClient.getMorseQueue(morseUI.populateQueue);
  }, POLL_INTERVAL);

  $('#morse-form').on('submit', function(e) {
    e.preventDefault();
    morseClient.submitText($('#text', '#morse-form').val());
    document.getElementById('morse-form').reset();
    morseClient.getMorseQueue(morseUI.populateQueue);
  })
});