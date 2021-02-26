import React, { Component } from 'react'
import { list } from './apiPost'
import DefaultPost from '../images/GoT.png'
import { Link } from 'react-router-dom'

class Posts extends Component {
  constructor(){
    super()
    this.state = {
      posts: [],
      page: 1
    }
  }

  loadPosts = page => {
    list(page).then(data => {
      if (data.error){
        console.table(data.error)
      }else{
        this.setState({ posts: data })
      }
    })
  }

  componentDidMount(){
    this.loadPosts(this.state.page)
  }

  loadMore = number => {
    this.setState({ page: this.state.page + number })
    this.loadPosts(this.state.page + number)
  }

  loadLess = number => {
    this.setState({ page: this.state.page - number })
    this.loadPosts(this.state.page - number)
  }

  renderPosts = posts => {
    return (
      <div class="row">
        {posts.map((post, i) => {
          const posterId = post.postedBy
            ? `/user/${post.postedBy._id}`
            : "";
          const posterName = post.postedBy
            ? post.postedBy.name
            : " Unknown";
          return(
      <div class="col s6 m4">
        <div class="card">
          <div class="card-image valign-wrapper">
            <img  src={`${
              process.env.REACT_APP_API_URL
              }/post/photo/${post._id}`}
              alt={post.title}
              onError={i =>
              (i.target.src = `${DefaultPost}`)
              }
              className="img-thunbnail mb-3"
              style={{ height: "150px", width: "200px", marginLeft: '10px'}}
            /> 
          </div>
          <div class="card-content">
          <p className="card-text">
          <span class="card-title black-text z-depth-3"><strong>{post.title}</strong></span>
          <hr/>
            {post.body.substring(0, 100)}
          </p>
            <br/>
          <p className="">
          Posted by{" "}
          <Link to={`${posterId}`}>
            {posterName}{" "}
          </Link>
            on {new Date(post.created).toDateString()}
          </p>
          </div>
          <div class="card-action">
          <Link
            to={`/post/${post._id}`}
            className="btn waves-effect light-green darken-4 light-green-text text-accent-1"
          >
          Read more
          </Link>
          </div>
        </div>
      </div>
      )
    })}
    </div>
        )
    }

  render() {
    const { posts, page } = this.state 
    return (
      <div className="container" style={{ marginBottom: '100px'}}>
        <h2 className="mt-5 mb-5">
          {!posts.length ? 
          "You have reached the end of the posts!!" 
          : 
          <h3 className='center-align'>
            <strong>Recent Posts</strong>
          </h3>}
        </h2>
          {this.renderPosts(posts)}
            {page > 1 ? (
              <button
                className="btn waves-effect waves-light btn light-green darken-4 light-green-text text-accent-1"
                onClick={() => this.loadLess(1)}
              >
                Previous ({this.state.page - 1})
              </button>
              ) : (
                ""
              )}
                {posts.length ? (
                  <button
                    className="btn waves-effect waves-light btn light-green darken-4 light-green-text text-accent-1 mb-3 right"
                    onClick={() => this.loadMore(1)}
                  >
                    Next ({page + 1})
                  </button>
                ) : (
                  ""
              )}
          </div>
    )
  }
}

export default Posts
