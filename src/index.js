import './styles.css';

const bookList = document.querySelector('#bookList');
const toDoTasks = [
  {
    description: 'This is Task number 1',
    completed: false,
    index: 3,
  },
  {
    description: 'This is Task number 2',
    completed: true,
    index: 4,
  },
  {
    description: 'This is Task number 3',
    completed: false,
    index: 2,
  },
  {
    description: 'This is Task number 4',
    completed: false,
    index: 5,
  },
  {
    description: 'This is Task number 5',
    completed: true,
    index: 1,
  },
];

const sortTasks = (toDoTasks) => {
  const sortedArray = [...toDoTasks];
  sortedArray.sort((a, b) => a.index - b.index);
  return sortedArray;
};

const renderTasks = (toDoTasks) => {
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
};

renderTasks(toDoTasks);