require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const server = express()

// Disable buffering when MongoDB is unavailable
mongoose.set('bufferCommands', false)

// Import routes
const authRouter = require('./routes/auth')
const bookmarksRouter = require('./routes/bookmarks')
const studyResourcesRouter = require('./routes/StudyResource')
const locationsRouter = require('./routes/locations')

// Middleware
server.use(express.json())
server.use(cors())

// API routes
server.use('/api/locations', locationsRouter)
server.use('/api/auth', authRouter)
server.use('/api/bookmarks', bookmarksRouter)
server.use('/api/study-resources', studyResourcesRouter)

// Connect to MongoDB only if a connection string exists
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.error('MongoDB connection failed:', err.message))
} else {
  console.log('MongoDB not configured. Database features unavailable.')
}

// Start server independently of MongoDB
const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})