const sortTasks = (toDoTasks) => {
  const sortedArray = [...toDoTasks];
  sortedArray.sort((a, b) => a.index - b.index);
  return sortedArray;
};

const renderTasks = (toDoTasks, parentRenderElement) => {
  parentRenderElement.innerHTML = '';
  const sortedTasks = sortTasks(toDoTasks);
  if (!sortedTasks) {
    parentRenderElement.innerHTML += `
    <li class="list-item" draggable="true">
      <p > No Tasks </p>
    <li>   
    `;
  } else {
    sortedTasks.forEach((tasks) => {
      if (tasks.completed === true) {
        parentRenderElement.innerHTML += `
    <li class="list-item" draggable="true">
      <input type="checkbox" class="position-grid-start" id="${tasks.index}" checked/>
      <p contenteditable="true" class="editable"> ${tasks.description} </p>
      <i id="${tasks.index}" class="fas fa-trash-alt position-grid-end delete-button"></i>
    <li>   
    `;
      } else {
        parentRenderElement.innerHTML += `
    <li class="list-item" draggable="true">
    <input type="checkbox" class="position-grid-start" id="${tasks.index}"/>
      <p contenteditable="true" class="editable" id="${tasks.index}"> ${tasks.description} </p>
      <i id="${tasks.index}" class="fas fa-trash-alt position-grid-end delete-button"></i>
    <li>   
    `;
      }
    });
  }
  parentRenderElement.innerHTML += '<button id="clear-button" class="clear-button"> Clear All Completed </button>';
};

export { sortTasks, renderTasks };