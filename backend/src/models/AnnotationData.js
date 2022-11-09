const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnnotationDataSchema = new Schema({
    title: String,
    nomes: String,
    notes: String,
    priority: Boolean
})

module.exports = mongoose.model('Annotations', AnnotationDataSchema)