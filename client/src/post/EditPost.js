import React, { Component } from 'react'
import { singlePost, update } from './apiPost'
import { isAuthenticated } from '../auth'
import { Redirect } from 'react-router-dom'
import DefaultPost from '../images/GoT.png'

class EditPost extends Component {

  constructor(){
    super()
    this.state = {
      id: '',
      title: '',
      body: '',
      redirectToProfile: false,
      error: '',
      fileSize: 0,
      loading: false
    }
  }

  init = postId => {
    singlePost(postId).then(data => {
      if (data.error){
        this.setState({ redirectToProfile: true })
      }else{
        this.setState({
          id: data.postedBy._id,
          title: data.title,
          body: data.body,
          error: ''
        })
      }
    })
  }

  componentDidMount(){
    this.postData = new FormData()
    const postId = this.props.match.params.postId 
    this.init(postId)
  }

  isValid = () => {
    const { title, body, fileSize } = this.state 
    if (fileSize > 10000000){
      this.setState({
        error: 'File Size Should Be Less Than 100kb',
        loading: false
      })
      return false
    }
    if (title.length === 0 || body.length === 0){
      this.setState({ error: 'All Fields Are Required', loading: false })
      return false
    }
    return true
  }

  handleChange = name => event => {
    this.setState({ error: "" })
    const value =
    name === "photo" ? event.target.files[0] : event.target.value
      const fileSize = name === "photo" ? event.target.files[0].size : 0;
      this.postData.set(name, value);
      this.setState({ [name]: value, fileSize });
  }

  clickSubmit = event => {
    event.preventDefault() 
    this.setState({ loading: true })
    if (this.isValid()){
      const postId = this.props.mathc.params.postId 
      const token = isAuthenticated().token 
      update(postId, token, this.postData).then(data => {
    if (data.error) this.setState({ error: data.error })
        else{
          this.setState({
            loading: false,
            title: '',
            body: '',
            redirectToProfile: true 
          })
        }
      })
    }
  }

  editPostForm = (title, body) => (
    <form>
      <div className='input-field col s6'>
        <input id='email' 
          type='file'
          onChange={this.handleChange('photo')}
        />
        <label for='photo'>Post Photo</label>
      </div>

      <div className='input-field col s6'>
        <input id='title' 
          type='text'
          onChange={this.handleChange('title')}
          value={title}
        />
        <label for='title'>Title</label>
      </div>

      <div className='input-field col s6'>
        <input id='body' 
          type='text'
          onChange={this.handleChange('body')}
          value={body}
        />
        <label for='body'>Body</label>
      </div>

      <button
        onClick={this.clickSubmit}
        className="btn btn-raised btn-primary"
      >
        Update Post
      </button>
    </form>
  )

  render() {
    const {
      id,
      title,
      body,
      redirectToProfile,
      error,
      loading
    } = this.state

    if(redirectToProfile){
      return <Redirect to={`/user/${isAuthenticated().user._id}`}/>
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">{title}</h2>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
          {loading ? (
            <div className="jumbotron text-center">
              <h2>Loading...</h2>
            </div>
          ) : (
            ""
          )}
          <img
            style={{ height: "200px", width: "auto" }}
            className="img-thumbnail"
            src={`${
              process.env.REACT_APP_API_URL
            }/post/photo/${id}?${new Date().getTime()}`}
            onError={i => (i.target.src = `${DefaultPost}`)}
            alt={title}
          />
            {isAuthenticated().user.role === "admin" &&
              this.editPostForm(title, body)}
                {isAuthenticated().user._id === id &&
                  this.editPostForm(title, body)}
        </div>
    )
  }
}

export default EditPost
