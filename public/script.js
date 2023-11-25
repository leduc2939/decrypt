// var columns = document.querySelectorAll('.draggable_clue_1');
// var columns2 = document.querySelectorAll('.leftout');
// var draggingClass = 'dragging';
// var dragSource;

// Array.prototype.forEach.call(columns, function (col) {
//   col.addEventListener('dragstart', handleDragStart, false);
//   col.addEventListener('dragenter', handleDragEnter, false)
//   col.addEventListener('dragover', handleDragOver, false);
//   col.addEventListener('dragleave', handleDragLeave, false);
//   col.addEventListener('drop', handleDrop, false);
//   col.addEventListener('dragend', handleDragEnd, false);
// });

// function handleDragStart (evt) {
//   // console.log('start drag');
//   dragSource = this;
//   evt.target.classList.add(draggingClass);
//   evt.dataTransfer.effectAllowed = 'move';
//   evt.dataTransfer.setData('text/html', this.innerHTML);
// }

// function handleDragOver (evt) {
//   // console.log('drag over');
//   evt.dataTransfer.dropEffect = 'move';
//   evt.preventDefault();
// }

// function handleDragEnter (evt) {
//   // console.log('drag enter');
//   this.classList.add('over');
//   evt.preventDefault();
// }

// function handleDragLeave (evt) {
//   // console.log('drag leave');
//   this.classList.remove('over');
// }

// function handleDrop (evt) {
//   // console.log('drag drop');
//   evt.stopPropagation();
  
//   if (dragSource !== this) {
//     dragSource.innerHTML = this.innerHTML;
//     this.innerHTML = evt.dataTransfer.getData('text/html');
//   }
  
//   evt.preventDefault();
// }

// function handleDragEnd (evt) {
//   console.log('drag end');
//   Array.prototype.forEach.call(columns, function (col) {
//     ['over', 'dragging'].forEach(function (className) {
//       col.classList.remove(className);
//     });
//   });
//   evt.target.classList.remove('drag-over');

// }




// const item = document.querySelector('.item');

// item.addEventListener('dragstart', dragStart);

// function dragStart(e) {
//   e.dataTransfer.setData('text/plain', e.target.id);
//   setTimeout(() => {
//       e.target.classList.add('hide');
//   }, 0);
// }

var columns = document.querySelectorAll('.draggable_clue_1');
// var columns2 = document.querySelectorAll('.leftout');
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
  console.log("id: " + id);
  const draggable = document.getElementById(id);
  console.log(draggable);
  // add it to the drop target
  e.target.appendChild(draggable);
  console.log(e.target);
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

function giveClues_JS (position_to_be_encoded,left_out_position) {
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

  // create a transparent box for the one that's left out
  // let clue_input14 = document.createElement("div");
  // clue_input14.id = "leftout1";
  // clue_input14.setAttribute('type','text');
  // clue_input14.setAttribute('class','leftout');
  // $(`#row1${left_out_position}`).prepend(clue_input14);
}

function rearrangeClues_JS(input2_value, input3_value, input1_value, position_to_be_encoded, left_out_position) {
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

  // let clue_input14 = document.createElement("div");
  // clue_input14.id = "leftout1";
  // // clue_input14.setAttribute('type','text');
  // clue_input14.setAttribute('class','leftout');
  // clue_input14.setAttribute('draggable', 'true');
  // $(`#row1${left_out_position}`).prepend(clue_input14);

  columns = document.querySelectorAll('.draggable_clue_1');
  draggingClass = 'dragging';
  dragSource;
    
  Array.prototype.forEach.call(columns, function (col) {
      col.addEventListener('dragstart', dragStart, false);
    });

  // columns2 = document.querySelectorAll('.leftout');
  // draggingClass = 'dragging';
  // dragSource;

  // Array.prototype.forEach.call(columns2, function (col) {
  //     col.addEventListener('dragstart', handleDragStart, false);
  //     col.addEventListener('dragenter', handleDragEnter, false)
  //     col.addEventListener('dragover', handleDragOver, false);
  //     col.addEventListener('dragleave', handleDragLeave, false);
  //     col.addEventListener('drop', handleDrop, false);
  //     col.addEventListener('dragend', handleDragEnd, false);
  //   });
}


var columns = document.querySelectorAll('.card');
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