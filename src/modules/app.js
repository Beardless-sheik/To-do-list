import { saveToLocalStorage } from './localStorage.js';
import {
  addNewTask, deletingTask, editingTask, changeListOrder,
} from './crud.js';
import { checkBoxEventChange, clearAllCompletedTasks } from './taskStatus.js';
import renderTasks from './display.js';

const AppEventListeners = (taskInputElement, parentTaskListElement, toDoTasks) => {
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
      renderTasks(toDoTasks, parentTaskListElement);
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
      renderTasks(toDoTasks, parentTaskListElement);
    }

    if (event.target.className.includes('clear-button')) {
      const newTasksCleared = clearAllCompletedTasks(toDoTasks);
      toDoTasks = [...newTasksCleared];
      saveToLocalStorage(toDoTasks);
      renderTasks(toDoTasks, parentTaskListElement);
    }
  });

  parentTaskListElement.addEventListener('change', (event) => {
    const newTempArray = checkBoxEventChange(toDoTasks, parseInt(event.target.id, 10));
    toDoTasks = [...newTempArray];
    saveToLocalStorage(toDoTasks);
  });

  // implement drag and drop event handlers
  const dragstartHandler = (event) => {
    event.dataTransfer.setData('text/plain', event.target.id);
  };

  const dropHandler = (event) => {
    event.preventDefault();
    const initialIndex = event.dataTransfer.getData('text/plain');
    toDoTasks = changeListOrder(toDoTasks, Number(initialIndex) / 10, Number(event.target.id));
    saveToLocalStorage(toDoTasks);
    renderTasks(toDoTasks, parentTaskListElement);
  };

  parentTaskListElement.addEventListener('dragstart', dragstartHandler);
  parentTaskListElement.addEventListener('drop', dropHandler);
};

export default AppEventListeners;