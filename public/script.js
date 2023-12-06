var columns = document.querySelectorAll('.draggable_clue_1');
var columns2 = document.querySelectorAll('.draggable_clue_2');
var draggingClass = 'dragging';
var dragSource;


Array.prototype.forEach.call(columns, function (col) {
  col.addEventListener('dragstart', dragStart, false);
});

Array.prototype.forEach.call(columns2, function (col) {
  col.addEventListener('dragstart', dragStart, false);
});

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id);
  setTimeout(() => {
      e.target.classList.add('hide');
  }, 0);
}

/* drop targets */
const boxes = document.querySelectorAll('.box');

boxes.forEach(box => {
  box.addEventListener('dragenter', dragEnter)
  box.addEventListener('dragover', dragOver);
  box.addEventListener('dragleave', dragLeave);
  box.addEventListener('drop', drop);
});


function dragEnter(e) {
  e.preventDefault();
  e.target.classList.add('drag-over');
}

function dragOver(e) {
  e.preventDefault();
  e.target.classList.add('drag-over');
}

function dragLeave(e) {
  e.target.classList.remove('drag-over');
}

function drop(e) {
  e.target.classList.remove('drag-over');

  // get the draggable element
  const id = e.dataTransfer.getData('text/plain');
  // console.log("id: " + id);
  const draggable = document.getElementById(id);
  console.log(draggable);
  console.log(draggable.parentNode);
  var drag_parent = draggable.parentNode;
  if (e.target.id.startsWith('b') && e.target.firstChild == null){
    e.target.appendChild(draggable);
  } 
  else if (e.target.id.startsWith('b') && e.target.firstChild) {
    drag_parent.append(e.target.firstChild);
    e.target.append(draggable);
  }
  else {
    console.log(e.target.parentNode);
    e.target.parentNode.append(draggable);
    // draggable.parentNode.append(e.target);
    drag_parent.append(e.target);
  }
  // add it to the drop target
  console.log(e.target.id);
  
  console.log(e.target);
  console.log(e.target.firstChild);
  // display the draggable element
  draggable.classList.remove('hide');
}

var row11 = document.getElementById('row11');
var row12 = document.getElementById('row12');
var row13 = document.getElementById('row13');
var row14 = document.getElementById('row14');
var row21 = document.getElementById('row21');
var row22 = document.getElementById('row22');
var row23 = document.getElementById('row23');
var row24 = document.getElementById('row24');

var startNewRound = document.getElementById('startNewRound');
var giveClues = document.getElementById('giveClues');
var suggestAnswer = document.getElementById('suggestAnswer');
var submitClues = document.getElementById('submitClues');
var submitAnswer = document.getElementById('submitAnswer');

var modal = document.getElementById('modal_game_result');
var closeModalButton = document.getElementById('close-modal_game_result');
var game_result_p = document.getElementById('game_result_p'); 


function newGame_JS(team_keywords, team) {
  console.log('newGame_JS');
  startNewRound.disabled = false;
  giveClues.disabled = true;
  suggestAnswer.disabled = true;
  submitClues.disabled = true;
  submitAnswer.disabled = true;


  $(`#team_${team}_word1 span`).text(team_keywords[0]);
  $(`#team_${team}_word2 span`).text(team_keywords[1]);
  $(`#team_${team}_word3 span`).text(team_keywords[2]);
  $(`#team_${team}_word4 span`).text(team_keywords[3]);
  
  $(`#box11`).empty();
  $(`#box12`).empty();
  $(`#box13`).empty();
  $(`#box14`).empty();  
  $(`#box21`).empty();
  $(`#box22`).empty();
  $(`#box23`).empty();
  $(`#box24`).empty(); 


  while (row11.children.length > 0) {
    row11.removeChild(row11.lastChild);
  }
  while (row12.children.length > 0) {
    row12.removeChild(row12.lastChild);
  }
  console.log(row12.children.length);
  while (row13.children.length > 0) {
    row13.removeChild(row13.lastChild);
  }
  while (row14.children.length > 0) {
    row14.removeChild(row14.lastChild);
  }
  while (row21.children.length > 0) {
    row21.removeChild(row21.lastChild);
  }
  while (row22.children.length > 0) {
    row22.removeChild(row22.lastChild);
  }
  while (row23.children.length > 0) {
    row23.removeChild(row23.lastChild);
  }
  while (row24.children.length > 0) {
    row24.removeChild(row24.lastChild);
  }

}

function giveClues_JS (user_team, position_to_be_encoded) {

  document.getElementById('submitAnswer').classList.add('hide');
  document.getElementById('submitClues').classList.remove('hide');
  document.getElementById('submitClues').disabled = false;

  let clue_input1 = document.createElement("div");
  clue_input1.id = `input${user_team}1`;
  clue_input1.setAttribute('type','text');
  clue_input1.setAttribute('class',`input${user_team}`);
  clue_input1.setAttribute('placeholder','encode word');
  clue_input1.setAttribute('contenteditable', 'true');
  let clue_input2 = document.createElement("div");
  clue_input2.id = `input${user_team}2`;
  clue_input2.setAttribute('type','text');
  clue_input2.setAttribute('class',`input${user_team}`);
  clue_input2.setAttribute('placeholder','encode word');
  clue_input2.setAttribute('contenteditable', 'true');
  let clue_input3 = document.createElement("div");
  clue_input3.id = `input${user_team}3`;
  clue_input3.setAttribute('type','text');
  clue_input3.setAttribute('class',`input${user_team}`);
  clue_input3.setAttribute('placeholder','encode word');
  clue_input3.setAttribute('contenteditable', 'true');

  $(`#box${user_team}${position_to_be_encoded[0]}`).prepend(clue_input1);
  $(`#box${user_team}${position_to_be_encoded[1]}`).prepend(clue_input2);
  $(`#box${user_team}${position_to_be_encoded[2]}`).prepend(clue_input3);

}

function rearrangeClues_JS(user_id, user_name, user_team, input1_value, input2_value, input3_value, mixed_position) {
  
  // document.getElementById('submitClues').classList.add('hide');
  // document.getElementById('submitAnswer').classList.remove('hide');
  document.getElementById('submitClues').hidden = true;
  document.getElementById('submitAnswer').hidden = false;

  let clue1 = document.createElement("div");
  clue1.id = `input${user_team}1`;
  // clue1.setAttribute('type','text');
  clue1.setAttribute('class',`draggable_clue_${user_team}`);
  clue1.setAttribute('draggable', 'true');
  clue1.innerHTML  = input1_value;

  let clue2 = document.createElement("div");
  clue2.id = `input${user_team}2`;
  // clue2.setAttribute('type','text');
  clue2.setAttribute('class',`draggable_clue_${user_team}`);
  clue2.setAttribute('draggable', 'true');
  clue2.innerHTML = input2_value;

  let clue3 = document.createElement("div");
  clue3.id = `input${user_team}3`;
  // clue3.setAttribute('type','text');
  clue3.setAttribute('class',`draggable_clue_${user_team}`);
  clue3.setAttribute('draggable', 'true');
  clue3.innerHTML = input3_value;

  $(`#box${user_team}${mixed_position[0]}`).prepend(clue1);
  $(`#box${user_team}${mixed_position[1]}`).prepend(clue2);
  $(`#box${user_team}${mixed_position[2]}`).prepend(clue3);
  console.log('appened')

  columns = document.querySelectorAll(`.draggable_clue_${user_team}`);
  draggingClass = 'dragging';
  dragSource;
    
  Array.prototype.forEach.call(columns, function (col) {
      col.addEventListener('dragstart', dragStart, false);
    });
}


function rearrangeSuggest_JS ( user_name, user_team, d, phase) {
  console.log(d);
  console.log('rearrangeSuggest_JS');
  var team = "";
  if (phase =="2") {
    if (user_team == '1'){
      team = '2';
    } else {
      team = '1';
    }
  } else {
    team = user_team;
  }


  for (box in d) {
  $(`#${box}`).empty();
  $(`#${box}`).empty();
  $(`#${box}`).empty();
  $(`#${box}`).empty();
  }

  var c = 1;
  for (box in d) {
    if (d[box] != 'null') {
      // console.log(`${box.charAt(3)}${c}`);
      // console.log(box);
      let clue = document.createElement("div");
      clue.id = `input${box.charAt(3)}${c}`;
      clue.setAttribute('class',`draggable_clue_${box.charAt(3)}`);
      clue.setAttribute('draggable', 'true');
      clue.innerHTML  = d[box];
      console.log(clue)
      $(`#${box}`).prepend(clue);
      c+=1;
    }
  }

  
  // if (d[`box${team}2`] != 'null') {
  //   let clue2 = document.createElement("div");
  //   clue2.id = `input${team}2`;
  //   clue2.setAttribute('class',`draggable_clue_${team}`);
  //   clue2.setAttribute('draggable', 'true');
  //   clue2.innerHTML  = d[`box${team}2`];
  //   $(`#box${team}2`).prepend(clue2);
  // }
  // if (d[`box${team}3`] != 'null') {
  //   let clue3 = document.createElement("div");
  //   clue3.id = `input${team}3`;
  //   clue3.setAttribute('class',`draggable_clue_${team}`);
  //   clue3.setAttribute('draggable', 'true');
  //   clue3.innerHTML  = d[`box${team}3`];
  //   $(`#box${team}3`).prepend(clue3);
  // }
  // if (d[`box${team}4`] != 'null') {
  //   let clue4 = document.createElement("div");
  //   clue4.id = `input${team}4`;
  //   clue4.setAttribute('class',`draggable_clue_${team}`);
  //   clue4.setAttribute('draggable', 'true');
  //   clue4.innerHTML  = d[`box${team}4`];
  //   $(`#box${team}4`).prepend(clue4);
  // }

  columns = document.querySelectorAll(`.draggable_clue_${box.charAt(3)}`);
  draggingClass = 'dragging';
  dragSource;
    
  Array.prototype.forEach.call(columns, function (col) {
      col.addEventListener('dragstart', dragStart, false);
    });

  if (user_name != "reconnect_user") {
    var alert = document.createElement("div");
    alert.setAttribute('class',"suggest_alert");
    alert.setAttribute('id',"suggest_alert");
    alert.innerHTML  = user_name + ' has given a suggestion';
    console.log(alert);
    $('#container').append(alert);
    console.log('appended to container');
    setTimeout(function() {
      $(alert).fadeTo(3000, 0).slideUp(3000, function(){
        $(this).remove();
      });
    });
    setTimeout(function(){
      alert.remove();
    }, 8000);
  }
}

function rearrangeClues_intercept_JS(round_d, mixed_position, user_team) {

  document.getElementById('submitClues').classList.add('hide');
  document.getElementById('submitAnswer').classList.remove('hide');
  document.getElementById('submitAnswer').disabled = false;
  document.getElementById('suggestAnswer').disabled = false;

  // rearrangeClues_intercept_JS(game_state_full_server['round_boxes'], game_state_full_server['round_boxes']['mixed_position'], user_team);
  console.log('rearrangeClues_intercept_JS');
  console.log(round_d);
  // console.log(round_d, mixed_position, user_team);
  // console.log(round_d, mixed_position, user_team);
  // $(`#box${user_team}1`).empty();
  // $(`#box${user_team}2`).empty();
  // $(`#box${user_team}3`).empty();
  // $(`#box${user_team}4`).empty();  

  var other_team = '';
  if (user_team == '1'){
    other_team = '2';
  } else {
    other_team = '1';
  }
  var input = [];
  for (key in round_d[`team_${other_team}`]) {
    if (round_d[`team_${other_team}`][key] != 'null') {
      input.push(round_d[`team_${other_team}`][key]);
    }
  } 
  
  let clue1 = document.createElement("div");
  clue1.id = `input${other_team}1`;
  // clue1.setAttribute('type','text');
  clue1.setAttribute('class',`draggable_clue_${other_team}`);
  clue1.setAttribute('draggable', 'true');
  clue1.innerHTML  = input[0];

  let clue2 = document.createElement("div");
  clue2.id = `input${other_team}2`;
  // clue2.setAttribute('type','text');
  clue2.setAttribute('class',`draggable_clue_${other_team}`);
  clue2.setAttribute('draggable', 'true');
  clue2.innerHTML = input[1];

  let clue3 = document.createElement("div");
  clue3.id = `input${other_team}3`;
  // clue3.setAttribute('type','text');
  clue3.setAttribute('class',`draggable_clue_${other_team}`);
  clue3.setAttribute('draggable', 'true');
  clue3.innerHTML = input[2];

  $(`#box${other_team}1`).empty();
  $(`#box${other_team}2`).empty();
  $(`#box${other_team}3`).empty();
  $(`#box${other_team}4`).empty();  

  $(`#box${other_team}${mixed_position[1]}`).prepend(clue1);
  $(`#box${other_team}${mixed_position[2]}`).prepend(clue2);
  $(`#box${other_team}${mixed_position[0]}`).prepend(clue3);
  console.log('appened')
  // console.log($(`#box${other_team}${mixed_position[1]}`));

  columns = document.querySelectorAll(`.draggable_clue_${other_team}`);
  draggingClass = 'dragging';
  dragSource;
    
  Array.prototype.forEach.call(columns, function (col) {
      col.addEventListener('dragstart', dragStart, false);
    });
}

function pushRight (result, user_name, game_state_correct_answerd, user_team) {
  if (result == 1){
    console.log(user_name + " has nailed the thing");
  } else {
    console.log(user_name + " has failed the thing");
  }
  console.log(game_state_correct_answerd);
  for (key in game_state_correct_answerd){
    if (game_state_correct_answerd[key] != 'null') {
      let previous_words = document.createElement("div");
      previous_words.setAttribute('class',`previous_words_${user_team}`);
      previous_words.innerHTML  = game_state_correct_answerd[key];
      $(`#row${key.slice(-2)}`).append(previous_words);
    }
    else {
      let previous_words_1 = document.createElement("div");
      previous_words_1.setAttribute('class',"previous_words_1_empty");
      $(`#row${key.slice(-2)}`).append(previous_words_1);
    }
  }
}




// clear everything from boxes, reset the clock, update var round,
// lock startNewRound reset position_to_encode array
function startNewRound_JS (user_name) {
  giveClues.disabled = false;
  submitClues.hidden = false;
  submitAnswer.hidden = true;
  startNewRound.disabled = true;
  
  console.log('giveClues.disabled = false here');
  var alert = document.createElement("div");
  alert.setAttribute('class',"suggest_alert");
  alert.setAttribute('id',"suggest_alert");
  alert.innerHTML  = user_name + ' has started a new round';
  console.log(alert);
  $('#container').append(alert);
  setTimeout(function() {
    $(alert).fadeTo(3000, 0).slideUp(3000, function(){
      $(this).remove();
    });
  });
  setTimeout(function(){
    alert.remove();
  }, 8000);
  

  $(`#box11`).empty();
  $(`#box12`).empty();
  $(`#box13`).empty();
  $(`#box14`).empty();  
  $(`#box21`).empty();
  $(`#box22`).empty();
  $(`#box23`).empty();
  $(`#box24`).empty(); 
  
}

function intercept_res_JS (result, user_name, game_state_correct_answer, user_team) {
  document.getElementById('submitAnswer').disabled = true;
  document.getElementById('suggestAnswer').disabled = true;

  if (result == 1){
    console.log(user_name + " has nailed the thing");
  } else {
    console.log(user_name + " has failed the thing");
  }
  console.log(game_state_correct_answer);
  for (key in game_state_correct_answer){
    if (game_state_correct_answer[key] != 'null') {
      let previous_words = document.createElement("div");
      previous_words.setAttribute('class',`previous_words_${user_team}`);
      previous_words.innerHTML  = game_state_correct_answer[key];
      $(`#row${key.slice(-2)}`).append(previous_words);
    }
    else {
      let previous_words = document.createElement("div");
      previous_words.setAttribute('class',"previous_words_1_empty");
      $(`#row${key.slice(-2)}`).append(previous_words);
    }
  }

  var alert = document.createElement("div");
  alert.setAttribute('class',"suggest_alert");
  alert.setAttribute('id',"suggest_alert");
  alert.innerHTML  = user_name + ' has tried to intercept';
  $('#container').append(alert);
  setTimeout(function() {
    $(alert).fadeTo(3000, 0).slideUp(3000, function(){
      $(this).remove();
    });
  });
  setTimeout(function(){
    alert.remove();
  }, 8000);
}

function reconnect_sync_up_js (user_id, user_team, game_state_full_server, current_phase, clue_giver){

  console.log('syncing');
  console.log(game_state_full_server);

  var normal_member_obj = game_state_full_server[`team_${user_team}`]['normal_member'];
  var clue_giver_obj = game_state_full_server[`team_${user_team}`]['clue_giver'];
  var other_team = '';
      if (user_team == '1'){
          other_team = '2';
      } else {
          other_team = '1';
      }

  // populate keywords on reconnection
  $(`#team_${user_team}_word1 span`).text(game_state_full_server[`team_${user_team}`]['normal_member'][`team_${user_team}_word1`]);
  $(`#team_${user_team}_word2 span`).text(game_state_full_server[`team_${user_team}`]['normal_member'][`team_${user_team}_word2`]);
  $(`#team_${user_team}_word3 span`).text(game_state_full_server[`team_${user_team}`]['normal_member'][`team_${user_team}_word3`]);
  $(`#team_${user_team}_word4 span`).text(game_state_full_server[`team_${user_team}`]['normal_member'][`team_${user_team}_word4`]);

  // disabled/enable buttons to current default
  startNewRound.disabled = normal_member_obj["startNewRound"]['disabled'];
  giveClues.disabled = normal_member_obj["giveClues"]['disabled'];
  suggestAnswer.disabled = normal_member_obj["suggestAnswer"]['disabled'];
  submitClues.disabled = normal_member_obj["submitClues"]['disabled'];
  submitAnswer.disabled = normal_member_obj["submitAnswer"]['disabled'];
  submitClues.hidden = normal_member_obj["submitClues"]['hide'];
  submitAnswer.hidden = normal_member_obj["submitAnswer"]['hide'];
  
  // in case number of communications > 0, populates rowxx view for my team
  console.log(game_state_full_server[`team_${user_team}`][`team_${user_team}_truth`]);
  for (d of game_state_full_server[`team_${user_team}`][`team_${user_team}_truth`]){
    // console.log(game_state_full_server[`team_${user_team}`][`team_${user_team}_truth`]);
    for (key in d){
      console.log(key);
      if (d[key] != 'null') {
        let previous_words = document.createElement("div");
        previous_words.setAttribute('class',`previous_words_${user_team}`);
        previous_words.innerHTML  = d[key];
        $(`#row${key.slice(-2)}`).append(previous_words);
      }
      else {
        let previous_words = document.createElement("div");
        previous_words.setAttribute('class',"previous_words_1_empty");
        $(`#row${key.slice(-2)}`).append(previous_words);
      }
    }
  }

  console.log(game_state_full_server[`team_${user_team}`][`team_${other_team}_truth`]);
  // in case number of communications > 0, populates rowxx for my view of other team
  for (d of game_state_full_server[`team_${user_team}`][`team_${other_team}_truth`]){
    
    for (key in d){
      if (d[key] != 'null') {
        let previous_words = document.createElement("div");
        previous_words.setAttribute('class',`previous_words_${other_team}`);
        previous_words.innerHTML  = d[key];
        $(`#row${key.slice(-2)}`).append(previous_words);
      }
      else {
        let previous_words = document.createElement("div");
        previous_words.setAttribute('class',"previous_words_1_empty");
        $(`#row${key.slice(-2)}`).append(previous_words);
      }
    }
  }

  // when someone already clicked on giveClues, box_with_clue is filled, reconnected 
  // cluegiver and normal players have different view
  if (game_state_full_server[`team_${user_team}`]['clue_giver']['boxes_with_clue'].length > 0) {  
    if (user_id==clue_giver[`team_${user_team}`]) {
      
      // whether content has be filled or not, editable or not, apply such configs
      var position_to_be_encoded = clue_giver_obj['boxes_with_clue']; 
      
      let clue_input1 = document.createElement("div");
      clue_input1.id = `input${user_team}1`;
      clue_input1.setAttribute('type','text');
      clue_input1.setAttribute('class',`input${user_team}`);
      clue_input1.setAttribute('contenteditable', clue_giver_obj[`box${user_team}${position_to_be_encoded[0]}`]['contenteditable']);
      clue_input1.innerHTML = clue_giver_obj[`box${user_team}${position_to_be_encoded[0]}`]['innerHTML'];
      let clue_input2 = document.createElement("div");
      clue_input2.id = `input${user_team}2`;
      clue_input2.setAttribute('type','text');
      clue_input2.setAttribute('class',`input${user_team}`);
      clue_input2.setAttribute('contenteditable', clue_giver_obj[`box${user_team}${position_to_be_encoded[1]}`]['contenteditable']);
      clue_input2.innerHTML = clue_giver_obj[`box${user_team}${position_to_be_encoded[1]}`]['innerHTML'];
      let clue_input3 = document.createElement("div");
      clue_input3.id = `input${user_team}3`;
      clue_input3.setAttribute('type','text');
      clue_input3.setAttribute('class',`input${user_team}`);
      clue_input3.setAttribute('contenteditable', clue_giver_obj[`box${user_team}${position_to_be_encoded[2]}`]['contenteditable']);
      clue_input3.innerHTML = clue_giver_obj[`box${user_team}${position_to_be_encoded[2]}`]['innerHTML'];

      $(`#box${user_team}${position_to_be_encoded[0]}`).prepend(clue_input1);
      $(`#box${user_team}${position_to_be_encoded[1]}`).prepend(clue_input2);
      $(`#box${user_team}${position_to_be_encoded[2]}`).prepend(clue_input3);

      startNewRound.disabled = clue_giver_obj["startNewRound"]['disabled'];
      giveClues.disabled = clue_giver_obj["giveClues"]['disabled'];
      suggestAnswer.disabled = clue_giver_obj["suggestAnswer"]['disabled'];
      submitClues.disabled = clue_giver_obj["submitClues"]['disabled'];
      submitAnswer.disabled = clue_giver_obj["submitAnswer"]['disabled'];

      submitClues.hidden = clue_giver_obj["submitClues"]['hide'];
      submitAnswer.hidden = clue_giver_obj["submitAnswer"]['hide'];
      
    }
    else {
      console.log('normal member');
      var mixed_position = normal_member_obj['boxes_with_clue']; 
      var clue_giver_obj = game_state_full_server[`team_${user_team}`]['clue_giver'];
      var position_to_be_encoded = clue_giver_obj['boxes_with_clue']; 

      // when submitClues clicked, mixed_position is filled, boxes should be filled
      if (mixed_position.length > 0) {
        console.log(mixed_position);

        
        let clue1 = document.createElement("div");
        clue1.id = `input${user_team}1`;
        // clue1.setAttribute('type','text');
        clue1.setAttribute('class',`draggable_clue_${user_team}`);
        clue1.setAttribute('draggable', 'true');
        clue1.innerHTML = clue_giver_obj[`box${user_team}${position_to_be_encoded[0]}`]['innerHTML'];
      
        let clue2 = document.createElement("div");
        clue2.id = `input${user_team}2`;
        // clue2.setAttribute('type','text');
        clue2.setAttribute('class',`draggable_clue_${user_team}`);
        clue2.setAttribute('draggable', 'true');
        clue2.innerHTML = clue_giver_obj[`box${user_team}${position_to_be_encoded[1]}`]['innerHTML'];
      
        let clue3 = document.createElement("div");
        clue3.id = `input${user_team}3`;
        // clue3.setAttribute('type','text');
        clue3.setAttribute('class',`draggable_clue_${user_team}`);
        clue3.setAttribute('draggable', 'true');
        clue3.innerHTML = clue_giver_obj[`box${user_team}${position_to_be_encoded[2]}`]['innerHTML'];
      
        $(`#box${user_team}${mixed_position[0]}`).prepend(clue1);
        $(`#box${user_team}${mixed_position[1]}`).prepend(clue2);
        $(`#box${user_team}${mixed_position[2]}`).prepend(clue3);
        console.log('appened')
      
        columns = document.querySelectorAll(`.draggable_clue_${user_team}`);
        draggingClass = 'dragging';
        dragSource;
          
        Array.prototype.forEach.call(columns, function (col) {
            col.addEventListener('dragstart', dragStart, false);
          });
   
      }

      // disable and enable buttons for normal member
      startNewRound.disabled = normal_member_obj["startNewRound"]['disabled'];
      giveClues.disabled = normal_member_obj["giveClues"]['disabled'];
      suggestAnswer.disabled = normal_member_obj["suggestAnswer"]['disabled'];
      submitClues.disabled = normal_member_obj["submitClues"]['disabled'];
      submitAnswer.disabled = normal_member_obj["submitAnswer"]['disabled'];

      submitClues.hidden = normal_member_obj["submitClues"]['hide'];
      submitAnswer.hidden = normal_member_obj["submitAnswer"]['hide'];
      // console.log(normal_member_obj);
      // console.log(submitClues);
    }

  }

  // if phase 2, other teams' boxes should be populated
  if (phase=="2") {
    rearrangeClues_intercept_JS(game_state_full_server['round_boxes'], game_state_full_server['round_boxes']['mixed_position'], user_team);
  }

  // if someone already suggested something, change view accordingly for reconnected 
  if (Object.keys(game_state_full_server[`team_${user_team}`]['suggest']).length > 0) {
    // if (phase=="2") {
    //   // console.log(game_state_full_server[`team_${user_team}`]['suggest']);
    //   rearrangeSuggest_JS('reconnect_user', other_team, game_state_full_server[`team_${user_team}`]['suggest']);
    // } else {
    //   rearrangeSuggest_JS('reconnect_user', user_team, game_state_full_server[`team_${user_team}`]['suggest']);
    // }
    rearrangeSuggest_JS('reconnect_user', user_team, game_state_full_server[`team_${user_team}`]['suggest'], phase);
    console.log(game_state_full_server[`team_${user_team}`]['suggest']);
  }

  if (game_state_full_server['round_finished']) {
    console.log('round_finished');
    console.log(normal_member_obj);
    startNewRound.disabled = false;
    giveClues.disabled = true;
    
    suggestAnswer.disabled = true;
    submitClues.disabled = true;

    submitAnswer.disabled = true;
    
    submitClues.hidden = false;
    submitAnswer.hidden = false;
  }
}

function game_result_JS(team, other_team) {
  var gay = ["gà đừng hỏi", "thu dọn hành lý chuẩn bị vào hang"]
  var gratz = ["xuất sắc hoàn thành nhiệm vụ đảng và nhà nước giao phó", "đọc team họ như 1 cuốn sách tập đọc lớp 1", "não vừa to vừa dài cuốn quanh cổ"];
  if (team=="Tie"){
    game_result_p.textContent = "It's a tie";
  } else {
    if (Math.random() < 0.5) {
      game_result_p.textContent = team + " "  + gratz[Math.floor(Math.random()*gratz.length)];
    } else {
      game_result_p.textContent = other_team + " "  + gay[Math.floor(Math.random()*gay.length)];
    }
  }
  modal.style.display = 'block';
  modal.style.top = window.innerHeight / 2 - modal.offsetHeight / 2 + 'px';
  modal.style.left = window.innerWidth / 2 - modal.offsetWidth / 2 + 'px';
}



closeModalButton.addEventListener('click', () => {
  modal.style.display = 'none';
});
// const el = document.querySelector('.arrow')
// const menu = document.querySelector('.menu');

// el.onclick = function(){
//   menu.classList.toggle("showmenu");
// }

// window.onclick = function(event) {
//   if (!event.target.matches('.arrow')&&!(event.target.matches('.menu')||event.target.matches('.menu__item'))) {
//     menu.classList.remove('showmenu')
//   }
// }


  //I'm adding this section so I don't have to keep updating this pen every year :-)
  //remove this if you don't need it



// function serializeDOM(element) {
//   const serializer = new htmlparser2.WritableStream({ write: function(chunk) {} });
//   htmlparser2.serialize(element, serializer);
//   const serializedHTML = serializer.toString();

//   // Convert serialized HTML to a JSON object
//   const serializedNode = JSON.parse(serializedHTML);

//   // Extract and store event listeners for buttons
//   if (serializedNode.tagName === 'BUTTON') {
//     for (const eventType of Object.keys(element._eventListeners)) {
//       serializedNode.eventListeners = {};
//       for (const eventListener of element._eventListeners[eventType]) {
//         serializedNode.eventListeners[eventType] = serializedNode.eventListeners[eventType] || [];
//         serializedNode.eventListeners[eventType].push(eventListener.toString());
//       }
//     }
//   }

//   return serializedNode;
// }



// function deserializeDOMWithEventListeners(serializedNode) {
//   const deserializer = new htmlparser2.Parser({
//     onopentag(name, attributes) {
//       const element = document.createElement(name);
//       for (const attributeName in attributes) {
//         element.setAttribute(attributeName, attributes[attributeName]);
//       }
//       this.push(element);
//     },
//     ontext(text) {
//       this.push(document.createTextNode(text));
//     },
//     onclosetag(name) {
//       const child = this.pop();
//       const parent = this.current;
//       parent.appendChild(child);
//     },
//     onend() {
//       const element = this.current;
//       this.emit('finish', element);
//     }
//   });

//   deserializer.write(JSON.stringify(serializedNode));
//   deserializer.end();

//   deserializer.on('finish', function(element) {
//     // Reattach event listeners for buttons
//     if (element.tagName === 'BUTTON' && element.eventListeners) {
//       for (const eventType in element.eventListeners) {
//         for (const eventListenerString of element.eventListeners[eventType]) {
//           element.addEventListener(eventType, new Function(eventListenerString));
//         }
//       }
//     }
//   });
// }






// function serializeDOMHTML(element) {
//   return new XMLSerializer().serializeToString(element);
// }

// function deserializeHTML(htmlString) {
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(htmlString, 'text/html');
//   return doc.documentElement;
// }

// const serializeDOM = (element) => {
//   // Convert the DOM element to a string using jsdom's serialize method
//   const serializedHTML = jsdom.serialize(element);

//   // Parse the serialized HTML string into a JavaScript object
//   const serializedNode = JSON.parse(serializedHTML);

//   return serializedNode;
// };

// const deserializeDOMWithEventListeners = (serializedNode) => {
//   // Create a new jsdom document
//   const document = jsdom.env().document;

//   // Create a DOM element from the serialized node
//   const element = document.createElement(serializedNode.tagName);

//   // Set the attributes of the DOM element
//   for (const attributeName in serializedNode.attributes) {
//     element.setAttribute(attributeName, serializedNode.attributes[attributeName]);
//   }

//   // Append child elements to the DOM element recursively
//   for (const child of serializedNode.children) {
//     const deserializedChild = deserializeDOMWithEventListeners(child);
//     if (deserializedChild) {
//       element.appendChild(deserializedChild);
//     }
//   }

//   // Reattach event listeners to buttons
//   if (serializedNode.tagName === 'BUTTON') {
//     for (const eventType in serializedNode.eventListeners) {
//       for (const eventListener of serializedNode.eventListeners[eventType]) {
//         element.addEventListener(eventType, eventListener);
//       }
//     }
//   }

//   return element;
// };