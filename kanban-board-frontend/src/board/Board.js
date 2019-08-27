import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from './boardActions'

class Board extends React.Component {
  componentDidMount() {
    const { getBoard, match } = this.props

    getBoard(match.params.id)
  }

  render() {
    const { board, error } = this.props
    if (!board) {
      return <div>loading</div>
    }
    if (error) {
      return <div>Failed to fetch the data</div>
    }
    console.log(board)

    return <div>{board.title}</div>
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
