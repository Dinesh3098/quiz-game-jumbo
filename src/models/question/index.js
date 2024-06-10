const mongoose = require("mongoose");
const questionSchema = require("./schema");

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
