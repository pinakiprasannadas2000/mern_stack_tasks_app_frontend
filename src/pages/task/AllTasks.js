import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TaskItem from '../../components/task/TaskItem'

import classes from './AllTasks.module.css'

const AllTasks = (props) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [allTasks, setAllTasks] = useState([])

  const authToken = useSelector((state) => {
    return state.auth.authToken
  })

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/tasks', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })

      const data = await response.json()

      if (!data.error) {
        const tasksFetched = data.result
        setAllTasks(tasksFetched)
      } else {
        setErrorMessage('Unable to fetch')
      }

      console.log(data)
    }

    fetchData().catch((error) => {
      console.log(error)
    })
  }, [authToken])

  const getFetchedDataAfterDeletion = (fetchedTasks) => {
    setAllTasks(fetchedTasks)
  }

  const getFetchedDataAfterCompletedStatusChanged = (fetchedTasks) => {
    setAllTasks(fetchedTasks)
  }

  return (
    <div className={classes['main-content']}>
      <h3>{errorMessage}</h3>
      <ul>
        {allTasks.map((task) => {
          return (
            <TaskItem
              key={task._id}
              id={task._id}
              title={task.title}
              completed={task.completed}
              createdAt={task.createdAt}
              updatedAt={task.updatedAt}
              fetchedTasksAfterDeletion={getFetchedDataAfterDeletion}
              fetchedTasksAfterCompletedStatusChanged={
                getFetchedDataAfterCompletedStatusChanged
              }
              openModal={props.openModal}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default AllTasks
