
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const User = require('../models/User')
const Location = require('../models/locations')
const authenticateToken = require('../middleware/auth')

// Get the logged-in user's saved locations
router.get('/', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId)
            .populate('savedLocations')

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.json(user.savedLocations)
    } catch (err) {
        res.status(500).json({ message: 'Unable to fetch bookmarks' })
    }
})

// Save a lunar location
router.post('/:locationId', authenticateToken, async (req, res) => {
    try {
        const { locationId } = req.params

        if (!mongoose.isValidObjectId(locationId)) {
            return res.status(400).json({ message: 'Invalid location ID' })
        }

        const location = await Location.findById(locationId)

        if (!location) {
            return res.status(404).json({ message: 'Location not found' })
        }

        const user = await User.findById(req.userId)

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        if (user.savedLocations.some(id => id.toString() === locationId)) {
            return res.status(409).json({
                message: 'Location is already bookmarked'
            })
        }

        user.savedLocations.push(location._id)
        await user.save()

        res.status(201).json({
            message: 'Location bookmarked successfully',
            location
        })
    } catch (err) {
        res.status(500).json({ message: 'Unable to save bookmark' })
    }
})

// Remove a saved location
router.delete('/:locationId', authenticateToken, async (req, res) => {
    try {
        const { locationId } = req.params

        if (!mongoose.isValidObjectId(locationId)) {
            return res.status(400).json({ message: 'Invalid location ID' })
        }

        const user = await User.findById(req.userId)

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const originalCount = user.savedLocations.length

        user.savedLocations = user.savedLocations.filter(
            id => id.toString() !== locationId
        )

        if (user.savedLocations.length === originalCount) {
            return res.status(404).json({
                message: 'Bookmark not found'
            })
        }

        await user.save()

        res.json({ message: 'Bookmark removed successfully' })
    } catch (err) {
        res.status(500).json({ message: 'Unable to remove bookmark' })
    }
})

module.exports = router
