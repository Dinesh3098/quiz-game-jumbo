const mongoose = require("mongoose");
const gameStateSchema = require("./schema");

const GameState = mongoose.model("GameState", gameStateSchema);

module.exports = GameState;
