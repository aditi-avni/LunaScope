
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Location = require('../models/locations')

// Escape special characters in search input
const escapeRegex = (value) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// Validate MongoDB document IDs
const isValidId = (id) => mongoose.isValidObjectId(id)

// Validate location input using the existing schema
const validateLocation = (data) => {
    const allowedFields = [
        'name',
        'type',
        'description',
        'latitude',
        'longitude',
        'imageUrl',
        'region',
        'facts',
        'sourceUrl'
    ]

    const filtered = {}

    for (const field of allowedFields) {
        if (Object.prototype.hasOwnProperty.call(data, field)) {
            filtered[field] = data[field]
        }
    }

    return filtered
}

// GET all locations with search and filters
router.get('/', async (req, res) => {
    try {
        const {
            search, type, region,
            minLat, maxLat, minLon, maxLon
        } = req.query

        const query = {}

        if (search) {
            query.name = {
                $regex: escapeRegex(search),
                $options: 'i'
            }
        }

        if (type) query.type = type
        if (region) query.region = region

        const coordinates = { minLat, maxLat, minLon, maxLon }

        for (const [key, value] of Object.entries(coordinates)) {
            if (
                value !== undefined &&
                (value.trim() === '' || !Number.isFinite(Number(value)))
            ) {
                return res.status(400).json({
                    message: `Invalid coordinate parameter: ${key}`
                })
            }
        }

        const minLatitude = minLat === undefined ? undefined : Number(minLat)
        const maxLatitude = maxLat === undefined ? undefined : Number(maxLat)
        const minLongitude = minLon === undefined ? undefined : Number(minLon)
        const maxLongitude = maxLon === undefined ? undefined : Number(maxLon)

        if (
            (minLatitude !== undefined && (minLatitude < -90 || minLatitude > 90)) ||
            (maxLatitude !== undefined && (maxLatitude < -90 || maxLatitude > 90)) ||
            (minLongitude !== undefined && (minLongitude < -180 || minLongitude > 180)) ||
            (maxLongitude !== undefined && (maxLongitude < -180 || maxLongitude > 180))
        ) {
            return res.status(400).json({
                message: 'Coordinates are outside valid latitude or longitude ranges'
            })
        }

        if (
            (minLatitude !== undefined && maxLatitude !== undefined && minLatitude > maxLatitude) ||
            (minLongitude !== undefined && maxLongitude !== undefined && minLongitude > maxLongitude)
        ) {
            return res.status(400).json({
                message: 'Minimum coordinates cannot exceed maximum coordinates'
            })
        }

        if (minLatitude !== undefined || maxLatitude !== undefined) {
            query.latitude = {}
            if (minLatitude !== undefined) query.latitude.$gte = minLatitude
            if (maxLatitude !== undefined) query.latitude.$lte = maxLatitude
        }

        if (minLongitude !== undefined || maxLongitude !== undefined) {
            query.longitude = {}
            if (minLongitude !== undefined) query.longitude.$gte = minLongitude
            if (maxLongitude !== undefined) query.longitude.$lte = maxLongitude
        }

        const locations = await Location.find(query)
        res.json(locations)
    } catch (err) {
        console.error('Location query failed:', err.message)
        res.status(500).json({ message: 'Unable to access database' })
    }
})

// GET one location
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params

        if (!isValidId(id)) {
            return res.status(400).json({ message: 'Invalid location ID' })
        }

        const location = await Location.findById(id)

        if (!location) {
            return res.status(404).json({ message: 'Location not found' })
        }

        res.json(location)
    } catch (err) {
        console.error('Get location failed:', err.message)
        res.status(500).json({ message: 'Unable to retrieve location' })
    }
})

// CREATE a location (development only; protect before deployment)
router.post('/', async (req, res) => {
    try {
        const data = validateLocation(req.body)

        if (!data.name || !data.type || !data.description) {
            return res.status(400).json({
                message: 'Name, type, and description are required'
            })
        }

        const location = await Location.create(data)
        res.status(201).json(location)
    } catch (err) {
        console.error('Create location failed:', err.message)

        if (err.name === 'ValidationError' || err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid location data' })
        }

        res.status(500).json({ message: 'Unable to create location' })
    }
})

// UPDATE a location (development only; protect before deployment)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params

        if (!isValidId(id)) {
            return res.status(400).json({ message: 'Invalid location ID' })
        }

        const data = validateLocation(req.body)

        if (Object.keys(data).length === 0) {
            return res.status(400).json({
                message: 'No valid location fields provided'
            })
        }

        const location = await Location.findByIdAndUpdate(
            id,
            { $set: data },
            {
                new: true,
                runValidators: true,
                strict: 'throw'
            }
        )

        if (!location) {
            return res.status(404).json({ message: 'Location not found' })
        }

        res.json(location)
    } catch (err) {
        console.error('Update location failed:', err.message)

        if (err.name === 'ValidationError' || err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid location data' })
        }

        res.status(500).json({ message: 'Unable to update location' })
    }
})

// DELETE a location (development only; protect before deployment)
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        if (!isValidId(id)) {
            return res.status(400).json({ message: 'Invalid location ID' })
        }

        const location = await Location.findByIdAndDelete(id)

        if (!location) {
            return res.status(404).json({ message: 'Location not found' })
        }

        res.json({ message: 'Location deleted successfully' })
    } catch (err) {
        console.error('Delete location failed:', err.message)
        res.status(500).json({ message: 'Unable to delete location' })
    }
})

module.exports = router
