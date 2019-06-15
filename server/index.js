


const keypressHandler = require('./js/keypressHandler');
const httpHandler = require('./js/httpHandler');
const messages = require('./js/messageQueue');
httpHandler.initialize(messages);
keypressHandler.initialize(message => messages.enqueue(message.toString()));


const http = require('http');
const server = http.createServer(httpHandler.router);

const port = 3000;
const ip = '127.0.0.1';
server.listen(port, ip);

console.log('Server is running in the terminal!');
console.log(`Listening on http://${ip}:${port}`);
