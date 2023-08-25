let addBtn = document.querySelector(".fa-plus");
let inputText = document.querySelector(".text-input");
let toDoContainer = document.querySelector(".to-do-container");

// autofocus the input box
window.addEventListener("load", function () {
  inputText.focus();
});

// add a new todo function
function addFunction() {
  let inputValue = inputText.value.trim();
  inputText.value = "";

  if (inputValue) {
    // create new elements
    let newToDoLi = document.createElement("li");
    newToDoLi.className = "to-do-box white-color";

    let newToDoP = document.createElement("p");
    newToDoP.className = "to-do-text";
    newToDoP.innerHTML = inputValue;

    let newToDoCheck = document.createElement("i");
    newToDoCheck.className = "fa-solid fa-check";

    let newToDoTrash = document.createElement("i");
    newToDoTrash.className = "fa-solid fa-trash";

    // append new elements into the container
    newToDoLi.append(newToDoP, newToDoCheck, newToDoTrash);
    toDoContainer.append(newToDoLi);

    // remove elements (new todos)
    newToDoTrash.addEventListener("click", function () {
      newToDoTrash.parentElement.remove();
    });

    // change todos' status
    newToDoCheck.addEventListener("click", function () {
      if (newToDoLi.classList.contains("white-color")) {
        newToDoLi.classList.remove("white-color");
        newToDoLi.classList.add("black-color");
      } else {
        newToDoLi.classList.remove("black-color");
        newToDoLi.classList.add("white-color");
      }
    });
  }
}

// add a new todo with both enter key and click event
addBtn.addEventListener("click", addFunction);
inputText.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    addFunction();
  }
});

// gonna work on them asap
let allBtn = document.querySelector(".all-btn");
let doneBtn = document.querySelector(".done-btn");
let deletedBtn = document.querySelector(".deleted-btn");
