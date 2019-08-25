import { combineReducers } from 'redux'
import boardsReducer from '../boards/boardsReducer'
import boardReducer from '../board/boardReducer'

export default combineReducers({
  boardsReducer,
  boardReducer,
})
