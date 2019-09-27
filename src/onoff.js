const rpio = require('rpio');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const pin = 7;

rpio.open(pin, rpio.OUTPUT, rpio.LOW);

rl.on('line', (input) => {
  console.log(rpio.read(pin));
  if (input === 'on') {
    rpio.write(pin, rpio.HIGH);
    console.log(rpio.read(pin));
  }

  if (input === 'off')  {
    rpio.write(pin, rpio.LOW);
    console.log(rpio.read(pin));
  }
});

rl.on('SIGINT', () => {
  rl.close();
});
