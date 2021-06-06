import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/auth-slice/auth-slice'

import classes from './Login.module.css'

const Login = (props) => {
  const dispatchFunction = useDispatch()
  const history = useHistory()

  const [errorMessage, setErrorMessage] = useState('')

  const emailRef = useRef()
  const passwordRef = useRef()

  const sendDataForLoggingInHandler = (event) => {
    event.preventDefault()

    const sendData = async () => {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      })

      const data = await response.json()

      if (!data.error) {
        dispatchFunction(authActions.login(data.authToken))

        emailRef.current.value = ''
        passwordRef.current.value = ''

        history.replace('/')
      } else {
        setErrorMessage('Unable to login')
      }

      console.log(data)
    }

    sendData().catch((error) => {
      console.log(error)
    })

    emailRef.current.value = ''
    passwordRef.current.value = ''
  }

  return (
    <div>
      <h1>Login Here</h1>
      <h3>{errorMessage}</h3>
      <form>
        <input
          ref={emailRef}
          className={classes.input}
          type="email"
          placeholder="email"
        />
        <br />
        <input
          ref={passwordRef}
          className={classes.input}
          type="password"
          placeholder="password"
        />
        <br />
        <button
          className={classes.button}
          onClick={sendDataForLoggingInHandler}
        >
          Login
        </button>
      </form>
      <div>
        <h3>
          Don't have an account.{' '}
          <Link to="/users/signup">
            <button className={classes.button}>Sign up</button>
          </Link>
        </h3>
      </div>
    </div>
  )
}

export default Login
