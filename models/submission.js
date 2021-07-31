const mongoose = require('mongoose')

const submissionSchema = mongoose.Schema({

    assignment: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Assignment"
    },

    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Student"
    },

    fileURL:{
        type:String
    },

    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Subject"
    },

    timeStamp:{
        type: String
    },

    disable: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('Submission', submissionSchema)