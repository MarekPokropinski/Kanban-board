import React from 'react'

export default class extends React.Component {
  state = {
    title: '',
  }
  render() {
    const { ...divprops } = this.props
    return (
      <div {...divprops}>
        <div>
          <p>New board title:</p>
          <input
            type="text"
            value={this.state.title}
            onChange={event => this.setState({ title: event.target.value })}
          />
        </div>
        <div>
          <button onClick={() => this.props.onSubmit(this.state.title)}>add</button>
        </div>
      </div>
    )
  }
}
