const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messages = require('./messageQueue');
const keypressHandler = require('./keypressHandler');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpeg');
console.log('Test:', module.exports.backgroundImageFile);
////////////////////////////////////////////////////////
//console.log('BG', module.exports.backgroundImageFile);
let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
    next(); 
  } else if (req.method === 'GET') { // GET

    //console.log('test');
    if (req.url === '/moves') {
      res.writeHead(200, headers);
      res.write(messageQueue.dequeue() || '');
      res.end();
      next(); 
    } else if (req.url === '/background.jpeg' || req.url === module.exports.backgroundImageFile) {
      let {backgroundImageFile} = module.exports;
      console.log('bg path:', backgroundImageFile);
      fs.readFile(backgroundImageFile, (err, results) => {
        if (err) {
          console.log('Server missing:', backgroundImageFile);
          res.writeHead(404, headers);
          res.end();
          next();
        } else {
          console.log('Server sent back background image successfully:', backgroundImageFile);
          res.writeHead(200, headers);
          res.write(results);
          res.end();
          next();
        }
      });
    } else if (req.url === '/?up' || req.url === '/?down' || req.url === '/?left' || req.url === '/?right' ) { 
      res.writeHead(200, headers);
      res.write(req.url.substring(2, req.url.length));
      res.end();
      next();
    } else {
      res.writeHead(404, headers);
      res.end();
      next();
    }
  } else if (req.method === 'POST') {
    if (req.url === '/moves-post') {
      console.log('Serving request type ' + req.method + ' URL ' + req.url);
      res.writeHead(201, headers);
      console.log('POST RES:', req.data); // undefined
      res.end();
      next();
    }
  }
};


// step 2
var randSwim = function () {
  let command = ['up', 'down', 'left', 'right'];
  let randCommand = command[Math.floor(Math.random() * command.length)]
  return randCommand;
}