const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
	category_name_fr:String,
    category_name_en:String,
    category_name_ar:String,
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('category', categorySchema );