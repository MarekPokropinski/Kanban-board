import React from 'react'
import Task from './Task'
import TasklistTitle from './TasklistTitle'
import './Board.css'

export default function Tasklist(props) {
  const { title, tasks, addTask, className, updateTask, updateTitle } = props
  return (
    <div className={className}>
      <TasklistTitle className="list-title" updateTitle={updateTitle} value={title} />
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
