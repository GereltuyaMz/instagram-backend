const express = require("express");
const userModel = require("../models/users");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//GET USERS
app.get("/users", async (request, response) => {
	const users = await userModel.find({});
	// console.log("users =", users);
	try {
		response.send(users);
	} catch (error) {
		response.status(500).send(error);
	}
});

//REGISTER
app.post("/register", async (request, response) => {
	// check if the user is already in the db
	const emailExist = await userModel.findOne({ email: request.body.email });
	if (emailExist) return response.status(400).send("Email already exist");

	// Hash passwords
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(request.body.password, salt);

	// create new user
	const user = new userModel({
		username: request.body.username,
		email: request.body.email,
		password: hashedPassword,
	});
	// console.log("user =", user);
	try {
		await user.save();
		response.send(user);
	} catch (error) {
		response.status(500).send(error);
	}
});

// LOGIN
app.post("/login", async (request, response) => {
	// check if the user is already in the db
	const user = await userModel.findOne({ email: request.body.email });
	if (!user) return response.status(400).send("Email doesn't exist!!");
	// check if password is correct
	const validPass = await bcrypt.compare(request.body.password, user.password);
	if (!validPass) return response.status(400).send("Invalid password!!");

	// Create and assign token
	// const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
	// response.header('auth-token', token).send(token);

	response.send("Successfully logged In!");
});

module.exports = app;
