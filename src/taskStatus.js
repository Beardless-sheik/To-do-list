const checkBoxEventChange = (tasksArray, taskId) => {
  const newArrayWithCheckbox = [...tasksArray];
  const taskIndex = tasksArray.findIndex((element) => element.index === parseInt(taskId, 10));
  tasksArray[taskIndex].completed = !tasksArray[taskIndex].completed;
  return newArrayWithCheckbox;
};

const clearAllCompletedTasks = (tasksArray) => {
  const filteredArray = tasksArray.filter((element) => element.completed === false);
  filteredArray.forEach((task, index) => {
    const tempIndex = Number(index + 1);
    task.index = tempIndex;
  });
  return filteredArray;
};

// eslint-disable-next-line import/prefer-default-export
export { checkBoxEventChange, clearAllCompletedTasks };