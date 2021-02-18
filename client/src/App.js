import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import MainRouter from './MainRouter'

const App = () => {
  return (
    <div>
      <Router>
        <MainRouter/>
      </Router>
    </div>
  )
}

export default App
