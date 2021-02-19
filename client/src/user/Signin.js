import React, { Component } from 'react'
import { Link, Redirect } from "react-router-dom"
import { signin, authenticate } from "../auth"

class Signin extends Component {

  constructor(){
    super()
    this.state = {
      email: '',
      password: '',
      error: '',
      redirectToReferer: false,
      loading: false
    }
  }

  clickSubmit = event => {
    event.preventDefault()
    this.setState({ loading: true })
    const { email, password } = this.state 
    const user = {
      email,
      password
    }
    console.table(user)
    signin(user)
    .then(data => {
      if(data.error){
        this.setState({ error: data.error, loading: false })
      }else{
        authenticate(data, () => {
          this.setState({ redirectToReferer: true })
        })
      }
    })
  }

  handleChange = name => event => {
    this.setState({ error: '' })
    this.setState({ [name]: event.target.value })
  }

  signinForm = (email, password) => (
    <form>
      <div>
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
              Sign In
            <i class="material-icons right">send</i>
          </button>
      </div>
    </form>
  )

  render() {
    const { email, password, error, redirectToReferer, loading } = this.state

    if (redirectToReferer){
      return <Redirect to='/'/>
    }

    return (
      <div className='container'>
        <h2 className='mt-5 mb-5'>Sign In</h2>
      <div 
        className='alert alert-danger'
        style={{ display: error ? '' : 'none'}}>
          {error}
      </div>
      {loading ? (
        // <div className='progress'>
        // <div class="indeterminate"></div>
        // </div>
        <div class="preloader-wrapper big active">
      <div class="spinner-layer spinner-blue">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-red">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-yellow">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-green">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
      ):(
        ''
      )}
        {this.signinForm(email, password)}
        <p>
          <Link to="/forgot-password" className="text-danger">
            {" "}
            Forgot Password
          </Link>
        </p>
      </div>
    )
  }
}

export default Signin
