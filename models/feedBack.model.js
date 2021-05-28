const mongoose = require('mongoose');
const User = require('./user')

const feedBackSchema = new mongoose.Schema({


    
    description:String,
    email:String,

    user_id:{
        type:mongoose.Schema.Types.ObjectId,ref:User
    },
   capture:{},
   createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedBackSchema);