const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cors = require("cors");
// app.use(cors());
var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(express.static(__dirname + "/public"));

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// ====> cookies token TODO
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.post('/login', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});



let game_state = {};
let round_no = 1;
let user_team = {};
game_state[`round_${round_no}`] = {}; 
game_state[`round_${round_no}`]['team_1'] = {};
game_state[`round_${round_no}`]['team_2'] = {};
let misconmunication = {'team_1':0, 'team_2':0};
let interception = {'team_1':0,'team_2':0};
let position_to_be_encoded = {};
position_to_be_encoded['team_1'] = [1,2,3,4];
position_to_be_encoded['team_2'] = [1,2,3,4];


io.on('connection', (socket) => {
  user_team[socket.id] = 1;
  console.log('user ' + socket.id + ' connected');
  

  socket.on('disconnect', () => {
    console.log('user' + socket.id + 'disconnected');
  });

  socket.on('userName', () => {
    

  }); 


  socket.on('newGames', (user_id) => {
    console.log('user: ' + user_id + ' has started a new game');
    io.emit('newGame_JS');
  })
  
  // 
  socket.on('giveClues', (user_id) => {
    console.log('user: ' + user_id + ' is giving clues');
    var team = user_team[user_id];
    var left_out_position = Math.floor(Math.random()*4);
    position_to_be_encoded[`team_${team}`].splice(left_out_position,1);
    left_out_position += 1;
    game_state[`round_${round_no}`][`team_${team}`][`box${team}${position_to_be_encoded[`team_${team}`][0]}`] = '';
    game_state[`round_${round_no}`][`team_${team}`][`box${team}${position_to_be_encoded[`team_${team}`][1]}`] = '';
    game_state[`round_${round_no}`][`team_${team}`][`box${team}${position_to_be_encoded[`team_${team}`][2]}`] = '';
    game_state[`round_${round_no}`][`team_${team}`][`box${team}${left_out_position}`] = 'null';
    io.emit('giveClues_JS', user_id, position_to_be_encoded[`team_${team}`]);
  });

  // rearrange clues then give to other players
  socket.on('submitClues', (user_id, input1_value, input2_value, input3_value) => {
    console.log(input1_value,input2_value,input3_value);
    var team = user_team[user_id];
    game_state[`round_${round_no}`][`team_${team}`][`box${team}${position_to_be_encoded[`team_${team}`][0]}`] = input1_value;
    game_state[`round_${round_no}`][`team_${team}`][`box${team}${position_to_be_encoded[`team_${team}`][1]}`] = input2_value;
    game_state[`round_${round_no}`][`team_${team}`][`box${team}${position_to_be_encoded[`team_${team}`][2]}`] = input3_value;
    // randomize position
    var mixed_position = [1, 2, 3, 4];
    var left_out_position = Math.floor(Math.random()*mixed_position.length);
    mixed_position.splice(left_out_position,1);
    io.emit('rearrangeClues_JS', user_id, input2_value, input3_value, input1_value, mixed_position);
  });
  
  socket.on('suggestAnswer', (user_id, d) => {
    var team = user_team[user_id];
    io.emit('rearrangeSuggest_JS', user_id, d);
    console.log('emit rearrangeSuggest_JS');
  });

  socket.on('submitAnswer', (user_id, d) => {
    var team = user_team[user_id];
    console.log(d);
    console.log(position_to_be_encoded[`team_${team}`]);
    console.log(game_state);

    if (
      d[`box1${position_to_be_encoded[`team_${team}`][0]}`] == game_state[`round_${round_no}`][`team_${team}`][`box1${position_to_be_encoded[`team_${team}`][0]}`] &&
      d[`box1${position_to_be_encoded[`team_${team}`][1]}`] == game_state[`round_${round_no}`][`team_${team}`][`box1${position_to_be_encoded[`team_${team}`][1]}`] &&
      d[`box1${position_to_be_encoded[`team_${team}`][2]}`] == game_state[`round_${round_no}`][`team_${team}`][`box1${position_to_be_encoded[`team_${team}`][2]}`]
    ) {
      console.log('correct');
      io.emit('pushRight', 1, user_id, game_state[`round_${round_no}`][`team_${team}`]);
      console.log('push right signal sent');
    } else {
      console.log('incorrect');
      misconmunication[`team_${team}`] +=1;
      io.emit('pushRight', 0, user_id, game_state[`round_${round_no}`][`team_${team}`]);
      console.log('push right signal sent');
    }
    console.log(misconmunication);
  });


  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

