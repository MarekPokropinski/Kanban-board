/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from './boardsActions'
import BoardButton from './BoardButton'
import AddBoardForm from './AddBoardForm'
import './Boards.css'

class Boards extends React.Component {
  constructor() {
    super()
    this.state = {
      showForm: false,
    }
    this.handleAddBoard = this.handleAddBoard.bind(this)
    this.handleBoardClick = this.handleBoardClick.bind(this)
  }

  componentDidMount() {
    this.refresh()
  }

  refresh() {
    const { getBoards } = this.props
    getBoards()
  }

  handleBoardClick(id) {
    const { history } = this.props
    history.push(`/${id}`)
  }

  handleAddBoard(title) {
    const { addBoard } = this.props
    addBoard(title).then(() => {
      this.setState({ showForm: false })
      this.refresh()
    })
  }

  render() {
    const { boards, error } = this.props
    if (error) {
      return <div>Failed to fetch the data</div>
    }
    if (!boards) {
      return <div>Fetching data</div>
    }
    const { showForm } = this.state
    return (
      <div>
        <header className="header">Boards</header>
        <div className="boards">
          {boards.map(board => (
            <BoardButton
              onClick={() => this.handleBoardClick(board.id)}
              key={board.id}
              title={board.title}
              className="board"
            />
          ))}
          <BoardButton
            color="secondary"
            onClick={() => {
              this.setState({ showForm: true })
            }}
            title="+ Add new"
            className="board add-new"
          />
        </div>
        {showForm ? (
          <div className="add-form-container">
            <div
              role="button"
              tabIndex={0}
              className="add-form-overlay"
              onClick={() => {
                this.setState({ showForm: false })
              }}
            />
            <AddBoardForm onSubmit={this.handleAddBoard} className="add-form" />
          </div>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    boards: state.boardsReducer.boards,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Boards)

Boards.defaultProps = {
  boards: null,
}
