const mongoose = require('mongoose');

const course = require('./course.model')

const testQcmSchema = new mongoose.Schema({
   
    course_id:{
        type:mongoose.Schema.Types.ObjectId,ref:course
    },
 
    title:String,
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TestQcm', testQcmSchema );