const mongoose = require('mongoose')

var detailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    location: {
        type: String,
        required: 'Location is required'
    },
    role: {
        type: String,
        required: 'Role is required'
    }
})

module.exports = mongoose.model('Detail', detailSchema)