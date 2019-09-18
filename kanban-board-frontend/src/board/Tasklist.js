import React, { useState } from 'react'
import Task from './Task'
import TasklistTitle from './TasklistTitle'
import './Board.css'

function handleOnDragOver(event) {
  event.preventDefault()
}
function handleOnDragLeave(event, setState) {
  setState({ draggedOver: false })
}

function handleOnDrop(event, setState, onMoveTasklist, order, dropped) {
  setState({ draggedOver: false })
  const obj = dropped
  const destination = order
  if (destination === obj.order) {
    return
  }

  onMoveTasklist(obj.id, destination)
}

export default function Tasklist(props) {
  const {
    id,
    title,
    tasks,
    order,
    addTask,
    className,
    updateTask,
    updateTitle,
    newTaskId,
    removeTask,
    removeList,
    moveList,
    onDrag,
    draggedList,
  } = props
  const [state, setState] = useState({ draggedOver: false })
  const { draggedOver } = state
  let dropPlaceStyle = {}
  if (draggedOver) {
    if (draggedList.order > order) {
      dropPlaceStyle = {
        borderLeftColor: 'grey',
        borderLeftWidth: 3,
        borderLeftStyle: 'solid',
      }
    } else if (draggedList.order < order) {
      dropPlaceStyle = {
        borderRightColor: 'grey',
        borderRightWidth: 3,
        borderRightStyle: 'solid',
      }
    }
  }
  return (
    <div
      style={{
        height: '80vh',
        order,
      }}
      draggable
      onDragStart={() => {
        onDrag({ id, order })
      }}
      onDragEnter={event => {
        event.preventDefault()
        setState({ draggedOver: true })
      }}
      onDragOver={event => handleOnDragOver(event, setState)}
      onDragLeave={event => handleOnDragLeave(event, setState)}
      onDrop={event => handleOnDrop(event, setState, moveList, order, draggedList)}
    >
      <div style={{ ...dropPlaceStyle, float: 'left' }}>
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
                draggable
              />
            ))}
          </div>
          <button onClick={() => addTask({ title: 'new task' })} type="button">
            Add new task
          </button>
        </div>
      </div>
    </div>
  )
}
