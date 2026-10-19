
const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  latitude: {
    type: Number,
    min: -90,
    max: 90
  },
  longitude: {
    type: Number,
    min: -180,
    max: 180
  },
  imageUrl: {
    type: String,
    default: ''
  },
  region: {
    type: String,
    default: 'Moon'
  },
  facts: {
    type: [String],
    default: []
  },
  sourceUrl: {
    type: String,
    default: ''
  }
})

module.exports = mongoose.model('Location', locationSchema)
