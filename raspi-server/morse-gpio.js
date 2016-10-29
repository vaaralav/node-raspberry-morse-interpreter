var wpi = require('wiring-pi');

const TIME_UNIT = 150;

const morseUnits = {
  '.': {
    'mode': wpi.HIGH,
    'time': TIME_UNIT
  },
  '-': {
    'mode': wpi.HIGH,
    'time': 3 * TIME_UNIT
  },
  ' ': {
    'mode': wpi.LOW,
    'time': 2 * TIME_UNIT
  }
};

// Use gpio pin numbering
wpi.setup('gpio');

module.exports.blinkMorseCode = function blinkMorseCode(morseCode, pin) {
  wpi.pinMode(pin, wpi.OUTPUT);
  morseCode.split('').map((c) => {
    // Get unit. Default to space between words.
    const unit = morseUnits[c] || {'mode': wpi.LOW, 'time': 6 * TIME_UNIT};
    wpi.digitalWrite(pin, unit.mode);
    wpi.delay(unit.time);
    // Always add space between parts of the same letter == 1 unit
    wpi.digitalWrite(pin, wpi.LOW);
    wpi.delay(TIME_UNIT);
  });
}

module.exports.estimateTime = function estimateTime(morseCode) {
  return morseCode.split('').reduce(function(totalTime, c) {
    totalTime += morseUnits[c].time || 6 * TIME_UNIT;
    totalTime += TIME_UNIT;
  }, 0);
}

