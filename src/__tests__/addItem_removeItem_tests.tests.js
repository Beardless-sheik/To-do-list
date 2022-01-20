import {addNewTask, deletingTask} from '../crud.js';

describe('tests to run for add function', ()=> {
  const taskArray = [];

  test('check length of task array after adding a new task', () => {
    expect(addNewTask(taskArray, {
      description: 'test description 1',
      completed: false,
      index: 1,
    }).length).toBe(1);
  });

  test('check whether description added to the array is a string', () => {
    expect(typeof addNewTask(taskArray, {
      description: 'test description 1',
      completed: false,
      index: 1,
    })[0].description).toBe('string');
  });
});