import React, { Component } from 'react'
import { comment, uncomment } from './apiPost'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import DefaultProfile from '../images/avatar.jpg'

class Comment extends Component {
  state= {
    text: '',
    error: ''
  }

  handleChange = event => {
    this.setState({ error: '' })
    this.setState({ text: event.target.value })
  }

  isValid = () => {
    const { text } = this.state 
    if (!text.length > 0 || text.length > 5000){
      this.setState({
        error: 'Comment Should Not Be Empty and Less than 300 Characters Long'
      })
      return false
    }
    return true
  }

  addComment = e => {
    e.preventDefault()
    if (!isAuthenticated()){
      this.setState({ error: 'Please Sign In to Leave A Comment' })
      return false
    }
    if (this.isValid()){
      const userId = isAuthenticated().user._id
      const token = isAuthenticated().token 
      const postId = this.props.postId
      comment(userId, token, postId, { text: this.state.text })
      .then(
        data => {
          if (data.error){
            console.table(data.error)
          }else{
            this.setState({ text: ''})
            this.props.updateComments(data.comments)
          }
        }
      )
    }
  }

  deleteComment = comment => {
    const userId = isAuthenticated().user._id 
    const token = isAuthenticated().token 
    const postId = this.props.postId 
    uncomment(userId, token, postId, comment)
    .then(
      data => {
        if (data.error){
          console.table(data.error)
        }else{
          this.props.upComments(data.comments)
        }
      }
    )
  }

  deleteConfirmed = comment => {
    let answer = window.confirm(
      'Are You Sure You Want to Delete Your Comment?'
    )
    if (answer){
      this.deleteComment(comment)
    }
  }

  render() {
    const { comments } = this.props 
    const { error } = this.state
    return (
      <div>
        <h2>Leave a Comment</h2>
        <form onSubmit={this.addComment}>
          <div className='form-group'>
            <input
              type='text'
              classNameonChange={this.handleChange}
              value={this.state.text}
              className='form-control'
              placeholder='Leave a Comment...'
            />
            <button className='btn waves-effect waves-light btn light-green darken-4 light-green-text text-accent-1'>
              Post Comment
            </button>
          </div>
        </form>

      <div className='alert alert-danger'
        style={{ display: error ? '' : 'none'}}>
        {error}
      </div>

      <div>
        <h3>
          {comments.length} Comments: 
        </h3>
        <hr/>
        {comments.map((comment, i) => (
          <div key={i}>
            <div>
              <Link to={`/user/${comment.postedBy._id}`}>
                <img style={{ borderRadius: '50%', border: '1px solid black' }}
                className="float-left mr-2"
                height="30px"
                width="30px"
                onError={i =>
                  (i.target.src = `${DefaultProfile}`)
                }
                src={`${
                  process.env.REACT_APP_API_URL
                }/user/photo/${comment.postedBy._id}`}
                alt={comment.postedBy.name}
              />
              </Link>
              <div>
              <p className="lead">{comment.text}</p>
              <p className="font-italic mark">
                Posted by{" "}
              <Link
                to={`/user/${comment.postedBy._id}`}
              >
                {comment.postedBy.name}{" "}
              </Link>
                on{" "}
                {new Date(
                  comment.created
                ).toDateString()}
                <span>
                  {isAuthenticated().user &&
                    isAuthenticated().user._id ===
                    comment.postedBy._id && (
                <>
                  <button className='btn btn-raised btn-outline-danger btn-sm float-right mr-1'
                    onClick={() =>
                    this.deleteConfirmed(comment)}>
                    Remove
                  </button>
                </>
                )}
                </span>
              </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    )
  }
}

export default Comment
