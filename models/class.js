const mongoose = require('mongoose')

const classSchema = mongoose.Schema({
    class: {
        type: String
    },

    section: {
        type: String,
        required: true,
    },

    key: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Class', classSchema)