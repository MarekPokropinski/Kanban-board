export const getBoards = () => ({
  type: 'GET_BOARDS',
  payload: {
    request: {
      url: '/boards',
    },
  },
})
