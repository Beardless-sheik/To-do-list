import './styles.css';
import { checkBoxEventListener } from './status.js';
import {
  editTaskEventListener, addNewTask, deleteTask, clearAllCompletedTasks, representNewIndexes,
} from './crud.js';

let tasks = [];

const bookList = document.getElementById('bookList');
const input = document.getElementById('task-input');

const getLocalStorageTasks = () => {
  const getData = localStorage.getItem('tasksList');
  if (getData !== undefined) {
    const data = JSON.parse(getData);
    console.log(data);
    if (data) {
      tasks = data;
    } else {
      tasks = [];
    }
  }
};

const pushLocalStorageTasks = (tasks) => {
  localStorage.setItem('tasksList', JSON.stringify(tasks));
};

const sortTasks = (tasksArray) => {
  tasksArray.sort((taskA, taskB) => taskA.index - taskB.index);
};

const populatelist = () => {
  bookList.innerHTML = '';
  if (!tasks) {
    bookList.innerHTML += `
    <li class="list-item" draggable="true">
      <p > No Tasks </p>
    <li>   
    `;
  } else {
    tasks.forEach((tasks) => {
      if (tasks.completed === true) {
        bookList.innerHTML += `
    <li class="list-item" draggable="true">
      <input type="checkbox" class="position-grid-start" id="${tasks.index}" checked/>
      <p contenteditable="true" class="editable"> ${tasks.description} </p>
      <i class="fas fa-ellipsis-v position-grid-end"></i>
      <i id="${tasks.index}" class="fas fa-trash-alt position-grid-end delete-button"></i>
    <li>   
    `;
      } else {
        bookList.innerHTML += `
    <li class="list-item" draggable="true">
    <input type="checkbox" class="position-grid-start" id="${tasks.index}"/>
      <p contenteditable="true" class="editable"> ${tasks.description} </p>
      <i class="fas fa-ellipsis-v position-grid-end"></i>
      <i id="${tasks.index}" class="fas fa-trash-alt position-grid-end delete-button"></i>
    <li>   
    `;
      }
    });
  }
  bookList.innerHTML += '<button id="clear-button" class="clear-button"> Clear All Completed </button>';
  document.querySelector('.delete-button').addEventListener('click', (event) => {
    const { target } = event;
    if (target.classList.value.indexOf('delete') !== -1) {
      const tasksArray = JSON.parse(localStorage.getItem('tasksList'));
      console.log(tasksArray);
      // eslint-disable-next-line max-len
      const index = tasksArray.findIndex((element) => element.index === parseInt(target.id, 10));
      // deleteTask(index, tasksArray);
      // representNewIndexes(tasksArray);
      tasksArray.splice(index, 1);
      console.log(tasksArray);
      localStorage.setItem('tasksList', JSON.stringify(tasksArray));
      // location.reload();
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  getLocalStorageTasks();
  checkBoxEventListener(bookList);
  editTaskEventListener(bookList);
  clearAllCompletedTasks(bookList);
});
document.addEventListener('DOMContentLoaded', populatelist);
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    let newTask;
    if (tasks) {
      newTask = {
        description: input.value,
        completed: false,
        index: tasks.length + 1,
      };
    } else {
      newTask = {
        description: input.value,
        completed: false,
        index: 0,
      };
    }
    console.log(newTask);
    tasks = addNewTask(newTask, tasks);
    console.log(tasks);
    pushLocalStorageTasks(tasks);
    populatelist();
    location.reload();
  }
});

bookList.addEventListener('click', (event) => {
  const { target } = event;
  if (target.classList.value.indexOf('delete') !== -1) {
    const tasksArray = JSON.parse(localStorage.getItem('tasksList'));
    console.log(tasksArray);
    // eslint-disable-next-line max-len
    const index = tasksArray.findIndex((element) => element.index === parseInt(target.id, 10));
    const filteredArray = deleteTask(index, tasksArray);
    representNewIndexes(filteredArray);
    console.log(filteredArray);
    localStorage.setItem('tasksList', JSON.stringify(filteredArray));
    getLocalStorageTasks();
    populatelist();
    // location.reload();
  }
});
