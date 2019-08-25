export const getBoard = id => ({
  type: 'GET_BOARD',
  payload: {
    request: {
      url: `/boards/${id}`,
    },
  },
})
