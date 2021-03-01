import React, { Component } from 'react'
import { list } from './apiUser'
import { Link } from 'react-router-dom'
import DefaultProfile from '../images/avatar.jpg'

class Users extends Component {
  constructor(){
    super()
    this.state = {
      users: []
    }
  }

  componentDidMount(){
    list()
    .then(data => {
      if (data.error) {
        console.table(data.error)
    } else {
        this.setState({ users: data })
    }
    })
  }

  renderUsers = users => (
  <div className='row'>
    <div  className='col s6 m4'>
    {users.map((user, i) => (
          <div class="card-image card center-align light-green-text text-accent-5"
          style={{width: '250px'}}
          key={i}>
          <img
          style={{ height: "250px", width: "250px" }}
          className="img-thumbnail center-align"
          src={`${process.env.REACT_APP_API_URL}/user/photo/${
          user._id
          }`}
          onError={i => (i.target.src = `${DefaultProfile}`)}
          alt={user.name}
        />
        <div class="card-content">
          <h5 className="light-green-text text-accent-5"><strong>{user.name}</strong></h5>
          <p>
            <strong>Joined: </strong> 
            {`${new Date(user.created).toDateString()}`}
          </p>
          <Link
            to={`/user/${user._id}`}
            className="btn waves-effect light-green darken-4 light-green-text text-accent-1"
          >
            View Profile
          </Link>

          <button
            style={{ justifyContent: "space-between", alignItems: "right" }}
            onClick={() => this.clickFollow(user, i)}
            className="btn waves-effect light-green darken-4 light-green-text text-accent-1"
          >
            Follow
          </button>
        </div>
      </div>
        ))}
    </div>    
      </div>
  )

  render() {
    const {users} = this.state
    return (
      <div className='container col s6 m4'>
        <h2 className='light-green-text text-accent-4 center-align'>
          <strong>Members Directory</strong>
        </h2>
        {this.renderUsers(users)}
      </div>
    )
  }
}

export default Users