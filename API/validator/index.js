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

