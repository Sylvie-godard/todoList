var DivManager = (function(){
  var self = {};

  self.init = function (){
    const listElement = document.getElementById('list');
    const trashElement = document.getElementById('trash');
    const buttonAddElement = document.getElementById('button');
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
        todoList.push(
          {
            name: toDo,
            id: id,
            done: false,
            trash: false
          });
        inputElement.value = '';
        id++;
      }
    }

    function removeToDo( id ) {
      let todoElement = document.getElementById(id);
      delete todoList[id];
      todoElement.parentNode.parentNode.parentNode.removeChild(todoElement.parentNode.parentNode);
    }

    function completeTodo( id) {
      const todoElement = document.getElementById(id);
      const TEXT =  document.getElementById(id + '-text');
      const CHECK = 'check_box';
      const UNCHECK = 'check_box_outline_blank';
      const LINE_DONE = 'line';

      if (id in todoList) {
        if (todoList[id].done === false) {
          todoList[id].done = true
          todoElement.innerHTML = CHECK;
          TEXT.classList.toggle(LINE_DONE);
        } else {
          todoList[id].done = false
          todoElement.innerHTML = UNCHECK;
          TEXT.classList.toggle(LINE_DONE);
        }
      }
    }

    function addTodo( toDo, id, date, trash ) {
      if (trash) {
        return;
      }

      const text = `<li class='item'>
                      <div class='item-content'>
                        <i class='material-icons' id=${id} job='complete'>check_box_outline_blank</i>
                        <p class='toDoText' id=${id}-text>${toDo}</p>
                        <i class='material-icons' job='delete' id='${id}-trash'>delete</i>
                      </div>
                      <p>${date}</p>    
                    </li>`;
      const position = 'beforeend';

      listElement.insertAdjacentHTML(position, text);
    }

    menuElement.onclick = openSidebar;

    listElement.onclick = function ( event ){
      let element = event.target;
      let id = element.id.replace('-trash', '');
      const elementJob = element.attributes.job.value;

      if (elementJob === 'complete') {
        completeTodo( id );
      } else if (elementJob === 'delete') {
        removeToDo( id );
      }
    };

    trashElement.onclick = function () {
      todoList.forEach(function( element ){
        if (element.done) {
          removeToDo( element.id );
        }
      });
    };

    buttonAddElement.onclick = function() {
      addTodoElement();
    };

    document.onkeyup = function( event ) {
      if (event.keyCode === 13) {
        addTodoElement();
      }
    };
  };

  return self;
})();

DivManager.init();
