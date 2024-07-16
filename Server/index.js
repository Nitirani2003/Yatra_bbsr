const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require("cors")
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;
//const { jwtAuthMiddleware } = require('./jwt');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use('/uploads', express.static('public/uploads')); // Make sure this is correctly set

//Import the router files 
const authRoutes = require("./routes/auth.js")
const listingRoutes = require("./routes/listing.js")
const userRoutes = require("./routes/user.js")
    //Use the routes
app.use("/auth", authRoutes)
app.use("/listing", listingRoutes)
app.use("/users", userRoutes)

app.get("/", (req, res) => {
        res.send("Hello");
    })
    //Mongoose Setup
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})