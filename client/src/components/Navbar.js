import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='light-green darken-4'>
        <div className="nav-wrapper">

          <a href="#" 
            className="brand-logo light-green-text text-accent-1">
              WeedFeed
            </a>

        <ul id="nav-mobile" className="right hide-on-med-and-down">
          
          <li>
            <a className='light-green-text text-accent-1 active'>
              Members Directory
            </a>
          </li>

          <li>
            <a className='light-green-text text-accent-1'>
              Log In
            </a>
          </li>

          <li>
            <a className='light-green-text text-accent-1'>
              Create Account
            </a>
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
            <a className='light-green-text text-accent-1'>
              Profile
            </a>
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

export default Navbar
