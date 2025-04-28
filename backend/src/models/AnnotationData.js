const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnnotationDataSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    nomes: String,
    notes: {
        type: String,
        required: true,
        trim: true
    },
    priority: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Annotations', AnnotationDataSchema)

