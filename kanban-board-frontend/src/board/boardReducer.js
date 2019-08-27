export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_BOARD_SUCCESS':
      return { ...state, board: action.payload.data }
    case 'GET_BOARD_FAIL':
      return { ...state, board: [], error: true }
    default:
      return state
  }
}
