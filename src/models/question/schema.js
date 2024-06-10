const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
    {
        text: { type: String, required: true },
        choices: [{ type: String, required: true }],
        correctAnswer: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

module.exports = questionSchema;
