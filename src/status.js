export default function checkBoxEventListener(parentCheckBoxContainer, tasksArray) {
  parentCheckBoxContainer.addEventListener('change', (event) => {
    const { target } = event;
    const index = tasksArray.findIndex((element) => element.index === parseInt(target.id, 10));
    tasksArray[index].completed = !tasksArray[index].completed;
    localStorage.setItem('TasksList', JSON.stringify(tasksArray));
    console.log(tasksArray);
  });
}