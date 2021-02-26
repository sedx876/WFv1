import React, { Component } from "react"
import { Link } from "react-router-dom"
import DefaultProfile from "../images/avatar.jpg"

class ProfileTabs extends Component {
  render() {
    const { following, followers, posts } = this.props
      return (
      <div style={{margin: '0 50px 0 50px'}}>
    <div class="col s12 m4">
      <div class="card-panel light-green darken-3">
        <span class="white-text">
        <h3 className="text-primary text-center">
          {followers.length} <strong>Followers</strong>
            </h3>
              <hr />
                {followers.map((person, i) => (
                  <div key={i}>
                    <div>
                      <Link to={`/user/${person._id}`}>
                        <img
                          style={{
                          borderRadius: "50%",
                          border: "1px solid black"
                          }}
                          className="float-left mr-2"
                          height="30px"
                          width="30px"
                          onError={i =>
                          (i.target.src = `${DefaultProfile}`)
                          }
                          src={`${
                          process.env.REACT_APP_API_URL
                          }/user/photo/${person._id}`}
                          alt={person.name}
                      />
                    <div>
                      <p className="white-text">
                        {person.name}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
        </span>
      </div>
    </div>

    <div class="col s12 m4">
      <div class="card-panel light-green darken-3">
        <span class="white-text">
        <h3 className="text-primary text-center">
          {following.length} <strong>Following</strong>
        </h3>
        <hr />
          {following.map((person, i) => (
          <div key={i}>
            <div>
              <Link to={`/user/${person._id}`}>
                <img
                  style={{
                  borderRadius: "50%",
                  border: "1px solid black"
                  }}
                  className="float-left mr-2"
                  height="30px"
                  width="30px"
                  onError={i =>
                  (i.target.src = `${DefaultProfile}`)
                  }
                  src={`${
                  process.env.REACT_APP_API_URL
                  }/user/photo/${person._id}`}
                  alt={person.name}
                />
            <div>
              <p className="white-text">
                {person.name}
              </p>
            </div>
          </Link>
        </div>
      </div>
    ))}
  </span>
  </div>
  </div>

    <div class="col s12 m4">
      <div class="card-panel light-green darken-3">
        <span class="white-text">
        <h3 className="text-primary">{posts.length} <strong>Posts</strong></h3>
          <hr />
            {posts.map((post, i) => (
              <div key={i}>
              <div>
                <Link to={`/post/${post._id}`}>
              <div>
                <p className="white-text">{post.title}</p>
              </div>
              </Link>
              </div>
            </div>
          ))}
        </span>
      </div>
    </div>
  </div>
    )
  }
}

export default ProfileTabs