// Initialize an empty array to store tasks
let tasks = [];

// Get all the DOM elements
const taskList = document.getElementById("list");
const addTaskInput = document.getElementById("add");
const tasksCounter = document.getElementById("tasks-counter");
const button = document.getElementById("btn");
var comptask = 0;
var completedtask = document.getElementById("count");

// a function to add a task to DOM
function addTaskToDOM(task) {
  const li = document.createElement("li");
  li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${
    task.done ? "checked" : ""
  } class="custom-checkbox">
        <label for="${task.id}">${task.text}</label>
        <img src="./image/cut.png" class="delete" data-id="${task.id}" />
    `;
  taskList.append(li);
}

//  a function to render the list
function rendering() {
  taskList.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    addTaskToDOM(tasks[i]);
  }
  tasksCounter.innerHTML = tasks.length;
}


// function to mark a task as complete
function markCompleted(taskId) {
  const task = tasks.filter(function (task) {
    return task.id === taskId;
  });
  if (task.length > 0) {
    const currentTask = task[0];
    if (currentTask.done) {
      currentTask.done = false;
      comptask--;
    } else {
      currentTask.done = true;
      comptask++;
    }
    rendering();
    completedtask.innerHTML = comptask;
  } else {
  }
}

// function to delete a task
function deleteTask(taskId) {
  const newTasks = tasks.filter(function (task) {
    return task.id !== taskId;
  });
  tasks = newTasks;
  rendering();
  if (comptask > 0) {
    comptask--;
    completedtask.innerHTML = comptask;
  }
}

// function to add a task to the tasks array
function addTask(task) {
  if (task) {
    tasks.push(task);
    rendering();
    return;
  }
}

// function to handle keypress on the input field
function handleInputKeypress(e) {
  if (e.key == "Enter") {
    const text = addTaskInput.value;
    if (!text) {
      alert("Task text cannot be empty");
      return;
    }
    const task = {
      text,
      id: Date.now().toString(),
      done: false,
    };
    addTaskInput.value = "";
    addTask(task);
  }
}

function handleClickListener(e) {
  const target = e.target;
  if (target.className === "delete") {
    const taskId = target.dataset.id;
    deleteTask(taskId);
    return;
  } else if (target.className === "custom-checkbox") {
    const taskId = target.id;
    markCompleted(taskId);
    return;
  }
}

function initializeApp() {
  document.addEventListener("click", handleClickListener);
}
initializeApp();

// listener to press enter
addTaskInput.addEventListener("keyup", handleInputKeypress);
