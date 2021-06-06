import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/auth-slice/auth-slice'

import classes from './Signup.module.css'

const Signup = (props) => {
  const dispatchFunction = useDispatch()
  const history = useHistory()

  const [errorMessage, setErrorMessage] = useState('')

  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  const sendDataForSigningUpHandler = (event) => {
    event.preventDefault()

    const sendData = async () => {
      const response = await fetch('http://localhost:5000/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: usernameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      })

      const data = await response.json()

      if (!data.error) {
        dispatchFunction(authActions.login(data.authToken))

        usernameRef.current.value = ''
        emailRef.current.value = ''
        passwordRef.current.value = ''

        history.replace('/')
      } else {
        setErrorMessage('Unable to sign up')
      }

      console.log(data)
    }

    sendData().catch((error) => {
      console.log(error)
    })
  }

  return (
    <div>
      <h1>Sign Up Here</h1>
      <h3>{errorMessage}</h3>
      <form>
        <input
          ref={usernameRef}
          className={classes.input}
          type="text"
          placeholder="username"
          required
        />
        <br />
        <input
          ref={emailRef}
          className={classes.input}
          type="email"
          placeholder="email"
          required
        />
        <br />
        <input
          ref={passwordRef}
          className={classes.input}
          type="password"
          placeholder="password"
          min="8"
          required
        />
        <br />
        <button
          className={classes.button}
          onClick={sendDataForSigningUpHandler}
        >
          Signup
        </button>
      </form>
      <div>
        <h3>
          Already have an account.{' '}
          <Link to="/users/login">
            <button className={classes.button}>Login</button>
          </Link>
        </h3>
      </div>
    </div>
  )
}

export default Signup
