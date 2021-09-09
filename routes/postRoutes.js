const express = require("express");
const postModel = require("../models/posts");
const app = express();

app.get("/posts", async (request, response) => {
	const posts = await postModel.find({});
	console.log("posts =", posts);
	try {
		response.send(posts);
	} catch (error) {
		response.status(500).send(error);
	}
});

app.post("/post", async (request, response) => {
	const post = new postModel(request.body);
	console.log("post =", post);
	try {
		await post.save();
		response.send(post);
	} catch (error) {
		response.status(500).send(error);
	}
});

module.exports = app;
