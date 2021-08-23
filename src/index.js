import './styles.css';

const tasks = [{
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

const sortTasks = (tasksArray) => {
  tasksArray.sort((taskA, taskB) => taskA.index - taskB.index);
};

const populatelist = () => {
  sortTasks(tasks);
  bookList.innerHTML = '';
  tasks.forEach((tasks) => {
    bookList.innerHTML += `
    <li class="list-item">
      <i class="far fa-square position-grid-start"></i>
      <p> ${tasks.description} </p>
      <i class="fas fa-ellipsis-v position-grid-end"></i>
    <li>   
    `;
  });
  bookList.innerHTML += '<button class="clear-button"> Clear All Completed </button>';
  return 0;
};

document.addEventListener('DOMContentLoaded', populatelist);