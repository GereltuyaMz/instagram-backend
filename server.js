const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(postRoutes);

// connect to DB
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", () => {
	console.log("MongoDB database connection established successfully");
});

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
