const fetch = require("node-fetch");
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io")
const cors = require("cors");
var path = require('path');
const _ = require('lodash');
 
const { instrument } = require("@socket.io/admin-ui");

const io = new Server(server, {
  cors :{
    origin : ["https://admin.socket.io"],
    credentials: true
  }
});

function findCircularReferences (obj) {
  var seenObjects = [];

  function detect (obj) {
      if (obj && typeof obj === 'object') {
          if (seenObjects.indexOf(obj) !== -1) {
              return true;
          }
          seenObjects.push(obj);
          for (var key in obj) {
              if (obj.hasOwnProperty(key) && detect(obj[key])) {
                  console.log(obj, 'cycle at ' + key);
                  return true;
              }
          }
      }
      return 'no circular';
  }

  return detect(obj);
}




var corsOptions = {
  origin: ["http://localhost:3000", "https://admin.socket.io"]
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, 'public')));

var server_name_list = [];
var server_name_list_verb = [];
var server_name_list_spices = [];
var room_list = {};

let game_state_full_server = {};
game_state_full_server['team_1'] = {};
game_state_full_server['team_2'] = {};
game_state_full_server['team_1']['normal_member'] = {};
game_state_full_server['team_1']['clue_giver'] = {};
game_state_full_server['team_2']['normal_member'] = {};
game_state_full_server['team_2']['clue_giver'] = {};

game_state_full_server['team_1']['normal_member']["team_1_word1"] = "?";
game_state_full_server['team_1']['normal_member']["team_1_word2"] = "?";
game_state_full_server['team_1']['normal_member']["team_1_word3"] = "?";
game_state_full_server['team_1']['normal_member']["team_1_word4"] = "?";
game_state_full_server['team_2']['normal_member']["team_2_word1"] = "?";
game_state_full_server['team_2']['normal_member']["team_2_word2"] = "?";
game_state_full_server['team_2']['normal_member']["team_2_word3"] = "?";
game_state_full_server['team_2']['normal_member']["team_2_word4"] = "?";

game_state_full_server['team_1']['clue_giver']["boxes_with_clue"] = [] ;
game_state_full_server['team_2']['clue_giver']["boxes_with_clue"] = [] ;
game_state_full_server['team_1']['normal_member']["boxes_with_clue"] = [] ;
game_state_full_server['team_2']['normal_member']["boxes_with_clue"] = [] ;

game_state_full_server['team_1']['clue_giver']["box11"] = {} ;
game_state_full_server['team_1']['clue_giver']["box12"] = {} ;
game_state_full_server['team_1']['clue_giver']["box13"] = {} ;
game_state_full_server['team_1']['clue_giver']["box14"] = {} ;
game_state_full_server['team_2']['clue_giver']["box21"] = {} ;
game_state_full_server['team_2']['clue_giver']["box22"] = {} ;
game_state_full_server['team_2']['clue_giver']["box23"] = {} ;
game_state_full_server['team_2']['clue_giver']["box24"] = {} ;


game_state_full_server['team_1']['clue_giver']["box11"]['innerHTML'] = "" ;
game_state_full_server['team_1']['clue_giver']["box12"]['innerHTML'] = "" ;
game_state_full_server['team_1']['clue_giver']["box13"]['innerHTML'] = "" ;
game_state_full_server['team_1']['clue_giver']["box14"]['innerHTML'] = "" ;
game_state_full_server['team_2']['clue_giver']["box21"]['innerHTML'] = "" ;
game_state_full_server['team_2']['clue_giver']["box22"]['innerHTML'] = "" ;
game_state_full_server['team_2']['clue_giver']["box23"]['innerHTML'] = "" ;
game_state_full_server['team_2']['clue_giver']["box24"]['innerHTML'] = "" ;


game_state_full_server['team_1']['clue_giver']["box11"]['contenteditable'] = "true" ;
game_state_full_server['team_1']['clue_giver']["box12"]['contenteditable'] = "true" ;
game_state_full_server['team_1']['clue_giver']["box13"]['contenteditable'] = "true" ;
game_state_full_server['team_1']['clue_giver']["box14"]['contenteditable'] = "true" ;
game_state_full_server['team_2']['clue_giver']["box21"]['contenteditable'] = "true" ;
game_state_full_server['team_2']['clue_giver']["box22"]['contenteditable'] = "true" ;
game_state_full_server['team_2']['clue_giver']["box23"]['contenteditable'] = "true" ;
game_state_full_server['team_2']['clue_giver']["box24"]['contenteditable'] = "true" ;


game_state_full_server['team_1']['clue_giver']["giveClues"] = {}
game_state_full_server['team_1']['clue_giver']["submitClues"] = {}
game_state_full_server['team_1']['clue_giver']["suggestAnswer"] = {}
game_state_full_server['team_1']['clue_giver']["submitAnswer"] = {}
game_state_full_server['team_1']['clue_giver']["startNewRound"] = {}

game_state_full_server['team_1']['normal_member']["giveClues"] = {}
game_state_full_server['team_1']['normal_member']["submitClues"] = {}
game_state_full_server['team_1']['normal_member']["suggestAnswer"] = {}
game_state_full_server['team_1']['normal_member']["submitAnswer"] = {}
game_state_full_server['team_1']['normal_member']["startNewRound"] = {}

game_state_full_server['team_2']['clue_giver']["giveClues"] = {}
game_state_full_server['team_2']['clue_giver']["submitClues"] = {}
game_state_full_server['team_2']['clue_giver']["suggestAnswer"] = {}
game_state_full_server['team_2']['clue_giver']["submitAnswer"] = {}
game_state_full_server['team_2']['clue_giver']["startNewRound"] = {}

game_state_full_server['team_2']['normal_member']["giveClues"] = {}
game_state_full_server['team_2']['normal_member']["submitClues"] = {}
game_state_full_server['team_2']['normal_member']["suggestAnswer"] = {}
game_state_full_server['team_2']['normal_member']["submitAnswer"] = {}
game_state_full_server['team_2']['normal_member']["startNewRound"] = {}

game_state_full_server['team_1']['clue_giver']["giveClues"]['disabled'] = true;
game_state_full_server['team_1']['clue_giver']["submitClues"]['disabled'] = true;
game_state_full_server['team_1']['clue_giver']["suggestAnswer"]['disabled'] = true;
game_state_full_server['team_1']['clue_giver']["submitAnswer"]['disabled'] = true;
game_state_full_server['team_1']['clue_giver']["startNewRound"]['disabled'] = true;

game_state_full_server['team_1']['normal_member']["giveClues"]['disabled'] = true;
game_state_full_server['team_1']['normal_member']["submitClues"]['disabled'] = true;
game_state_full_server['team_1']['normal_member']["suggestAnswer"]['disabled'] = true;
game_state_full_server['team_1']['normal_member']["submitAnswer"]['disabled'] = true;
game_state_full_server['team_1']['normal_member']["startNewRound"]['disabled'] = true;


game_state_full_server['team_1']['clue_giver']["submitClues"]['hide'] = false;
game_state_full_server['team_1']['clue_giver']["submitAnswer"]['hide'] = false;
game_state_full_server['team_1']['normal_member']["submitClues"]['hide'] = false;
game_state_full_server['team_1']['normal_member']["submitAnswer"]['hide'] = false;

game_state_full_server['team_2']['clue_giver']["giveClues"]['disabled'] = true;
game_state_full_server['team_2']['clue_giver']["submitClues"]['disabled'] = true;
game_state_full_server['team_2']['clue_giver']["suggestAnswer"]['disabled'] = true;
game_state_full_server['team_2']['clue_giver']["submitAnswer"]['disabled'] = true;
game_state_full_server['team_2']['clue_giver']["startNewRound"]['disabled'] = true;

game_state_full_server['team_2']['normal_member']["giveClues"]['disabled'] = true;
game_state_full_server['team_2']['normal_member']["submitClues"]['disabled'] = true;
game_state_full_server['team_2']['normal_member']["suggestAnswer"]['disabled'] = true;
game_state_full_server['team_2']['normal_member']["submitAnswer"]['disabled'] = true;
game_state_full_server['team_2']['normal_member']["startNewRound"]['disabled'] = true;

game_state_full_server['team_2']['clue_giver']["submitClues"]['hide'] = false;
game_state_full_server['team_2']['clue_giver']["submitAnswer"]['hide'] = false;
game_state_full_server['team_2']['normal_member']["submitClues"]['hide'] = false;
game_state_full_server['team_2']['normal_member']["submitAnswer"]['hide'] = false;

game_state_full_server['team_1']['suggest'] = {};
game_state_full_server['team_2']['suggest'] = {};


game_state_full_server['team_1']['team_1_truth'] = [];
game_state_full_server['team_1']['team_2_truth'] = [];

game_state_full_server['team_2']['team_1_truth'] = [];
game_state_full_server['team_2']['team_2_truth'] = [];

game_state_full_server[`team_2`]['clue_giver']["disabled_clue"] = false;
game_state_full_server[`team_2`]['normal_member']["disabled_clue"] = false;
game_state_full_server[`team_2`]['clue_giver']["disabled_clue_other_team"] = false;
game_state_full_server[`team_2`]['normal_member']["disabled_clue_other_team"] = false;

game_state_full_server[`team_1`]['clue_giver']["disabled_clue"] = false;
game_state_full_server[`team_1`]['normal_member']["disabled_clue"] = false;
game_state_full_server[`team_1`]['clue_giver']["disabled_clue_other_team"] = false;
game_state_full_server[`team_1`]['normal_member']["disabled_clue_other_team"] = false;

game_state_full_server[`team_1`]['team_remaining_time'] = 0;
game_state_full_server[`team_2`]['team_remaining_time'] = 0;

game_state_full_server['round_finished'] = false;

game_state_full_server['timer'] = 5;

game_state_full_server['chatlog'] = [];

game_state_full_server[`round_0`] = {}; 
game_state_full_server[`round_0`]['team_1'] = {};
game_state_full_server[`round_0`]['team_2'] = {};
game_state_full_server[`round_1`] = {}; 
game_state_full_server[`round_1`]['team_1'] = {};
game_state_full_server[`round_1`]['team_2'] = {};
game_state_full_server[`round_2`] = {}; 
game_state_full_server[`round_2`]['team_1'] = {};
game_state_full_server[`round_2`]['team_2'] = {};

var hasSignalBeenSent = {};
hasSignalBeenSent['team_1'] = false;
hasSignalBeenSent['team_2'] = false;
game_state_full_server['hasSignalBeenSent'] = hasSignalBeenSent;

let user_db = {};

let clue_giver = {}
clue_giver['team_1'] = "";
clue_giver['team_2'] = "";
game_state_full_server['clue_giver'] = clue_giver;

game_state_full_server['game_started'] = false;
game_state_full_server['team_finish'] = 0;
game_state_full_server['team_finish_interception'] = 0;
game_state_full_server['round_no'] = 1;
game_state_full_server['phase'] = '1';

let misconmunication = {'team_1':0, 'team_2':0};
let interception = {'team_1':0,'team_2':0};
let position_to_be_encoded = {};
position_to_be_encoded['team_1'] = [1,2,3,4];
position_to_be_encoded['team_2'] = [1,2,3,4];
mixed_position_state = {}
mixed_position_state['team_1'] = [];
mixed_position_state['team_2'] = [];

game_state_full_server['misconmunication'] = misconmunication;
game_state_full_server['interception'] = interception;
game_state_full_server['position_to_be_encoded'] = position_to_be_encoded;
game_state_full_server['mixed_position_state'] = mixed_position_state;

game_state_full_server['team_1_keywords'] = [];
game_state_full_server['team_2_keywords'] = [];

var wordlist = [];
var namelist = [];

// var interval_1;
// var interval_2;
// var interval = {};
// interval['team_1'] = interval_1;
// interval['team_2'] = interval_2;
var room_interval = {};

server_team_1_name = 'Kitties', 
server_team_2_name = 'Puppies'

function fetchLines(url) {
  return fetch(url)
    .then(response => response.text())
    .then(text => text.split('\n'));
}

fetchLines('https://gist.githubusercontent.com/leduc2939/4b5758704bc2beda0d7708525f191794/raw/6864798cac0cb6b61b96e33ad1adca438e409ae7/decrypto_wordlist.txt')
  .then(lines => {
    wordlist = lines;
  })
  .catch(error => {
    console.error("Error fetching lines:", error);
  });

fetchLines('https://gist.githubusercontent.com/leduc2939/55614e5aecdcc5dd21f25f4604d77a22/raw/949f8fed807e6c95e495488ee778ede2820e931b/name_list.txt')
  .then(lines => {
    namelist = lines;
  })
  .catch(error => {
    console.error("Error fetching lines:", error);
});

fetchLines('https://gist.githubusercontent.com/leduc2939/1700645baa4c792c77733023d4657a20/raw/e4dc35e0b0a0ce698b3badabb0ab5d4e5065f73e/server_name_list.txt')
  .then(lines => {
    server_name_list = lines;
  })
  .catch(error => {
    console.error("Error fetching lines:", error);
});

fetchLines('https://gist.githubusercontent.com/leduc2939/582ccc0e7f6e24e9049a3d75c5b01391/raw/a65a2ca2d0d0db9eee4bcb00a9be1c83163930dd/server_name_list_verb.txt')
  .then(lines => {
    server_name_list_verb = lines;
  })
  .catch(error => {
    console.error("Error fetching lines:", error);
});

fetchLines('https://gist.githubusercontent.com/leduc2939/5a15b79f8a1e3385b99a6b35edbb88d4/raw/34a0364f45be6a60c12c2e1eb234714f29c836ba/server_name_list_spices.txt')
  .then(lines => {
    server_name_list_spices = lines;
  })
  .catch(error => {
    console.error("Error fetching lines:", error);
});


let env = process.argv[2];
if (env=='prod') {
  game_state_full_server['round_no'] = 1;
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/login.html'));
});

app.get('/room/:id', (req, res) => {
  if (req.params.id in room_list) {
    res.sendFile(path.join(__dirname, '/room.html'));
  } else {
    res.send("room doesn't exist")
  }
});



function generateUniqueRoomId(server_name_list,server_name_list_verb,server_name_list_spices) {
  var name = server_name_list.splice(Math.floor(Math.random()*server_name_list.length),1)[0] + '-' + server_name_list_verb.splice(Math.floor(Math.random()*server_name_list_verb.length),1)[0] + '-' + server_name_list_spices.splice(Math.floor(Math.random()*server_name_list_spices.length),1)[0]
  return name;
}

app.post('/create-room', (req, res) => {
  const room_id = generateUniqueRoomId(server_name_list,server_name_list_verb,server_name_list_spices); 
  // io.on('connection', (socket) => {
  //   socket.join(room_id);
  //   console.log("crt room " + socket.id + " joined " + room_id)
  // });
  // console.log(room_list[room_id]);
  
  // room_list[room_id] = JSON.parse(JSON.stringify(game_state_full_server,null,2));
  room_list[room_id] = _.cloneDeep(game_state_full_server);
  room_interval[room_id] = {};
  room_interval[room_id]['team_1'] = '';
  room_interval[room_id]['team_2'] = '';
  // console.log(findCircularReferences(room_list[room_id]));
  res.json({ room_id, url: `http://${req.headers.host}/room/${room_id}` });
});




io.on('connection', (socket) => {
  // process.argv.forEach(function (val, index, array) {
  //   console.log(index + ': ' + val);
  //   console.log()
  // });

  // socket.on('log_user_socket', (socket_id, user_id, user_name, user_team) => {
  //   user_db[user_id] = {};
  //   user_db[user_id]['user_name'] = user_name;
  //   user_db[user_id]['user_team'] = user_team;
  //   user_db[user_id]['user_socket_id'] = socket_id;
  //   console.log('log_user_socket');
  //   console.log(user_db[user_id])
  // });

  socket.on('user_info', (user_name)=>{
    console.log(user_name);
  }); 


  socket.on('join_room', (user_id, user_name, user_team, link, room_id, callback) =>{    
    var url = `${link}/room/${room_id}`
    
    user_db[user_id]['user_name'] = user_name;
    user_db[user_id]['user_team'] = user_team;
    user_db[user_id]['isOnline'] = true;
    callback({
      room: url
    });
    if (room_id in room_list) {
      user_db[user_id]['user_room'] = room_id;
    }
    console.log(user_id + " joined " + room_id);
    console.log(user_db[user_id]);
  });

  console.log(env);
  socket.emit("gen_uuid", env, user_db);

  socket.on('get_a_random_name', (callback) =>{
    var name = namelist[Math.floor(Math.random()*namelist.length)];
    callback({
      gen_name: name
    });
  });

  console.log('socket ' + socket.id + ' connected');

  socket.on('disconnect', () => {
    console.log('user ' + socket.id + ' disconnected');
    for (user_id in user_db) {
      if (user_db[user_id]['user_socket_id'] == socket.id) {
        console.log('disconnected');
        var room_id = user_db[user_id]['user_room'];
        // delete user_db[user_id];
        user_db[user_id]['isOnline'] = false;
        console.log(`${user_id} ${user_db[user_id]['user_name']} has gone offline`);
        io.to(room_id).emit('team_member_update', user_db);
      }
    }
  });

  socket.on('update_name', (user_id, user_name, new_name, room_id) => { 
    user_db[user_id]['user_name'] = new_name;
    io.to(room_id).emit('team_member_update', user_db);
    io.to(room_id).emit('chat message', user_name + ' has changed their name to ' + new_name , 'log', formatDate(new Date()));
    room_list[room_id]['chatlog'].push(['log', 'log', user_name + ' has changed their name to ' + new_name , formatDate(new Date())]);  
  });

  socket.on('iden_user_id', (user_id, user_name, user_team, room_id) => {
    if (user_id in user_db) {
      user_db[user_id]['user_name'] = user_name; 
      user_db[user_id]['user_team'] = user_team; 
      user_db[user_id]['user_socket_id'] = socket.id;
      user_db[user_id]['user_room'] = room_id;
      io.emit('recognized', user_id, user_db[user_id]);
      } else {
      user_db[user_id] = {}; 
      user_db[user_id]['user_name'] = user_name; 
      user_db[user_id]['user_team'] = user_team; 
      user_db[user_id]['user_socket_id'] = socket.id;
      user_db[user_id]['user_room'] = room_id;
    }
    user_db[user_id]['isOnline'] = true;
    console.log('iden user: ' + user_id);
    console.log(user_db[user_id])
  });

  socket.emit('set_timer', game_state_full_server['timer']);

  socket.emit('set_team_name', server_team_1_name, server_team_2_name);

  socket.on('adjust_timer', (user_id, user_name, timer, room_id) =>{
    console.log(user_name + " has changed the timer");
    room_list[room_id]['timer'] = timer;
    io.to(room_id).emit('adjust_timer_JS', user_name, room_list[room_id]['timer']);   
    io.to(room_id).emit('chat message', user_name + ' has adjusted the timer to ' + timer + ' minutes.' , 'log', formatDate(new Date()));
    room_list[room_id]['chatlog'].push(['log', 'log', ' has adjusted the timer to ' + timer + ' minutes.', formatDate(new Date())]);    
  });

  socket.on('enterGame', (user_id, user_name, user_team, user_room) => {
    // user_db[user_id]['user_name'] = user_name;
    // user_db[user_id]['user_team'] = user_team;
    // socket.emit('team_member_update',user_db);
    // console.log(user_db[user_id]);
    socket.join(user_room);
  }); 


  socket.on('newGames', (user_id, user_name,room_id) => {
    // console.log(room_list[room_id]);
    console.log('user: ' + user_name + ' has started a new game');
    room_list[room_id]['round_no'] = 1;
    room_list[room_id]['phase'] = "1";
    room_list[room_id]['misconmunication'] = {'team_1':0, 'team_2':0};
    room_list[room_id]['interception'] = {'team_1':0,'team_2':0};
    room_list[room_id]['position_to_be_encoded']['team_1'] = [1,2,3,4];
    room_list[room_id]['position_to_be_encoded']['team_2'] = [1,2,3,4];
    room_list[room_id]['game_started'] = true;

    room_list[room_id]['team_1_keywords'] = [];
    room_list[room_id]['team_2_keywords'] = [];
    for (let i = 0; i < 4; i++) {
      room_list[room_id]['team_1_keywords'].push(wordlist.splice(Math.floor(Math.random()*wordlist.length),1)[0])
      room_list[room_id]['team_2_keywords'].push(wordlist.splice(Math.floor(Math.random()*wordlist.length),1)[0])
    }
    io.to(room_id).emit('newGame_JS',room_list[room_id]['team_1_keywords'],room_list[room_id]['team_2_keywords'], user_name);
    io.to(room_id).emit('chat message', user_name + ' has started a new game.', 'log', formatDate(new Date()));
    room_list[room_id]['chatlog'].push(['log', 'log', user_name + ' has started a new game.', formatDate(new Date())]);

    clearInterval(room_interval[room_id]['team_1'] );
    clearInterval(room_interval[room_id]['team_2'] );
    // io.emit('server_stopClock', "1");
    // io.emit('server_stopClock', "2");
    room_list[room_id][`team_1`]['team_remaining_time'] = 0;
    room_list[room_id][`team_2`]['team_remaining_time'] = 0;
    room_list[room_id]['team_1'] = {};
    room_list[room_id]['team_2'] = {};
    room_list[room_id]['team_1']['normal_member'] = {};
    room_list[room_id]['team_1']['clue_giver'] = {};
    room_list[room_id]['team_2']['normal_member'] = {};
    room_list[room_id]['team_2']['clue_giver'] = {};

    room_list[room_id]['team_1']['normal_member']["team_1_word1"] = "?";
    room_list[room_id]['team_1']['normal_member']["team_1_word2"] = "?";
    room_list[room_id]['team_1']['normal_member']["team_1_word3"] = "?";
    room_list[room_id]['team_1']['normal_member']["team_1_word4"] = "?";
    room_list[room_id]['team_2']['normal_member']["team_2_word1"] = "?";
    room_list[room_id]['team_2']['normal_member']["team_2_word2"] = "?";
    room_list[room_id]['team_2']['normal_member']["team_2_word3"] = "?";
    room_list[room_id]['team_2']['normal_member']["team_2_word4"] = "?";

    room_list[room_id]['team_1']['clue_giver']["boxes_with_clue"] = [] ;
    room_list[room_id]['team_2']['clue_giver']["boxes_with_clue"] = [] ;
    room_list[room_id]['team_1']['normal_member']["boxes_with_clue"] = [] ;
    room_list[room_id]['team_2']['normal_member']["boxes_with_clue"] = [] ;

    room_list[room_id][`team_1`]['clue_giver']['disabled_clue'] = false;
    room_list[room_id][`team_1`]['normal_member']['disabled_clue'] = false;
    room_list[room_id][`team_2`]['clue_giver']['disabled_clue'] = false;
    room_list[room_id][`team_2`]['normal_member']['disabled_clue'] = false;

    room_list[room_id]['team_1']['clue_giver']["box11"] = {} ;
    room_list[room_id]['team_1']['clue_giver']["box12"] = {} ;
    room_list[room_id]['team_1']['clue_giver']["box13"] = {} ;
    room_list[room_id]['team_1']['clue_giver']["box14"] = {} ;
    room_list[room_id]['team_2']['clue_giver']["box21"] = {} ;
    room_list[room_id]['team_2']['clue_giver']["box22"] = {} ;
    room_list[room_id]['team_2']['clue_giver']["box23"] = {} ;
    room_list[room_id]['team_2']['clue_giver']["box24"] = {} ;


    room_list[room_id]['team_1']['clue_giver']["box11"]['innerHTML'] = "" ;
    room_list[room_id]['team_1']['clue_giver']["box12"]['innerHTML'] = "" ;
    room_list[room_id]['team_1']['clue_giver']["box13"]['innerHTML'] = "" ;
    room_list[room_id]['team_1']['clue_giver']["box14"]['innerHTML'] = "" ;
    room_list[room_id]['team_2']['clue_giver']["box21"]['innerHTML'] = "" ;
    room_list[room_id]['team_2']['clue_giver']["box22"]['innerHTML'] = "" ;
    room_list[room_id]['team_2']['clue_giver']["box23"]['innerHTML'] = "" ;
    room_list[room_id]['team_2']['clue_giver']["box24"]['innerHTML'] = "" ;


    room_list[room_id]['team_1']['clue_giver']["box11"]['contenteditable'] = "true" ;
    room_list[room_id]['team_1']['clue_giver']["box12"]['contenteditable'] = "true" ;
    room_list[room_id]['team_1']['clue_giver']["box13"]['contenteditable'] = "true" ;
    room_list[room_id]['team_1']['clue_giver']["box14"]['contenteditable'] = "true" ;
    room_list[room_id]['team_2']['clue_giver']["box21"]['contenteditable'] = "true" ;
    room_list[room_id]['team_2']['clue_giver']["box22"]['contenteditable'] = "true" ;
    room_list[room_id]['team_2']['clue_giver']["box23"]['contenteditable'] = "true" ;
    room_list[room_id]['team_2']['clue_giver']["box24"]['contenteditable'] = "true" ;


    room_list[room_id]['team_1']['clue_giver']["giveClues"] = {}
    room_list[room_id]['team_1']['clue_giver']["submitClues"] = {}
    room_list[room_id]['team_1']['clue_giver']["suggestAnswer"] = {}
    room_list[room_id]['team_1']['clue_giver']["submitAnswer"] = {}
    room_list[room_id]['team_1']['clue_giver']["startNewRound"] = {}

    room_list[room_id]['team_1']['normal_member']["giveClues"] = {}
    room_list[room_id]['team_1']['normal_member']["submitClues"] = {}
    room_list[room_id]['team_1']['normal_member']["suggestAnswer"] = {}
    room_list[room_id]['team_1']['normal_member']["submitAnswer"] = {}
    room_list[room_id]['team_1']['normal_member']["startNewRound"] = {}

    room_list[room_id]['team_2']['clue_giver']["giveClues"] = {}
    room_list[room_id]['team_2']['clue_giver']["submitClues"] = {}
    room_list[room_id]['team_2']['clue_giver']["suggestAnswer"] = {}
    room_list[room_id]['team_2']['clue_giver']["submitAnswer"] = {}
    room_list[room_id]['team_2']['clue_giver']["startNewRound"] = {}

    room_list[room_id]['team_2']['normal_member']["giveClues"] = {}
    room_list[room_id]['team_2']['normal_member']["submitClues"] = {}
    room_list[room_id]['team_2']['normal_member']["suggestAnswer"] = {}
    room_list[room_id]['team_2']['normal_member']["submitAnswer"] = {}
    room_list[room_id]['team_2']['normal_member']["startNewRound"] = {}

    room_list[room_id]['team_1']['clue_giver']["giveClues"]['disabled'] = true;
    room_list[room_id]['team_1']['clue_giver']["submitClues"]['disabled'] = true;
    room_list[room_id]['team_1']['clue_giver']["suggestAnswer"]['disabled'] = true;
    room_list[room_id]['team_1']['clue_giver']["submitAnswer"]['disabled'] = true;
    room_list[room_id]['team_1']['clue_giver']["startNewRound"]['disabled'] = true;

    room_list[room_id]['team_1']['normal_member']["giveClues"]['disabled'] = true;
    room_list[room_id]['team_1']['normal_member']["submitClues"]['disabled'] = true;
    room_list[room_id]['team_1']['normal_member']["suggestAnswer"]['disabled'] = true;
    room_list[room_id]['team_1']['normal_member']["submitAnswer"]['disabled'] = true;
    room_list[room_id]['team_1']['normal_member']["startNewRound"]['disabled'] = true;


    room_list[room_id]['team_1']['clue_giver']["submitClues"]['hide'] = false;
    room_list[room_id]['team_1']['clue_giver']["submitAnswer"]['hide'] = false;
    room_list[room_id]['team_1']['normal_member']["submitClues"]['hide'] = false;
    room_list[room_id]['team_1']['normal_member']["submitAnswer"]['hide'] = false;



    room_list[room_id]['team_2']['clue_giver']["giveClues"]['disabled'] = true;
    room_list[room_id]['team_2']['clue_giver']["submitClues"]['disabled'] = true;
    room_list[room_id]['team_2']['clue_giver']["suggestAnswer"]['disabled'] = true;
    room_list[room_id]['team_2']['clue_giver']["submitAnswer"]['disabled'] = true;
    room_list[room_id]['team_2']['clue_giver']["startNewRound"]['disabled'] = true;

    room_list[room_id]['team_2']['normal_member']["giveClues"]['disabled'] = true;
    room_list[room_id]['team_2']['normal_member']["submitClues"]['disabled'] = true;
    room_list[room_id]['team_2']['normal_member']["suggestAnswer"]['disabled'] = true;
    room_list[room_id]['team_2']['normal_member']["submitAnswer"]['disabled'] = true;
    room_list[room_id]['team_2']['normal_member']["startNewRound"]['disabled'] = true;

    room_list[room_id]['team_2']['clue_giver']["submitClues"]['hide'] = false;
    room_list[room_id]['team_2']['clue_giver']["submitAnswer"]['hide'] = false;
    room_list[room_id]['team_2']['normal_member']["submitClues"]['hide'] = false;
    room_list[room_id]['team_2']['normal_member']["submitAnswer"]['hide'] = false;

    room_list[room_id]['team_1']['suggest'] = {};
    room_list[room_id]['team_2']['suggest'] = {};


    room_list[room_id]['team_1']['team_1_truth'] = [];
    room_list[room_id]['team_1']['team_2_truth'] = [];

    room_list[room_id]['team_2']['team_1_truth'] = [];
    room_list[room_id]['team_2']['team_2_truth'] = [];

    room_list[room_id]['round_finished'] = false;


    room_list[room_id]['clue_giver']['team_1'] = "";
    room_list[room_id]['clue_giver']['team_2'] = "";

    room_list[room_id]['team_1']['normal_member']["team_1_word1"] = room_list[room_id]['team_1_keywords'][0];
    room_list[room_id]['team_1']['normal_member']["team_1_word2"] = room_list[room_id]['team_1_keywords'][1];  
    room_list[room_id]['team_1']['normal_member']["team_1_word3"] = room_list[room_id]['team_1_keywords'][2];  
    room_list[room_id]['team_1']['normal_member']["team_1_word4"] = room_list[room_id]['team_1_keywords'][3];  
    room_list[room_id]['team_2']['normal_member']["team_2_word1"] = room_list[room_id]['team_2_keywords'][0];  
    room_list[room_id]['team_2']['normal_member']["team_2_word2"] = room_list[room_id]['team_2_keywords'][1];  
    room_list[room_id]['team_2']['normal_member']["team_2_word3"] = room_list[room_id]['team_2_keywords'][2];  
    room_list[room_id]['team_2']['normal_member']["team_2_word4"] = room_list[room_id]['team_2_keywords'][3];  
    
    room_list[room_id]['team_1']['clue_giver']["team_1_word1"] = room_list[room_id]['team_1_keywords'][0];
    room_list[room_id]['team_1']['clue_giver']["team_1_word2"] = room_list[room_id]['team_1_keywords'][1];  
    room_list[room_id]['team_1']['clue_giver']["team_1_word3"] = room_list[room_id]['team_1_keywords'][2];  
    room_list[room_id]['team_1']['clue_giver']["team_1_word4"] = room_list[room_id]['team_1_keywords'][3];  
    room_list[room_id]['team_2']['clue_giver']["team_2_word1"] = room_list[room_id]['team_2_keywords'][0];  
    room_list[room_id]['team_2']['clue_giver']["team_2_word2"] = room_list[room_id]['team_2_keywords'][1];  
    room_list[room_id]['team_2']['clue_giver']["team_2_word3"] = room_list[room_id]['team_2_keywords'][2];  
    room_list[room_id]['team_2']['clue_giver']["team_2_word4"] = room_list[room_id]['team_2_keywords'][3]; 

    room_list[room_id][`team_1`]['clue_giver']["startNewRound"]['disabled'] = false;
    room_list[room_id][`team_1`]['normal_member']["startNewRound"]['disabled'] = false;
    room_list[room_id][`team_2`]['clue_giver']["startNewRound"]['disabled'] = false;
    room_list[room_id][`team_2`]['normal_member']["startNewRound"]['disabled'] = false;
    
    room_list[room_id][`team_1`]['clue_giver']["startNewRound"]['disabled'] = false;
    room_list[room_id][`team_1`]['normal_member']["startNewRound"]['disabled'] = false;
    room_list[room_id][`team_2`]['clue_giver']["startNewRound"]['disabled'] = false;
    room_list[room_id][`team_2`]['normal_member']["startNewRound"]['disabled'] = false;
    
    room_list[room_id]['hasSignalBeenSent'][`team_1`]=false;
    room_list[room_id]['hasSignalBeenSent'][`team_2`]=false;

    console.log(room_list[room_id]['team_1_keywords']);
    console.log(room_list[room_id]['team_2_keywords']);
    
    
  })
  
  // 
  socket.on('giveClues', (user_id, user_name, user_team, room_id) => {
    console.log('user: ' + user_name + ' is giving clues');
    var left_out_position = Math.floor(Math.random()*4);
    room_list[room_id]['position_to_be_encoded'][`team_${user_team}`].splice(left_out_position,1);
    left_out_position += 1;
    room_list[room_id][`round_${room_list[room_id]['round_no']}`][`team_${user_team}`][`box${user_team}${room_list[room_id]['position_to_be_encoded'][`team_${user_team}`][0]}`] = '';
    room_list[room_id][`round_${room_list[room_id]['round_no']}`][`team_${user_team}`][`box${user_team}${room_list[room_id]['position_to_be_encoded'][`team_${user_team}`][1]}`] = '';
    room_list[room_id][`round_${room_list[room_id]['round_no']}`][`team_${user_team}`][`box${user_team}${room_list[room_id]['position_to_be_encoded'][`team_${user_team}`][2]}`] = '';
    room_list[room_id][`round_${room_list[room_id]['round_no']}`][`team_${user_team}`][`box${user_team}${left_out_position}`] = 'null';
    io.to(room_id).emit('giveClues_JS', user_id, user_name, user_team, room_list[room_id]['position_to_be_encoded'][`team_${user_team}`]);
    io.to(room_id).emit('chat message', user_name + ' has taken charge of encoding the message.', 'log', formatDate(new Date()));
    room_list[room_id]['chatlog'].push(['log', 'log', user_name + ' has taken charge of encoding the message.', formatDate(new Date())]);


    room_list[room_id][`team_${user_team}`]['clue_giver']['boxes_with_clue'] = room_list[room_id]['position_to_be_encoded'][`team_${user_team}`];
    room_list[room_id]['clue_giver'][`team_${user_team}`] = user_id
    console.log(room_list[room_id]['clue_giver'][`team_${user_team}`])
    room_list[room_id][`team_${user_team}`]['clue_giver']["giveClues"]['disabled'] = true;
    room_list[room_id][`team_${user_team}`]['clue_giver']["submitClues"]['disabled'] = false;
    room_list[room_id][`team_${user_team}`]['clue_giver']["suggestAnswer"]['disabled'] = true;
    room_list[room_id][`team_${user_team}`]['clue_giver']["submitAnswer"]['disabled'] = true;
    room_list[room_id][`team_${user_team}`]['clue_giver']["startNewRound"]['disabled'] = true;

    room_list[room_id][`team_${user_team}`]['clue_giver']["submitClues"]['hide'] = false;
    room_list[room_id][`team_${user_team}`]['clue_giver']["submitAnswer"]['hide'] = true;

    room_list[room_id][`team_${user_team}`]['normal_member']["giveClues"]['disabled'] = true;
    room_list[room_id][`team_${user_team}`]['normal_member']["submitClues"]['disabled'] = true;
    room_list[room_id][`team_${user_team}`]['normal_member']["suggestAnswer"]['disabled'] = true;
    room_list[room_id][`team_${user_team}`]['normal_member']["submitAnswer"]['disabled'] = true;
    room_list[room_id][`team_${user_team}`]['normal_member']["startNewRound"]['disabled'] = true;
    
    room_list[room_id][`team_${user_team}`]['normal_member']["submitClues"]['hide'] = true;
    room_list[room_id][`team_${user_team}`]['normal_member']["submitAnswer"]['hide'] = false;
  });

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  // rearrange clues then give to other players
  socket.on('submitClues', (user_id, user_name, user_team, input1_value, input2_value, input3_value, room_id) => {
    console.log(user_name + " has submitted his clues");
    // randomize position
    var mixed_position = [1, 2, 3, 4];
    var left_out_position = Math.floor(Math.random()*mixed_position.length);
    mixed_position.splice(left_out_position,1);
    shuffle(mixed_position); 
    io.to(room_id).emit('rearrangeClues_JS', user_id, user_name, user_team, input1_value, input2_value, input3_value, mixed_position);
    
    io.to(room_id).emit('chat message', user_name + ' has sent the password for the bomb.', 'log', formatDate(new Date()));
    room_list[room_id]['chatlog'].push(['log', 'log', user_name + ' has sent the password for the bomb.', formatDate(new Date())]);

    room_list[room_id][`round_${room_list[room_id]['round_no']}`][`team_${user_team}`][`box${user_team}${room_list[room_id]['position_to_be_encoded'][`team_${user_team}`][0]}`] = input1_value;
    room_list[room_id][`round_${room_list[room_id]['round_no']}`][`team_${user_team}`][`box${user_team}${room_list[room_id]['position_to_be_encoded'][`team_${user_team}`][1]}`] = input2_value;
    room_list[room_id][`round_${room_list[room_id]['round_no']}`][`team_${user_team}`][`box${user_team}${room_list[room_id]['position_to_be_encoded'][`team_${user_team}`][2]}`] = input3_value;
   
    room_list[room_id][`team_${user_team}`]['clue_giver'][`box${user_team}${room_list[room_id]['position_to_be_encoded'][`team_${user_team}`][0]}`]['contenteditable'] = "false" ;
    room_list[room_id][`team_${user_team}`]['clue_giver'][`box${user_team}${room_list[room_id]['position_to_be_encoded'][`team_${user_team}`][1]}`]['contenteditable'] = "false" ;
    room_list[room_id][`team_${user_team}`]['clue_giver'][`box${user_team}${room_list[room_id]['position_to_be_encoded'][`team_${user_team}`][2]}`]['contenteditable'] = "false" ;
    room_list[room_id][`team_${user_team}`]['clue_giver'][`box${user_team}${room_list[room_id]['position_to_be_encoded'][`team_${user_team}`][0]}`]['innerHTML'] = input1_value;
    room_list[room_id][`team_${user_team}`]['clue_giver'][`box${user_team}${room_list[room_id]['position_to_be_encoded'][`team_${user_team}`][1]}`]['innerHTML'] = input2_value;
    room_list[room_id][`team_${user_team}`]['clue_giver'][`box${user_team}${room_list[room_id]['position_to_be_encoded'][`team_${user_team}`][2]}`]['innerHTML'] = input3_value;

    room_list[room_id][`team_${user_team}`]['clue_giver']['disabled_clue'] = true;
    
    room_list[room_id][`team_${user_team}`]['normal_member']['boxes_with_clue'] = mixed_position;

    room_list[room_id][`team_${user_team}`]['clue_giver']["giveClues"]['disabled'] = true;
    room_list[room_id][`team_${user_team}`]['clue_giver']["submitClues"]['disabled'] = true;
    room_list[room_id][`team_${user_team}`]['clue_giver']["suggestAnswer"]['disabled'] = true;
    room_list[room_id][`team_${user_team}`]['clue_giver']["submitAnswer"]['disabled'] = true;
    room_list[room_id][`team_${user_team}`]['clue_giver']["startNewRound"]['disabled'] = true;
    room_list[room_id][`team_${user_team}`]['clue_giver']["submitClues"]['hide'] = false;
    room_list[room_id][`team_${user_team}`]['clue_giver']["submitAnswer"]['hide'] = true;
    
    room_list[room_id][`team_${user_team}`]['normal_member']["giveClues"]['disabled'] = true;
    room_list[room_id][`team_${user_team}`]['normal_member']["submitClues"]['disabled'] = true;
    room_list[room_id][`team_${user_team}`]['normal_member']["suggestAnswer"]['disabled'] = false;
    room_list[room_id][`team_${user_team}`]['normal_member']["submitAnswer"]['disabled'] = false;
    room_list[room_id][`team_${user_team}`]['normal_member']["startNewRound"]['disabled'] = true;

    room_list[room_id][`team_${user_team}`]['normal_member']["submitClues"]['hide'] = true;
    room_list[room_id][`team_${user_team}`]['normal_member']["submitAnswer"]['hide'] = false;
    
    // $(`#input${my_team}1`).addClass('disabled_clue');
    //     $(`#input${my_team}2`).addClass('disabled_clue');
    //     $(`#input${my_team}3`).addClass('disabled_clue');
    //     $(`#input${my_team}1`).attr('contenteditable','false');
    //     $(`#input${my_team}2`).attr('contenteditable','false');
    //     $(`#input${my_team}3`).attr('contenteditable','false');
    // console.log( user_id, user_name, user_team, input2_value, input3_value, input1_value, mixed_position);

    console.log(room_list[room_id][`team_${user_team}`]['clue_giver']["submitClues"])
  });
  
  // suggest 
  socket.on('suggestAnswer', (user_id, user_name, user_team, d, room_id) => {
    io.to(room_id).emit('rearrangeSuggest_JS', user_name, user_team, d, room_list[room_id]['phase']);
    console.log('emit rearrangeSuggest_JS');
    room_list[room_id][`team_${user_team}`]['suggest'] = d;
    console.log(room_list[room_id][`team_${user_team}`]);
  });

  // send pushRight signal to the team that has done guessing
  // if both team done submitting, and round >= 2 then send rearrange signal 
  // but swap clues else send roundCompleted signal
  
  socket.on('submitAnswer', (user_id, user_name, user_team, d, team_remaining_time, room_id) => {
    console.log('submit answer in room ' + room_id);
    var other_team = '';
      if (user_team == '1'){
          other_team = '2';
      } else {
          other_team = '1';
      }

    if (room_list[room_id]['phase']=='1') {
      clearInterval(room_interval[room_id][`team_${user_team}`]);
      room_list[room_id][`team_${user_team}`]['team_remaining_time'] = team_remaining_time;
      room_list[room_id][`team_${user_team}`]['normal_member']["giveClues"]['disabled'] = true;
      room_list[room_id][`team_${user_team}`]['normal_member']["submitClues"]['disabled'] = true;
      room_list[room_id][`team_${user_team}`]['normal_member']["suggestAnswer"]['disabled'] = true;
      room_list[room_id][`team_${user_team}`]['normal_member']["submitAnswer"]['disabled'] = true;
      room_list[room_id][`team_${user_team}`]['normal_member']["startNewRound"]['disabled'] = true;

      room_list[room_id][`team_${user_team}`]['normal_member']["submitClues"]['hide'] = true;
      room_list[room_id][`team_${user_team}`]['normal_member']["submitAnswer"]['hide'] = false;
      room_list[room_id]['hasSignalBeenSent'][`team_1`]=false;
      room_list[room_id]['hasSignalBeenSent'][`team_2`]=false;
      console.log(user_name + " just submitted communication");
      
      if (
        d[`box${user_team}${room_list[room_id]['position_to_be_encoded'][`team_${user_team}`][0]}`] == room_list[room_id][`round_${room_list[room_id]['round_no']}`][`team_${user_team}`][`box${user_team}${room_list[room_id]['position_to_be_encoded'][`team_${user_team}`][0]}`] &&
        d[`box${user_team}${room_list[room_id]['position_to_be_encoded'][`team_${user_team}`][1]}`] == room_list[room_id][`round_${room_list[room_id]['round_no']}`][`team_${user_team}`][`box${user_team}${room_list[room_id]['position_to_be_encoded'][`team_${user_team}`][1]}`] &&
        d[`box${user_team}${room_list[room_id]['position_to_be_encoded'][`team_${user_team}`][2]}`] == room_list[room_id][`round_${room_list[room_id]['round_no']}`][`team_${user_team}`][`box${user_team}${room_list[room_id]['position_to_be_encoded'][`team_${user_team}`][2]}`]
        ) { 
        io.to(room_id).emit('pushRight', 1, user_name, room_list[room_id][`round_${room_list[room_id]['round_no']}`][`team_${user_team}`], user_team);
        room_list[room_id][`team_${user_team}`][`team_${user_team}_truth`].push(room_list[room_id][`round_${room_list[room_id]['round_no']}`][`team_${user_team}`]);
        console.log('correct');
        console.log('push right signal sent');
        room_list[room_id][`team_${user_team}`]['suggest'] = d;
        console.log(d);
        io.to(room_id).emit('chat message', user_name + " is in sync with their comrade.", 'log', formatDate(new Date()));
        room_list[room_id]['chatlog'].push(['log', 'log', user_name + " is in sync with their comrade.", formatDate(new Date())]);
      } 
      else {
        room_list[room_id]['misconmunication'][`team_${user_team}`] +=1;
        io.to(room_id).emit('pushRight', 0, user_name, room_list[room_id][`round_${room_list[room_id]['round_no']}`][`team_${user_team}`], user_team);
        room_list[room_id][`team_${user_team}`][`team_${user_team}_truth`].push(room_list[room_id][`round_${room_list[room_id]['round_no']}`][`team_${user_team}`]);
        console.log('incorrect');
        console.log('push right signal sent');
        room_list[room_id][`team_${user_team}`]['suggest'] = d;
        console.log(d);
        io.to(room_id).emit('chat message', user_name + "'s just cut the red wire and it exploded...", 'log', formatDate(new Date()));
        room_list[room_id]['chatlog'].push(['log', 'log', user_name + "'s just cut the red wire and it exploded...", formatDate(new Date())]);
      }

      room_list[room_id][`team_${user_team}`]['clue_giver']["disabled_clue"] = true;
      room_list[room_id][`team_${user_team}`]['normal_member']["disabled_clue"] = true;
      
      room_list[room_id]['team_finish'] += 1;
      if (room_list[room_id]['team_finish'] == 2) {
        room_list[room_id][`team_1`]['team_remaining_time'] = 0;
        room_list[room_id][`team_2`]['team_remaining_time'] = 0;
        room_list[room_id][`team_1`]['normal_member']["startNewRound"]['disabled'] = false;
        room_list[room_id][`team_2`]['normal_member']["startNewRound"]['disabled'] = false;
        room_list[room_id][`team_1`]['clue_giver']["startNewRound"]['disabled'] = false;
        room_list[room_id][`team_2`]['clue_giver']["startNewRound"]['disabled'] = false;
        room_list[room_id]['hasSignalBeenSent'][`team_1`]=false;
        room_list[room_id]['hasSignalBeenSent'][`team_2`]=false;
        if (room_list[room_id]['round_no'] >= 2) {
          var mixed_position = [1,2,3,4];
          room_list[room_id]['phase'] = "2";
          mixed_position.splice(Math.floor(Math.random()*4),1);

          io.to(room_id).emit('rearrangeClues_intercept_JS', room_list[room_id][`round_${room_list[room_id]['round_no']}`], mixed_position);

          io.to(room_id).emit('chat message', 'interception phase begins.', 'log', formatDate(new Date()));
          room_list[room_id]['chatlog'].push(['log', 'log', 'interception phase begins.', formatDate(new Date())]);


          const startTime = Date.now();
          var duration;
          if (env=='prod') {
            duration = room_list[room_id]['timer'] * 60 * 1000;
          } else {
            duration = room_list[room_id]['timer'] * 7 * 1000;
          }
          // 5 minutes in milliseconds

          room_interval[room_id]['team_1']  = setInterval(() => {
            var remainingTime = Math.max(0, duration - (Date.now() - startTime));
            // console.log(remainingTime);
            io.to(room_id).emit('countdown', "1", remainingTime);
            if (remainingTime <= 0) {
              clearInterval(room_interval[room_id]['team_1'] );
            }
          }, 1000);
      
          room_interval[room_id]['team_2']  = setInterval(() => {
            var remainingTime = Math.max(0, duration - (Date.now() - startTime));
            // console.log(remainingTime);
            io.to(room_id).emit('countdown', "2", remainingTime);
            if (remainingTime <= 0) {
              clearInterval(room_interval[room_id]['team_2'] );
            }
          }, 1000);
          console.log('start interception round: send rearrangeClues_intercept_JS');

          room_list[room_id]['round_boxes'] = room_list[room_id][`round_${room_list[room_id]['round_no']}`];
          room_list[room_id]['round_boxes']['mixed_position'] = mixed_position;

          room_list[room_id][`team_1`]['normal_member']["giveClues"]['disabled'] = true;
          room_list[room_id][`team_1`]['normal_member']["submitClues"]['disabled'] = true;
          room_list[room_id][`team_1`]['normal_member']["suggestAnswer"]['disabled'] = false;
          room_list[room_id][`team_1`]['normal_member']["submitAnswer"]['disabled'] = false;
          room_list[room_id][`team_1`]['normal_member']["startNewRound"]['disabled'] = true;

          room_list[room_id][`team_1`]['normal_member']["submitClues"]['hide'] = true;
          room_list[room_id][`team_1`]['normal_member']["submitAnswer"]['hide'] = false;

          room_list[room_id][`team_1`]['clue_giver']["giveClues"]['disabled'] = true;
          room_list[room_id][`team_1`]['clue_giver']["submitClues"]['disabled'] = true;
          room_list[room_id][`team_1`]['clue_giver']["suggestAnswer"]['disabled'] = false;
          room_list[room_id][`team_1`]['clue_giver']["submitAnswer"]['disabled'] = false;
          room_list[room_id][`team_1`]['clue_giver']["startNewRound"]['disabled'] = true;

          room_list[room_id][`team_1`]['clue_giver']["submitClues"]['hide'] = true;
          room_list[room_id][`team_1`]['clue_giver']["submitAnswer"]['hide'] = false;

          room_list[room_id][`team_2`]['normal_member']["giveClues"]['disabled'] = true;
          room_list[room_id][`team_2`]['normal_member']["submitClues"]['disabled'] = true;
          room_list[room_id][`team_2`]['normal_member']["suggestAnswer"]['disabled'] = false;
          room_list[room_id][`team_2`]['normal_member']["submitAnswer"]['disabled'] = false;
          room_list[room_id][`team_2`]['normal_member']["startNewRound"]['disabled'] = true;

          room_list[room_id][`team_2`]['normal_member']["submitClues"]['hide'] = true;
          room_list[room_id][`team_2`]['normal_member']["submitAnswer"]['hide'] = false;

          room_list[room_id][`team_2`]['clue_giver']["giveClues"]['disabled'] = true;
          room_list[room_id][`team_2`]['clue_giver']["submitClues"]['disabled'] = true;
          room_list[room_id][`team_2`]['clue_giver']["suggestAnswer"]['disabled'] = false;
          room_list[room_id][`team_2`]['clue_giver']["submitAnswer"]['disabled'] = false;
          room_list[room_id][`team_2`]['clue_giver']["startNewRound"]['disabled'] = true;

          room_list[room_id][`team_2`]['clue_giver']["submitClues"]['hide'] = true;
          room_list[room_id][`team_2`]['clue_giver']["submitAnswer"]['hide'] = false;

          
          
          // room_list[room_id][`team_${user_team}`]['clue_giver']["disabled_clue"] = true;
          // game_state_full_server[`team_${user_team}`]['normal_member']["disabled_clue"] = true;
        
          // game_state_full_server[`team_${user_team}`]['clue_giver']["disabled_clue_other_team"] = true;
          // game_state_full_server[`team_${user_team}`]['normal_member']["disabled_clue_other_team"] = true;
        

          // game_state_full_server[`team_1`]['suggest'] = {};
          // game_state_full_server[`team_2`]['suggest'] = {};

          // console.log(game_state_full_server[`team_2`]['normal_member']);

        } else {
          io.to(room_id).emit('roundCompleted');

          io.to(room_id).emit('chat message', 'Round completed', 'log', formatDate(new Date()));
          room_list[room_id]['chatlog'].push(['log', 'log', 'Round completed.', formatDate(new Date())]);


        }
      }
    }
    // phase 2
    else {
      clearInterval(room_interval[room_id][`team_${other_team}`]);
      room_list[room_id][`team_${other_team}`]['team_remaining_time'] = team_remaining_time;
      console.log(user_name + " just submitted interception");
      console.log('lock buttons');
      // console.log(room_list[room_id][`team_${other_team}`]['normal_member']);
      room_list[room_id][`team_${other_team}`]['normal_member']["giveClues"]['disabled'] = true;
      room_list[room_id][`team_${other_team}`]['normal_member']["submitClues"]['disabled'] = true;
      room_list[room_id][`team_${other_team}`]['normal_member']["suggestAnswer"]['disabled'] = true;
      room_list[room_id][`team_${other_team}`]['normal_member']["submitAnswer"]['disabled'] = true;
      room_list[room_id][`team_${other_team}`]['normal_member']["startNewRound"]['disabled'] = true;

      room_list[room_id][`team_${other_team}`]['normal_member']["submitClues"]['hide'] = true;
      room_list[room_id][`team_${other_team}`]['normal_member']["submitAnswer"]['hide'] = false;

      room_list[room_id][`team_${other_team}`]['clue_giver']["giveClues"]['disabled'] = true;
      room_list[room_id][`team_${other_team}`]['clue_giver']["submitClues"]['disabled'] = true;
      room_list[room_id][`team_${other_team}`]['clue_giver']["suggestAnswer"]['disabled'] = true;
      room_list[room_id][`team_${other_team}`]['clue_giver']["submitAnswer"]['disabled'] = true;
      room_list[room_id][`team_${other_team}`]['clue_giver']["startNewRound"]['disabled'] = true;

      room_list[room_id][`team_${other_team}`]['clue_giver']["submitClues"]['hide'] = false;
      room_list[room_id][`team_${other_team}`]['clue_giver']["submitAnswer"]['hide'] = true;

      room_list[room_id][`team_${other_team}`]['clue_giver']["disabled_clue"] = true;
      room_list[room_id][`team_${other_team}`]['normal_member']["disabled_clue"] = true
      room_list[room_id][`team_${other_team}`]['clue_giver']["disabled_clue_other_team"] = true;
      room_list[room_id][`team_${other_team}`]['normal_member']["disabled_clue_other_team"] = true;
      


      console.log(room_list[room_id][`team_${other_team}`]);
      if (
        d[`box${user_team}${room_list[room_id]['position_to_be_encoded'][`team_${user_team}`][0]}`] == room_list[room_id][`round_${room_list[room_id]['round_no']}`][`team_${user_team}`][`box${user_team}${room_list[room_id]['position_to_be_encoded'][`team_${user_team}`][0]}`] &&
        d[`box${user_team}${room_list[room_id]['position_to_be_encoded'][`team_${user_team}`][1]}`] == room_list[room_id][`round_${room_list[room_id]['round_no']}`][`team_${user_team}`][`box${user_team}${room_list[room_id]['position_to_be_encoded'][`team_${user_team}`][1]}`] &&
        d[`box${user_team}${room_list[room_id]['position_to_be_encoded'][`team_${user_team}`][2]}`] == room_list[room_id][`round_${room_list[room_id]['round_no']}`][`team_${user_team}`][`box${user_team}${room_list[room_id]['position_to_be_encoded'][`team_${user_team}`][2]}`]
      ) { 
        io.to(room_id).emit('intercept_res', 1, user_name, room_list[room_id][`round_${room_list[room_id]['round_no']}`][`team_${user_team}`], user_team);
        room_list[room_id]['interception'][`team_${other_team}`] +=1;
        room_list[room_id][`team_${other_team}`][`team_${user_team}_truth`].push(room_list[room_id][`round_${room_list[room_id]['round_no']}`][`team_${user_team}`]);
        console.log('correct interception: intercept_res + push right sent');
        io.to(room_id).emit('chat message', user_name + "'s shown people how to read mind! Yall.", 'log', formatDate(new Date()));
        room_list[room_id]['chatlog'].push(['log', 'log', user_name + "'s shown people how to read mind! Yall.", formatDate(new Date())]);
      } 
      else {
        io.to(room_id).emit('intercept_res', 0, user_name, room_list[room_id][`round_${room_list[room_id]['round_no']}`][`team_${user_team}`], user_team);
        room_list[room_id][`team_${other_team}`][`team_${user_team}_truth`].push(room_list[room_id][`round_${room_list[room_id]['round_no']}`][`team_${user_team}`]);
        console.log('incorrect interception: intercept_res + push right sent');
        io.to(room_id).emit('chat message', "who the hell put " + user_name + " in charge? His mind is feeble and not fit for the job!", 'log', formatDate(new Date()));
        room_list[room_id]['chatlog'].push(['log', 'log', "who the hell put " + user_name + " in charge? His mind is feeble and not fit for the job!", formatDate(new Date())]);
      }
      
      
      console.log(room_list[room_id]['misconmunication']);
      console.log(room_list[room_id]['interception']);
      room_list[room_id]['team_finish_interception'] += 1;
      if (room_list[room_id]['team_finish_interception'] == 2) {
        console.log('send roundComplete');
        room_list[room_id]['chatlog'].push(['log', 'log', "Round completed.", formatDate(new Date())]);
        if (parseInt(room_list[room_id]['misconmunication']["team_1"])==2 || parseInt(room_list[room_id]['misconmunication']["team_2"])==2 || parseInt(room_list[room_id]['interception']["team_2"])==2 || parseInt(room_list[room_id]['interception']["team_1"])==2) {
          console.log("there's a winner");
          console.log(parseFloat(room_list[room_id]['interception']["team_1"]));
          console.log(parseFloat(room_list[room_id]['interception']["team_2"]));
          console.log(parseFloat(room_list[room_id]['misconmunication']["team_1"])*1.1);
          console.log(parseFloat(room_list[room_id]['misconmunication']["team_2"])*1.1);
          var team_1_score = parseFloat(room_list[room_id]['interception']["team_1"]) - parseFloat(room_list[room_id]['misconmunication']["team_1"])*1.1; 
          var team_2_score = parseFloat(room_list[room_id]['interception']["team_2"]) - parseFloat(room_list[room_id]['misconmunication']["team_2"])*1.1; 
          console.log(parseFloat(team_1_score));
          console.log(parseFloat(team_2_score));
          var gay = ["gà đừng hỏi", "thu dọn hành lý chuẩn bị vào hang", "không cần phải buồn, mình có thực lực thì mới buồn chứ"]
          var gratz = ["xuất sắc hoàn thành nhiệm vụ đảng và nhà nước giao phó", "đọc team họ như 1 cuốn sách tập đọc lớp 1", "não vừa to vừa dài cuốn quanh cổ"];
          var gay_words = "";
          var gratz_words = "";
          var hoa_words = "2 team không thể chung 1 hang";

          gratz_words =  gratz[Math.floor(Math.random()*gratz.length)];
          
          gay_words =  gay[Math.floor(Math.random()*gay.length)];
          
          
          
          if (team_1_score == team_2_score){
            io.to(room_id).emit('game_result', 'Tie', "Tie", hoa_words, hoa_words);
          } else {
            if (team_1_score > team_2_score) {
              console.log('team 1 win');
              io.to(room_id).emit('game_result', '1', '2', gratz_words, gay_words);
            } else {
              io.to(room_id).emit('game_result', '2', '1', gratz_words, gay_words);
            }
          }
          
          
            
        } else {
          io.to(room_id).emit('roundCompleted');
        }
      
        // to lock buttons when round completed
        room_list[room_id]['round_finished'] = true;

        io.to(room_id).emit('chat message', 'Round completed!', 'log', formatDate(new Date()));
        room_list[room_id]['chatlog'].push(['log', 'log', 'Round completed!', formatDate(new Date())]);

      }
    }
    
  });
  

  socket.on('startNewRound', (user_name, room_id) => {
    console.log('starNewRound signal received from ' + user_name);
    room_list[room_id]['team_finish'] = 0;
    room_list[room_id]['team_finish_interception'] = 0;
    room_list[room_id]['position_to_be_encoded']['team_1'] = [1,2,3,4];
    room_list[room_id]['position_to_be_encoded']['team_2'] = [1,2,3,4];
    room_list[room_id]['phase'] = "1";
    room_list[room_id]['round_no'] +=1;
    room_list[room_id][`round_${room_list[room_id]['round_no']}`] = {}; 
    room_list[room_id][`round_${room_list[room_id]['round_no']}`]['team_1'] = {};
    room_list[room_id][`round_${room_list[room_id]['round_no']}`]['team_2'] = {};
    
    room_list[room_id][`team_1`]['normal_member']["giveClues"]['disabled'] = false;
    room_list[room_id][`team_1`]['normal_member']["submitClues"]['disabled'] = true;
    room_list[room_id][`team_1`]['normal_member']["suggestAnswer"]['disabled'] = true;
    room_list[room_id][`team_1`]['normal_member']["submitAnswer"]['disabled'] = true;
    room_list[room_id][`team_1`]['normal_member']["startNewRound"]['disabled'] = true;

    room_list[room_id][`team_1`]['normal_member']["submitClues"]['hide'] = false;
    room_list[room_id][`team_1`]['normal_member']["submitAnswer"]['hide'] = true;

    room_list[room_id][`team_2`]['normal_member']["giveClues"]['disabled'] = false;
    room_list[room_id][`team_2`]['normal_member']["submitClues"]['disabled'] = true;
    room_list[room_id][`team_2`]['normal_member']["suggestAnswer"]['disabled'] = true;
    room_list[room_id][`team_2`]['normal_member']["submitAnswer"]['disabled'] = true;
    room_list[room_id][`team_2`]['normal_member']["startNewRound"]['disabled'] = true;

    room_list[room_id][`team_2`]['normal_member']["submitClues"]['hide'] = false;
    room_list[room_id][`team_2`]['normal_member']["submitAnswer"]['hide'] = true;

    room_list[room_id]['team_1']['clue_giver']["box11"]['contenteditable'] = "true" ;
    room_list[room_id]['team_1']['clue_giver']["box12"]['contenteditable'] = "true" ;
    room_list[room_id]['team_1']['clue_giver']["box13"]['contenteditable'] = "true" ;
    room_list[room_id]['team_1']['clue_giver']["box14"]['contenteditable'] = "true" ;
    room_list[room_id]['team_2']['clue_giver']["box21"]['contenteditable'] = "true" ;
    room_list[room_id]['team_2']['clue_giver']["box22"]['contenteditable'] = "true" ;
    room_list[room_id]['team_2']['clue_giver']["box23"]['contenteditable'] = "true" ;
    room_list[room_id]['team_2']['clue_giver']["box24"]['contenteditable'] = "true" ;

    
    room_list[room_id]['clue_giver']['team_1'] = "";
    room_list[room_id]['clue_giver']['team_2'] = "";
    room_list[room_id]['round_finished'] = false;
    room_list[room_id]['team_1']['suggest'] = {};
    room_list[room_id]['team_2']['suggest'] = {};
    room_list[room_id][`team_1`]['clue_giver']['boxes_with_clue'] = [];
    room_list[room_id][`team_2`]['clue_giver']['boxes_with_clue'] = [];

    room_list[room_id][`team_1`]['clue_giver']["disabled_clue"] = false;
    room_list[room_id][`team_1`]['normal_member']["disabled_clue"] = false;
    room_list[room_id][`team_1`]['clue_giver']["disabled_clue_other_team"] = false;
    room_list[room_id][`team_1`]['normal_member']["disabled_clue_other_team"] = false;

    room_list[room_id][`team_2`]['clue_giver']["disabled_clue"] = false;
    room_list[room_id][`team_2`]['normal_member']["disabled_clue"] = false;
    room_list[room_id][`team_2`]['clue_giver']["disabled_clue_other_team"] = false;
    room_list[room_id][`team_2`]['normal_member']["disabled_clue_other_team"] = false;

    room_list[room_id]['team_1']['clue_giver']["box11"]['innerHTML'] = "" ;
    room_list[room_id]['team_1']['clue_giver']["box12"]['innerHTML'] = "" ;
    room_list[room_id]['team_1']['clue_giver']["box13"]['innerHTML'] = "" ;
    room_list[room_id]['team_1']['clue_giver']["box14"]['innerHTML'] = "" ;
    room_list[room_id]['team_2']['clue_giver']["box21"]['innerHTML'] = "" ;
    room_list[room_id]['team_2']['clue_giver']["box22"]['innerHTML'] = "" ;
    room_list[room_id]['team_2']['clue_giver']["box23"]['innerHTML'] = "" ;
    room_list[room_id]['team_2']['clue_giver']["box24"]['innerHTML'] = "" ;

    room_list[room_id]['hasSignalBeenSent'][`team_1`]=false;
    room_list[room_id]['hasSignalBeenSent'][`team_2`]=false;

    io.to(room_id).emit('startNewRound_JS', user_name);

    io.to(room_id).emit('chat message', user_name + ' has started a new round.', 'log', formatDate(new Date()));
    room_list[room_id]['chatlog'].push(['log', 'log', user_name + ' has started a new round.', formatDate(new Date())]);

    const startTime = Date.now();
    var duration;
    if (env=='prod') {
      duration = room_list[room_id]['timer'] * 60 * 1000;
    } else {
      duration = room_list[room_id]['timer'] * 7 * 1000;
    }
    
    // room_list[room_id]['interval']['team_1'] = setInterval(()
    room_interval[room_id]['team_1']  = setInterval(() => {
      var remainingTime = Math.max(0, duration - (Date.now() - startTime));
      // console.log(remainingTime);
      io.to(room_id).emit('countdown', "1", remainingTime);
      if (remainingTime <= 0) {
        clearInterval(room_interval[room_id]['team_1'] );
      }
    }, 1000);

    room_interval[room_id]['team_2']  = setInterval(() => {
      var remainingTime = Math.max(0, duration - (Date.now() - startTime));
      // console.log(remainingTime);
      io.to(room_id).emit('countdown', "2", remainingTime);
      if (remainingTime <= 0) {
        clearInterval(room_interval[room_id]['team_2'] );
      }
    }, 1000);

    room_list[room_id][`team_1`]['team_remaining_time'] = 0;
    room_list[room_id][`team_2`]['team_remaining_time'] = 0;
  });


  // sync current state of the game
  socket.on('sync_up', (serializedHTML, user_team, is_all, is_clue_giver, current_phase, room_id) => {
    // if (is_clue_giver) {
    //   game_state_full_server[`team_${user_team}`]['clue_giver'] = serializedHTML;
    // }
    // else {
    //   if (is_all) {
    //     var other_team = '';
    //     if (user_team == '1'){
    //         other_team = '2';
    //     } else {
    //         other_team = '1';
    //       }
    //     game_state_full_server[`team_${user_team}`]['normal_member'] = serializedHTML;
    //     game_state_full_server[`team_${other_team}`]['normal_member'] = serializedHTML;
    //     game_state_full_server[`team_${user_team}`]['clue_giver'] = serializedHTML;
    //     game_state_full_server[`team_${other_team}`]['clue_giver'] = serializedHTML;
    //   }
    //   else {
    //     game_state_full_server[`team_${user_team}`]['normal_member'] = serializedHTML;
    //   }
    // }
    room_list[room_id]['phase'] = current_phase;
  });

  socket.on('stopClock', (user_team, room_id)=> {
    io.to(room_id).emit('server_stopClock', user_team);
  });

  socket.on('reconnect_sync_up', (user_socket_id, user_id, user_name, room_id) => {
    console.log('user_name ' + user_name);
    if (user_id in user_db) {
      user_db[user_id]['user_name'] = user_name;
      user_db[user_id]['user_socket_id'] = user_socket_id;
      user_db[user_id]['user_room'] = room_id;
    } else {
      user_db[user_id] = {};
      user_db[user_id]['user_name'] = user_name;
      user_db[user_id]['user_socket_id'] = user_socket_id;
      user_db[user_id]['user_room'] = room_id;
    }
    socket.join(room_id);
    console.log("recsync " + user_socket_id + " joined " + room_id)
    console.log(user_db[user_id]);
    // console.log(JSON.stringify(room_list[room_id], null, 2));
    // console.log(findCircularReferences(JSON.stringify(room_list[room_id], null, 2)));
    // console.log(findCircularReferences(room_list[room_id]));
    let room_state = JSON.stringify(room_list[room_id], null, 2);
    if (room_list[room_id]['game_started']){
        console.log('game has started')
        
        socket.emit('reconnect_sync_up_js', room_state, room_list[room_id]['phase'], room_list[room_id]['clue_giver'], user_db, room_list[room_id]['misconmunication'], room_list[room_id]['interception']);
        io.to(room_id).emit('team_member_update', user_db);
      }
      else{
        io.to(room_id).emit('team_member_update', user_db);
        console.log('team_member_update sent');
      }
    socket.emit('sync_chat_log', room_state);
  });

  socket.on('generate_random_name', () =>{
    var gen_name = namelist[Math.floor(Math.random()*namelist.length)];
    console.log('gen a name: ' + gen_name);
    socket.emit('generated_name', gen_name, env);
  });


  socket.on('time_out', (user_team, room_id) => {
    console.log('time out, log disabled clues ')
    var team_name = "";
    if (user_team=='1') {
      team_name = server_team_1_name;
    } else {
      team_name = server_team_2_name;
    }
    if (room_list[room_id]['phase']=="1"){
      room_list[room_id][`team_${user_team}`]['clue_giver']["disabled_clue"] = true;
      room_list[room_id][`team_${user_team}`]['normal_member']["disabled_clue"] = true;
      room_list[room_id][`team_${user_team}`]['clue_giver']["suggestAnswer"]['disabled'] = true;
      room_list[room_id][`team_${user_team}`]['normal_member']["suggestAnswer"]['disabled'] = true;
    } else {
      room_list[room_id][`team_${user_team}`]['clue_giver']["disabled_clue_other_team"] = true;
      room_list[room_id][`team_${user_team}`]['normal_member']["disabled_clue_other_team"] = true;
      room_list[room_id][`team_${user_team}`]['clue_giver']["suggestAnswer"]['disabled'] = true;
      room_list[room_id][`team_${user_team}`]['normal_member']["suggestAnswer"]['disabled'] = true;
    }

    if (room_list[room_id]['hasSignalBeenSent'][`team_${user_team}`]==false){
      io.to(room_id).emit('chat message',`time's up, freezeee~ ${team_name}!`, 'log', formatDate(new Date()));
      room_list[room_id]['chatlog'].push(['log', 'log',`time's up, freezeee~ ${team_name}!`, formatDate(new Date())]);
      room_list[room_id]['hasSignalBeenSent'][`team_${user_team}`]=true;
    }

  });

  socket.on('team_2_button', (user_id, user_name, room_id) =>{
    var defect = 0;
    if (user_db[user_id]['user_team'] == '1') {
      defect = 1
      io.to(room_id).emit('chat message', "scumbag " + user_name + " has defected to " + server_team_2_name, 'log', formatDate(new Date()));
      room_list[room_id]['chatlog'].push(['log', 'log', "scumbag " + user_name + " has defected to " + server_team_2_name + '.', formatDate(new Date())]);
    } else {
      io.to(room_id).emit('chat message', user_name + " has sworn allegiance to " + server_team_2_name, 'log', formatDate(new Date()));
      room_list[room_id]['chatlog'].push(['log', 'log', user_name + " has sworn allegiance to " + server_team_2_name + '.', formatDate(new Date())])
    }
    user_db[user_id]['user_team'] = '2'
    console.log(user_db[user_id]);
    // console.log(findCircularReferences(room_list[room_id]));
    let room_state = JSON.stringify(room_list[room_id],null,2);
    io.to(room_id).emit('user_join_team', user_name, user_id, user_db[user_id]['user_team'], defect, room_state);
    io.to(room_id).emit('team_member_update', user_db);
  });

  socket.on('team_1_button', (user_id, user_name, room_id) =>{
    var defect = 0;
    if (user_db[user_id]['user_team'] == '2') {
      defect = 1
      io.to(room_id).emit('chat message', "scumbag " + user_name + " has defected to " + server_team_1_name, 'log', formatDate(new Date()));
      room_list[room_id]['chatlog'].push(['log', 'log', "scumbag " + user_name + " has defected to " + server_team_1_name + '.', formatDate(new Date())]);
    } else {
      io.to(room_id).emit('chat message', user_name + " has sworn allegiance to " + server_team_1_name, 'log', formatDate(new Date()));
      room_list[room_id]['chatlog'].push(['log', 'log', user_name + " has sworn allegiance to " + server_team_1_name + '.', formatDate(new Date())])
    }
    user_db[user_id]['user_team'] = '1'
    console.log(user_db[user_id])
    // console.log(findCircularReferences(room_list[room_id]));
    let room_state = JSON.stringify(room_list[room_id],null,2);
    io.to(room_id).emit('user_join_team', user_name, user_id, user_db[user_id]['user_team'], defect, room_state);
    io.to(room_id).emit('team_member_update', user_db);
  });

  function formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();

    return `${h.slice(-2)}:${m.slice(-2)}`;
  }

  // socket.on('disconnect', (user_id) => {
  //   console.log('user ' + socket.id + ' disconnected');
  //   for (user_id in room_list[room_id]['user_db']) {
  //     if (user_db[user_id]['user_socket_id'] == socket.id){
  //       console.log('disconneceted');
  //       console.log(user_db[user_id]);
  //       delete user_db[user_id];
  //       console.log(user_db);
  //     }
  //   }


  

  








// handler for chat

  socket.on('chat message', (msg, user_id, user_name, date, room_id) => {
    // console.log(user_name + " " + msg);
    room_list[room_id]['chatlog'].push([user_name, user_id, msg, date]);
    socket.broadcast.to(room_id).emit('chat message', msg, user_name, date, room_id);
  });

});

instrument(io, {
  auth: false,
  mode: "development",
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});


