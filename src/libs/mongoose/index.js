require("dotenv").config();
const mongoose = require("mongoose");

// Function to connect to the MongoDB database
const connectToDB = () =>
    mongoose
        .connect(process.env.MONGO_URL, {
        })
        .then(() => console.log("connected to mongodb"))
        .catch(console.error);

module.exports = connectToDB;
