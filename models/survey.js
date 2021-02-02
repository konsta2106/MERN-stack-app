const mongoose = require('mongoose')
const recipientSchema = require('./recipient')

const surveySchema = new mongoose.Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [recipientSchema],
    yes: {
        type: Number,
        default: 0
    },
    no: {
        type: Number,
        default: 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    dateSent: Date,
    lastResponded: Date
})

mongoose.model('survey', surveySchema)