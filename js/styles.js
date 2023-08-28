const addBtn = document.querySelector(".fa-plus");
const inputText = document.querySelector(".text-input");
const toDoContainer = document.querySelector(".to-do-container");
const allBtn = document.querySelector(".all-btn");
const completedBtn = document.querySelector(".completed-btn");
const incompleteBtn = document.querySelector(".incomplete-btn");
let toDoArray = [];

// autofocus the input box
window.addEventListener("load", function () {
  inputText.focus();

  let getToDo = JSON.parse(localStorage.getItem("ToDo-List"));
  if (getToDo) {
    toDoArray = getToDo;
  } else {
    toDoArray = [];
  }

  createToDoFunction(toDoArray);
});

// add a new todo with both enter key and click event
addBtn.addEventListener("click", toDoArrayFunction);
inputText.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    toDoArrayFunction();
  }
});

// add a new todo to the array
function toDoArrayFunction() {
  let inputValue = inputText.value.trim();
  inputText.value = "";

  if (inputValue) {
    let newToDoObj = {
      id: toDoArray.length + 1,
      title: inputValue,
      status: false,
    };
    toDoArray.push(newToDoObj);

    setLocalStorage(toDoArray);
    createToDoFunction(toDoArray);
  }

  inputText.focus();
}

// create todo elements in dom
function createToDoFunction(toDoList) {
  toDoContainer.innerHTML = "";

  toDoList.forEach(function (todo) {
    // create new elements
    let newToDoLi = document.createElement("li");
    newToDoLi.className = "to-do-box";
    newToDoLi.setAttribute("id", "to-do-" + todo.id);
    newToDoLi.draggable = true;

    let newToDoP = document.createElement("p");
    newToDoP.className = "to-do-text";
    newToDoP.innerHTML = todo.title;

    let newToDoCheck = document.createElement("i");
    newToDoCheck.className = "fa-solid fa-check";

    let newToDoTrash = document.createElement("i");
    newToDoTrash.className = "fa-solid fa-trash";

    // append new elements into their parent element
    newToDoLi.append(newToDoP, newToDoCheck, newToDoTrash);
    toDoContainer.append(newToDoLi);

    // remove elements (new todos)
    newToDoTrash.addEventListener("click", function () {
      newToDoTrash.parentElement.remove();
      let toDoIndex = toDoList.indexOf(todo);
      toDoList.splice(toDoIndex, 1);

      setLocalStorage(toDoArray);
    });

    // change todos' status
    newToDoCheck.addEventListener("click", function () {
      if (todo.status === false) {
        newToDoCheck.classList.replace("fa-check", "fa-xmark");
        newToDoLi.classList.add("completed-color");
        todo.status = true;
      } else {
        newToDoCheck.classList.replace("fa-xmark", "fa-check");
        newToDoLi.classList.remove("completed-color");
        todo.status = false;
      }

      setLocalStorage(toDoArray);
    });
    if (todo.status) {
      newToDoLi.className = "to-do-box completed-color";
      newToDoCheck.classList.replace("fa-check", "fa-xmark");
    }

    // drag and drop
    newToDoLi.addEventListener("dragstart", function (e) {
      e.dataTransfer.setData("toDo", e.target.id);
    });

    toDoContainer.addEventListener("dragover", function (e) {
      e.preventDefault();
    });

    toDoContainer.addEventListener("drop", function (e) {
      let getToDo = e.dataTransfer.getData("toDo");
      let getToDoId = document.getElementById(getToDo);

      toDoContainer.append(getToDoId);
    });
  });
}

// set local storage value
function setLocalStorage(toDoList) {
  localStorage.setItem("ToDo-List", JSON.stringify(toDoList));
}

// shows all todos in the list
allBtn.addEventListener("click", function () {
  let allFilter = toDoArray.filter(function (all) {
    return all;
  });
  createToDoFunction(allFilter);
});

// only shows the completed todos
completedBtn.addEventListener("click", function () {
  let completeFilter = toDoArray.filter(function (complete) {
    return complete.status === true;
  });
  createToDoFunction(completeFilter);
});

// only shows the incomplete todos
incompleteBtn.addEventListener("click", function () {
  let incompleteFilter = toDoArray.filter(function (incomplete) {
    return incomplete.status === false;
  });
  createToDoFunction(incompleteFilter);
});
