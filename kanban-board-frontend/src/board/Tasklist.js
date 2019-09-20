import React from 'react'
import Task from './Task'
import TasklistTitle from './TasklistTitle'
import './Board.css'

export default class Tasklist extends React.Component {
  constructor() {
    super()
    this.state = { draggedOver: false }
  }

  handleOnDrop(order, listId, droppedList, droppedTask) {
    const { moveList, moveTask } = this.props

    this.setState({ draggedOver: false })
    if (droppedList !== null) {
      const obj = droppedList
      const destination = order
      if (destination === obj.order) {
        return
      }

      moveList(obj.id, destination)
    } else if (droppedTask !== null) {
      moveTask(droppedTask, listId)
    }
  }

  render() {
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
      onDragStart,
      onDragEnd,
      draggedList,
      draggedTask,
    } = this.props
    const { draggedOver } = this.state
    let dropPlaceStyle = {}
    if (draggedOver && draggedList !== null) {
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
          onDragStart({ id, order }, null)
        }}
        onDragEnd={onDragEnd}
        onDragEnter={event => {
          event.preventDefault()
          this.setState({ draggedOver: draggedOver + 1 })
        }}
        onDragOver={event => event.preventDefault()}
        onDragLeave={() => this.setState({ draggedOver: draggedOver - 1 })}
        onDrop={() => this.handleOnDrop(order, id, draggedList, draggedTask)}
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
                  onDragStart={e => {
                    e.stopPropagation()
                    onDragStart(null, task)
                  }}
                  onDragEnd={onDragEnd}
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
}
