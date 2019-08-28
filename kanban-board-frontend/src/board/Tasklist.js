import React from 'react'
import Task from './Task'
import './Board.css'

export default function Tasklist(props) {
  const { title, tasks, addTask, className, updateTask } = props
  return (
    <div className={className}>
      <div className="list-title">{title}</div>
      <div>
        {tasks.map(task => (
          <Task className="list-item" updateTask={updateTask} key={task.id} task={task} />
        ))}
      </div>
      <button onClick={() => addTask({ title: 'test' })} type="button">
        Add new task
      </button>
    </div>
  )
}
