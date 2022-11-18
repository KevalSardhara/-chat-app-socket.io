const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors : {
    origin :"*",
  }
});

// let data = [
//   {
//     "name": "prectice-socket-io",
//     "version": "0.0.1",
//     "description": "my first socket.io app",
//     "dependencies": {
//       "express": "^4.18.2",
//       "socket.io": "^4.5.3"
//     },
//     "main": "server.js",
//     "scripts": {
//       "test": "echo \"Error: no test specified\" && exit 1",
//       "start": "nodemon server.js",
//     },
//     "author": "Keval Sardhara",
//     "license": "ISC",
//   }
// ];

// let good = "data";

// let arrObj = [{
//   a: "Saab",
//   b: "Volvo",
//   c: "BMW",
// },
// {
//   a: "Saab",
//   b: "Volvo",
//   c: "BMW",
// },
// {
//   a: "Saab",
//   b: "Volvo",
//   c: 562,
// },];


// app.get('/info/data', (req, res) => {
//   // res.send(JSON.stringify(data));
//   // allowes send the api data from the json file data...!
  
//   // res.send(JSON.parse(arrObj));
//   // res.send(JSON.stringify(arrObj));
//   // res.send(JSON.stringify(arrObj));
//   console.log(JSON.stringify(arrObj));
//   console.log(arrObj);
//   res.send(arrObj);
// });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// io.on('connection', (socket) => {
//   socket.on('chat message', (msg) => {
//     console.log('message: ' + msg);
//   });
// });

// io.on('connection', (socket) => {
//   socket.broadcast.emit('hi');
// });

io.on('connection', (socket) => {
  // massages will be a json object form
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});