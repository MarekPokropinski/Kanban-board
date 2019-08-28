/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import './Board.css'

export default class Task extends React.Component {
  constructor(props) {
    super(props)
    const { title } = this.props
    this.state = {
      editing: false,
      value: title,
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
    this.setState({ editing: true })
    this.inputRef.current.focus()
  }

  handleClickOutside(event) {
    if (!this.inputRef.current.contains(event.target)) {
      this.setState({ editing: false })
    }
  }

  render() {
    const { className } = this.props
    const { editing, value } = this.state
    return (
      <div className={className}>
        {/* {editing ? (
          <input
            ref={this.inputRef}
            value={value}
            onChange={event => this.setState({ value: event.target.value })}
          />
        ) : (
          <div>{value}</div>
        )} */}
        <input
          ref={this.inputRef}
          value={value}
          onChange={event => this.setState({ value: event.target.value })}
          hidden={!editing}
        />
        <div role="button" onClick={this.handleOnClick} hidden={editing}>
          {value}
        </div>
      </div>
    )
  }
}
