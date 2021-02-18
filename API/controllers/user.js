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