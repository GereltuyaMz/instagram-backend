const validator = require("validator");
const mongoose = require("mongoose");
const { isEmail } = validator;
const { Schema } = mongoose;

const userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	email: {
		type: String,
		required: true,
		lowercase: true,
		validate: [isEmail, "invalid email"],
	},
	password: {
		type: String,
		required: true,
	},
	createAt: { type: Date, default: Date.now },
	lastLogin: { type: Date },
});

module.exports = mongoose.model("user", userSchema);
