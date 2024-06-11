const mongoose = require('mongoose');

// Define the schema for a game state
const gameStateSchema = new mongoose.Schema(
  {
      gameId: {
          type: String,
          required: true,
      },
      player1: {
          type: Object,
          required: true,
      },
      player2: {
          type: Object,
          required: true,
      },
      createdAt: { type: Date, default: Date.now, index: { expires: "2h" } },
  },
  {
      timestamps: true,
  }
);


module.exports = gameStateSchema;

