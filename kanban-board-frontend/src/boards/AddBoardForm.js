import React from 'react'

export default class AddBoardForm extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
    }
  }

  render() {
    const { className, onSubmit } = this.props
    const { title } = this.state
    return (
      <div className={className}>
        <div>
          <p>New board title:</p>
          <input
            type="text"
            value={title}
            onChange={event => this.setState({ title: event.target.value })}
          />
        </div>
        <div>
          <button type="button" onClick={() => onSubmit(title)}>
            add
          </button>
        </div>
      </div>
    )
  }
}
