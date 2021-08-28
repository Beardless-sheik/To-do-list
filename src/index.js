import './styles.css';
import { checkBoxEventListener, editTaskEventListener } from './status.js';
import Update from './crud.js';

let tasks = [{
  description: 'These are items for Task 1 - index - 2',
  completed: false,
  index: 2,
},
{
  description: 'These are items for Task 2 - index - 1',
  completed: false,
  index: 1,
},
{
  description: 'These are items for Task 3 - index - 3',
  completed: false,
  index: 3,
}];

const bookList = document.getElementById('bookList');
const input = document.getElementById('task-input');

const update = new Update();
const getLocalStorageTasks = () => {
  const getData = localStorage.getItem('TasksList');
  const data = JSON.parse(getData);
  if (data) {
    tasks = data;
  }
};

const pushLocalStorageTasks = () => {
  localStorage.setItem('TasksList', JSON.stringify(tasks));
};

const sortTasks = (tasksArray) => {
  tasksArray.sort((taskA, taskB) => taskA.index - taskB.index);
};

const populatelist = () => {
  sortTasks(tasks);
  bookList.innerHTML = '';
  tasks.forEach((tasks) => {
    if (tasks.completed === true) {
      bookList.innerHTML += `
    <li class="list-item" draggable="true">
    <input type="checkbox" class="position-grid-start" id="${tasks.index}" checked/>
      <p contenteditable="true"> ${tasks.description} </p>
      <i class="fas fa-ellipsis-v position-grid-end"></i>
      <i class="fas fa-trash-alt position-grid-end"></i>
    <li>   
    `;
    } else {
      bookList.innerHTML += `
    <li class="list-item" draggable="true">
    <input type="checkbox" class="position-grid-start" id="${tasks.index}"/>
      <p> ${tasks.description} </p>
      <i class="fas fa-ellipsis-v position-grid-end"></i>
      <i class="fas fa-trash-alt position-grid-end"></i>
    <li>   
    `;
    }
  });
  bookList.innerHTML += '<button class="clear-button"> Clear All Completed </button>';
};

document.addEventListener('DOMContentLoaded', () => {
  getLocalStorageTasks();
  checkBoxEventListener(bookList, tasks);
  editTaskEventListener(bookList, tasks);

  // editBtn.addEventListener('click', () => {

  //   // Toggle contentEditable on button click
  // 	content.contentEditable = !content.isContentEditable;

//   // If disabled, save text
//   if(content.contentEditable === 'false') {
//   	localStorage.setItem('content', content.innerHTML);
//   }
// });
});
document.addEventListener('DOMContentLoaded', populatelist);
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const newTask = {
      description: input.value,
      completed: false,
      index: tasks.length + 1,
    };
    console.log(newTask);
    tasks = update.add(newTask, tasks);
    pushLocalStorageTasks();
    populatelist();
  }
});
