import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated } from '../auth'


const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: '#ff9900' }
  else return { color: '#ffffff' }
}

const Navbar = ({history}) => {
  return (
    <div>
      <nav className='light-green darken-4'>
        <div className="nav-wrapper">

          <Link style={isActive(history, '/')} to="/"
            className="brand-logo light-green-text text-accent-1">
              WeedFeed
            </Link>

        <ul id="nav-mobile" className="right hide-on-med-and-down">
          
          <li>
            <a className='light-green-text text-accent-1 active'>
              Members Directory
            </a>
          </li>

          <li>
            <Link className='light-green-text text-accent-1' style={isActive(history, '/signin')} to='/signin'>
              Sign In
            </Link>
          </li>

          <li>
            <Link className='light-green-text text-accent-1' style={isActive(history, '/signup')} to='/signup'>
              Create Account
            </Link>
          </li>

          <li>
            <a className='light-green-text text-accent-1'>
              Find Member
            </a>
          </li>

          <li>
            <a className='light-green-text text-accent-1'>
              Create Post
            </a>
          </li>

          <li>
            <a className='light-green-text text-accent-1'>
              Strain Journal
            </a>
          </li>

          <li>
            <Link className='light-green-text text-accent-1'
            to='/profile'
            style={(isActive(history, '/profile'))}>
              Profile
            </Link>
          </li>

          <li>
            <a className='light-green-text text-accent-1'>
              Log Out
            </a>
          </li>
          
        </ul>
        </div>
      </nav>
    </div>
  )
}

export default withRouter(Navbar)
