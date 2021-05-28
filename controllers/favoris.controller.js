const Favoris = require('../models/favoris.model');



exports.createFavoris= (req, res) => {
Favoris.findOne({course_id:req.body.course_id,user_id:req.body.user_id})
.then((fav)=>{
    if(fav){
        res.send({"msg":"Deja ajouter aux listes de fav"});

    }else {
        const favoris = new Favoris(req.body)
        favoris.save().then((result) => {
            res.send(result)
        })

    }
})

  


}


exports.getAllFavoris = (req, res) => {
    Favoris.find()
        .populate('user_id')
        . populate({
            path :'course_id',
           populate: {path : 'teacher_id'}})
        .sort({'createdOn':-1}).exec()
        .then((result) => { res.json(result) })
}

exports.deleteSelectionFavoris = (req, res) => {

    Favoris.deleteMany({ user_id:req.params.user_id})
        .then((result) => { res.end() })

}


exports.deleteOneFavoris= (req, res) => {
  
    Favoris.deleteOne({user_id:req.params.user_id,
        course_id:req.params.course_id})
    .then((result) => {
        res.end()
    })


}
