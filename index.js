const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(__dirname + "/public"));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

io.on('connection', (socket) => {

  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('newGames', (user_id) => {
    console.log('user: ' + user_id + ' has started a new game');
    io.emit('newGame_JS');
  })

  socket.on('giveClues', (user_id) => {
    console.log('user: ' + user_id + 'is giving clues');
    io.emit('giveClues_JS', user_id);
  });
  



  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

// const express = require('express');
// const app = express();
// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('chat message', (msg) => {
//     console.log('message: ' + msg);
//     io.emit('chat message', msg);
//   });
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

// server.listen(3000, () => {
//   console.log('listening on *:3000');
// });