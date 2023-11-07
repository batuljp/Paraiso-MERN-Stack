const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
    propertyId: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true
    },

    comment: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Feedback', feedbackSchema)