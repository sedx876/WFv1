import React, { Component } from "react"
import { isAuthenticated } from "../auth"
import { Redirect, Link } from "react-router-dom"
import { read } from "./apiUser"
import DefaultProfile from "../images/avatar.jpg"
import DeleteUser from "./DeleteUser"
import FollowProfileButton from "./FollowProfileButton"
import ProfileTabs from "./ProfileTabs"
import { listByUser } from "../post/apiPost"

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: { following: [], followers: [] },
      redirectToSignin: false,
      following: false,
      error: "",
      posts: []
    }
  }

 // check follow
  checkFollow = user => {
    const jwt = isAuthenticated()
    const match = user.followers.find(follower => {
    // one id has many other ids (followers) and vice versa
    return follower._id === jwt.user._id
  })
    return match
  }

  clickFollowButton = callApi => {
    const userId = isAuthenticated().user._id
    const token = isAuthenticated().token
    callApi(userId, token, this.state.user._id).then(data => {
      if (data.error) {
        this.setState({ error: data.error })
      } else {
        this.setState({ user: data, following: !this.state.following })
    }
  })
  }

  init = userId => {
    const token = isAuthenticated().token
    read(userId, token).then(data => {
    if (data.error) {
      this.setState({ redirectToSignin: true })
    } else {
      let following = this.checkFollow(data)
      this.setState({ user: data, following })
      this.loadPosts(data._id)
    }
  })
  }

  loadPosts = userId => {
    const token = isAuthenticated().token
    listByUser(userId, token).then(data => {
    if (data.error) {
      console.log(data.error)
    } else {
      this.setState({ posts: data })
    }
  })
  }

  componentDidMount() {
    const userId = this.props.match.params.userId
    this.init(userId)
  }

  UNSAFE_componentWillReceiveProps(props) {
    const userId = props.match.params.userId
    this.init(userId)
  }

  render() {
    const { redirectToSignin, user, posts } = this.state
    if (redirectToSignin) return <Redirect to="/signin" />
    const photoUrl = user._id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${
          user._id
        }?${new Date().getTime()}`
      : DefaultProfile
    return (
      <div>
        <h2 className='center-align light-green-text text-accent-5'>
          <strong>Hello {user.name}</strong>
        </h2>


        <div class="card-image center-align light-green-text text-accent-5">
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
          <p className='pt-3'><strong>Email:</strong> {user.email}</p>
          <p>
            <strong>Joined: </strong> 
            {`${new Date(user.created).toDateString()}`}
          </p>
        </div>
      </div>

      {isAuthenticated().user &&
        isAuthenticated().user._id === user._id ? (
          <div className='center-align'>
            <Link
              className="btn waves-effect light-green darken-4 light-green-text text-accent-1"
              to={`/post/create`}
            >
              Create Post
            </Link>
            <Link
              className="btn waves-effect amber darken-4 amber-text text-accent-1"
              to={`/user/edit/${user._id}`}
            >
              Edit Profile
            </Link>
            <DeleteUser className='btn waves-effect red darken-4 red-text text-accent-1' userId={user._id} />
            <br/>
            </div>
              ) : (
              <FollowProfileButton
                following={this.state.following}
                onButtonClick={this.clickFollowButton}
              />
            )}
            {/* <div className='center-align'>
              <div className='center-align'>
                <p className="card center-align"
                  style={{width: '30rem'}}>
                  <h5 style={{textDecoration: 'underline'}}><strong>About Me:</strong></h5>
                  <strong>{user.about}</strong></p>
              </div>
              </div> */}

            <div class="row center-align">
              <div class="col s12 center-align" >
                <div class="card-panel light-green darken-3">
                  <div class="card-content white-text">
                    <span class="card-title" 
                      style={{textDecoration: 'underline', margin: '50px'}}
                    >
                      <strong><h5>About Me:</h5></strong>
                    </span>
                    <p>{user.about}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='row'>
           <div >
             <div className='card'>
             <ProfileTabs
               followers={user.followers}
              following={user.following}
               posts={posts}
            />
             </div>
           </div>
         </div>

            <div>
           {isAuthenticated().user && 
           isAuthenticated().user.role === "admin" && (
            <div className='row col s12' style={{margin: '100px', paddingBottom: '100px'}}>
             <div className="row card-panel  lime darken-3">
               <div className="card-body  lime darken-3 center-align">
                 <h5 className="card-title white-text" style={{textDecoration: 'underline'}}>Admin</h5>
                 <p className='white-text'>
                   Edit/Delete as an Admin
                 </p>
                 <Link
                   className="btn waves-effect light-green darken-4 light-green-text text-accent-1"
                   to={`/user/edit/${user._id}`}
                 >
                  Edit Profile
                 </Link>
                 <DeleteUser />
               </div>
             </div>
             </div>
             )}
             </div>

             
         </div>
        
    )
  }
}


export default Profile