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

export const deleteTask = taskId => ({
  type: 'DELETE_TASK',
  payload: {
    request: {
      url: `/boards/tasks/${taskId}`,
      method: 'DELETE',
    },
  },
})

export const createTasklist = tasklist => ({
  type: 'CREATE_TASKLIST',
  payload: {
    request: {
      url: `/boards/lists/`,
      method: 'POST',
      data: tasklist,
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

export const deleteTasklist = tasklistId => ({
  type: 'DELETE_TASKLIST',
  payload: {
    request: {
      url: `/boards/lists/${tasklistId}`,
      method: 'DELETE',
    },
  },
})
