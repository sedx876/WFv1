const _ = require('lodash')
const User = require('../models/user')
const formidable = require('formidable')
const fs = require('fs')

exports.userById = (req, res, next, id) => {
  User.findById(id)
  //Populate followers and following users array
  .populate('following', '_id name')
  .populate('followers', '_id name')
  .exec((err, user) => {
    if (err || !user){
      return res.status(400).json({
        error: 'User Not Found'
      })
    }
    req.profile = user //Adds profile object in req with user info
    next()
  })
}

exports.hasAuthorization = (req, res, next) => {
  let sameUser = req.profile && req.auth && req.profile._id == req.auth._id 
  let adminUser = req.profile && req.auth && req.auth.role === 'admin'
  const authorized = sameUser || adminUser 
  console.table('req.profile', req.profile, 'req.auth', req.auth)
  console.table('SAMEUSER', sameUser, 'ADMINUSER', adminUser)
  if (!authorized){
    return res.status(403).json({
      error: 'User Is Not Authorized To Perform This Action'
    })
  }
  next()
}

exports.allUsers = (req, res) => {
  User.find((err, users) => {
    if (err){
      return res.status(400).json({
        error: err
      })
    }
    res.json(users)
  }).select('name email updated created role')
}

exports.getUser = (req, res) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined 
  return res.json(req.profile)
}

exports.updateUser = (req, res, next) => {
  let form = new formidable.IncomingForm()
  console.table('Imcoming Form Data: ', user)
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err){
      return res.status(400).json({
        error: 'Photo Could Not Be Uploaded'
      })
    }
    //Save User
    let user = req.profile
    console.table('User In Update: ', user)
    user = _.extend(user, fields)
    user.updated = Date.now()
    console.table('User Form Data Update: ', user)
    if (files.photo){
      user.photo.data = fs.readFileSync(files.photo.path)
      user.photo.contentType = files.photo.type
    }
    user.save((err, result) => {
      if (err){
        return res.status(400).json({
          error: err
        })
      }
      user.hashed_password = undefined 
      user.salt = undefined
      console.table('User After Update with formData: ', user)
      res.json(user)
    })
  })
}

exports.userPhoto = (req, res) => {
  User.findById(req.params.userId, 'photo')
  .then(user => {
    res.set({'Content-Type': user.photo.contentType})
    res.send(user.photo.data)
  })
  .catch(err => res.status(500).json(err))
}

exports.deleteUser = (req, res, next) => {
  let user = req.profile 
  user.remove((err, user) => {
    if (err){
      return res.status(400).json({
        error: err
      })
    }
    res.json({ message: 'User Delete Successfully'})
  })
}

exports.addFollowing = (req, res, next) => {
  User.findByIdAndUpdate(req.body.userId,
    { $push: { following: req.body.followId } }, (err, result) => {
      if (err) {
        return res.status(400).json({ error: err })
      }
      next()
    })
}

exports.addFollower = (req, res) => {
  User.findByIdAndUpdate(req.body.followId, 
    { $push: { followers: req.body.userId } }, { new: true})
    .populate('following', '_id name')
    .populate('followers', '_id name')
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err
        })
      }
      result.hashed_password = undefined 
      result.salt = undefined
      res.json(result)
    })
}