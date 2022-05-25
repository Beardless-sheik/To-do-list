import './styles.css';
import { retrieveFromLocalStorage } from './modules/localStorage.js';
import renderTasks from './modules/display.js';
import AppEventListeners from './modules/app.js';

let toDoTasks = [];
const bookList = document.querySelector('#bookList');
const taskInputElement = document.querySelector('#task-input');

window.addEventListener('DOMContentLoaded', () => {
  toDoTasks = retrieveFromLocalStorage();
  renderTasks(toDoTasks, bookList);
  AppEventListeners(taskInputElement, bookList, toDoTasks);
});
