var util = require('util')
function findCircularReferences(obj, seen = new WeakSet()) {
    try {
      if (seen.has(obj)) {
        return obj; // Found a circular reference
      }
      seen.add(obj);
  
      for (const key of Object.keys(obj)) {
        const value = obj[key];
  
        // Recursively check objects and arrays:
        if (typeof value === 'object' && value !== null) {
          const circular = findCircularReferences(value, seen);
          if (circular) {
            return circular;
          }
        }
      }
    } finally {
      // Ensure object is removed from the WeakSet even on exceptions
      seen.delete(obj);
    }
  
    return undefined; // No circular references found
  }

  function findCircularReferences2 (obj) {
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

var interval_1;
var interval_2;
var interval = {};
interval['team_1'] = interval_1;
interval['team_2'] = interval_2;
game_state_full_server['interval'] = interval;
room_id = 'abc'
room_list[room_id] = JSON.parse(JSON.stringify(game_state_full_server, null, 2));;
// // Example usage:
// const myData = { /* your JSON data here */ };
// const circularRef = findCircularReferences(game_state_full_server);

// if (circularRef) {
// console.error("Circular reference found at:", circularRef);
// } else {
// console.log("No circular references found.");
// }
// console.log(findCircularReferences2(game_state_full_server));
// console.log(game_state_full_server);
// console.log(util.inspect(game_state_full_server));
// let a  = setInterval(() => {
//     var remainingTime = Math.max(0, 10 - (Date.now() - 1));
//     // console.log(remainingTime);
//     // io.to(room_id).emit('countdown', "1", remainingTime);
//     if (remainingTime <= 0) {
//       clearInterval(room_list[room_id]['interval']['team_1']);
//     }
//   }, 1000);

// console.log(a);

(function () {
    var id = setTimeout(function(){
      console.log(id);
    }, 100);
  })();