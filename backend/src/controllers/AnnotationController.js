const Annotations = require('../models/AnnotationData')
module.exports = {
    async read(req,res){
        const annotationList = await Annotations.find().lean(); //Ler
        return res.json(annotationList)
    },
    async create(req,res){
        const {title,notes,priority} = req.body;

        if(!notes || ! title){
          return  res.status(400).json({error: "É necessario um Titulo e uma anotação"})
        }
        //Criar
        const annotationCreated = await Annotations.create({
            title,
            notes,
            priority
        })
        return res.json(annotationCreated)
    },
    //Delete

    async delete(req,res){
        
    const {id} = req.params
    const annotationDeleted = await Annotations.findOneAndDelete({_id: id})

    if(annotationDeleted){
        return res.json(annotationDeleted)
    }
    return res.status(401).json({error: "Não foi possivel encontrar o registro para deletar"})
    
   }
}