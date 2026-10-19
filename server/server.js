const cors = require('cors')
const authRouter = require('./routes/auth')
const bookmarksRouter = require('./routes/bookmarks')

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const locationsRouter = require('./routes/locations')

const server = express()

server.use(express.json())
server.use(cors())
server.use('/api/locations', locationsRouter)
server.use('/api/auth', authRouter)
server.use('/api/bookmarks', bookmarksRouter)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected!')
    server.listen(3000, () => {
      console.log('Server running on port 3000')
    })
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err.message)
  })
