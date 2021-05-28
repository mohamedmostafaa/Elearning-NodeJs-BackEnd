const mongoose = require('mongoose');
const user = require('./user');
const course = require('./course.model')
const participateSchema = new mongoose.Schema({
	
   user_id:{
        type:mongoose.Schema.Types.ObjectId,ref:user
    },
    course_id:{
        type:mongoose.Schema.Types.ObjectId,ref:course
    },
 
    createdOn: { type: Date, default: Date.now },
    
    rating:Number,
    review:String,

    cartType:String,
    cartNumber:String
});

module.exports = mongoose.model('participate', participateSchema);