const mongoose = require('mongoose');
const User = require('./user')
const Cour = require('./course.model')
const notifSchema = new mongoose.Schema({


    textNotif:String,
    isSeen:{ type: Boolean, default:false },

    user_id:{
        type:mongoose.Schema.Types.ObjectId,ref:User
    },
    course_id:{
        type:mongoose.Schema.Types.ObjectId,ref:Cour
    },


	createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notif', notifSchema);