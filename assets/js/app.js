let toDoArray = [];

// add a new todo to the array
const inputText = document.querySelector(".text-input");

const toDoArrayFunc = () => {
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
    createToDo(toDoArray);
  }

  inputText.focus();
};

// create todo elements
const toDoContainer = document.querySelector(".to-do-container");

const createToDo = (toDoList) => {
  toDoContainer.innerHTML = "";

  toDoList.forEach((todo) => {
    // insert todos into the DOM
    toDoContainer.insertAdjacentHTML(
      "beforeend",
      `<li id="${todo.id}" class="to-do-box white-color">
        <p class="to-do-text">${todo.title}</p>
        <i class="fa-solid fa-check" onclick="checkBtnHandler(event)"></i>
        <i class="fa-solid fa-trash" onclick="trashBtnHandler(event)"></i>
        </li>`
    );

    // set proper color and icon for existing true/false status'
    if (todo.status === true) {
      let toDoBox = document.getElementById(`${todo.id}`);
      toDoBox.className = "to-do-box completed-color";
      toDoBox.children[1].classList.replace("fa-check", "fa-xmark");
    }
  });
};

// change the status of a todo
const checkBtnHandler = (e) => {
  const toDoId = e.target.parentElement.id;
  const todo = toDoArray.find((item) => item.id === parseInt(toDoId));

  if (todo.status === false) {
    e.target.classList.replace("fa-check", "fa-xmark");
    e.target.parentElement.classList.add("completed-color");
    todo.status = true;
  } else {
    e.target.classList.replace("fa-xmark", "fa-check");
    e.target.parentElement.classList.remove("completed-color");
    todo.status = false;
  }

  setLocalStorage(toDoArray);
};

// remove a todo
const trashBtnHandler = (e) => {
  const toDoId = e.target.parentElement.id;
  const todo = toDoArray.find((item) => item.id === parseInt(toDoId));
  const toDoIndex = toDoArray.indexOf(todo);

  toDoArray.splice(toDoIndex, 1);
  e.target.parentElement.remove();

  setLocalStorage(toDoArray);
};

// handle buttons
const allBtn = document.querySelector(".all-btn");
const completedBtn = document.querySelector(".completed-btn");
const incompleteBtn = document.querySelector(".incomplete-btn");

// shows all todos in the list
allBtn.addEventListener("click", () => {
  let allFilter = toDoArray.filter((all) => all);
  createToDo(allFilter);
});

// only shows the completed todos
completedBtn.addEventListener("click", () => {
  let completeFilter = toDoArray.filter((complete) => complete.status === true);
  createToDo(completeFilter);
});

// only shows the incomplete todos
incompleteBtn.addEventListener("click", () => {
  let incompleteFilter = toDoArray.filter(
    (incomplete) => incomplete.status === false
  );
  createToDo(incompleteFilter);
});

// autofocus the input box and check toDoArray value
window.addEventListener("load", () => {
  inputText.focus();

  let getToDo = JSON.parse(localStorage.getItem("ToDo-List"));
  if (getToDo) {
    toDoArray = getToDo;
  } else {
    toDoArray = [];
  }

  createToDo(toDoArray);
});

// add a new todo with both enter key and click event
const addBtn = document.querySelector(".fa-plus");

addBtn.addEventListener("click", toDoArrayFunc);
inputText.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    toDoArrayFunc();
  }
});

// set local storage value
const setLocalStorage = (toDoList) => {
  localStorage.setItem("ToDo-List", JSON.stringify(toDoList));
};
