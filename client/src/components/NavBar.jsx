import React from "react"
import './nav-bar.css'
import pulse from '../assets/pulse.svg'


const NavBar = (props) => {
  return (
    <div className='NavBar'>
      <div id="logo">
        <img src={pulse} width='48px'></img>
        <h1>LambdaPulse</h1>
      </div>
      <div id="links">
        <p>About</p>
        <p>Docs</p>
      </div>
    </div>
  )
};

export default NavBar;
