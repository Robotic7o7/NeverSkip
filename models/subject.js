const mongoose = require('mongoose')

const subjectSchema = mongoose.Schema({
    subjectName: {
        type: String
    },

    status:{
        type:Boolean
    }

})

module.exports = mongoose.model('Subject', subjectSchema)