const mongoose = require('mongoose');
const user = require('./user');
const course = require('./course.model')

const startQcmSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,ref:user
    },
    course_id:{
        type:mongoose.Schema.Types.ObjectId,ref:course
    },
 
    score:String,

    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StartQcm', startQcmSchema );