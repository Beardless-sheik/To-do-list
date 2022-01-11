const addNewTask = (tasksArray, newTask) => {
  const newTaskArray = [...tasksArray, newTask];
  console.log(newTaskArray);
  return newTaskArray;
};

const deletingTask = (tasksArray, deletedTaskIndex) => {
  const newTaskArray = tasksArray.filter((task) => task.index !== deletedTaskIndex);
  newTaskArray.forEach((task, index) => {
    const tempIndex = Number(index + 1);
    task.index = tempIndex;
  });
  console.log(newTaskArray);
  return newTaskArray;
};

export { addNewTask, deletingTask };