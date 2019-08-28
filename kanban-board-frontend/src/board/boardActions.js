export const getBoard = id => ({
  type: 'GET_BOARD',
  payload: {
    request: {
      url: `/boards/${id}`,
    },
  },
})

export const createNote = (listId, note) => ({
  type: 'CREATE_NOTE',
  payload: {
    request: {
      url: `/boards/notes/`,
      method: 'POST',
      data: { ...note, list_fk: listId },
    },
  },
})

export const updateNote = task => ({
  type: 'UPDATE_NOTE',
  payload: {
    request: {
      url: `/boards/notes/${task.id}`,
      method: 'PUT',
      data: task,
    },
  },
})
