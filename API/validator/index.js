const { isLength } = require("lodash")

exports.createPostValidator = (req, res, next) => {
  //Title
  req.check('title', 'Write a Title').notEmpty()
  req.check('title', 'Title Must be Between 4 to 150 Characters').isLength({
    min: 4,
    max: 150
  })
  //Body
  req.check('body', 'Write a Body').notEmpty()
  req.check('body', 'Body Must be Between 4 to 5000 Characters').isLength({
    min: 4,
    max: 5000
  })
  //Check for Errors
  const errors = req.validationErrors()
  //If Error show the first one as they happen
  if (errors){
    const firstError = errors.map(error => error.msg)[0]
    return res.status(400).json({ error: firstError })
  }
  next()
}

exports.userSignupValidator = (req, res, next) => {
  //Name is not null and between 4-20 characters
  req.check('name', 'Name is Required').notEmpty()
  //Email is Not null Valid and normalized
  req.check('email', 'Email Must be Between 5 to 40 Characters')
    .matches(/.+\@.+\..+/)
    .withMessage('Email Must Contain @')
    .isLength({
      min: 4,
      max: 5000
  })
  //Check for Password
  req.check('password', 'Password is Required').notEmpty()
  req.check('password')
    .isLength({ min: 6 })
    .withMessage('Password Must Contain at Least 6 Characters')
    .matches(/\d/)
    .withMessage('Password Must Contain a Number')
  //Check for errors
  const errors = req.validationErrors()
  //If error show the first one as they happen
  if (errors){
    const firstError = errors.map(error => error.msg)[0]
    return res.status(400).json({ error: firstError })
  }
  next()
}

exports.userSigninValidator = (request, response, next) => {
  request 
    .check('email', 'Email Must be Between 5 to 40 Characters')
    .matches(
      /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    )
    .withMessage('Please Type Your Valid Email Address')
    isLength({
      min: 5,
      max: 40
    })
    request.check('password', 'Invalid Social Login Token!').notEmpty()
    request
    .check('password')
		.isLength({ min: 6 })
		.withMessage('Your Social Login Token is Invalid!')
    const errors = request.validationErrors()
    if (errors){
      const firstError = errors.map(error => error.msg)[0]
      return res.status(400).json({ error: firstError })
    }
    next()
}

exports.passwordResetValidator = (req, res, next) => {
  // check for password
	req.check('newPassword', 'Password is required').notEmpty()
	req.check('newPassword')
  .isLength({ min: 6 })
  .withMessage('Password must be at least 6 chars long')
  .matches(
    /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
  )
  .withMessage('must contain a number')
  .withMessage('Password must contain a number')
  //Check for Errors
  const errors = req.validationErrors()
	// if error show the first one as they happen
  if (errors){
    const firstError = errors.map(error => error.msg)[0]
		return res.status(400).json({ error: firstError })
  }
  next()
}