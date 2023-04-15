import React from "react"
import './event-graph.css'
import pulse from '../assets/pulse.svg'

const NavBar = (props) => {
  return (
    <div className='NavBar'>
      <img src={pulse} width='48px'></img>
      <span style={{display: 'flex'}}>
        <a href="./#">Home</a>
        <a href="eventgraph">EventGraph (temp)</a>
      </span>
    </div>
  )
};

export default NavBar;
