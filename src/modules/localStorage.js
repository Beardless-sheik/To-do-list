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

export { saveToLocalStorage, retrieveFromLocalStorage };