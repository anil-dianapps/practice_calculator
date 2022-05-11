import React from 'react'
import './App.css';


const Keypad = (props) => {
  return (
    <div className="Keypad">{props.children}</div>
  )
}

export default Keypad