import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from './boardActions'
import Tasklist from './Tasklist'
import './Board.css'

class Board extends React.Component {
  constructor() {
    super()
    this.refresh = this.refresh.bind(this)
  }

  componentDidMount() {
    this.refresh()
  }

  refresh() {
    const { getBoard, match } = this.props
    getBoard(match.params.id)
  }

  handleAddNote(listId, note) {
    const { createNote } = this.props
    createNote(listId, note).then(this.refresh)
  }

  handleUpdateTask(task) {
    const { updateNote } = this.props
    updateNote(task).then(this.refresh)
  }

  render() {
    const { board, error } = this.props
    if (!board) {
      return <div>loading</div>
    }
    if (error) {
      return <div>Failed to fetch the data</div>
    }

    return (
      <div>
        {board.title}
        <div className="container">
          {board.lists.map(list => (
            <Tasklist
              className="list"
              title={list.title}
              tasks={list.notes}
              addNote={note => this.handleAddNote(list.id, note)}
              key={list.id}
              updateTask={task => this.handleUpdateTask(task)}
            />
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    board: state.boardReducer.board,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)

Board.defaultProps = {
  id: null,
}
