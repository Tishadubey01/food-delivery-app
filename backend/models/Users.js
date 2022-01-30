const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Validator = require("../validators/register")
const bcrypt = require('bcryptjs');
// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		
		trim: true,
		maxlength: 50,
		minlength: 3,
		match: [/^[a-zA-Z]+$/, 'is invalid'],

		required: [true,"Can't be left blank"]
	},
	email: {
		
		type: String,
		unique: true,
		
		trim: true,
		required: true
	},
	password: {
		type: String,
		minlength: 5,
		required: true
	},
	phone: {
		type: Number,
		
		required: true
	},
	age: {
		type: Number,
	
		required: true,
	},
	type: {
		type: String,
		enum: ['UG1', 'UG2','UG3','UG4','UG5','PG1','PG2','CASE'],
		default: 'UG1'
	}
});
/*UserSchema.statics.encryptPassword = async(password) => {
	if(error) res.status(400).send(error);
	else {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password,salt);
	}

};
UserSchema.statics.comparePassword = async(password, receivedPassword) => {
	return await bcrypt.compare(password,receivedPassword)
}*/

module.exports = User = mongoose.model("Users", UserSchema);
