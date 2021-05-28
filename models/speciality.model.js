const mongoose = require('mongoose');

const specialitySchema = new mongoose.Schema({
	speciality_name_fr:String,
    speciality_name_en:String,
    speciality_name_ar:String,
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('speciality', specialitySchema );