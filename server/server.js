
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRouter = require('./routes/auth')
const bookmarksRouter = require('./routes/bookmarks')
const studyResourcesRouter = require('./routes/StudyResource')
const locationsRouter = require('./routes/locations')

const server = express()

server.use(express.json())
server.use(cors())

let connectionPromise

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGO_URI)
      .catch((err) => {
        connectionPromise = null
        throw err
      })
  }

  return connectionPromise
}

server.use(async (req, res, next) => {
  try {
    await connectDB()
    next()
  } catch (err) {
    console.error('MongoDB connection failed:', err.message)
    res.status(500).json({ message: 'Database connection failed' })
  }
})

server.use('/api/locations', locationsRouter)
server.use('/api/auth', authRouter)
server.use('/api/bookmarks', bookmarksRouter)
server.use('/api/study-resources', studyResourcesRouter)

// Start a local server only when running this file directly
if (require.main === module) {
  server.listen(process.env.PORT || 3000, () => {
    console.log('Server running locally')
  })
}

module.exports = server
