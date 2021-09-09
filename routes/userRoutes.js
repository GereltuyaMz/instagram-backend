const express = require("express");
const userModel = require("../models/users");
const app = express();

app.get("/users", async (request, response) => {
	const users = await userModel.find({});
	console.log('users =', users);
	try {
		response.send(users);
	} catch (error) {
		response.status(500).send(error);
	}
});

app.post("/user", async (request, response) => {
	const user = new userModel(request.body);
	console.log('user =', user);
	try {
		await user.save();
		response.send(user);
	} catch (error) {
		response.status(500).send(error);
	}
});

module.exports = app;
