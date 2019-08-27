import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from './boardsActions'
import BoardButton from './BoardButton'
import AddBoardForm from './AddBoardForm'
import './Boards.css'

class Boards extends React.Component {
  state = {
    showForm: false,
  }

  componentDidMount() {
    this.refresh()
  }

  refresh() {
    const { getBoards } = this.props
    getBoards()
  }

  handleBoardClick(id) {
    this.props.history.push('/' + id)
  }

  handleAddBoard(title) {
    const { addBoard } = this.props
    addBoard(title).then(() => {
      this.setState({ showForm: false })
      this.refresh()
    })
  }

  render() {
    let { boards, error } = this.props
    if (error) {
      return <div>Failed to fetch the data</div>
    }
    if (!boards) {
      return <div>Fetching data</div>
    }

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
        {this.state.showForm ? (
          <div className="add-form-container">
            <div
              className="add-form-overlay"
              onClick={() => {
                this.setState({ showForm: false })
              }}
            />
            <AddBoardForm onSubmit={this.handleAddBoard.bind(this)} className="add-form" />
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
