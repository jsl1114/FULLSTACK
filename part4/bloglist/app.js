const config = require('./utils/config')
const { info, error } = require('./utils/logger')
const middleware = require('./utils/middleware')
require('express-async-errors')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

mongoose.set('strictQuery', false)

info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    info('Connected to MongoDB')
  })
  .catch((err) => {
    err('error connecting to mongoDB: ', err.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))

app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app
