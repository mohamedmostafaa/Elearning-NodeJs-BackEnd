const mongoose = require('mongoose');
const User = require('./user')

const sockSchema = new mongoose.Schema({
    
    send_id:{
        type:mongoose.Schema.Types.ObjectId,ref:User
    },
 
    rec_id:{
        type:mongoose.Schema.Types.ObjectId,ref:User
    },
    msg:String,
    isSeen:{ type: Boolean, default: false },
	createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sock', sockSchema);
