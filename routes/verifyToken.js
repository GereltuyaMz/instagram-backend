const jwt = require("jsonwebtoken");

// Middleware function to protect private routes
const verify = (request, response, next) => {
	// get token from header
	const token = request.header("auth-token");
	if (!token) return response.status(401).send("Access Denied");

	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		request.user = verified;
	} catch (error) {
		response.status(400).send("Invalid token");
	}
};
