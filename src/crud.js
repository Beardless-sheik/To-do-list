const addNewTask = (tasksArray, newTask) => {
  const newTaskArray = [...tasksArray, newTask];
  return newTaskArray;
}

const deletingTask = (tasksArray, deletedTaskIndex) => {
  const newTaskArray = tasksArray.filter((task) => task.index !== deletedTaskIndex);
  console.log(newTaskArray);
  return newTaskArray;
}

export {addNewTask, deletingTask};