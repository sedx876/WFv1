import React from 'react'
import './index.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import { Typography } from '@material-ui/core'


const App = () => {
  return (
    <div>
      <Navbar/>
      <Home/>
      <Footer/>
    </div>
  )
}

export default App
