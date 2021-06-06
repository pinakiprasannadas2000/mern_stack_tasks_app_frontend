import React from 'react'
import ReactDOM from 'react-dom'

import classes from './Modal.module.css'

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000,
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 1000,
}

const Modal = (props) => {
  const closeModalHandler = () => {
    props.close()
  }

  if (!props.showModal) {
    return null
  }

  return ReactDOM.createPortal(
    <React.Fragment>
      <div style={OVERLAY_STYLES}></div>
      <div style={MODAL_STYLES}>
        {props.children}
        <button onClick={closeModalHandler} className={classes.button}>
          Close
        </button>
      </div>
    </React.Fragment>,
    document.getElementById('modal')
  )
}

export default Modal
