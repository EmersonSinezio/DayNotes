const Annotations = require('../models/AnnotationData')
const {update} = require('../models/AnnotationData')

module.exports = {
    async read(req,res){
        const priority = req.query;
        const priorityNotes = await Annotations.find(priority).lean()
        return res.json(priorityNotes)
    },
    async update(req,res){
        const {id} = req.params
        const Annotation = await Annotations.findOne({_id: id})
        if(Annotation.priority){
            Annotation.priority = false
        }else{
            Annotation.priority = true
        }
        await Annotation.save();
        return res.json(Annotation);
    }
}