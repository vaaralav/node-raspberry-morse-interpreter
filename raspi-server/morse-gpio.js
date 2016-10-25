var wpi = require('wiring-pi');

const SHORT = 200;
const LONG = 500;

const time = {
  '.': SHORT,
  '-': LONG,
  ' ': LONG
}

// Use gpio pin numbering
wpi.setup('gpio');

module.exports.blinkMorseCode = function blinkMorseCode(morseCode, pin) {
  wpi.pinMode(pin, 'OUTPUT');
  morseCode.split("").map((c) => {
    wpi.digitalWrite(pin, 'HIGH');
    wpi.delay(time[c] || (2 * LONG));
    wpi.digitalWrite(pin, 'LOW');
    wpi.delay(SHORT);
  });
}

