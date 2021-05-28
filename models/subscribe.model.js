const mongoose = require('mongoose');
const User = require('./user')
const subscribeSchema = new mongoose.Schema({


    student_id:{
        type:mongoose.Schema.Types.ObjectId,ref:User
    },
    teacher_id:{
        type:mongoose.Schema.Types.ObjectId,ref:User
    },


	createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Subscribe', subscribeSchema);