import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from './boardActions'
import Tasklist from './Tasklist'
import './Board.css'

class Board extends React.Component {
  constructor() {
    super()
    this.state = { newTaskId: null }
    this.refresh = this.refresh.bind(this)
    this.handleRemoveTask = this.handleRemoveTask.bind(this)
  }

  componentDidMount() {
    this.refresh()
  }

  refresh() {
    const { getBoard, match } = this.props
    getBoard(match.params.id)
  }

  handleAddTask(listId, task) {
    const { createTask } = this.props
    createTask(listId, task).then(response => {
      this.refresh()
      this.setState({ newTaskId: response.payload.data.id })
    })
  }

  handleRemoveTask(taskId) {
    const { deleteTask } = this.props
    deleteTask(taskId).then(this.refresh)
  }

  handleUpdateTask(task) {
    const { updateTask } = this.props
    updateTask(task).then(this.refresh)
  }

  handleUpdateTasklist(tasklist) {
    const { updateTasklist } = this.props
    updateTasklist(tasklist).then(this.refresh)
  }

  render() {
    const { board, error } = this.props
    const { newTaskId } = this.state

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
              tasks={list.tasks}
              addTask={task => this.handleAddTask(list.id, task)}
              key={list.id}
              updateTask={task => this.handleUpdateTask(task)}
              updateTitle={title => this.handleUpdateTasklist({ ...list, title })}
              newTaskId={newTaskId}
              removeTask={this.handleRemoveTask}
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
