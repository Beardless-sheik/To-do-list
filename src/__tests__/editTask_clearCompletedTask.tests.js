import { editingTask } from '../modules/crud.js';
import { checkBoxEventChange, clearAllCompletedTasks } from '../modules/taskStatus.js';

describe('tests for task editing', () => {
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

  test('check if task is editable', () => {
    const editTaskDescription = 'New description 2';
    const task = editingTask(taskArray, 2, editTaskDescription);
    expect(task[1].description).toMatch('New description 2');
  });
});

describe('tests for updating an items completed status', () => {
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

  test('check if task number 2 item completed status has changed', () => {
    const filteredArray = checkBoxEventChange(taskArray, 2);
    expect(filteredArray[1].completed).toBe(true);
  });
});

describe('tests for "clear all completed task" function', () => {
  const taskArray = [
    {
      description: 'test description 1',
      completed: true,
      index: 1,
    },
    {
      description: 'test description 2',
      completed: false,
      index: 2,
    },
    {
      description: 'test description 3',
      completed: true,
      index: 3,
    },
  ];

  test('check if after removing all true tasks that the returned arry will only have one element left', () => {
    const filteredArray = clearAllCompletedTasks(taskArray);
    expect(filteredArray.length).toBe(1);
  });
});
