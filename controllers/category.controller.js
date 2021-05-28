const Category = require('../models/category.model');

exports.createCategory = (req, res) => {
    const category = new Category(req.body)
    category.save().then((result) => {
        res.end()
    })


}

exports.updateCategory  = (req, res) => { 
 
    Category.updateOne({_id:req.body._id},req.body)
    .then((result) => {res.end()})
}



exports.getAllCategory = (req, res) => { 
    Category.find()
    .sort({'createdOn':-1}).exec()
    .then((result) => {res.json(result)})
}

exports.getCategoryById = (req, res) => { 
    Category.findOne({_id:req.params._id})
    .then((result) => {res.json(result)})
}

exports.deleteOneCategory  = (req, res) => {
    const id =req.params._id
    Category.deleteOne({_id:id})
    .then((result) => {res.end()})
     }

exports.deleteSelectionCategory  = (req, res) => {

    Category.deleteMany({_id:{$in:req.body}})
    .then((result) => {res.end()})

 }

// exports.getCoursByType = (req, res) => { 
//     Cours.find({type_id:req.params._idType})
//     .then((result) => {res.json(result)})
// }

// exports.getCoursByCategory = (req, res) => {
//     Cours.find({category_id:req.params._idCategory})
//     .then((result) => {res.json(result)})
//  }

exports.searchCategory  = (req, res) => { 
    Category.find({category_name:{$regex:'.*'+ req.params.category_name_search+'.*'}})
    .then((result) => {res.json(result)})
}
