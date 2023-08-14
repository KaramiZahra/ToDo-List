let addBtn = document.querySelector('.fa-plus')
let inputText = document.querySelector('.text-input')
let toDoContainer = document.querySelector('.to-do-container')

function addFunction() {
    let inputValue = inputText.value.trim()
    inputText.value = ''

    if (inputValue) {

        let newToDoLi = document.createElement('li')
        newToDoLi.className = 'to-do-box white-color'

        let newToDoP = document.createElement('p')
        newToDoP.className = 'to-do-text'
        newToDoP.innerHTML = inputValue

        let newToDoCheck = document.createElement('i')
        newToDoCheck.className = 'fa-solid fa-check'

        let newToDoTrash = document.createElement('i')
        newToDoTrash.className = 'fa-solid fa-trash'

        newToDoLi.append(newToDoP, newToDoCheck, newToDoTrash)
        toDoContainer.append(newToDoLi)

        newToDoTrash.addEventListener('click', function () {
            newToDoTrash.parentElement.remove()
        })

        newToDoCheck.addEventListener('click', function () {
            if (newToDoLi.classList.contains('white-color')) {
                newToDoLi.classList.remove('white-color')
                newToDoLi.classList.add('black-color')
            } else {
                newToDoLi.classList.remove('black-color')
                newToDoLi.classList.add('white-color')
            }
        })
    }
}

addBtn.addEventListener('click', addFunction)
inputText.addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
        addFunction()
    }
})

let allBtn = document.querySelector('.all-btn')
let doneBtn = document.querySelector('.done-btn')
let deletedBtn = document.querySelector('.deleted-btn')
