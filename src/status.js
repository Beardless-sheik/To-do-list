function checkBoxEventListener(parentCheckBoxContainer, tasksArray) {
  parentCheckBoxContainer.addEventListener('change', (event) => {
    const { target } = event;
    const index = tasksArray.findIndex((element) => element.index === parseInt(target.id, 10));
    tasksArray[index].completed = !tasksArray[index].completed;
    localStorage.setItem('TasksList', JSON.stringify(tasksArray));
  });
}

function editTaskEventListener(parentCheckBoxContainer, tasksArray) {
  parentCheckBoxContainer.addEventListener('click', (event) => {
    const { target } = event;
    const descriptionText = target.previousElementSibling;
    // Toggle contentEditable on button click
   	descriptionText.contentEditable = !descriptionText.isContentEditable;

    // If disabled, save text
   if(descriptionText.contentEditable === 'false') {
   	// localStorage.setItem('content', content.innerHTML);
     console.log(descriptionText.id);
   } 
  });
}

export { checkBoxEventListener, editTaskEventListener};