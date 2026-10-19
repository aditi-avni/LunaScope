
const mongoose = require('mongoose')

const studyResourceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    url: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2048
    },
    notes: {
      type: String,
      trim: true,
      default: '',
      maxlength: 500
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('StudyResource', studyResourceSchema)
