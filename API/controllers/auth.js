const jwt = require('jsonwebtoken')
require('dotenv').config()
const expressJwt = require('express-jwt')
const User = require('../models/user')
const _ = require('lodash')
//const { OAuth2Client } = require('google-auth-library)
const { sendEmail } = require('../helpers')

exports.signup = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email })
  if (userExists)
  return res.status(403).json({
    error: 'Email Already In Use!'
  })
  const user = await new User(req.body)
  await user.save()
  res.status(200).json({ message: 'SignUp Successful!! Please LogIn.'})
}

exports.signin = (req, res) => {
  //Find the user based on email
  const { email, password }= req.body 
  User.findOne({ email }, (err, user) => {
    //If err or no user
    if (err || !user){
      return res.status(401).json({
        error: 'User with that Email Already Exists. Please Try Again'
      })
    }
    // if user is found make sure the email and password match
		// create authenticate method in model and use here
    if (!user.authenticate(password)){
      return res.status(401).json({
        error: 'Email and Password Do Not Match'
      })
    }
    //Generate a Token w/ user id and secret
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET)
    //Persist the token as 't' in cookie with expire date
    res.cookie('t', token, { expire: new Date() + 9999 })
    //Return response with user and token to frontend client
    const { _id, name, email, role } = user 
    return res.json({ token, user: { _id, email, name, role }})
  })
}

exports.signout = (req, res) => {
  res.clearCookie('t')
  return res.json({ message: 'SignOut Success'})
}

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  userProperty: 'auth'
})

exports.forgotPassword = (req, res) => {
  if (!req.body) return res.status(400).json({ message: 'No Request Body'})
  if (!req.body.email) return res.status(400).json({ message: 'No Email in Request Body' })
  console.table('Forgot Password Finding User with that Email')
  const { email } = req.body
  console.table('SignIn req.body', email)
  //Find user based on email
  User.findOne({ email }, (err, user) => {
    //If err or no user
    if (err || !user)
    return res.status('401').json({
      error: 'User with that Email Does Not Exist'
    })
    //Generate a token with user id and secret
    const token = jwt.sign({ _id: user._id, iss: process.env.APP_NAME}, process.env.JWT_SECRET)
    //Email Data
    const emailData = {
      from: 'noreply@node-react.com',
      to: email,
      subject: 'Password Reset Instructions',
      text: `Please use the following link to reset your password: ${
        process.env.CLIENT_URL
      }/reset-password/${token}`,
      html: `<p>Please use the following link to reset your password:</p> <p>${
        process.env.CLIENT_URL
      }/reset-password/${token}</p>`
    }
    return user.updateOne({ resetPasswordLink: token }, (err, success) => {
      if (err){
        return res.json({ message: err })
      }else{
        sendEmail(emailData)
        return res.status(200).json({
          message: `Email has been sent to ${email}. Follow the instructions to reset your password.`
        })
      }
    })
  })
}