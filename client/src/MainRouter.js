import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Navbar from './core/Navbar'
import Home from './core/Home'
import Footer from './core/Footer'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'

const MainRouter = () => {
  return (
    <div>
      <Navbar/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/signin' component={Signin}/>
        <PrivateRoute exact path='/user/:userId' component={Profile}/>
      </Switch>
      <Footer/>
    </div>
  )
}

export default MainRouter
