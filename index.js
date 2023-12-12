const fetch = require("node-fetch");
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

game_state_full_server[`team_1`]['team_remaining_time'] = 0;
game_state_full_server[`team_2`]['team_remaining_time'] = 0;

game_state_full_server['round_finished'] = false;

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
mixed_position_state = {}
mixed_position_state['team_1'] = [];
mixed_position_state['team_2'] = [];

var team_1_keywords = [];
var team_2_keywords = [];
var wordlist = [];
var namelist = [];
game_state[`round_0`] = {}; 
game_state[`round_0`]['team_1'] = {};
game_state[`round_0`]['team_2'] = {};
game_state[`round_1`] = {}; 
game_state[`round_1`]['team_1'] = {};
game_state[`round_1`]['team_2'] = {};

var interval_1;
var interval_2;
var interval = {};
interval['team_1'] = interval_1;
interval['team_2'] = interval_2;

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

fetchLines('https://gist.githubusercontent.com/leduc2939/55614e5aecdcc5dd21f25f4604d77a22/raw/675d2a9410db34239c15c4ea4082346f919de1bd/name_list.txt')
  .then(lines => {
    namelist = lines;
  })
  .catch(error => {
    console.error("Error fetching lines:", error);
});

let env = process.argv[2];
if (env=='prod') {
  round_no = 0;
}

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

  console.log(env);
  socket.emit("gen_uuid", (env));


  user_team[socket.id] = 1;
  console.log('socket ' + socket.id + ' connected');
  
  
  socket.on('disconnect', (user_id) => {
    console.log('user ' + socket.id + ' disconnected');
    for (user_id in user_db) {
      if (user_db[user_id]['user_socket_id'] == socket.id){
        console.log('disconneceted');
        console.log(user_db[user_id]);
        delete user_db[user_id];
        console.log(user_db);
      }
    }
    
  });

  socket.on('iden_user_id', (user_id) => {
    if (user_id in user_db) {
      io.emit('recognized', user_id, user_db[user_id]);
      } else {
      user_db[user_id] = {}; 
    }
  });

  socket.on('enterGame', (user_id, user_name, user_team) => {
    // user_db[user_id]['user_name'] = user_name;
    // user_db[user_id]['user_team'] = user_team;
    // socket.emit('team_member_update',user_db);
    // console.log(user_db[user_id]);
  }); 


  socket.on('newGames', (user_id, user_name) => {
    console.log('user: ' + user_name + ' has started a new game');
    round_no = 1;
    phase = "1";
    misconmunication = {'team_1':0, 'team_2':0};
    interception = {'team_1':0,'team_2':0};
    position_to_be_encoded['team_1'] = [1,2,3,4];
    position_to_be_encoded['team_2'] = [1,2,3,4];
    game_started = true;

    team_1_keywords = [];
    team_2_keywords = [];
    for (let i = 0; i < 4; i++) {
      team_1_keywords.push(wordlist.splice(Math.floor(Math.random()*wordlist.length),1)[0])
      team_2_keywords.push(wordlist.splice(Math.floor(Math.random()*wordlist.length),1)[0])
    }
    io.emit('newGame_JS',team_1_keywords,team_2_keywords);
    clearInterval(interval[`team_1`]);
    clearInterval(interval[`team_2`]);
    // io.emit('server_stopClock', "1");
    // io.emit('server_stopClock', "2");
    game_state_full_server[`team_1`]['team_remaining_time'] = 0;
    game_state_full_server[`team_2`]['team_remaining_time'] = 0;
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

    game_state_full_server[`team_1`]['clue_giver']['disabled_clue'] = false;
    game_state_full_server[`team_1`]['normal_member']['disabled_clue'] = false;
    game_state_full_server[`team_2`]['clue_giver']['disabled_clue'] = false;
    game_state_full_server[`team_2`]['normal_member']['disabled_clue'] = false;

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

    game_state_full_server['round_finished'] = false;


    clue_giver['team_1'] = "";
    clue_giver['team_2'] = "";

    game_state_full_server['team_1']['normal_member']["team_1_word1"] = team_1_keywords[0];
    game_state_full_server['team_1']['normal_member']["team_1_word2"] = team_1_keywords[1];  
    game_state_full_server['team_1']['normal_member']["team_1_word3"] = team_1_keywords[2];  
    game_state_full_server['team_1']['normal_member']["team_1_word4"] = team_1_keywords[3];  
    game_state_full_server['team_2']['normal_member']["team_2_word1"] = team_2_keywords[0];  
    game_state_full_server['team_2']['normal_member']["team_2_word2"] = team_2_keywords[1];  
    game_state_full_server['team_2']['normal_member']["team_2_word3"] = team_2_keywords[2];  
    game_state_full_server['team_2']['normal_member']["team_2_word4"] = team_2_keywords[3];  
    
    game_state_full_server['team_1']['clue_giver']["team_1_word1"] = team_1_keywords[0];
    game_state_full_server['team_1']['clue_giver']["team_1_word2"] = team_1_keywords[1];  
    game_state_full_server['team_1']['clue_giver']["team_1_word3"] = team_1_keywords[2];  
    game_state_full_server['team_1']['clue_giver']["team_1_word4"] = team_1_keywords[3];  
    game_state_full_server['team_2']['clue_giver']["team_2_word1"] = team_2_keywords[0];  
    game_state_full_server['team_2']['clue_giver']["team_2_word2"] = team_2_keywords[1];  
    game_state_full_server['team_2']['clue_giver']["team_2_word3"] = team_2_keywords[2];  
    game_state_full_server['team_2']['clue_giver']["team_2_word4"] = team_2_keywords[3]; 

    game_state_full_server[`team_1`]['clue_giver']["startNewRound"]['disabled'] = false;
    game_state_full_server[`team_1`]['normal_member']["startNewRound"]['disabled'] = false;
    game_state_full_server[`team_2`]['clue_giver']["startNewRound"]['disabled'] = false;
    game_state_full_server[`team_2`]['normal_member']["startNewRound"]['disabled'] = false;
    
    game_state_full_server[`team_1`]['clue_giver']["startNewRound"]['disabled'] = false;
    game_state_full_server[`team_1`]['normal_member']["startNewRound"]['disabled'] = false;
    game_state_full_server[`team_2`]['clue_giver']["startNewRound"]['disabled'] = false;
    game_state_full_server[`team_2`]['normal_member']["startNewRound"]['disabled'] = false;
    

    console.log(team_1_keywords);
    console.log(team_2_keywords);
    
    
  })
  
  // 
  socket.on('giveClues', (user_id, user_name, user_team) => {
    console.log(user_id);
    console.log(user_db);
    console.log('user: ' + user_name + ' is giving clues');
    var left_out_position = Math.floor(Math.random()*4);
    position_to_be_encoded[`team_${user_team}`].splice(left_out_position,1);
    left_out_position += 1;
    game_state[`round_${round_no}`][`team_${user_team}`][`box${user_team}${position_to_be_encoded[`team_${user_team}`][0]}`] = '';
    game_state[`round_${round_no}`][`team_${user_team}`][`box${user_team}${position_to_be_encoded[`team_${user_team}`][1]}`] = '';
    game_state[`round_${round_no}`][`team_${user_team}`][`box${user_team}${position_to_be_encoded[`team_${user_team}`][2]}`] = '';
    game_state[`round_${round_no}`][`team_${user_team}`][`box${user_team}${left_out_position}`] = 'null';
    io.emit('giveClues_JS', user_id, user_name, user_team, position_to_be_encoded[`team_${user_team}`]);

    game_state_full_server[`team_${user_team}`]['clue_giver']['boxes_with_clue'] = position_to_be_encoded[`team_${user_team}`];
    clue_giver[`team_${user_team}`] = user_id
    console.log(clue_giver[`team_${user_team}`])
    game_state_full_server[`team_${user_team}`]['clue_giver']["giveClues"]['disabled'] = true;
    game_state_full_server[`team_${user_team}`]['clue_giver']["submitClues"]['disabled'] = false;
    game_state_full_server[`team_${user_team}`]['clue_giver']["suggestAnswer"]['disabled'] = true;
    game_state_full_server[`team_${user_team}`]['clue_giver']["submitAnswer"]['disabled'] = true;
    game_state_full_server[`team_${user_team}`]['clue_giver']["startNewRound"]['disabled'] = true;

    game_state_full_server[`team_${user_team}`]['clue_giver']["submitClues"]['hide'] = false;
    game_state_full_server[`team_${user_team}`]['clue_giver']["submitAnswer"]['hide'] = true;

    game_state_full_server[`team_${user_team}`]['normal_member']["giveClues"]['disabled'] = true;
    game_state_full_server[`team_${user_team}`]['normal_member']["submitClues"]['disabled'] = true;
    game_state_full_server[`team_${user_team}`]['normal_member']["suggestAnswer"]['disabled'] = true;
    game_state_full_server[`team_${user_team}`]['normal_member']["submitAnswer"]['disabled'] = true;
    game_state_full_server[`team_${user_team}`]['normal_member']["startNewRound"]['disabled'] = true;
    
    game_state_full_server[`team_${user_team}`]['normal_member']["submitClues"]['hide'] = true;
    game_state_full_server[`team_${user_team}`]['normal_member']["submitAnswer"]['hide'] = false;
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
  socket.on('submitClues', (user_id, user_name, user_team, input1_value, input2_value, input3_value) => {
    console.log(user_name + " has submitted his clues");
    // randomize position
    var mixed_position = [1, 2, 3, 4];
    var left_out_position = Math.floor(Math.random()*mixed_position.length);
    mixed_position.splice(left_out_position,1);
    shuffle(mixed_position); 
    io.emit('rearrangeClues_JS', user_id, user_name, user_team, input1_value, input2_value, input3_value, mixed_position);
    game_state[`round_${round_no}`][`team_${user_team}`][`box${user_team}${position_to_be_encoded[`team_${user_team}`][0]}`] = input1_value;
    game_state[`round_${round_no}`][`team_${user_team}`][`box${user_team}${position_to_be_encoded[`team_${user_team}`][1]}`] = input2_value;
    game_state[`round_${round_no}`][`team_${user_team}`][`box${user_team}${position_to_be_encoded[`team_${user_team}`][2]}`] = input3_value;
   
    game_state_full_server[`team_${user_team}`]['clue_giver'][`box${user_team}${position_to_be_encoded[`team_${user_team}`][0]}`]['contenteditable'] = "false" ;
    game_state_full_server[`team_${user_team}`]['clue_giver'][`box${user_team}${position_to_be_encoded[`team_${user_team}`][1]}`]['contenteditable'] = "false" ;
    game_state_full_server[`team_${user_team}`]['clue_giver'][`box${user_team}${position_to_be_encoded[`team_${user_team}`][2]}`]['contenteditable'] = "false" ;
    game_state_full_server[`team_${user_team}`]['clue_giver'][`box${user_team}${position_to_be_encoded[`team_${user_team}`][0]}`]['innerHTML'] = input1_value;
    game_state_full_server[`team_${user_team}`]['clue_giver'][`box${user_team}${position_to_be_encoded[`team_${user_team}`][1]}`]['innerHTML'] = input2_value;
    game_state_full_server[`team_${user_team}`]['clue_giver'][`box${user_team}${position_to_be_encoded[`team_${user_team}`][2]}`]['innerHTML'] = input3_value;

    game_state_full_server[`team_${user_team}`]['clue_giver']['disabled_clue'] = true;
    
    game_state_full_server[`team_${user_team}`]['normal_member']['boxes_with_clue'] = mixed_position;

    game_state_full_server[`team_${user_team}`]['clue_giver']["giveClues"]['disabled'] = true;
    game_state_full_server[`team_${user_team}`]['clue_giver']["submitClues"]['disabled'] = true;
    game_state_full_server[`team_${user_team}`]['clue_giver']["suggestAnswer"]['disabled'] = true;
    game_state_full_server[`team_${user_team}`]['clue_giver']["submitAnswer"]['disabled'] = true;
    game_state_full_server[`team_${user_team}`]['clue_giver']["startNewRound"]['disabled'] = true;
    game_state_full_server[`team_${user_team}`]['clue_giver']["submitClues"]['hide'] = false;
    game_state_full_server[`team_${user_team}`]['clue_giver']["submitAnswer"]['hide'] = true;
    
    game_state_full_server[`team_${user_team}`]['normal_member']["giveClues"]['disabled'] = true;
    game_state_full_server[`team_${user_team}`]['normal_member']["submitClues"]['disabled'] = true;
    game_state_full_server[`team_${user_team}`]['normal_member']["suggestAnswer"]['disabled'] = false;
    game_state_full_server[`team_${user_team}`]['normal_member']["submitAnswer"]['disabled'] = false;
    game_state_full_server[`team_${user_team}`]['normal_member']["startNewRound"]['disabled'] = true;

    game_state_full_server[`team_${user_team}`]['normal_member']["submitClues"]['hide'] = true;
    game_state_full_server[`team_${user_team}`]['normal_member']["submitAnswer"]['hide'] = false;
    
    // $(`#input${my_team}1`).addClass('disabled_clue');
    //     $(`#input${my_team}2`).addClass('disabled_clue');
    //     $(`#input${my_team}3`).addClass('disabled_clue');
    //     $(`#input${my_team}1`).attr('contenteditable','false');
    //     $(`#input${my_team}2`).attr('contenteditable','false');
    //     $(`#input${my_team}3`).attr('contenteditable','false');
    // console.log( user_id, user_name, user_team, input2_value, input3_value, input1_value, mixed_position);

    console.log(game_state_full_server[`team_${user_team}`]['clue_giver']["submitClues"])
  });
  
  // suggest 
  socket.on('suggestAnswer', (user_id, user_name, user_team, d) => {
    io.emit('rearrangeSuggest_JS', user_name, user_team, d, phase);
    console.log('emit rearrangeSuggest_JS');
    game_state_full_server[`team_${user_team}`]['suggest'] = d;
    console.log(game_state_full_server[`team_${user_team}`]);
  });

  // send pushRight signal to the team that has done guessing
  // if both team done submitting, and round >= 2 then send rearrange signal 
  // but swap clues else send roundCompleted signal
  
  socket.on('submitAnswer', (user_id, user_name, user_team, d, team_remaining_time) => {
    
    var other_team = '';
      if (user_team == '1'){
          other_team = '2';
      } else {
          other_team = '1';
      }

    if (phase=='1') {
      clearInterval(interval[`team_${user_team}`]);
      game_state_full_server[`team_${user_team}`]['team_remaining_time'] = team_remaining_time;
      game_state_full_server[`team_${user_team}`]['normal_member']["giveClues"]['disabled'] = true;
      game_state_full_server[`team_${user_team}`]['normal_member']["submitClues"]['disabled'] = true;
      game_state_full_server[`team_${user_team}`]['normal_member']["suggestAnswer"]['disabled'] = true;
      game_state_full_server[`team_${user_team}`]['normal_member']["submitAnswer"]['disabled'] = true;
      game_state_full_server[`team_${user_team}`]['normal_member']["startNewRound"]['disabled'] = true;

      game_state_full_server[`team_${user_team}`]['normal_member']["submitClues"]['hide'] = true;
      game_state_full_server[`team_${user_team}`]['normal_member']["submitAnswer"]['hide'] = false;
      console.log(user_name + " just submitted communication");
      if (
        d[`box${user_team}${position_to_be_encoded[`team_${user_team}`][0]}`] == game_state[`round_${round_no}`][`team_${user_team}`][`box${user_team}${position_to_be_encoded[`team_${user_team}`][0]}`] &&
        d[`box${user_team}${position_to_be_encoded[`team_${user_team}`][1]}`] == game_state[`round_${round_no}`][`team_${user_team}`][`box${user_team}${position_to_be_encoded[`team_${user_team}`][1]}`] &&
        d[`box${user_team}${position_to_be_encoded[`team_${user_team}`][2]}`] == game_state[`round_${round_no}`][`team_${user_team}`][`box${user_team}${position_to_be_encoded[`team_${user_team}`][2]}`]
        ) { 
        io.emit('pushRight', 1, user_name, game_state[`round_${round_no}`][`team_${user_team}`], user_team);
        game_state_full_server[`team_${user_team}`][`team_${user_team}_truth`].push(game_state[`round_${round_no}`][`team_${user_team}`]);
        console.log('correct');
        console.log('push right signal sent');
        game_state_full_server[`team_${user_team}`]['suggest'] = d;
        console.log(d);
      } 
      else {
        misconmunication[`team_${user_team}`] +=1;
        io.emit('pushRight', 0, user_name, game_state[`round_${round_no}`][`team_${user_team}`], user_team);
        game_state_full_server[`team_${user_team}`][`team_${user_team}_truth`].push(game_state[`round_${round_no}`][`team_${user_team}`]);
        console.log('incorrect');
        console.log('push right signal sent');
        game_state_full_server[`team_${user_team}`]['suggest'] = d;
        console.log(d);
      }

      game_state_full_server[`team_${user_team}`]['clue_giver']["disabled_clue"] = true;
      game_state_full_server[`team_${user_team}`]['normal_member']["disabled_clue"] = true;
      
      team_finish += 1;
      if (team_finish == 2) {
        game_state_full_server[`team_1`]['team_remaining_time'] = 0;
        game_state_full_server[`team_2`]['team_remaining_time'] = 0;
        if (round_no >= 2) {
          var mixed_position = [1,2,3,4];
          phase = "2";
          mixed_position.splice(Math.floor(Math.random()*4),1);
          io.emit('rearrangeClues_intercept_JS', game_state[`round_${round_no}`], mixed_position);
          const startTime = Date.now();
          const duration = 5 * 7 * 1000; // 5 minutes in milliseconds
          var total_time = Math.max(0, duration - (Date.now() - startTime));

          var team_1_mem = [];
          var team_2_mem = [];

          for (user_id in user_db) {
            if (user_db[user_id]['user_team']  == '1'){
              team_1_mem.push(user_id);
            }
          }
          for (user_id in user_db) {
            if (user_db[user_id]['user_team']  == '2'){
              team_2_mem.push(user_id);
            }
          }
          
          var team_1_seed = Math.floor(Math.random()*(team_1_mem.length-1)) ;
          var team_2_seed = Math.floor(Math.random()*(team_1_mem.length-1)) ;
          // io.emit('countdown', ? , total_time, user_db);
          console.log('countdown user_db');
          console.log(user_db);
          // for (user_id in user_db) {
          //   user_db[user_id]['user_team'] == "1"
          // }
          interval['team_1'] = setInterval(() => {
            var remainingTime = Math.max(0, duration - (Date.now() - startTime));
            // console.log(remainingTime);
            io.emit('countdown', "1", remainingTime, team_1_mem, team_1_seed);
            if (remainingTime <= 0) {
              clearInterval(interval['team_1']);
            }
          }, 1000);
      
          interval['team_2'] = setInterval(() => {
            var remainingTime = Math.max(0, duration - (Date.now() - startTime));
            // console.log(remainingTime);
            io.emit('countdown', "2", remainingTime, team_2_mem, team_2_seed);
            if (remainingTime <= 0) {
              clearInterval(interval['team_2']);
            }
          }, 1000);
          console.log('start interception round: send rearrangeClues_intercept_JS');

          game_state_full_server['round_boxes'] = game_state[`round_${round_no}`];
          game_state_full_server['round_boxes']['mixed_position'] = mixed_position;

          game_state_full_server[`team_1`]['normal_member']["giveClues"]['disabled'] = true;
          game_state_full_server[`team_1`]['normal_member']["submitClues"]['disabled'] = true;
          game_state_full_server[`team_1`]['normal_member']["suggestAnswer"]['disabled'] = false;
          game_state_full_server[`team_1`]['normal_member']["submitAnswer"]['disabled'] = false;
          game_state_full_server[`team_1`]['normal_member']["startNewRound"]['disabled'] = true;

          game_state_full_server[`team_1`]['normal_member']["submitClues"]['hide'] = true;
          game_state_full_server[`team_1`]['normal_member']["submitAnswer"]['hide'] = false;

          game_state_full_server[`team_1`]['clue_giver']["giveClues"]['disabled'] = true;
          game_state_full_server[`team_1`]['clue_giver']["submitClues"]['disabled'] = true;
          game_state_full_server[`team_1`]['clue_giver']["suggestAnswer"]['disabled'] = false;
          game_state_full_server[`team_1`]['clue_giver']["submitAnswer"]['disabled'] = false;
          game_state_full_server[`team_1`]['clue_giver']["startNewRound"]['disabled'] = true;

          game_state_full_server[`team_1`]['clue_giver']["submitClues"]['hide'] = true;
          game_state_full_server[`team_1`]['clue_giver']["submitAnswer"]['hide'] = false;

          game_state_full_server[`team_2`]['normal_member']["giveClues"]['disabled'] = true;
          game_state_full_server[`team_2`]['normal_member']["submitClues"]['disabled'] = true;
          game_state_full_server[`team_2`]['normal_member']["suggestAnswer"]['disabled'] = false;
          game_state_full_server[`team_2`]['normal_member']["submitAnswer"]['disabled'] = false;
          game_state_full_server[`team_2`]['normal_member']["startNewRound"]['disabled'] = true;

          game_state_full_server[`team_2`]['normal_member']["submitClues"]['hide'] = true;
          game_state_full_server[`team_2`]['normal_member']["submitAnswer"]['hide'] = false;

          game_state_full_server[`team_2`]['clue_giver']["giveClues"]['disabled'] = true;
          game_state_full_server[`team_2`]['clue_giver']["submitClues"]['disabled'] = true;
          game_state_full_server[`team_2`]['clue_giver']["suggestAnswer"]['disabled'] = false;
          game_state_full_server[`team_2`]['clue_giver']["submitAnswer"]['disabled'] = false;
          game_state_full_server[`team_2`]['clue_giver']["startNewRound"]['disabled'] = true;

          game_state_full_server[`team_2`]['clue_giver']["submitClues"]['hide'] = true;
          game_state_full_server[`team_2`]['clue_giver']["submitAnswer"]['hide'] = false;

          // game_state_full_server[`team_1`]['suggest'] = {};
          // game_state_full_server[`team_2`]['suggest'] = {};

          // console.log(game_state_full_server[`team_2`]['normal_member']);

        } else {
          io.emit('roundCompleted');
        }
      }
    }
    // phase 2
    else {
      clearInterval(interval[`team_${other_team}`]);
      game_state_full_server[`team_${other_team}`]['team_remaining_time'] = team_remaining_time;
      console.log(user_name + " just submitted interception");
      console.log('lock buttons');
      console.log(game_state_full_server[`team_${other_team}`]['normal_member']);
      game_state_full_server[`team_${other_team}`]['normal_member']["giveClues"]['disabled'] = true;
      game_state_full_server[`team_${other_team}`]['normal_member']["submitClues"]['disabled'] = true;
      game_state_full_server[`team_${other_team}`]['normal_member']["suggestAnswer"]['disabled'] = true;
      game_state_full_server[`team_${other_team}`]['normal_member']["submitAnswer"]['disabled'] = true;
      game_state_full_server[`team_${other_team}`]['normal_member']["startNewRound"]['disabled'] = true;

      game_state_full_server[`team_${other_team}`]['normal_member']["submitClues"]['hide'] = true;
      game_state_full_server[`team_${other_team}`]['normal_member']["submitAnswer"]['hide'] = false;

      game_state_full_server[`team_${other_team}`]['clue_giver']["giveClues"]['disabled'] = true;
      game_state_full_server[`team_${other_team}`]['clue_giver']["submitClues"]['disabled'] = true;
      game_state_full_server[`team_${other_team}`]['clue_giver']["suggestAnswer"]['disabled'] = true;
      game_state_full_server[`team_${other_team}`]['clue_giver']["submitAnswer"]['disabled'] = true;
      game_state_full_server[`team_${other_team}`]['clue_giver']["startNewRound"]['disabled'] = true;

      game_state_full_server[`team_${other_team}`]['clue_giver']["submitClues"]['hide'] = false;
      game_state_full_server[`team_${other_team}`]['clue_giver']["submitAnswer"]['hide'] = true;

      game_state_full_server[`team_${other_team}`]['clue_giver']["disabled_clue"] = true;
      game_state_full_server[`team_${other_team}`]['normal_member']["disabled_clue"] = true
      game_state_full_server[`team_${other_team}`]['clue_giver']["disabled_clue_other_team"] = true;
      game_state_full_server[`team_${other_team}`]['normal_member']["disabled_clue_other_team"] = true;
      
      console.log(game_state_full_server[`team_${other_team}`]);
      if (
        d[`box${user_team}${position_to_be_encoded[`team_${user_team}`][0]}`] == game_state[`round_${round_no}`][`team_${user_team}`][`box${user_team}${position_to_be_encoded[`team_${user_team}`][0]}`] &&
        d[`box${user_team}${position_to_be_encoded[`team_${user_team}`][1]}`] == game_state[`round_${round_no}`][`team_${user_team}`][`box${user_team}${position_to_be_encoded[`team_${user_team}`][1]}`] &&
        d[`box${user_team}${position_to_be_encoded[`team_${user_team}`][2]}`] == game_state[`round_${round_no}`][`team_${user_team}`][`box${user_team}${position_to_be_encoded[`team_${user_team}`][2]}`]
      ) { 
        io.emit('intercept_res', 1, user_name, game_state[`round_${round_no}`][`team_${user_team}`], user_team);
        interception[`team_${other_team}`] +=1;
        game_state_full_server[`team_${other_team}`][`team_${user_team}_truth`].push(game_state[`round_${round_no}`][`team_${user_team}`]);
        console.log('correct interception: intercept_res + push right sent');
      } 
      else {
        io.emit('intercept_res', 0, user_name, game_state[`round_${round_no}`][`team_${user_team}`], user_team);
        game_state_full_server[`team_${other_team}`][`team_${user_team}_truth`].push(game_state[`round_${round_no}`][`team_${user_team}`]);
        console.log('incorrect interception: intercept_res + push right sent');
      }
      
      
      console.log(misconmunication);
      console.log(interception);
      team_finish_interception += 1;
      if (team_finish_interception == 2) {
        console.log('send roundComplete');
        if (parseInt(misconmunication["team_1"])==2 || parseInt(misconmunication["team_2"])==2 || parseInt(interception["team_2"])==2 || parseInt(interception["team_1"])==2) {
          console.log("there's a winner");
          console.log(parseFloat(interception["team_1"]));
          console.log(parseFloat(interception["team_2"]));
          console.log(parseFloat(misconmunication["team_1"])*1.1);
          console.log(parseFloat(misconmunication["team_2"])*1.1);
          var team_1_score = parseFloat(interception["team_1"]) - parseFloat(misconmunication["team_1"])*1.1; 
          var team_2_score = parseFloat(interception["team_2"]) - parseFloat(misconmunication["team_2"])*1.1; 
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
            io.emit('game_result', 'Tie', "Tie", hoa_words, hoa_words);
          } else {
            if (team_1_score > team_2_score) {
              console.log('team 1 win');
              io.emit('game_result', '1', '2', gratz_words, gay_words);
            } else {
              io.emit('game_result', '2', '1', gratz_words, gay_words);
            }
          }
          
          
            
        } else {
          io.emit('roundCompleted');
        }
        
        game_state_full_server['round_finished'] = true;
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
    
    game_state_full_server[`team_1`]['normal_member']["giveClues"]['disabled'] = false;
    game_state_full_server[`team_1`]['normal_member']["submitClues"]['disabled'] = true;
    game_state_full_server[`team_1`]['normal_member']["suggestAnswer"]['disabled'] = true;
    game_state_full_server[`team_1`]['normal_member']["submitAnswer"]['disabled'] = true;
    game_state_full_server[`team_1`]['normal_member']["startNewRound"]['disabled'] = true;

    game_state_full_server[`team_1`]['normal_member']["submitClues"]['hide'] = false;
    game_state_full_server[`team_1`]['normal_member']["submitAnswer"]['hide'] = true;

    game_state_full_server[`team_2`]['normal_member']["giveClues"]['disabled'] = false;
    game_state_full_server[`team_2`]['normal_member']["submitClues"]['disabled'] = true;
    game_state_full_server[`team_2`]['normal_member']["suggestAnswer"]['disabled'] = true;
    game_state_full_server[`team_2`]['normal_member']["submitAnswer"]['disabled'] = true;
    game_state_full_server[`team_2`]['normal_member']["startNewRound"]['disabled'] = true;

    game_state_full_server[`team_2`]['normal_member']["submitClues"]['hide'] = false;
    game_state_full_server[`team_2`]['normal_member']["submitAnswer"]['hide'] = true;
    
    clue_giver['team_1'] = "";
    clue_giver['team_2'] = "";
    game_state_full_server['round_finished'] = false;
    game_state_full_server['team_1']['suggest'] = {};
    game_state_full_server['team_2']['suggest'] = {};
    game_state_full_server[`team_1`]['clue_giver']['boxes_with_clue'] = [];
    game_state_full_server[`team_2`]['clue_giver']['boxes_with_clue'] = [];

    game_state_full_server[`team_1`]['clue_giver']["disabled_clue"] = false;
    game_state_full_server[`team_1`]['normal_member']["disabled_clue"] = false;
    game_state_full_server[`team_1`]['clue_giver']["disabled_clue_other_team"] = false;
    game_state_full_server[`team_1`]['normal_member']["disabled_clue_other_team"] = false;

    game_state_full_server[`team_2`]['clue_giver']["disabled_clue"] = false;
    game_state_full_server[`team_2`]['normal_member']["disabled_clue"] = false;
    game_state_full_server[`team_2`]['clue_giver']["disabled_clue_other_team"] = false;
    game_state_full_server[`team_2`]['normal_member']["disabled_clue_other_team"] = false;

    io.emit('startNewRound_JS', user_name);

    const startTime = Date.now();
    const duration = 5 * 7 * 1000; // 5 minutes in milliseconds

    var total_time = Math.max(0, duration - (Date.now() - startTime));
    // io.emit('countdown', ?, total_time);
    console.log('countdown user_db');
    console.log(user_db);
    var team_1_mem = [];
    var team_2_mem = [];

    for (user_id in user_db) {
      if (user_db[user_id]['user_team']  == '1'){
        team_1_mem.push(user_id);
      }
    }
    for (user_id in user_db) {
      if (user_db[user_id]['user_team']  == '2'){
        team_2_mem.push(user_id);
      }
    }
    
    var team_1_seed = Math.floor(Math.random()*(team_1_mem.length-1)) ;
    var team_2_seed = Math.floor(Math.random()*(team_1_mem.length-1)) ;
    interval['team_1'] = setInterval(() => {
      var remainingTime = Math.max(0, duration - (Date.now() - startTime));
      // console.log(remainingTime);
      io.emit('countdown', "1", remainingTime, team_1_mem, team_1_seed);
      if (remainingTime <= 0) {
        clearInterval(interval['team_1']);
      }
    }, 1000);

    interval['team_2'] = setInterval(() => {
      var remainingTime = Math.max(0, duration - (Date.now() - startTime));
      // console.log(remainingTime);
      io.emit('countdown', "2", remainingTime, team_2_mem, team_2_seed);
      if (remainingTime <= 0) {
        clearInterval(interval['team_2']);
      }
    }, 1000);

    game_state_full_server[`team_1`]['team_remaining_time'] = 0;
    game_state_full_server[`team_2`]['team_remaining_time'] = 0;
  });


  // sync current state of the game
  socket.on('sync_up', (serializedHTML, user_team, is_all, is_clue_giver, current_phase) => {
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
    phase = current_phase;
  });

  socket.on('stopClock', (user_team)=> {
    io.emit('server_stopClock', user_team);
  });

  socket.on('reconnect_sync_up', (user_socket_id, user_id, user_name, user_team) => {
    user_db[user_id] = {};
    user_db[user_id]['user_name'] = user_name;
    user_db[user_id]['user_team'] = user_team;
    user_db[user_id]['user_socket_id'] = user_socket_id;
    console.log(user_db[user_id]);
    if (game_started){
        socket.emit('reconnect_sync_up_js', game_state_full_server, phase, clue_giver,user_db, misconmunication, interception);
        socket.emit('team_member_update',user_db);
      }
      else{
        socket.emit('team_member_update',user_db);
        console.log('team_member_update sent');
      }
  });

  socket.on('generate_random_name', () =>{
    var gen_name = namelist[Math.floor(Math.random()*namelist.length)];
    
    socket.emit('generated_name', gen_name);
  });





  

  










  socket.on('chat message', (msg, user_name) => {
    console.log(user_name + " " + msg);
    socket.broadcast.emit('chat message', msg, user_name);
  });

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});


