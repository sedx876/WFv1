import React, { Component } from 'react'
import { isAuthenticated } from "../auth"
import { Redirect, Link } from "react-router-dom"
import { read } from "./apiUser"
import DefaultProfile from "../images/avatar.jpg"

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      // user: { following: [], followers: [] },
      // redirectToSignin: false,
      // following: false,
      // error: "",
      // posts: []
    }
  }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default Profile
