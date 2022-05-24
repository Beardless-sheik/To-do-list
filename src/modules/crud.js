const addNewTask = (tasksArray, newTask) => {
  const newTaskArray = [...tasksArray, newTask];
  return newTaskArray;
};

const deletingTask = (tasksArray, deletedTaskIndex) => {
  const newTaskArray = tasksArray.filter((task) => task.index !== deletedTaskIndex);
  newTaskArray.forEach((task, index) => {
    const tempIndex = Number(index + 1);
    task.index = tempIndex;
  });
  return newTaskArray;
};

const editingTask = (tasksArray, editTaskIndex, editedTaskDescription) => {
  const newTaskArray = tasksArray.map((task) => {
    if (task.index === editTaskIndex) {
      task.description = editedTaskDescription;
    }
    return task;
  });
  return newTaskArray;
};

const changeListOrder = (tasksArray, initialTaskIndex, movingTaskIndex) => {
  const newTaskArray = [...tasksArray];
  console.log(newTaskArray);
  const initialArrayIndex = newTaskArray.findIndex((element) => element.index === initialTaskIndex);
  const movingArrayIndex = newTaskArray.findIndex((element) => element.index === movingTaskIndex);
  const tempTask = newTaskArray[initialArrayIndex];
  tempTask.index = movingTaskIndex;
  const tempTaskTwo = newTaskArray[movingArrayIndex];
  tempTaskTwo.index = initialTaskIndex;
  newTaskArray[initialArrayIndex] = tempTaskTwo;
  newTaskArray[movingArrayIndex] = tempTask;
  console.log(newTaskArray)
  return newTaskArray;
};

export {
  addNewTask, deletingTask, editingTask, changeListOrder,
};