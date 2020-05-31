var todobtn = document.querySelector(".todo-button");
var todoinput = document.querySelector(".todo-input");
var todolist = document.querySelector(".todo-list");
var filteroption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getTodos);
todobtn.addEventListener("click", addtodo);
todolist.addEventListener("click", deletecheck);
filteroption.addEventListener("click", filtertodo);

function filtertodo(e) {
  let todos = todolist.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function deletecheck(e) {
  let item = e.target;
  if (item.classList[0] === "todocheck") {
    let todo = item.parentElement;

    //todo.addEventListener("transitionend", function () {
    todo.classList.toggle("completed");
    //});
  }
  if (item.classList[0] === "todotrash") {
    let todo = item.parentElement;
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
      removeLocalTodos(todo);
    });
    //todo.remove();
  }
}

function createItem(e, value, saveflag) {
  let tododiv = document.createElement("div");
  tododiv.classList.add("tododiv");

  let newtodo = document.createElement("li");

  newtodo.innerText = value;
  newtodo.classList.add("todoli");

  tododiv.appendChild(newtodo);
  if (saveflag == true) {
    saveLocalTodos(todoinput.value);
  }
  let checkbtn = document.createElement("button");
  checkbtn.innerHTML = `<i class="fas fa-check"></i>`;
  checkbtn.classList.add("todocheck");
  tododiv.appendChild(checkbtn);

  let trashbtn = document.createElement("button");
  trashbtn.innerHTML = `<i class="fas fa-trash"></i>`;
  trashbtn.classList.add("todotrash");
  tododiv.appendChild(trashbtn);
  todolist.appendChild(tododiv);
}

function addtodo(e) {
  e.preventDefault();
  if (todoinput.value.length > 0) {
    let saveflag = true;
    createItem(e, todoinput.value, saveflag);
    todoinput.value = "";
  }
}

function initializeTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function saveLocalTodos(todo) {
  let todos = initializeTodos();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(e) {
  let todos = initializeTodos();
  todos.forEach(function (todo) {
    saveflag = false;
    createItem(e, todo, saveflag);
  });
}
function removeLocalTodos(todo) {
  let todos = initializeTodos();

  const todotext = todo.children[0].innerText;

  let ind = todos.indexOf(todotext);
  //console.log(ind);
  if (ind != -1) {
    console.log(ind);
    todos.splice(ind, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}
