const mongoose = require('mongoose');
const cours = require('./course.model');

const coursContentSchema = new mongoose.Schema({
	duration:String,
    title:String,
    volume:String,
    course_id :{
        type:mongoose.Schema.Types.ObjectId,ref:cours
    },
   

    createdOn: { type: Date, default: Date.now },
    updatedOn:{ type: Date, default: Date.now },
});

module.exports = mongoose.model('coursContent', coursContentSchema );