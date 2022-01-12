const checkBoxEventChange = (tasksArray, taskId) => {
  const newArrayWithCheckbox = [...tasksArray];
  const taskIndex = tasksArray.findIndex((element) => element.index === parseInt(taskId, 10));
  tasksArray[taskIndex].completed = !tasksArray[taskIndex].completed;
  console.log(newArrayWithCheckbox);
  return newArrayWithCheckbox;
};

// eslint-disable-next-line import/prefer-default-export
export { checkBoxEventChange };