const mongoose = require('mongoose');
const User = require('./user')
const Question = require('./question.model')
const Reponse = require('./reponse.model')
const likeSchema = new mongoose.Schema({
    
    user_id:{
        type:mongoose.Schema.Types.ObjectId,ref:User
    },
 
    question_id:{
        type:mongoose.Schema.Types.ObjectId,ref:Question
    },
    reponse_id:{
        type:mongoose.Schema.Types.ObjectId,ref:Reponse
    },
 

	createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Like', likeSchema);
