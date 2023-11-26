
var columns = document.querySelectorAll('.draggable_clue_1');
var draggingClass = 'dragging';
var dragSource;

Array.prototype.forEach.call(columns, function (col) {
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
  $('#thua_word1 span').text('random word');
  $('#thua_word2 span').text('random word');
  $('#thua_word3 span').text('random word');
  $('#thua_word4 span').text('random word');
  
  $('#loser_word1 span').text('random word');
  $('#loser_word2 span').text('random word');
  $('#loser_word3 span').text('random word');
  $('#loser_word4 span').text('random word');
}

function giveClues_JS (position_to_be_encoded) {
  let clue_input11 = document.createElement("div");
  clue_input11.id = "input11";
  clue_input11.setAttribute('type','text');
  clue_input11.setAttribute('class','input');
  clue_input11.setAttribute('placeholder','encode word');
  clue_input11.setAttribute('contenteditable', 'true');
  let clue_input12 = document.createElement("div");
  clue_input12.id = "input12";
  clue_input12.setAttribute('type','text');
  clue_input12.setAttribute('class','input');
  clue_input12.setAttribute('placeholder','encode word');
  clue_input12.setAttribute('contenteditable', 'true');
  let clue_input13 = document.createElement("div");
  clue_input13.id = "input13";
  clue_input13.setAttribute('type','text');
  clue_input13.setAttribute('class','input');
  clue_input13.setAttribute('placeholder','encode word');
  clue_input13.setAttribute('contenteditable', 'true');

  $(`#box1${position_to_be_encoded[0]}`).prepend(clue_input11);
  $(`#box1${position_to_be_encoded[1]}`).prepend(clue_input12);
  $(`#box1${position_to_be_encoded[2]}`).prepend(clue_input13);

}

function rearrangeClues_JS(input2_value, input3_value, input1_value, position_to_be_encoded) {
  let clue1 = document.createElement("div");
  clue1.id = "input11";
  // clue1.setAttribute('type','text');
  clue1.setAttribute('class',"draggable_clue_1");
  clue1.setAttribute('draggable', 'true');
  clue1.innerHTML  = input2_value;

  let clue2 = document.createElement("div");
  clue2.id = "input12";
  // clue2.setAttribute('type','text');
  clue2.setAttribute('class',"draggable_clue_1");
  clue2.setAttribute('draggable', 'true');
  clue2.innerHTML = input3_value;

  let clue3 = document.createElement("div");
  clue3.id = "input13";
  // clue3.setAttribute('type','text');
  clue3.setAttribute('class',"draggable_clue_1");
  clue3.setAttribute('draggable', 'true');
  clue3.innerHTML = input1_value;

  $(`#box1${position_to_be_encoded[0]}`).prepend(clue1);
  $(`#box1${position_to_be_encoded[1]}`).prepend(clue2);
  $(`#box1${position_to_be_encoded[2]}`).prepend(clue3);
  console.log('appened')

  columns = document.querySelectorAll('.draggable_clue_1');
  draggingClass = 'dragging';
  dragSource;
    
  Array.prototype.forEach.call(columns, function (col) {
      col.addEventListener('dragstart', dragStart, false);
    });

}


function rearrangeSuggest_JS (user_id, d) {

  $('#box11').empty();
  $('#box12').empty();
  $('#box13').empty();
  $('#box14').empty();

  if (d['box11'] != 'null') {
    let clue1 = document.createElement("div");
    clue1.id = "input11";
    clue1.setAttribute('class',"draggable_clue_1");
    clue1.setAttribute('draggable', 'true');
    clue1.innerHTML  = d['box11'];
    $('#box11').prepend(clue1);
  }
  if (d['box12'] != 'null') {
    let clue2 = document.createElement("div");
    clue2.id = "input12";
    clue2.setAttribute('class',"draggable_clue_1");
    clue2.setAttribute('draggable', 'true');
    clue2.innerHTML  = d['box12'];
    $('#box12').prepend(clue2);
  }
  if (d['box13'] != 'null') {
    let clue3 = document.createElement("div");
    clue3.id = "input13";
    clue3.setAttribute('class',"draggable_clue_1");
    clue3.setAttribute('draggable', 'true');
    clue3.innerHTML  = d['box13'];
    $('#box13').prepend(clue3);
  }
  if (d['box14'] != 'null') {
    let clue4 = document.createElement("div");
    clue4.id = "input14";
    clue4.setAttribute('class',"draggable_clue_1");
    clue4.setAttribute('draggable', 'true');
    clue4.innerHTML  = d['box14'];
    $('#box14').prepend(clue4);
  }
 
  columns = document.querySelectorAll('.draggable_clue_1');
  draggingClass = 'dragging';
  dragSource;
    
  Array.prototype.forEach.call(columns, function (col) {
      col.addEventListener('dragstart', dragStart, false);
    });

  var alert = document.createElement("div");
  alert.setAttribute('class',"suggest_alert");
  alert.setAttribute('id',"suggest_alert");
  alert.innerHTML  = user_id + ' has given a suggestion';
  console.log(alert);
  $('#container').append(alert);
  console.log('appended to container');
  setTimeout(function() {
    $(alert).fadeTo(3000, 0).slideUp(3000, function(){
      $(this).remove();
    });
  });
}

function pushRight (result, user_id, game_state_correct_answerd) {
  if (result == 1){
    console.log(user_id + " has nailed the thing");
  } else {
    console.log(user_id + " has failed the thing");
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