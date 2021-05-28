const mongoose = require('mongoose');
const speciality = require('./speciality.model')
const userSchema = new mongoose.Schema({
	firstname:String,
	lastname:String,
	email: String,
	password:String,
	role:String,
    date:Date,
    speciality_id:{
        type:mongoose.Schema.Types.ObjectId,ref:speciality
    },
	docVerif:Object,
	about:String,
	short_description:String,
	facebook:String,
	youtube:String,
	linkedin:String,
	photo:{},
	isOk:{ type: Boolean, default:false },

	createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);