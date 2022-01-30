const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VendorSchema = new Schema({
	name: {
		type: String,
		maxlength: 50,
		minlength: 3,
		trim:true,
		match: [/^[a-zA-Z]+$/, 'is invalid'],

		required: [true,"Can't be left blank"]
		
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	phone: {
		type: Number,
		
	},
	
	opentime: {
		type: String
		

	},
	closetime: {
		type: String
	},
	type: {
		type: String,
		enum: ['JC', 'VC','BBC']
	}
});

module.exports = Vendor = mongoose.model("Vendors", VendorSchema);
