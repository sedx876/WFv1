import React from 'react'
import './index.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { Typography } from '@material-ui/core'


const App = () => {
  return (
    <div>
      <Navbar/>
      <Home/>
    </div>
  )
}

export default App
