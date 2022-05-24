import './styles.css';
import { saveToLocalStorage, retrieveFromLocalStorage } from './modules/localStorage.js';
import { addNewTask, deletingTask, editingTask, changeListOrder } from './modules/crud.js';
import { checkBoxEventChange, clearAllCompletedTasks } from './modules/taskStatus.js';
import renderTasks from './modules/display.js';
// import AppEventListeners from './modules/eventListeners.js'

let toDoTasks = [];
const bookList = document.querySelector('#bookList');
const taskInputElement = document.querySelector('#task-input');
const AppEventListeners = (taskInputElement, parentTaskListElement) => {
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
      event.target.value = '';
      renderTasks(toDoTasks, bookList);
    }
  });

  parentTaskListElement.addEventListener('input', (event) => {
    if (event.target.className.includes('editable')) {
      const newTaskArrayWithAddedTask = editingTask(
        toDoTasks, parseInt(event.target.id, 10), event.target.innerHTML,
      );
      toDoTasks = [...newTaskArrayWithAddedTask];
      saveToLocalStorage(toDoTasks);
    }
  });

  parentTaskListElement.addEventListener('click', (event) => {
    if (event.target.className.includes('delete-button')) {
      const newTaskArrayWithDeletedTask = deletingTask(toDoTasks, parseInt(event.target.id, 10));
      toDoTasks = [...newTaskArrayWithDeletedTask];
      saveToLocalStorage(toDoTasks);
      renderTasks(toDoTasks, bookList);
    }

    if (event.target.className.includes('clear-button')) {
      const newTasksCleared = clearAllCompletedTasks(toDoTasks);
      toDoTasks = [...newTasksCleared];
      saveToLocalStorage(toDoTasks);
      renderTasks(toDoTasks, bookList);
    }
  });

  parentTaskListElement.addEventListener('change', (event) => {
    const newTempArray = checkBoxEventChange(toDoTasks, parseInt(event.target.id, 10));
    toDoTasks = [...newTempArray];
    saveToLocalStorage(toDoTasks);
  });

  //implement drag and drop event handlers
  const dragstartHandler = (event) => {
    // Add the target element's id to the data transfer object

    event.dataTransfer.setData('text/plain', event.target.id);
    console.log(event.dataTransfer.getData('text/plain'))
  };

  const dropHandler = (event) => {
    event.preventDefault();
    const initialIndex = event.dataTransfer.getData('text/plain')
    console.log(Number(initialIndex)/10)
    console.log(Number(event.target.id))
    toDoTasks = changeListOrder(toDoTasks, Number(initialIndex) / 10, Number(event.target.id))
    saveToLocalStorage(toDoTasks);
    renderTasks(toDoTasks, bookList);
   };

  parentTaskListElement.addEventListener('dragstart', dragstartHandler);
  parentTaskListElement.addEventListener('drop', dropHandler);
};

window.addEventListener('DOMContentLoaded', () => {
  toDoTasks = retrieveFromLocalStorage();
  renderTasks(toDoTasks, bookList);
  AppEventListeners(taskInputElement, bookList);
});
