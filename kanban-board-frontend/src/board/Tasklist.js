import React from 'react'
import Task from './Task'
import './Board.css'

export default function Tasklist(props) {
  const { title, tasks, addNote, className, updateTask } = props
  return (
    <div className={className}>
      <div className="list-title">{title}</div>
      <div>
        {tasks.map(task => (
          <Task className="list-item" updateTask={updateTask} key={task.id} task={task} />
        ))}
      </div>
      <button onClick={() => addNote({ title: 'test', description: '' })} type="button">
        Add new note
      </button>
    </div>
  )
}
