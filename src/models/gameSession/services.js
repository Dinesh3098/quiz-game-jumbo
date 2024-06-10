const GameSession = require("./index");

exports.gameSessionInsert = async (data) => {
    try {
        const gameSession = await GameSession.save(data);
        return gameSession;
    } catch (error) {
        throw error;
    }
};