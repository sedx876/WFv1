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