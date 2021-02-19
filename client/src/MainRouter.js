import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Navbar from './core/Navbar'
import Home from './core/Home'
import Footer from './core/Footer'
import Signup from './user/Signup'

const MainRouter = () => {
  return (
    <div>
      <Navbar/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/signup' component={Signup}/>
      </Switch>
      <Footer/>
    </div>
  )
}

export default MainRouter
