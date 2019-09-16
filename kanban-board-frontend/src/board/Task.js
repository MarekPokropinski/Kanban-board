/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react'
import autobind from 'class-autobind'
import './Board.css'

export default class Task extends React.Component {
  constructor(props) {
    super(props)
    const { task, isFocused } = this.props
    this.state = {
      editing: isFocused,
      value: task.title,
    }
    this.inputRef = React.createRef()
    autobind(this)
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentDidUpdate() {
    const { editing } = this.state
    if (editing) {
      this.inputRef.current.focus()
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  handleOnClick() {
    const { task } = this.props
    this.setState({ editing: true, value: task.title })
    this.inputRef.current.focus()
  }

  handleClickOutside(event) {
    const { editing, value } = this.state
    const { task, updateTask } = this.props
    if (!this.inputRef.current.contains(event.target)) {
      if (editing) {
        // Task is unfocused
        this.setState({ editing: false })
        if (task.title !== value || task.value === undefined) {
          // if value changed, send request to server
          updateTask({ ...task, title: value })
        }
      }
    }
  }

  render() {
    const { className, task, onRemove } = this.props
    const { editing, value } = this.state

    return (
      <div className={className}>
        <input
          className="list-input"
          ref={this.inputRef}
          value={value}
          onChange={event => this.setState({ value: event.target.value })}
          hidden={!editing}
          type="text"
          autoFocus
        />
        <div className="list-textbox">
          <div className="list-text" role="button" onClick={this.handleOnClick} hidden={editing}>
            {task.title}
          </div>
          <div role="button" className="list-removebutton" onClick={onRemove} hidden={editing}>
            x
          </div>
        </div>
      </div>
    )
  }
}
