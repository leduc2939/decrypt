var columns = document.querySelectorAll('.decryptr--item1');
var draggingClass = 'dragging';
var dragSource;

Array.prototype.forEach.call(columns, function (col) {
  col.addEventListener('dragstart', handleDragStart, false);
  col.addEventListener('dragenter', handleDragEnter, false)
  col.addEventListener('dragover', handleDragOver, false);
  col.addEventListener('dragleave', handleDragLeave, false);
  col.addEventListener('drop', handleDrop, false);
  col.addEventListener('dragend', handleDragEnd, false);
});

function handleDragStart (evt) {
  dragSource = this;
  evt.target.classList.add(draggingClass);
  evt.dataTransfer.effectAllowed = 'move';
  evt.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver (evt) {
  evt.dataTransfer.dropEffect = 'move';
  evt.preventDefault();
}

function handleDragEnter (evt) {
  this.classList.add('over');
}

function handleDragLeave (evt) {
  this.classList.remove('over');
}

function handleDrop (evt) {
  evt.stopPropagation();
  
  if (dragSource !== this) {
    dragSource.innerHTML = this.innerHTML;
    this.innerHTML = evt.dataTransfer.getData('text/html');
  }
  
  evt.preventDefault();
}

function handleDragEnd (evt) {
  Array.prototype.forEach.call(columns, function (col) {
    ['over', 'dragging'].forEach(function (className) {
      col.classList.remove(className);
    });
  });
}

// $("#newGame").click(function(){
//   $('#thua_word1 span').text('random word');
//   $('#thua_word2 span').text('random word');
//   $('#thua_word3 span').text('random word');
//   $('#thua_word4 span').text('random word');
  
//   $('#loser_word1 span').text('random word');
//   $('#loser_word2 span').text('random word');
//   $('#loser_word3 span').text('random word');
//   $('#loser_word4 span').text('random word');
// });

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

function giveClues_JS () {
    // create an array of three positions to be encoded
  position_to_be_encoded = [1, 2, 3, 4];
  left_out_position = Math.floor(Math.random()*position_to_be_encoded.length);
  position_to_be_encoded.splice(left_out_position, 1);
  console.log(position_to_be_encoded);
  // create those new boxes so that the users can input clues
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

  console.log(`#row1${position_to_be_encoded[0]}`);
  $(`#row1${position_to_be_encoded[0]}`).prepend(clue_input11);
  $(`#row1${position_to_be_encoded[1]}`).prepend(clue_input12);
  $(`#row1${position_to_be_encoded[2]}`).prepend(clue_input13);

  // create a transparent box for the one that's left out
  let clue_input14 = document.createElement("div");
  clue_input14.id = "leftout1";
  clue_input14.setAttribute('type','text');
  clue_input14.setAttribute('class','leftout');
  $(`#row1${left_out_position+1}`).prepend(clue_input14);
}

