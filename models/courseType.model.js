const mongoose = require('mongoose');

const courseTypeSchema = new mongoose.Schema({
	courseType_name_fr:String,
    courseType_name_en:String,
    courseType_name_ar:String,
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('courseType', courseTypeSchema );