/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import './Board.css'

export default class TasklistTitle extends React.Component {
  constructor(props) {
    super(props)
    const { value, focus } = props
    this.state = {
      editing: focus,
      newValue: value,
    }
    this.inputRef = React.createRef()
    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  handleOnClick() {
    const { value } = this.props
    this.setState({ editing: true, newValue: value })
    this.inputRef.current.focus()
  }

  handleClickOutside(event) {
    const { editing, newValue } = this.state
    const { value, updateTitle } = this.props
    if (!this.inputRef.current.contains(event.target)) {
      if (editing) {
        // Title is unfocused
        this.setState({ editing: false })
        if (newValue !== value || value === undefined) {
          // if value changed, send request to server
          updateTitle(newValue)
        }
      }
    }
  }

  render() {
    const { className, value } = this.props
    const { editing, newValue } = this.state
    return (
      <div className={className}>
        <input
          className="list-input"
          ref={this.inputRef}
          value={newValue}
          onChange={event => this.setState({ newValue: event.target.value })}
          hidden={!editing}
        />
        <div role="button" onClick={this.handleOnClick} hidden={editing}>
          {value}
        </div>
      </div>
    )
  }
}
