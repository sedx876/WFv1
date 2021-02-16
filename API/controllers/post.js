const Post = require('../models/post')
const formidable = require('formidable')
const fs = require('fs')
const _ = require('lodash')

exports.postById = (req, res, next, id) => {
  Post.findById(id)
    .populate('postedBy', '_id name')
    .populate('comments.postedBy', '_id name')
    .populate('postedBy', '_id name role')
    .select('_id title body created likes comments photo')
    .exec((err, post) => {
      if (err || !post){
        return res.status(400).json({
          error: err
        })
      }
      req.post = post;
      next()
    })
}

exports.getPosts = async (req, res) => {
  //Get current page from req.query or use default page 1
  const currentPage = req.query.page || 1
  //Return 3 posts per page
  const perPage = 6
  let totalItems
  const posts = await Post.find()
  //countDocuments() gives you the total count of posts
  .countDocuments()
  .then(count => {
    totalItems = count 
      return Post.find()
      .skip((currentPage - 1) * perPage)
      .populate('comments', 'text created')
      .populate('comments.postedBy', '_id name')
      .populate('postedBy', '_id name')
      .select('_id title body created likes')
      .limit(perPage)
      .sort({ created: -1 })
  })
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => console.table(err))
}

exports.createPost = (req, res, next) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true 
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image Could Not Be Uploaded'
      })
    }
    let post = new Post(fields)
    req.profile.hashed_password = undefined 
    req.profile.salt = undefined 
    post.postedBy = req.profile 
  if (files.photo){
    post.photo.data = fs.readFileSync(files.photo.path)
    post.photo.contentType = files.photo.type
  }
    post.save((err, result) => {
      if (err){
        return res.status(400).json({
          error: err
        })
      }
      res.json(result)
    })
  })
}

exports.postsByUser = (req, res) => {
  Post.find({ postedBy: req.profile._id })
    .populate('postedBy', '_id name')
    .select('_id title body created likes')
    .sort('_created')
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: err
        })
      }
      res.json(posts)
    })
}

exports.isPoster = (req, res, next) => {
  let sameUser = req.post && req.auth && req.post.postedBy._id == req.auth._id 
  let adminUser = req.post && req.auth && req.auth.role === 'admin'
  console.table("req.post ", req.post, " req.auth ", req.auth)
  console.table("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser)
  let isPoster = sameUser || adminUser
  if (!isPoster){
    return res.status(403).json({
      error: 'User Is Not Authorized'
    })
  }
  next()
}