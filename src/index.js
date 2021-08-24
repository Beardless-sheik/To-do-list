import './styles.css';
import checkBoxEventListener from './status.js';

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

const getLocalStorageTasks = () => {
  const getData = localStorage.getItem('TasksList');
  const data = JSON.parse(getData);
  if (data) {
    tasks = data;
  }
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
    <li class="list-item">
    <input type="checkbox" class="position-grid-start" id="${tasks.index}" checked/>
      <p> ${tasks.description} </p>
      <i class="fas fa-ellipsis-v position-grid-end"></i>
    <li>   
    `;
    } else {
      bookList.innerHTML += `
    <li class="list-item">
    <input type="checkbox" class="position-grid-start" id="${tasks.index}"/>
      <p> ${tasks.description} </p>
      <i class="fas fa-ellipsis-v position-grid-end"></i>
    <li>   
    `;
    }
  });
  bookList.innerHTML += '<button class="clear-button"> Clear All Completed </button>';
};

document.addEventListener('DOMContentLoaded', () => {
  getLocalStorageTasks();
  checkBoxEventListener(bookList, tasks);
});
document.addEventListener('DOMContentLoaded', populatelist);
