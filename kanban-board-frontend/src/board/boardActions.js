export const getBoard = id => ({
  type: 'GET_BOARD',
  payload: {
    request: {
      url: `/boards/${id}`,
    },
  },
})

export const createTask = (listId, task) => ({
  type: 'CREATE_TASK',
  payload: {
    request: {
      url: `/boards/tasks/`,
      method: 'POST',
      data: { ...task, list_fk: listId },
    },
  },
})

export const updateTask = task => ({
  type: 'UPDATE_TASK',
  payload: {
    request: {
      url: `/boards/tasks/${task.id}`,
      method: 'PUT',
      data: task,
    },
  },
})

export const updateTasklist = tasklist => ({
  type: 'UPDATE_TASKLIST',
  payload: {
    request: {
      url: `/boards/lists/${tasklist.id}`,
      method: 'PUT',
      data: tasklist,
    },
  },
})
