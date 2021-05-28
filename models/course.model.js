const mongoose = require('mongoose');
const coursetype = require('./courseType.model');
const category = require('./category.model');
const filiere = require('./filiere.model');
const speciality = require('./speciality.model');
const user = require('./user');


   //_id:mongoose.Schema.Types.ObjectId,
const courseSchema = new mongoose.Schema({
 
	course_name:String,
    subtitle:String,
    description:String,
    type_id :{
        type:mongoose.Schema.Types.ObjectId,ref:coursetype
    },
    category_id:{
        type:mongoose.Schema.Types.ObjectId,ref:category 
    },
    filiere_id :{
        type:mongoose.Schema.Types.ObjectId,ref:filiere
    },
    speciality_id:{
        type:mongoose.Schema.Types.ObjectId,ref:speciality
    },
    price:Number,
    cover:{},
    content:{},
    
    teacher_id:{
        type:mongoose.Schema.Types.ObjectId,ref:user
    },

    createdOn: { type: Date, default: Date.now },
    updatedOn:{ type: Date, default: Date.now },
});

module.exports = mongoose.model('course', courseSchema );