import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated, signout } from '../auth'


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
            <Link className='light-green-text text-accent-1 active' style={isActive(history, '/users')} to="/users">
              |Members Directory|
            </Link>
          </li>


          {!isAuthenticated() && (
            <>
            <li>
            <Link className='light-green-text text-accent-1' style={isActive(history, '/signin')} to='/signin'>
              |Sign In|
            </Link>
          </li>

          <li>
            <Link className='light-green-text text-accent-1' style={isActive(history, '/signup')} to='/signup'>
              |Create Account|
            </Link>
          </li>
          </>
          )}

          {isAuthenticated() &&
          <>
          {/* <li className="nav-item">
      <Link to={`/findpeople`} style={isActive(history, `/findpeople`)} className="nav-link light-green-text text-accent-1 active">
        Find People
      </Link>
    </li> */}

    <li>
            <Link className='light-green-text text-accent-1 active' style={isActive(history, '/postfeed')} to="/postfeed">
              |Post Feed|
            </Link>
          </li>

          <li className="nav-item light-green-text text-accent-1 active">
      <Link to={`/post/create`} style={isActive(history, `/post/create`)} className="nav-link light-green-text text-accent-1 active">
        |Create Post|
      </Link>
    </li>

          <li>
            <a className='light-green-text text-accent-1'>
              |Strain Journal|
            </a>
          </li>

          <li className="nav-item">
    <span className="nav-link light-green-text text-accent-1 active">
      <Link to={`/user/${isAuthenticated().user._id}`}
      style={(isActive(history, `/user/${isAuthenticated().user._id}`))}>
      {`|${isAuthenticated().user.name} Profile|`} 
      </Link>
    </span>
  </li>

          <li className="nav-item">
    <span className="nav-link light-green-text text-accent-1 active" 
      style={{ cursor: 'pointer', color: '#fff' }} 
      onClick={() => signout(() => history.push('/'))}>
      |Log Out| 
    </span>
  </li>
          </>}
          
        </ul>
        </div>
      </nav>
    </div>
  )
}

export default withRouter(Navbar)
