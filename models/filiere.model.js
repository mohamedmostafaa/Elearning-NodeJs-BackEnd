const mongoose = require('mongoose');

const filiereSchema = new mongoose.Schema({
	filiere_name_fr:String,
    filiere_name_en:String,
    filiere_name_ar:String,
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('filiere', filiereSchema );