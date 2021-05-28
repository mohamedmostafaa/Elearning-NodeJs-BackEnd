const mongoose = require('mongoose');
const coursContent = require('./cours-content.model');

const lectureContentSchema = new mongoose.Schema({
	duration:String,
    title:String,
    volume:String,
    description:String,
    file:{},
    course_content_id :{
        type:mongoose.Schema.Types.ObjectId,ref:coursContent
    },
   

    createdOn: { type: Date, default: Date.now },
    updatedOn:{ type: Date, default: Date.now },
});

module.exports = mongoose.model('lectureContent', lectureContentSchema );