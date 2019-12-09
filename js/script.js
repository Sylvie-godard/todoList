const list = document.getElementById('list');
const trash = document.getElementById('trash');
const input = document.getElementById('input');
const button = document.getElementById('button');
const CHECK = 'check_box';
const UNCHECK = 'check_box_outline_blank';
const LINE_DONE = 'line';

let todoList = [];
let id = 0;

function myFunction(event) {
  let element = document.getElementById('sidebar');
  element.classList.toggle('open');
  event.stopPropagation();
}

let menuElement = document.getElementById('menu-button');
menuElement.onclick = myFunction;

function addTodo( toDo, id, date ) {
  const text = `<li class='item'>
                  <div class='item-content'>
                    <i class='material-icons' id=${id} job='complete'>check_box_outline_blank</i>
                    <p class='toDoText' id=${id}-text>${toDo}</p>
                    <i class='material-icons' job='delete'>delete</i>
                  </div>
                  <p>${date}</p>    
                </li>`;
  const position = 'beforeend';

  list.insertAdjacentHTML(position, text);
}

function completeTodo( element, id ) {
  const TEXT =  document.getElementById(id + '-text');

  element.classList.toggle(CHECK);
  if (element.classList.contains('check_box')) {
    element.innerHTML = CHECK;
    TEXT.classList.toggle(LINE_DONE);
    todoList[element.id].done = true;
  } else if (element.classList.contains('check_box_outline_blank')) {
    element.innerHTML = UNCHECK;
    TEXT.classList.toggle(LINE_DONE);
    todoList[element.id].done = false;
  }

  element.classList.toggle(UNCHECK);
}

function removeToDo( element ) {
  element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);
}

let addEvent = function () {
  const toDo = input.value;

  let date = new Date();
  let dateFormat = date.getDate() + '-' + (date.getMonth() + 1) + '-' +
    date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':'
    + date.getSeconds();

  if (toDo) {
    addTodo(toDo, id, dateFormat);
    todoList[id] =
      {
        name: toDo,
        id: id,
        done: false
      };
    input.value = '';
    id++;
  }
}

button.addEventListener( 'click', function() {
  addEvent();
});

document.addEventListener( 'keyup', function( event ) {
  if (event.keyCode === 13) {
    addEvent();
  }
});

trash.addEventListener('click', function () {
  todoList.forEach(function( event ){
    let element = document.getElementById(event.id);
    if (event.done === true) {
      removeToDo(element);
      delete todoList[event.id];
    }
  });
});

list.addEventListener('click', function ( event ) {
  let element = event.target;
  const elementJob = element.attributes.job.value;

  if ( elementJob === 'complete') {
    completeTodo( element, element.id );
  } else if (elementJob === 'delete') {
    removeToDo( element );
  }

})