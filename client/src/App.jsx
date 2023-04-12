import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import EventGraph from './pages/EventGraph';


function App() {

  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/eventgraph' element={<EventGraph/>}/>
      {/* <Route path='/' element={<Login/>}/> */}
    </Routes>
    )
}

export default App
