import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from './boardsActions'

class Boards extends React.Component {
  componentDidMount() {
    const { getBoards } = this.props
    getBoards()
  }

  render() {
    const { boards, error } = this.props
    if (error) {
      return <div>Failed to fetch the data</div>
    }
    if (boards.length !== 0) {
      return (
        <div>
          {boards.map(board => (
            <div key={board.id}>{board.title}</div>
          ))}
        </div>
      )
    }
    return null
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
  boards: [],
}
