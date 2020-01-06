var DivManager = (function(){
  var self = {};

  self.init = function (){
    const listElement = document.getElementById('list');
    const trashElement = document.getElementById('trash');
    const buttonElement = document.getElementById('button');
    const menuElement = document.getElementById('menu-button');
    let todoList = [];
    let id = 0;
    
    function openSidebar(event) {
      let element = document.getElementById('sidebar');
      element.classList.toggle('open');
      event.stopPropagation();
    }

    function addTodoElement() {
      const inputElement = document.getElementById('input');

      const toDo = inputElement.value;

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
        inputElement.value = '';
        id++;
      }
    }

    function removeToDo( element, id ) {
      // delete in the storage
      for(let i = 0; i < todoList.length; i++) {
        if (todoList[i].id === id) {
          todoList.splice(i, 1);
        }
      }
      // delete node element
      element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);
    }

    function completeTodo( element, id ) {
      const TEXT =  document.getElementById(id + '-text');
      const CHECK = 'check_box';
      const UNCHECK = 'check_box_outline_blank';
      const LINE_DONE = 'line';

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

    function addTodo( toDo, id, date, trash ) {
      if (trash) {
        return;
      }

      const text = `<li class='item'>
                  <div class='item-content'>
                    <i class='material-icons' id=${id} job='complete'>check_box_outline_blank</i>
                    <p class='toDoText' id=${id}-text>${toDo}</p>
                    <i class='material-icons' job='delete' id='${id}'>delete</i>
                  </div>
                  <p>${date}</p>    
                </li>`;
      const position = 'beforeend';

      listElement.insertAdjacentHTML(position, text);
    }

    //my event

    menuElement.onclick = openSidebar;

    listElement.onclick = function ( event ){
      let element = event.target;
      const elementJob = element.attributes.job.value;

      if (elementJob === 'complete') {
        completeTodo( element, element.id );
      } else if (elementJob === 'delete') {
        removeToDo( element );
      }
    };

    trashElement.onclick = function () {
      todoList.forEach(function( event ){
        let element = document.getElementById(event.id);
        if (event.done === true) {
          removeToDo(element, event.id);
        }
      });
    }

    buttonElement.onclick = function() {
      addTodoElement();
    };

    document.onkeyup = function( event ) {
      if (event.keyCode === 13) {
        addTodoElement();
        console.log(todoList);
      }
    };
  };

  console.log("ok");
  return self;

})();


DivManager.init();
