const Participant = require('../models/participate.model');

exports.createParticipant= (req, res) => {
    const participant = new Participant(req.body)
    participant.save().then((result) => {
        res.end()
    })


}

exports.getAllParticipants = (req, res) => { 
    Participant.find()
  //  .sort({'createdOn':-1}).exec()
    .populate('course_id')
    .populate('user_id')
    .then((result) => {res.json(result)})
}

exports.updateParticipant = (req, res) => { 
 
    Participant.updateOne({_id:req.body._id},req.body)
    .then((result) => {res.end()})
}


//liste des participans fil cours
exports.getParticipantByCourseId = (req, res) => { 
    Participant.find({course_id:req.params.course_id})
    .then((result) => {res.json(result)})
}
//liste des cours ili user e5terhom 
exports.getParticipantByUserId = (req, res) => { 
    Participant.find({user_id:req.params.user_id})
    .then((result) => {res.json(result)})
}



exports.deleteOneParticipant = (req, res) => {
    const id =req.params._id
    Participant.deleteOne({course_id:req.params.course_id,user_id:req.params.user_id})
    .then((result) => {res.end()})
     }

