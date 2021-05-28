const Filiere = require('../models/filiere.model');

exports.createFiliere = (req, res) => {
    const filiere = new Filiere(req.body)
    filiere.save().then((result) => {
        res.end()
    })


}

exports.updateFiliere = (req, res) => { 
 
    Filiere.updateOne({_id:req.body._id},req.body)
    .then((result) => {res.end()})
}



exports.getAllFiliere = (req, res) => { 
    Filiere.find()
    .sort({'createdOn':-1}).exec()
    .then((result) => {res.json(result)})
}

exports.getFiliereById = (req, res) => { 
    Cours.findOne({_id:req.params._id})
    .then((result) => {res.json(result)})
}

exports.deleteOneFiliere = (req, res) => {
    const id =req.params._id
    Filiere.deleteOne({_id:id})
    .then((result) => {res.end()})
     }

exports.deleteSelectionFiliere = (req, res) => {

     Filiere.deleteMany({_id:{$in:req.body}})
    .then((result) => {res.end()})

 }



exports.searchFiliere = (req, res) => { 
    Filiere.find({filiere_name:{$regex:'.*'+ req.params.filiere_name_search+'.*'}})
    .then((result) => {res.json(result)})
}
