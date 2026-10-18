const mongoose = require('mongoose')


const locationSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    type: {
        type: String,
        required: true
    },
    description:{
        type : String,
        required: true
    },
    latitude:{
        type: Number,
        required : false
    },
    longitude:{
        type: Number,
        required : false
    }
})

const location = mongoose.model('Location',locationSchema)
module.exports = location