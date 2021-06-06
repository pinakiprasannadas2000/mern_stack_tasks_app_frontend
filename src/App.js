import { useState, useRef } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import AllTasks from './pages/task/AllTasks'
import AddTask from './pages/task/AddTask'
import Login from './pages/user/Login'
import Signup from './pages/user/Signup'
import Logout from './pages/user/Logout'
import Modal from './components/UI/Modal'
import { authActions } from './store/auth-slice/auth-slice'

import './App.css'

function App() {
  const newTaskTitleRef = useRef()
  const [showModal, setShowModal] = useState(false)
  const [taskIdForUpdate, setTaskIdForUpdate] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const dispatchFunction = useDispatch()

  const loggedInStatus = useSelector((state) => {
    return state.auth.isLoggedIn
  })

  const authToken = useSelector((state) => {
    return state.auth.authToken
  })

  const logoutHandler = () => {
    dispatchFunction(authActions.logout())
  }

  const openModalHandler = (taskId) => {
    setShowModal(true)
    setTaskIdForUpdate(taskId)
  }

  const closeModalHandler = () => {
    setShowModal(false)
  }

  const updateTaskHandler = (event) => {
    event.preventDefault()

    const updateTask = async () => {
      const response = await fetch(
        `http://localhost:5000/tasks/${taskIdForUpdate}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            title: newTaskTitleRef.current.value,
          }),
        }
      )

      const data = await response.json()

      if (!data.error) {
        setShowModal(false)
      } else {
        setErrorMessage('Unable to update task title')
      }
    }

    updateTask().catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Task App</h2>
        <div className="App-links">
          {!loggedInStatus && (
            <Link className="link" to="/users/login">
              Login
            </Link>
          )}
          {loggedInStatus && (
            <Link className="link" to="/users/logout" onClick={logoutHandler}>
              Logout
            </Link>
          )}
          {loggedInStatus && (
            <Link className="link" to="/add_task">
              Add Task
            </Link>
          )}
        </div>
      </header>
      <Modal showModal={showModal} close={closeModalHandler}>
        <h1>Edit Task Here</h1>
        <p>{errorMessage}</p>
        <form>
          <input
            ref={newTaskTitleRef}
            type="text"
            placeholder="enter task title"
            className="update-task-modal-input"
          />
          <button
            onClick={updateTaskHandler}
            className="update-task-modal-button"
          >
            Update
          </button>
        </form>
      </Modal>
      <main>
        <Switch>
          {loggedInStatus && (
            <Route path="/" exact>
              <AllTasks openModal={openModalHandler} />
            </Route>
          )}
          {loggedInStatus && (
            <Route path="/users/logout">
              <Logout />
            </Route>
          )}
          {loggedInStatus && (
            <Route path="/add_task" exact>
              <AddTask />
            </Route>
          )}
          <Route path="/users/login" exact>
            <Login />
          </Route>
          <Route path="/users/signup" exact>
            <Signup />
          </Route>
        </Switch>
      </main>
    </div>
  )
}

export default App
