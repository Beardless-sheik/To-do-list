function editTaskEventListener(parentCheckBoxContainer) {
  parentCheckBoxContainer.addEventListener('input', (event) => {
    const { target } = event;
    if (target.classList.value.indexOf('editable') !== -1) {
      const tasksArray = JSON.parse(localStorage.getItem('tasksList'));
      const inputWithId = target.previousElementSibling;
      // eslint-disable-next-line max-len
      const index = tasksArray.findIndex((element) => element.index === parseInt(inputWithId.id, 10));
      tasksArray[index].description = target.innerHTML;
      localStorage.setItem('tasksList', JSON.stringify(tasksArray));
    }
  });
}

const representNewIndexes = (tasksArray) => {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < tasksArray.length; i++) {
    tasksArray[i].index = i;
  }
};

const addNewTask = (newTask, incomingTasks) => {
  let newTaskArray;
  if (incomingTasks) {
    newTaskArray = [...incomingTasks, newTask];
  } else {
    newTaskArray.push(newTask);
  }
  representNewIndexes(newTaskArray);
  return newTaskArray;
};

const deleteTask = (index, tasksArray) => {
  const filteredArray = tasksArray.filter((element) => element.index !== index);
  return filteredArray;
};

const clearAllCompletedTasks = (completedButtonElement) => {
  completedButtonElement.addEventListener('click', (event) => {
    if (event.target.id === 'clear-button') {
      const tasksArray = JSON.parse(localStorage.getItem('tasksList'));
      const filteredArray = tasksArray.filter((element) => element.completed === false);
      representNewIndexes(filteredArray);
      localStorage.setItem('tasksList', JSON.stringify(filteredArray));
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }
  });
};

export {
  editTaskEventListener, addNewTask, deleteTask, clearAllCompletedTasks, representNewIndexes,
};