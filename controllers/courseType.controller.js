const CoursType = require('../models/courseType.model');

exports.createCoursType = (req, res) => {
    const courstype = new CoursType(req.body)
    courstype.save().then((result) => {
        res.end()
    })


}

exports.updateCoursType = (req, res) => { 
  
    CoursType.updateOne({_id:req.body._id},req.body)
    .then((result) => {
        res.send(result)
    })
}






exports.getAllCoursType = (req, res) => { 
    CoursType.find()
    .sort({'createdOn':-1}).exec()
    .then((result) => {res.json(result)})
}

exports.getCoursTypeById = (req, res) => { 
    CoursType.findOne({_id:req.params._id})
    .then((result) => {res.json(result)})
}

exports.deleteOneCoursType = (req, res) => {
    const id =req.params._id
    CoursType.deleteOne({_id:id})
    .then((result) => {res.end()})
     }

exports.deleteSelectionCoursType = (req, res) => {

    CoursType.deleteMany({_id:{$in:req.body}})
    .then((result) => {res.end()})

 }





exports.searchCoursType = (req, res) => { 
    CoursType.find({courseType_name:{$regex:'.*'+ req.params.coursType_name_search+'.*'}})
    .then((result) => {res.json(result)})
}
