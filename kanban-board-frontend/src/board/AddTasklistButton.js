import React from 'react'
import TasklistTitle from './TasklistTitle'
import './Board.css'

export default class AddTasklistButton extends React.Component {
  constructor() {
    super()
    this.state = {
      editing: false,
    }
    this.handleCreateList = this.handleCreateList.bind(this)
  }

  handleCreateList(title) {
    const { createList } = this.props
    createList(title)
    this.setState({ editing: false })
  }

  render() {
    const { editing } = this.state
    if (!editing) {
      return (
        <>
          <button type="button" onClick={() => this.setState({ editing: true })}>
            Add list
          </button>
        </>
      )
    }
    return <TasklistTitle isFocused updateTitle={this.handleCreateList} className="list-title" />
  }
}
