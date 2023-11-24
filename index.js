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
    console.log('user: ' + user_id + ' is giving clues');
    position_to_be_encoded = [1, 2, 3, 4];
    left_out_position = Math.floor(Math.random()*position_to_be_encoded.length);
    position_to_be_encoded.splice(left_out_position, 1);
    io.emit('giveClues_JS', user_id, position_to_be_encoded, left_out_position+1);
  });

  // rearrange clues then give to other players
  socket.on('submitClues', (user_id, input1_value, input2_value,input3_value) => {
    console.log(input1_value);
    console.log(input2_value);
    console.log(input3_value);
    // randomize position
    position_to_be_encoded = [1, 2, 3, 4];
    left_out_position = Math.floor(Math.random()*position_to_be_encoded.length);
    position_to_be_encoded.splice(left_out_position, 1);
    io.emit('rearrangeClues_JS', user_id, input2_value, input3_value, input1_value, position_to_be_encoded, left_out_position+1);
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