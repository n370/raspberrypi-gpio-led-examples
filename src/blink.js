const rpio = require('rpio');

const pin = 7;

rpio.open(pin, rpio.OUTPUT, rpio.LOW);

setInterval(() => {
    if (rpio.read(pin) === 0) {
        rpio.write(pin, rpio.HIGH);
    } else {
        rpio.write(pin, rpio.LOW);
    }
}, 500);
