const mongoose = require('mongoose')

const assignmentSchema = mongoose.Schema({

    assignment_name: {
        type: String
    },

    due_date: {
        type: String
    },

    teacherAssigned:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Teacher"
    },

    classAssigned:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Class"
    },

    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Subject"
    },

    questions: [
        {
            question_text: {
                type: String,
            },

            question_type: {
                type: String
            },

            marks:{
                type:String
            },
        }
    ],

    disable: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('Assignment', assignmentSchema)