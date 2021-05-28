const Speciality = require('../models/speciality.model');

exports.createSpeciality= (req, res) => {
    const speciality = new Speciality(req.body)
    speciality.save().then((result) => {
        res.end()
    })


}

exports.updateSpeciality = (req, res) => { 
 
    Speciality.updateOne({_id:req.body._id},req.body)
    .then((result) => {res.end()})
}



exports.getAllSpeciality = (req, res) => { 
    Speciality.find()
    .sort({'createdOn':-1}).exec()
    .then((result) => {res.json(result)})
}

exports.getSpecialityById = (req, res) => { 
    Participant.findOne({_id:req.params._id})
    .then((result) => {res.json(result)})
}

exports.deleteOneSpeciality = (req, res) => {
    const id =req.params._id
    Speciality.deleteOne({_id:id})
    .then((result) => {res.end()})
     }

exports.deleteSelectionSpeciality = (req, res) => {

    Speciality.deleteMany({_id:{$in:req.body}})
    .then((result) => {res.end()})

 }



exports.searchSpeciality = (req, res) => { 
    Speciality.find({speciality_name:{$regex:'.*'+ req.params.speciality_search+'.*'}})
    .then((result) => {res.json(result)})
}
