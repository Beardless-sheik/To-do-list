function checkBoxEventListener(parentCheckBoxContainer) {
  const tasksArray = JSON.parse(localStorage.getItem('tasksList'));
  parentCheckBoxContainer.addEventListener('change', (event) => {
    const { target } = event;
    const index = tasksArray.findIndex((element) => element.index === parseInt(target.id, 10));
    tasksArray[index].completed = !tasksArray[index].completed;
    localStorage.setItem('tasksList', JSON.stringify(tasksArray));
  });
}

// eslint-disable-next-line import/prefer-default-export
export { checkBoxEventListener };