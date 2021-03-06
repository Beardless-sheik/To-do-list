import { addNewTask, deletingTask } from '../modules/crud.js';

describe('tests to run for add function', () => {
  const taskArray = [];

  test('check length of task array after adding a new task', () => {
    expect(
      addNewTask(taskArray, {
        description: 'test description 1',
        completed: false,
        index: 1,
      }).length,
    ).toBe(1);
  });

  test('check whether description added to the array is a string', () => {
    expect(
      typeof addNewTask(taskArray, {
        description: 'test description 1',
        completed: false,
        index: 1,
      })[0].description,
    ).toBe('string');
  });
});

describe('tests to run for delete function', () => {
  const taskArray = [
    {
      description: 'test description 1',
      completed: false,
      index: 1,
    },
    {
      description: 'test description 2',
      completed: false,
      index: 2,
    },
  ];

  test('check if length of array will be reduced by 1 after deletion', () => {
    expect(deletingTask(taskArray, 1).length).toBe(1);
  });

  test('check if length of array after removing last task will be zero', () => {
    expect(deletingTask(taskArray, 1).length).toBe(0);
  });
});