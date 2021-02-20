import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { signup } from '../auth/index'

class Signup extends Component {

  constructor(){
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      error: '',
      open: false
    }
  }

  clickSubmit = event => {
    event.preventDefault()
    const { name, email, password } = this.state 
    const user = {
      name,
      email,
      password
    }
    console.table(user)
    signup(user)
    .then(data => {
      if(data.error) this.setState({ error: data.error })
      else this.setState({
        error: '',
        name: '',
        email: '',
        password: '',
        open: true
      })
    })
  }

  handleChange = name => event => {
    this.setState({ error: '' })
    this.setState({ [name]: event.target.value })
  }

  signupForm = (name, email, password) => (
    <div>
      <form>
        <div className='col s12'>

          <div className='input-field col s6'>
            <input id='name' 
              type='text'
              onChange={this.handleChange('name')}
              value={name}
            />
            <label for='name'>Name</label>
          </div>
          
          <div className='input-field col s6'>
            <input id='email' 
              type='text'
              onChange={this.handleChange('email')}
              value={email}
            />
            <label for='email'>Email</label>
          </div>

          <div className='input-field col s6'>
            <input id='password' 
              type='password'
              onChange={this.handleChange('password')}
              value={password}
            />
            <label for='password'>Password</label>
          </div>

          <button 
            class="btn waves-effect light-green darken-4 light-green-text text-accent-1" 
            type="submit" name="action"
            onClick={this.clickSubmit}>
              Submit
            <i class="material-icons right">send</i>
          </button>

        </div>
      </form>
    </div>
  )

  render() {
    const { name, email, password, error, open } = this.state 
    return (
      <div className='container'>
        <h2 className='light-green-text text-accent-3'>SignUp</h2>
        <div className='alert alert-danger'
          style={{ display: error ? '' : 'none'}}>
          {error}
        </div>
        <div className='alert alert-info'
          style={{ display: open ? '' : 'none'}}>
            NEW ACCOUNT WAS SUCCESSFULLY CREATED!! PLEASE <Link to='/signin'>Log In</Link>
        </div>
        {this.signupForm(name, email, password)}
      </div>
    )
  }
}

export default Signup
