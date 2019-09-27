const http = require('http');
const rpio = require('rpio');

const pin = 7;
const port = 1337;
const baseUrl = process.argv[2] || `http://raspberrypi.local:${port}`;
const server = http.createServer();

rpio.open(pin, rpio.OUTPUT, rpio.LOW);

server.on('request', (req, res) => {
    if (req.method === 'POST'){
        if (req.url === '/on') {
            rpio.write(pin, rpio.HIGH);
        }

        if (req.url === '/off') {
            rpio.write(pin, rpio.LOW);
        }

        res.end();
    } else {
        res.end(`
            <html>
                <head>
                    <title>Raspberry Pi GPIO controller</title>
                    <style>
                        button {
                            width: 500px;
                            height: 100px;
                            margin: 20px;
                            font-size: 30px;
                        }
                    </style>
                </head>
                <body>
                    <button onclick="_on()">ON</button>
                    <button onclick="_off()">OFF</button>
                    <script>
                        window._on = function () {
                            const ajax =  new XMLHttpRequest();
                            ajax.open('POST', '${baseUrl}/on');
                            ajax.send();
                        };

                        window._off = function () {
                            const ajax =  new XMLHttpRequest();
                            ajax.open('POST', '${baseUrl}/off');
                            ajax.send();
                        };
                    </script>
                </body>
            </html>
        `);
    }
});

server.listen(port, () => {
    console.log(`Server listening on: ${baseUrl}`);
});
