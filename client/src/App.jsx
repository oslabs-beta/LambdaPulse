import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard/Dashboard';


function App() {

  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/dashboard' element = {<Dashboard/>}/>
      {/* <Route path='/' element={<Login/>}/> */}
    </Routes>
    )
}

export default App
