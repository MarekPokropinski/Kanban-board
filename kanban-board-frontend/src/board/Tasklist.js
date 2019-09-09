import React from 'react'
import Task from './Task'
import TasklistTitle from './TasklistTitle'
import './Board.css'

export default function Tasklist(props) {
  const {
    title,
    tasks,
    addTask,
    className,
    updateTask,
    updateTitle,
    newTaskId,
    removeTask,
    removeList,
  } = props
  return (
    <div className={className}>
      <TasklistTitle
        className="list-title"
        updateTitle={updateTitle}
        onRemove={removeList}
        value={title}
      />
      <div>
        {tasks.map(task => (
          <Task
            isFocused={newTaskId === task.id}
            className="list-item"
            updateTask={updateTask}
            key={task.id}
            task={task}
            onRemove={() => removeTask(task.id)}
          />
        ))}
      </div>
      <button onClick={() => addTask({ title: 'new task' })} type="button">
        Add new task
      </button>
    </div>
  )
}
