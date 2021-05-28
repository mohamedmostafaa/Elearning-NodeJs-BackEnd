const mongoose = require('mongoose');
const user = require('./user');
const question = require('./question.model')

const reponseSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,ref:user
    },
    question_id:{
        type:mongoose.Schema.Types.ObjectId,ref:question
    },
 
    reponse:String,
    isValid:Boolean,
    votes:[],
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reponse',  reponseSchema );