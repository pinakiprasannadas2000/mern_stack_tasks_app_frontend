import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import classes from './AddTask.module.css'

const AddTask = (props) => {
  const history = useHistory()
  const taskRef = useRef()

  const [errorMessage, setErrorMessage] = useState('')

  const authToken = useSelector((state) => {
    return state.auth.authToken
  })

  const addTaskHandler = (event) => {
    event.preventDefault()

    const addTask = async () => {
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          title: taskRef.current.value,
        }),
      })

      const data = await response.json()

      if (!data.error) {
        taskRef.current.value = ''

        history.replace('/')
      } else {
        setErrorMessage('Unable to add')
      }

      console.log(data)
    }

    addTask().catch((error) => {
      console.log(error)
    })
  }

  return (
    <div>
      <h1>Add Task Here</h1>
      <h3>{errorMessage}</h3>
      <form>
        <input
          ref={taskRef}
          className={classes.input}
          type="text"
          placeholder="enter task title"
          required
        />
        <br />
        <button className={classes.button} onClick={addTaskHandler}>
          Add
        </button>
      </form>
    </div>
  )
}

export default AddTask
