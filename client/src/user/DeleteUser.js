import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import { remove } from './apiUser'
import { signout } from '../auth'

class DeleteUser extends Component {
  state = {
    redirect: false
  }

  deleteAccount = () => {
    const token = isAuthenticated().token 
    const userId = this.props.userId 
    remove(userId, token).then(data => {
      if(data.error){
        console.table(data.error)
      }else{
        signout(() => console.table('User is Deleted'))
        this.setState({ redirect: true })
      }
    })
  }

  deleteConfirmed = () => {
    let answer = window.confirm('Are You Sure You Want To Delete Your Account?')
    if (answer){
      this.deleteAccount()
    }
  }

  render() {
    if (this.state.redirect){
      return <Redirect to='/'/>
    }

    return (
      <button
        onClick={this.deleteConfirmed}
        className='btn'>
        Delete Profile
      </button>
    )
  }
}

export default DeleteUser
