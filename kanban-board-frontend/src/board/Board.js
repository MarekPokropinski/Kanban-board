import React from 'react'
import autobind from 'class-autobind'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from './boardActions'
import Tasklist from './Tasklist'
import AddTasklistButton from './AddTasklistButton'
import './Board.css'

class Board extends React.Component {
  constructor() {
    super()
    this.state = { newTaskId: null }
    autobind(this)
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

  handleCreateTasklist(title) {
    const { createTasklist, board } = this.props
    createTasklist({ title, board: board.id }).then(this.refresh)
  }

  handleRemoveList(listId) {
    const { deleteTasklist } = this.props
    deleteTasklist(listId).then(this.refresh)
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
              updateTask={this.handleUpdateTask}
              updateTitle={title => this.handleUpdateTasklist({ ...list, title })}
              newTaskId={newTaskId}
              removeTask={this.handleRemoveTask}
              removeList={this.handleRemoveList}
            />
          ))}
          <div className="list">
            <AddTasklistButton createList={this.handleCreateTasklist} />
          </div>
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
