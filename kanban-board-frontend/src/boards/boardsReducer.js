export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_BOARDS_SUCCESS':
      return { ...state, boards: action.payload.data }
    case 'GET_BOARDS_FAIL':
      return { ...state, boards: [], error: true }
    default:
      return state
  }
}
