const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
    name: {
        type: String
    },

    dob: {
        type: String,
        required: true,
    },

    gender: {
        type: String,
        required: true,
    },

    admission_number: {
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

    classRoom: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Class",
        default:"61077a2c3fc5f80f74fd915a"
    }

})

module.exports = mongoose.model('Student', studentSchema)