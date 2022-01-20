import './styles.css';
import { addNewTask, deletingTask, editingTask } from './crud.js';
import { checkBoxEventChange, clearAllCompletedTasks } from './taskStatus.js';

let toDoTasks = [];
const bookList = document.querySelector('#bookList');
const taskInputElement = document.querySelector('#task-input');

const sortTasks = (toDoTasks) => {
  const sortedArray = [...toDoTasks];
  sortedArray.sort((a, b) => a.index - b.index);
  return sortedArray;
};

const renderTasks = (toDoTasks) => {
  bookList.innerHTML = '';
  const sortedTasks = sortTasks(toDoTasks);
  if (!sortedTasks) {
    bookList.innerHTML += `
    <li class="list-item" draggable="true">
      <p > No Tasks </p>
    <li>   
    `;
  } else {
    sortedTasks.forEach((tasks) => {
      if (tasks.completed === true) {
        bookList.innerHTML += `
    <li class="list-item" draggable="true">
      <input type="checkbox" class="position-grid-start" id="${tasks.index}" checked/>
      <p contenteditable="true" class="editable"> ${tasks.description} </p>
      <i id="${tasks.index}" class="fas fa-trash-alt position-grid-end delete-button"></i>
    <li>   
    `;
      } else {
        bookList.innerHTML += `
    <li class="list-item" draggable="true">
    <input type="checkbox" class="position-grid-start" id="${tasks.index}"/>
      <p contenteditable="true" class="editable" id="${tasks.index}"> ${tasks.description} </p>
      <i id="${tasks.index}" class="fas fa-trash-alt position-grid-end delete-button"></i>
    <li>   
    `;
      }
    });
  }
  bookList.innerHTML += '<button id="clear-button" class="clear-button"> Clear All Completed </button>';
};

const saveToLocalStorage = (tasksArray) => {
  localStorage.setItem('toDoListTasks', JSON.stringify(tasksArray));
};

const retrieveFromLocalStorage = () => {
  let newStorageTasks = [];
  const data = localStorage.getItem('toDoListTasks');
  if (data) {
    newStorageTasks = JSON.parse(data);
  }
  return newStorageTasks;
};

taskInputElement.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    const newTask = {
      description: event.target.value,
      completed: false,
      index: (toDoTasks.length + 1),
    };
    const newTaskArrayWithAddedTask = addNewTask(toDoTasks, newTask);
    toDoTasks = [...newTaskArrayWithAddedTask];
    saveToLocalStorage(toDoTasks);
    renderTasks(toDoTasks);
  }
});

bookList.addEventListener('input', (event) => {
  if (event.target.className.includes('editable')) {
    const newTaskArrayWithAddedTask = editingTask(
      toDoTasks, parseInt(event.target.id, 10), event.target.innerHTML,
    );
    toDoTasks = [...newTaskArrayWithAddedTask];
    saveToLocalStorage(toDoTasks);
  }
});

bookList.addEventListener('click', (event) => {
  if (event.target.className.includes('delete-button')) {
    const newTaskArrayWithDeletedTask = deletingTask(toDoTasks, parseInt(event.target.id, 10));
    toDoTasks = [...newTaskArrayWithDeletedTask];
    saveToLocalStorage(toDoTasks);
    renderTasks(toDoTasks);
  }

  if (event.target.className.includes('clear-button')) {
    const newTasksCleared = clearAllCompletedTasks(toDoTasks);
    toDoTasks = [...newTasksCleared];
    saveToLocalStorage(toDoTasks);
    renderTasks(toDoTasks);
  }
});

bookList.addEventListener('change', (event) => {
  const newTempArray = checkBoxEventChange(toDoTasks, parseInt(event.target.id, 10));
  toDoTasks = [...newTempArray];
  saveToLocalStorage(toDoTasks);
});

window.addEventListener('DOMContentLoaded', () => {
  toDoTasks = retrieveFromLocalStorage();
  renderTasks(toDoTasks);
});
