/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import Task from './Task'
import './Board.css'

export default function TasklistTitle(props) {
  const { isFocused, className, updateTitle, value, onRemove } = props
  return (
    <Task
      isFocused={isFocused}
      className={className}
      updateTask={tasklist => updateTitle(tasklist.title)}
      task={{ title: value }}
      onRemove={onRemove}
    />
  )
}
