// Packages
const express = require("express");

// App setup
const app = express();
const PORT = 3000;
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
require("dotenv").config();

// Database connection
const connectDB = require("./config/db");
connectDB(process.env.MONGO_URI);

// Route Imports
const defaultRouter = require("./router/defaultRouter");
app.use(defaultRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
