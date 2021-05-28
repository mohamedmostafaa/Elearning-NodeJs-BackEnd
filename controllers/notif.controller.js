const Notif = require('../models/notif.model');

exports.getAllNotifByUserId= (req, res) => {
   
    Notif.find({user_id:req.params.user_id}).sort({'createdOn':-1})
   
    
    .populate({
         path :'course_id',
        populate: {path : 'teacher_id'}})
      
        .then((result) => {
        res.send(result)
    })


}

exports.markAsSeen= (req, res) => {
   
    Notif.update({user_id:req.params.user_id,course_id:req.params.course_id},{isSeen:true}).then((result) => {
        res.end()
    })


}