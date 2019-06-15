const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messages = require('./messageQueue');
const keypressHandler = require('./keypressHandler');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  if (req.method === 'OPTIONS') {
    console.log('Serving request type ' + req.method + ' for url ' + req.url);
    res.writeHead(200, headers);
    res.end();
    next(); // invoke next() at the end of a request to help with testing!
  } else if (req.method === 'GET') {
    console.log('Serving request type ' + req.method + ' url ' + req.url);
    res.writeHead(200, headers);
    res.end(messagesQueue.dequeue());
    next(); // invoke next() at the end of a request to help with testing!
  } else if (req.method === 'POST') {
    console.log('Serving request type ' + req.method + ' url ' + req.url);
    res.writeHead(201, headers);
    res.end();
  }
};


// step 2
// var randSwim = function () {
//   let command = ['up', 'down', 'left', 'right'];
//   let randCommand = command[Math.floor(Math.random() * command.length)]
//   return randCommand;
// }