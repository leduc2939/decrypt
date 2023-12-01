const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cors = require("cors");
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

let game_state_full_server = {};
game_state_full_server['team_1'] = {};
game_state_full_server['team_2'] = {};
game_state_full_server['team_1']['normal_member'] = "";
game_state_full_server['team_1']['clue_giver'] = "";
game_state_full_server['team_2']['normal_member'] = "";
game_state_full_server['team_2']['clue_giver'] = "";
let clue_giver = {}
clue_giver['team_1'] = "";
clue_giver['team_2'] = "";
let game_started = false;

let team_finish = 0;
let team_finish_interception = 0;
let user_db = {};
let game_state = {};
let round_no = 1;
let user_team = {};
let phase = "1";
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

  socket.on('iden_user_id', (user_id) => {
    if (user_id in user_db) {
      io.emit('recognized', user_id, user_db[user_id]);
      } else {
      user_db[user_id] = {}; 
    }
  });

  socket.on('enterGame', (user_id, user_name, user_team) => {
    user_db[user_id]['user_name'] = user_name;
    user_db[user_id]['user_team'] = user_team;
    console.log(user_db[user_id]);
  }); 


  socket.on('newGames', (user_id, user_name) => {
    console.log('user: ' + user_name + ' has started a new game');
    round_no = 1;
    phase = 1;
    misconmunication = {'team_1':0, 'team_2':0};
    interception = {'team_1':0,'team_2':0};
    position_to_be_encoded['team_1'] = [1,2,3,4];
    position_to_be_encoded['team_2'] = [1,2,3,4];
    game_started = true;
    io.emit('newGame_JS');
  })
  
  // 
  socket.on('giveClues', (user_id, user_name, user_team) => {
    console.log(user_id);
    console.log(user_db);
    console.log('user: ' + user_name + ' is giving clues');
    var team = user_team;
    var left_out_position = Math.floor(Math.random()*4);
    position_to_be_encoded[`team_${team}`].splice(left_out_position,1);
    left_out_position += 1;
    game_state[`round_${round_no}`][`team_${team}`][`box${team}${position_to_be_encoded[`team_${team}`][0]}`] = '';
    game_state[`round_${round_no}`][`team_${team}`][`box${team}${position_to_be_encoded[`team_${team}`][1]}`] = '';
    game_state[`round_${round_no}`][`team_${team}`][`box${team}${position_to_be_encoded[`team_${team}`][2]}`] = '';
    game_state[`round_${round_no}`][`team_${team}`][`box${team}${left_out_position}`] = 'null';
    io.emit('giveClues_JS', user_id, user_team, position_to_be_encoded[`team_${team}`]);
  });

  // rearrange clues then give to other players
  socket.on('submitClues', (user_id, user_name, user_team, input1_value, input2_value, input3_value) => {
    
    console.log(user_name + " has submitted his clues");
    game_state[`round_${round_no}`][`team_${user_team}`][`box${user_team}${position_to_be_encoded[`team_${user_team}`][0]}`] = input1_value;
    game_state[`round_${round_no}`][`team_${user_team}`][`box${user_team}${position_to_be_encoded[`team_${user_team}`][1]}`] = input2_value;
    game_state[`round_${round_no}`][`team_${user_team}`][`box${user_team}${position_to_be_encoded[`team_${user_team}`][2]}`] = input3_value;
    // randomize position
    var mixed_position = [1, 2, 3, 4];
    var left_out_position = Math.floor(Math.random()*mixed_position.length);
    mixed_position.splice(left_out_position,1);
    io.emit('rearrangeClues_JS', user_id, user_name, user_team, input2_value, input3_value, input1_value, mixed_position);
    console.log( user_id, user_name, user_team, input2_value, input3_value, input1_value, mixed_position);
  });
  
  // suggest 
  socket.on('suggestAnswer', (user_id, user_name, user_team, d) => {
    console.log(d);
    io.emit('rearrangeSuggest_JS', user_name, user_team, d);
    console.log('emit rearrangeSuggest_JS');
  });

  // send pushRight signal to the team that has done guessing
  // if both team done submitting, and round >= 2 then send rearrange signal 
  // but swap clues else send roundCompleted signal
  
  socket.on('submitAnswer', (user_id, user_name, user_team, d) => {
    var team = user_team;
    if (phase=='1') {
      console.log(user_name + " just submitted communication");
      if (
        d[`box${position_to_be_encoded[`team_${team}`][0]}`] == game_state[`round_${round_no}`][`team_${team}`][`box${team}${position_to_be_encoded[`team_${team}`][0]}`] &&
        d[`box${position_to_be_encoded[`team_${team}`][1]}`] == game_state[`round_${round_no}`][`team_${team}`][`box${team}${position_to_be_encoded[`team_${team}`][1]}`] &&
        d[`box${position_to_be_encoded[`team_${team}`][2]}`] == game_state[`round_${round_no}`][`team_${team}`][`box${team}${position_to_be_encoded[`team_${team}`][2]}`]
      ) { 
        console.log('correct');
        io.emit('pushRight', 1, user_name, game_state[`round_${round_no}`][`team_${team}`], team);
        console.log('push right signal sent');
      } 
      else {
        console.log('incorrect');
        misconmunication[`team_${team}`] +=1;
        io.emit('pushRight', 0, user_name, game_state[`round_${round_no}`][`team_${team}`], team);
        console.log('push right signal sent');
      }
      team_finish += 1;
      if (team_finish == 2) {
        if (round_no >= 2) {
          var mixed_position = [1,2,3,4];
          phase = "2";
          mixed_position.splice(Math.floor(Math.random()*4),1);
          io.emit('rearrangeClues_intercept_JS', game_state[`round_${round_no}`], mixed_position);
          console.log('start interception round: send rearrangeClues_intercept_JS');
        } else {
          io.emit('roundCompleted');
        }
      }
    }
    else {
      console.log(user_name + " just submitted interception");
      var other_team = '';
      if (user_team == '1'){
          other_team = '2';
      } else {
          other_team = '1';
        }
      if (
        d[`box${position_to_be_encoded[`team_${team}`][0]}`] == game_state[`round_${round_no}`][`team_${team}`][`box${team}${position_to_be_encoded[`team_${team}`][0]}`] &&
        d[`box${position_to_be_encoded[`team_${team}`][1]}`] == game_state[`round_${round_no}`][`team_${team}`][`box${team}${position_to_be_encoded[`team_${team}`][1]}`] &&
        d[`box${position_to_be_encoded[`team_${team}`][2]}`] == game_state[`round_${round_no}`][`team_${team}`][`box${team}${position_to_be_encoded[`team_${team}`][2]}`]
      ) { 
        io.emit('intercept_res', 1, user_name, game_state[`round_${round_no}`][`team_${team}`], team);
        interception[`team_${other_team}`] +=1;
        console.log('correct interception: intercept_res + push right sent');
      } 
      else {
        io.emit('intercept_res', 0, user_name, game_state[`round_${round_no}`][`team_${team}`], team);
        console.log('incorrect interception: intercept_res + push right sent');
      }
      console.log("misconmmunication: "+ misconmunication);
      console.log("interception: " + interception);
      team_finish_interception += 1;
      if (team_finish_interception == 2) {
        console.log('send roundComplete');
        io.emit('roundCompleted');
        }
      }
    
  });
  

  socket.on('startNewRound', (user_name) => {
    console.log('starNewRound signal received from ' + user_name);
    team_finish = 0;
    team_finish_interception = 0;
    position_to_be_encoded['team_1'] = [1,2,3,4];
    position_to_be_encoded['team_2'] = [1,2,3,4];
    phase = "1";
    round_no +=1;
    game_state[`round_${round_no}`] = {}; 
    game_state[`round_${round_no}`]['team_1'] = {};
    game_state[`round_${round_no}`]['team_2'] = {};
    io.emit('startNewRound_JS', user_name);
  });

  socket.on('sync_up', (serializedHTML, user_team, is_all, is_clue_giver, current_phase) => {
    if (is_clue_giver) {
      game_state_full_server[`team_${user_team}`]['clue_giver'] = serializedHTML;
    }
    else {
      if (is_all) {
        var other_team = '';
        if (user_team == '1'){
            other_team = '2';
        } else {
            other_team = '1';
          }
        game_state_full_server[`team_${user_team}`]['normal_member'] = serializedHTML;
        game_state_full_server[`team_${other_team}`]['normal_member'] = serializedHTML;
        game_state_full_server[`team_${user_team}`]['clue_giver'] = serializedHTML;
        game_state_full_server[`team_${other_team}`]['clue_giver'] = serializedHTML;
      }
      else {
        game_state_full_server[`team_${user_team}`]['normal_member'] = serializedHTML;
      }
    }
    phase = current_phase;
  });


  socket.on('reconnect_sync_up', (user_id, user_team) => {
    if (game_started){
      if (user_id == clue_giver[`team_${user_team}`]) {
        console.log('here');
        console.log(clue_giver[`team_${user_team}`]);
        console.log(user_id);
        socket.emit('reconnect_sync_up_js', game_state_full_server[`team_${user_team}`]['clue_giver'], phase);
      }
      else {
        socket.emit('reconnect_sync_up_js', game_state_full_server[`team_${user_team}`]['normal_member'], phase);
      }
    }
  });

  




  

  










  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

