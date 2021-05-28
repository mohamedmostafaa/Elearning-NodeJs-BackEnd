const Subscribe = require('../models/subscribe.model');

exports.createSubscribe= (req, res) => {
    const subscribe = new Subscribe(req.body)
    subscribe.save()
    
    .then((result) => {
        res.end()
    })


}


exports.createUnSubscribe= (req, res) => {
  
    Subscribe.deleteOne({teacher_id:req.params.teacher_id,
        student_id:req.params.student_id})
    .then((result) => {
        res.end()
    })


}

exports.getTeacherSub= (req, res) => {
  
    Subscribe.find({teacher_id:req.params.teacher_id})
 
    .populate('student_id')
    
    .then((result) => {
        res.send(result)
    })


}
exports.getStudentSub= (req, res) => {
  
    Subscribe.find({student_id:req.params.student_id})
    
    .populate('teacher_id')
    .then((result) => {
        res.send(result)
    })


}