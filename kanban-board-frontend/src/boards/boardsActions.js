export const getBoards = () => ({
  type: 'GET_BOARDS',
  payload: {
    request: {
      url: '/boards',
    },
  },
})
export const addBoard = title => ({
  type: 'ADD_BOARD',
  payload: {
    request: {
      url: '/boards/',
      method: 'post',
      data: {
        title,
      },
    },
  },
})
