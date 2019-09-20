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
    this.state = {
      displayRemoveBoardForm: false,
      newTaskId: null,
      draggedList: null,
      draggedTask: null,
    }
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

  handleMoveList(listId, destination) {
    const { moveTasklist } = this.props
    moveTasklist(listId, destination).then(this.refresh)
  }

  handleMoveTask(task, listId) {
    const { updateTask } = this.props
    const updatedTask = {
      ...task,
      list_fk: listId,
    }
    updateTask(updatedTask).then(this.refresh)
  }

  handleDeleteBoard() {
    const { board, deleteBoard, history } = this.props
    deleteBoard(board.id).then(() => history.push('/'))
  }

  render() {
    const { board, error } = this.props
    const { newTaskId, draggedList, draggedTask, displayRemoveBoardForm } = this.state

    if (!board) {
      return <div>loading</div>
    }
    if (error) {
      return <div>Failed to fetch the data</div>
    }
    return (
      <div>
        {board.title}
        <button
          onClick={() => this.setState({ displayRemoveBoardForm: true })}
          type="button"
          style={{ float: 'right' }}
        >
          remove board
        </button>
        <div className="container">
          {board.lists.map(list => (
            <Tasklist
              className="list"
              id={list.id}
              title={list.title}
              tasks={list.tasks}
              addTask={task => this.handleAddTask(list.id, task)}
              key={list.id}
              updateTask={this.handleUpdateTask}
              updateTitle={title => this.handleUpdateTasklist({ ...list, title })}
              newTaskId={newTaskId}
              removeTask={this.handleRemoveTask}
              removeList={() => this.handleRemoveList(list.id)}
              order={list.order}
              moveList={this.handleMoveList}
              moveTask={this.handleMoveTask}
              onDragStart={(tasklist, task) =>
                this.setState({ draggedList: tasklist, draggedTask: task })
              }
              onDragEnd={() => this.setState({ draggedList: null, draggedTask: null })}
              draggedList={draggedList}
              draggedTask={draggedTask}
            />
          ))}
          <div className="list" style={{ order: board.lists.length }}>
            <AddTasklistButton createList={this.handleCreateTasklist} />
          </div>
        </div>
        {displayRemoveBoardForm ? (
          <div className="add-form-container">
            <div
              role="button"
              tabIndex={0}
              className="add-form-overlay"
              onClick={() => {
                this.setState({ displayRemoveBoardForm: false })
              }}
            />
            <div className="add-form">
              <div>
                <p>Are you sure you want to remove this board</p>
              </div>
              <div>
                <button className="remove-button" type="button" onClick={this.handleDeleteBoard}>
                  remove
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => this.setState({ displayRemoveBoardForm: false })}
                >
                  cancel
                </button>
              </div>
            </div>
          </div>
        ) : null}
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
