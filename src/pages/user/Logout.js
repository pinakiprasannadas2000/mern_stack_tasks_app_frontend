import React from 'react'
import { useHistory } from 'react-router-dom'

const Logout = (props) => {
  const history = useHistory()

  const afterLogoutHandler = () => {
    history.replace('/')
  }

  return (
    <div>
      <h1>Successfully Logged Out</h1>
      <button onClick={afterLogoutHandler}>Ok</button>
    </div>
  )
}

export default Logout
