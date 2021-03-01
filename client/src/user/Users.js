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
  //   <div className="row">
  //     {users.map((user, i) => (
  //   <div className="card col-md-4 mb-2" key={i}>
  //     <h5 className="card-title text-primary text-center"><strong>{user.name}</strong></h5>
  //     <img
  //       style={{ height: "300px", width: "auto" }}
  //       className="img-thumbnail"
  //       src={`${process.env.REACT_APP_API_URL}/user/photo/${
  //         user._id
  //       }`}
  //       onError={i => (i.target.src = `${DefaultProfile}`)}
  //       alt={user.name}
  //     />
  //     <div className="card-body">
  //       <p className="card-text">{user.email}</p>
  //       <p>
  //       <strong>Joined: </strong> 
  //       {`${new Date(user.created).toDateString()}`}
  //       </p>
  //       <Link
  //         to={`/user/${user._id}`}
  //         className="btn btn-raised btn-outline-primary btn-sm">
  //           View Profile
  //       </Link>
  //     </div>
  //   </div>
  // ))}
  // </div>

  <div className='row'>
    <div  className='col m4'>
    {users.map((user, i) => (
          <div class="card-image card center-align light-green-text text-accent-5"
          style={{width: '250px'}}
          key={i}>
          <img
          style={{ height: "250px", width: "auto" }}
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
        </div>
      </div>
        ))}
    </div>    
      </div>
  )

  render() {
    const {users} = this.state
    return (
      <div className='container col s8 m6'>
        <h2 className='light-green-text text-accent-4 center-align'>
          <strong>Members Directory</strong>
        </h2>
        {this.renderUsers(users)}
      </div>
    )
  }
}

export default Users