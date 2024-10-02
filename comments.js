// Create a web server

// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');
var url = require('url');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
    var path = url.parse(request.url).pathname;
    switch (path) {
        case '/':
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write('<h1>Hello World!</h1>');
            response.end();
            break;
        case '/socket.io.js':
            response.writeHead(200, { 'Content-Type': 'application/javascript' });
            var file = fs.createReadStream('node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js');
            file.pipe(response);
            break;
        case '/comments':
            if (request.method == 'POST') {
                console.log('POST');
                var body = '';
                request.on('data', function (data) {
                    body += data;
                    console.log('Partial body: ' + body);
                });
                request.on('end', function () {
                    console.log('Body: ' + body);
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end('post received');
                });
            } else {
                console.log('GET');
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end('get received');
            }
            break;
        default:
            response.writeHead(404);
            response.write('Route not defined');
            response.end();
    }
});

// Listen on port 8000, IP defaults to