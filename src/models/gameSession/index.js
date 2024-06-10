const mongoose = require("mongoose");
const gameSessionSchema = require("./schema");

const GameSession = mongoose.model("GameSession", gameSessionSchema);

module.exports = GameSession;
