import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import classes from './TaskItem.module.css'

const TaskItem = (props) => {
  const [errorMessage, setErrorMessage] = useState('')

  const authToken = useSelector((state) => {
    return state.auth.authToken
  })

  const deleteTaskHandler = (event) => {
    event.preventDefault()

    const deleteTask = async () => {
      const response = await fetch(`http://localhost:5000/tasks/${props.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })

      const data = await response.json()

      if (!data.error) {
        const fetchData = async () => {
          const response = await fetch('http://localhost:5000/tasks', {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          })

          const data = await response.json()

          if (!data.error) {
            const tasksFetched = data.result
            props.fetchedTasksAfterDeletion(tasksFetched)
          } else {
            setErrorMessage('Unable to fetch')
          }

          console.log(data)
        }

        fetchData().catch((error) => {
          console.log(error)
        })
      } else {
        setErrorMessage('Unable to delete task')
      }

      console.log(data)
    }

    deleteTask().catch((error) => {
      console.log(error)
    })
  }

  const editTaskHandler = (event) => {
    event.preventDefault()
    props.openModal(props.id)
  }

  const completedStatusHandler = (event) => {
    event.preventDefault()

    const sendCompletedStatus = async () => {
      const response = await fetch(`http://localhost:5000/tasks/${props.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          completed: !props.completed,
        }),
      })

      const data = await response.json()

      if (!data.error) {
        const fetchData = async () => {
          const response = await fetch('http://localhost:5000/tasks', {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          })

          const data = await response.json()

          if (!data.error) {
            const tasksFetched = data.result
            props.fetchedTasksAfterCompletedStatusChanged(tasksFetched)
          } else {
            setErrorMessage('Unable to fetch')
          }

          console.log(data)
        }

        fetchData().catch((error) => {
          console.log(error)
        })
      } else {
        setErrorMessage('Unable to update')
      }

      console.log(data)
    }

    sendCompletedStatus().catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className={classes['main-content']}>
      <h3>
        <input
          type="checkbox"
          checked={props.completed}
          onClick={completedStatusHandler}
        />
        {props.title}
      </h3>
      <button className={classes['edit-button']} onClick={editTaskHandler}>
        Edit
      </button>
      <button className={classes['delete-button']} onClick={deleteTaskHandler}>
        Delete
      </button>
      <p>{errorMessage}</p>
    </div>
  )
}

export default TaskItem
