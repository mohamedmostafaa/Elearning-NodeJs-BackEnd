const Like = require('../models/like.model');



exports.createLike= (req, res) => {
    const like = new Like(req.body)
    like.save().then((result) => {
        res.send(result)
    })


}


exports.getAllLikes = (req, res) => {
    Like.find()
        .populate('user_id')
        . populate('question_id')
        .populate( 'reponse_id').
        
        then((result) => { res.json(result) })
}

exports.deleteOneLike= (req, res) => {
  if(req.params.question_id !='undefined'){
var cond= {
    user_id:req.params.user_id,question_id:req.params.question_id
}

  }
  else {
    var cond= {
        user_id:req.params.user_id,reponse_id:req.params.reponse_id
    }
  }
    Like.deleteOne(cond)
   

    .then((result) => {
        res.end()
    })


}



