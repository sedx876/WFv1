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
            <a className='light-green-text text-accent-1 active' 
              href="sass.html">
                Members Directory
            </a>
          </li>
          
          <li><a className='light-green-text text-accent-1' href="badges.html">Log In</a></li>
          <li><a className='light-green-text text-accent-1' href="collapsible.html">Create Account</a></li>
          <li><a className='light-green-text text-accent-1' href="collapsible.html">Find Member</a></li>
          <li><a className='light-green-text text-accent-1' href="collapsible.html">Create Post</a></li>
          <li><a className='light-green-text text-accent-1' href="collapsible.html">Strain Journal</a></li>
          <li><a className='light-green-text text-accent-1' href="collapsible.html">Profile</a></li>
          <li><a className='light-green-text text-accent-1' href="collapsible.html">Log Out</a></li>
        </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
