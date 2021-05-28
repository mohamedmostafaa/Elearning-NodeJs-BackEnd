const mongoose = require('mongoose');
const user = require('./user');
const course = require('./course.model')

const questionSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,ref:user
    },
    course_id:{
        type:mongoose.Schema.Types.ObjectId,ref:course
    },
 
    question:String,
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', questionSchema );