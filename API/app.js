const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const fs = require('fs')
const cors = require('cors')
const dotenv = require('dotenv')
const chalk = require('chalk')
const colors = require('colors')

const app = express()

dotenv.config()

//config dB
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.table('DB Connected'.brightMagenta.inverse))

mongoose.connection.on('error', err => {
  console.table(`DB connection error: ${err.message}`)
})