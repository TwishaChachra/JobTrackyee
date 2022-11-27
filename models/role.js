const mongoose = require('mongoose')

var roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
})

module.exports = mongoose.model('Role', roleSchema)