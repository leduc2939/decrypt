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

function newGame_JS() {
  document.getElementById('startNewRound').disabled = false;
  document.getElementById('giveClues').disabled = true;
  document.getElementById('suggestAnswer').disabled = true;
  document.getElementById('submitClues').disabled = true;
  document.getElementById('submitAnswer').disabled = true;

  $('#thua_word1 span').text('random word');
  $('#thua_word2 span').text('random word');
  $('#thua_word3 span').text('random word');
  $('#thua_word4 span').text('random word');
  
  $('#loser_word1 span').text('random word');
  $('#loser_word2 span').text('random word');
  $('#loser_word3 span').text('random word');
  $('#loser_word4 span').text('random word');

  $(`#box11`).empty();
  $(`#box12`).empty();
  $(`#box13`).empty();
  $(`#box14`).empty();  
  $(`#box21`).empty();
  $(`#box22`).empty();
  $(`#box23`).empty();
  $(`#box24`).empty(); 

  var row11 = document.getElementById('row11');
  var row12 = document.getElementById('row12');
  var row13 = document.getElementById('row13');
  var row14 = document.getElementById('row14');
  var row21 = document.getElementById('row21');
  var row22 = document.getElementById('row22');
  var row23 = document.getElementById('row23');
  var row24 = document.getElementById('row24');

  while (row11.children.length > 1) {
    row11.removeChild(row11.lastChild);
  }
  while (row12.children.length > 1) {
    row12.removeChild(row12.lastChild);
  }
  while (row13.children.length > 1) {
    row13.removeChild(row13.lastChild);
  }
  while (row14.children.length > 1) {
    row14.removeChild(row14.lastChild);
  }
  while (row21.children.length > 1) {
    row21.removeChild(row21.lastChild);
  }
  while (row22.children.length > 1) {
    row22.removeChild(row22.lastChild);
  }
  while (row23.children.length > 1) {
    row23.removeChild(row23.lastChild);
  }
  while (row24.children.length > 1) {
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
  clue_input1.setAttribute('class','input');
  clue_input1.setAttribute('placeholder','encode word');
  clue_input1.setAttribute('contenteditable', 'true');
  let clue_input2 = document.createElement("div");
  clue_input2.id = `input${user_team}2`;
  clue_input2.setAttribute('type','text');
  clue_input2.setAttribute('class','input');
  clue_input2.setAttribute('placeholder','encode word');
  clue_input2.setAttribute('contenteditable', 'true');
  let clue_input3 = document.createElement("div");
  clue_input3.id = `input${user_team}3`;
  clue_input3.setAttribute('type','text');
  clue_input3.setAttribute('class','input');
  clue_input3.setAttribute('placeholder','encode word');
  clue_input3.setAttribute('contenteditable', 'true');

  $(`#box${user_team}${position_to_be_encoded[0]}`).prepend(clue_input1);
  $(`#box${user_team}${position_to_be_encoded[1]}`).prepend(clue_input2);
  $(`#box${user_team}${position_to_be_encoded[2]}`).prepend(clue_input3);

}

function rearrangeClues_JS(user_id, user_name, user_team, input2_value, input3_value, input1_value, position_to_be_encoded) {
  
  document.getElementById('submitClues').classList.add('hide');
  document.getElementById('submitAnswer').classList.remove('hide');


  let clue1 = document.createElement("div");
  clue1.id = `input${user_team}1`;
  // clue1.setAttribute('type','text');
  clue1.setAttribute('class',`draggable_clue_${user_team}`);
  clue1.setAttribute('draggable', 'true');
  clue1.innerHTML  = input2_value;

  let clue2 = document.createElement("div");
  clue2.id = `input${user_team}2`;
  // clue2.setAttribute('type','text');
  clue2.setAttribute('class',`draggable_clue_${user_team}`);
  clue2.setAttribute('draggable', 'true');
  clue2.innerHTML = input3_value;

  let clue3 = document.createElement("div");
  clue3.id = `input${user_team}3`;
  // clue3.setAttribute('type','text');
  clue3.setAttribute('class',`draggable_clue_${user_team}`);
  clue3.setAttribute('draggable', 'true');
  clue3.innerHTML = input1_value;

  $(`#box${user_team}${position_to_be_encoded[0]}`).prepend(clue1);
  $(`#box${user_team}${position_to_be_encoded[1]}`).prepend(clue2);
  $(`#box${user_team}${position_to_be_encoded[2]}`).prepend(clue3);
  console.log('appened')

  columns = document.querySelectorAll(`.draggable_clue_${user_team}`);
  draggingClass = 'dragging';
  dragSource;
    
  Array.prototype.forEach.call(columns, function (col) {
      col.addEventListener('dragstart', dragStart, false);
    });
}


function rearrangeSuggest_JS ( user_name, user_team, d) {
  console.log(d);
  console.log($(`#box${user_team}1`));
  $(`#box${user_team}1`).empty();
  $(`#box${user_team}2`).empty();
  $(`#box${user_team}3`).empty();
  $(`#box${user_team}4`).empty();

  if (d[`box1`] != 'null') {
    let clue1 = document.createElement("div");
    clue1.id = `input${user_team}1`;
    clue1.setAttribute('class',`draggable_clue_${user_team}`);
    clue1.setAttribute('draggable', 'true');
    clue1.innerHTML  = d[`box1`];
    $(`#box${user_team}1`).prepend(clue1);
  }
  if (d[`box2`] != 'null') {
    let clue2 = document.createElement("div");
    clue2.id = `input${user_team}2`;
    clue2.setAttribute('class',`draggable_clue_${user_team}`);
    clue2.setAttribute('draggable', 'true');
    clue2.innerHTML  = d[`box2`];
    $(`#box${user_team}2`).prepend(clue2);
  }
  if (d[`box3`] != 'null') {
    let clue3 = document.createElement("div");
    clue3.id = `input${user_team}3`;
    clue3.setAttribute('class',`draggable_clue_${user_team}`);
    clue3.setAttribute('draggable', 'true');
    clue3.innerHTML  = d[`box3`];
    $(`#box${user_team}3`).prepend(clue3);
  }
  if (d[`box4`] != 'null') {
    let clue4 = document.createElement("div");
    clue4.id = `input${user_team}4`;
    clue4.setAttribute('class',`draggable_clue_${user_team}`);
    clue4.setAttribute('draggable', 'true');
    clue4.innerHTML  = d[`box4`];
    $(`#box${user_team}4`).prepend(clue4);
  }
 
  columns = document.querySelectorAll(`.draggable_clue_${user_team}`);
  draggingClass = 'dragging';
  dragSource;
    
  Array.prototype.forEach.call(columns, function (col) {
      col.addEventListener('dragstart', dragStart, false);
    });

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

function pushRight (result, user_name, game_state_correct_answerd) {
  if (result == 1){
    console.log(user_name + " has nailed the thing");
  } else {
    console.log(user_name + " has failed the thing");
  }
  console.log(game_state_correct_answerd);
  for (key in game_state_correct_answerd){
    if (game_state_correct_answerd[key] != 'null') {
      let previous_words_1 = document.createElement("div");
      previous_words_1.setAttribute('class',"previous_words_1");
      previous_words_1.innerHTML  = game_state_correct_answerd[key];
      $(`#row${key.slice(-2)}`).append(previous_words_1);
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
  
  document.getElementById('giveClues').disabled = false;
  document.getElementById('startNewRound').disabled = true;
  $(`#box11`).empty();
  $(`#box12`).empty();
  $(`#box13`).empty();
  $(`#box14`).empty();  
  $(`#box21`).empty();
  $(`#box22`).empty();
  $(`#box23`).empty();
  $(`#box24`).empty(); 
  
}

