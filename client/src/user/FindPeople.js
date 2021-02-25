import React, { Component } from "react"
import { findPeople, follow } from "./apiUser"
import DefaultProfile from "../images/avatar.jpg"
import { Link } from "react-router-dom"
import { isAuthenticated } from "../auth"

class FindPeople extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      error: "",
      open: false
    }
  }

  componentDidMount() {
    const userId = isAuthenticated().user._id
    const token = isAuthenticated().token
    findPeople(userId, token).then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({ users: data })
      }
    })
  }

  clickFollow = (user, i) => {
    const userId = isAuthenticated().user._id
    const token = isAuthenticated().token
      follow(userId, token, user._id).then(data => {
        if (data.error) {
          this.setState({ error: data.error })
        } else {
            let toFollow = this.state.users
            toFollow.splice(i, 1);
            this.setState({
              users: toFollow,
              open: true,
              followMessage: `Following ${user.name}`
        })
      }
    })
  }

    renderUsers = users => (
      <div className='row'>
        {users.map((user, i) =>(
          <div className='col s8 m6' key={i}>
          <div className='card center-align'>
          <div class="card-image center-align light-green-text text-accent-5">
          <img
          style={{ height: "250px", width: "auto" }}
          className="img-thumbnail center-align"
          src={`${process.env.REACT_APP_API_URL}/user/photo/${
          user._id
          }`}
          onError={i => (i.target.src = `${DefaultProfile}`)}
          alt={user.name}
        />
          </div>
          <div class="card-content">
          <h5 className="light-green-text text-accent-1"><strong>{user.name}</strong></h5>
        </div>
        <div class="card-action" style={{ justifyContent: "center", alignItems: "right" }}>
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
        </div>
        ))}
      </div>
  )

    render() {
      const { users, open, followMessage } = this.state
      return (
				<div className="container">
          <h2 className='light-green-text text-accent-3 center-align'>Find People</h2>
            {open && (
        <div className="alert alert-success">{followMessage}</div>
        )}
          {this.renderUsers(users)}
        </div>
      )
    }
}

export default FindPeople
