const GameState = require("./index");

exports.gameStateInsert = async (data) => {
    try {
        const gameState = await GameState.create(data);
        return gameState;
    } catch (error) {
        throw error;
    }
};

exports.gameStateById = async (data) => {
    try {
        const gameState = await GameState.findOne(data)
        return gameState;
    } catch (error) {
        throw error;
    }
};