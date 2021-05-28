const mongoose = require('mongoose');
const user = require('./user');
const course = require('./course.model')

const visiteSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,ref:user
    },
    course_id:{
        type:mongoose.Schema.Types.ObjectId,ref:course
    },
 
    ip_adress:String,
    createdOn:String
});

module.exports = mongoose.model('Visite', visiteSchema );