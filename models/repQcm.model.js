const mongoose = require('mongoose');
const testQcm= require('./testQcm.model');


const repQcmSchema = new mongoose.Schema({
   
 
    reponse:String,
    isValid:Boolean,
    qcm_id:{
        type:mongoose.Schema.Types.ObjectId,ref:testQcm
    },
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RepQcm', repQcmSchema );