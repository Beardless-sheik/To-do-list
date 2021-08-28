class Update {
  constructor() {

  }

  add(task, taskArray) {
    taskArray = [...taskArray, task];
    console.log(task);
    return taskArray;
  }
}

export default Update;