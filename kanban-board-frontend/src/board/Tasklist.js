import React from 'react'
import Task from './Task'
import './Board.css'

export default function Tasklist(props) {
  const { title, tasks, addNote, className } = props
  return (
    <div className={className}>
      <div className="list-title">{title}</div>
      <div>
        {tasks.map(task => (
          <Task
            className="list-item"
            key={task.id}
            title={task.title}
            description={task.description}
          />
        ))}
      </div>
      <button onClick={() => addNote({ title: 'test', description: '' })} type="button">
        Add new note
      </button>
    </div>
  )
}
