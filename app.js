// Packages
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

// App setup
const app = express();
const PORT = 3000;
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true if using HTTPS
  }),
);

// Database connection
const connectDB = require("./config/db");
connectDB(process.env.MONGO_URI);

// Route Imports
const defaultRouter = require("./router/defaultRouter");
const userRouter = require("./router/userRouter");
const vurderingRouter = require("./router/vurderingRouter");

// Routes
app.use(defaultRouter);
app.use(userRouter);
app.use(vurderingRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
