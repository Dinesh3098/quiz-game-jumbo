const GameSession = require("./index");

exports.gameSessionInsert = async (data) => {
    try {
        const gameSession = await GameSession.create(data);
        return gameSession;
    } catch (error) {
        throw error;
    }
};

exports.gameSessionById = async (data) => {
    try {
        const gameSession = await GameSession.findById(data).populate('questions');
        return gameSession;
    } catch (error) {
        throw error;
    }
};

exports.gameSessionUpdate = async (filter, update) => {
    try {
        const gameSession = await GameSession.findOneAndUpdate(filter, update)
        return gameSession;
    } catch (error) {
        throw error;
    }
};