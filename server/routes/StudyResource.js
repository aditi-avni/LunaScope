
const express = require('express')
const mongoose = require('mongoose')
const StudyResource = require('../models/StudyResource')
const auth = require('../middleware/auth')

const router = express.Router()

// Every route requires login
router.use(auth)

// GET: Fetch the logged-in user's resources
router.get('/', async (req, res) => {
  try {
    const resources = await StudyResource.find({
      user: req.userId
    }).sort({ createdAt: -1 })

    res.json(resources)
  } catch (err) {
    res.status(500).json({
      message: 'Unable to fetch study resources'
    })
  }
})

// POST: Save a new study resource
router.post('/', async (req, res) => {
  try {
    const { name, url, notes = '' } = req.body

    if (
      typeof name !== 'string' ||
      !name.trim() ||
      typeof url !== 'string' ||
      !url.trim() ||
      typeof notes !== 'string'
    ) {
      return res.status(400).json({
        message: 'Name and URL are required'
      })
    }

    let parsedUrl

    try {
      parsedUrl = new URL(url.trim())
    } catch {
      return res.status(400).json({
        message: 'Enter a valid website URL'
      })
    }

    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return res.status(400).json({
        message: 'Only HTTP and HTTPS URLs are allowed'
      })
    }

    if (
      name.trim().length > 100 ||
      url.trim().length > 2048 ||
      notes.trim().length > 500
    ) {
      return res.status(400).json({
        message: 'One or more fields exceed the allowed length'
      })
    }

    const resource = await StudyResource.create({
      user: req.userId,
      name: name.trim(),
      url: url.trim(),
      notes: notes.trim()
    })

    res.status(201).json(resource)
  } catch (err) {
    res.status(500).json({
      message: 'Unable to save study resource'
    })
  }
})

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid resource ID'
      })
    }

    const resource = await StudyResource.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    })

    if (!resource) {
      return res.status(404).json({
        message: 'Study resource not found'
      })
    }

    res.json({
      message: 'Study resource deleted successfully'
    })
  } catch (err) {
    res.status(500).json({
      message: 'Unable to delete study resource'
    })
  }
})

module.exports = router
