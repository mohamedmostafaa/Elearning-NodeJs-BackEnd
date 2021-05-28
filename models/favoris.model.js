const mongoose = require('mongoose');
const User = require('./user')
const Cour = require('./course.model')
const favorisSchema = new mongoose.Schema({


    course_id:{
        type:mongoose.Schema.Types.ObjectId,ref:Cour
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,ref:User
    },


	createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Favoris', favorisSchema);