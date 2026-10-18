
const express = require('express')
const router = express.Router()
const Location = require('../models/locations')

router.get('/', async (req, res) => {
    try {
        const locations = await Location.find()
        res.json(locations)
    } catch (err) {
        res.status(500).json({message : "unable to access database"})
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

