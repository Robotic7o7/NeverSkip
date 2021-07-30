const mongoose = require('mongoose')

const teacherSchema = mongoose.Schema({
    name: {
        type: String
    },

    yoj: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    zoomLink: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Teacher', teacherSchema)