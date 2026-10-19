
const express = require('express')
const router = express.Router()
const Location = require('../models/locations')


router.get('/', async (req, res) => {
    try {
        const { search, type, region, minLat, maxLat, minLon, maxLon } = req.query

        const query = {}

        // Search by location name
        if (search) {
            query.name = {
                $regex: search,
                $options: 'i'
            }
        }

        // Filter by terrain type
        if (type) {
            query.type = type
        }

        // Filter by region
        if (region) {
            query.region = region
        }

        // Validate coordinate parameters
        const coordinateParams = { minLat, maxLat, minLon, maxLon }

        for (const [key, value] of Object.entries(coordinateParams)) {
            if (value !== undefined && (value.trim() === '' || !Number.isFinite(Number(value)))) {
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

        // Filter by latitude range
        if (minLatitude !== undefined || maxLatitude !== undefined) {
            query.latitude = {}
            if (minLatitude !== undefined) query.latitude.$gte = minLatitude
            if (maxLatitude !== undefined) query.latitude.$lte = maxLatitude
        }

        // Filter by longitude range
        if (minLongitude !== undefined || maxLongitude !== undefined) {
            query.longitude = {}
            if (minLongitude !== undefined) query.longitude.$gte = minLongitude
            if (maxLongitude !== undefined) query.longitude.$lte = maxLongitude
        }

        const locations = await Location.find(query)
        res.json(locations)

    } catch (err) {
        console.error('Location query failed:', err.message)
        res.status(500).json({
            message: 'Unable to access database'
        })
    }
})


router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const found = await Location.findById(id)

        if (!found) {
            return res.status(404).json({ message: "Location not found" })
        }

        res.json(found)
    } catch (err) {
        res.status(500).json({ message: "Unable to get data" })
    }
})

router.put("/:id",async (req,res) => {
    try{
        const id = req.params.id
        const info = req.body
        const updateddata = await Location.findByIdAndUpdate(id,info, {new:true})
        if(!updateddata){
            return res.status(404).json({message : "unable to find the data"})
        }
        res.json(updateddata)
    }catch{
        res.status(500).json({ message: "Unable to get data" })

    }
})

router.post('/', async (req, res) => {
    try {
        const data = req.body
        const datareturn = await Location.create(data)
        res.status(201).json(datareturn)
    } catch (err) {
        res.status(500).json({ message: "Unable to send data" })
    }
})

router.delete("/:id",async (req,res) => {
    try{
        const id = req.params.id
        const deleteindex = await Location.findByIdAndDelete(id)
        if(!deleteindex){
            return res.status(404).json({message : "unable to find the data"})
        }
        res.json({message : "data deleted"})
    }catch{
        res.status(500).json({ message: "Unable to get data" })

    }
})

module.exports = router

