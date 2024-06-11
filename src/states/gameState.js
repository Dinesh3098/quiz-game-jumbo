let gameStates = {}

const addGameState = (gameId, userId1, socketId1, userId2, socketId2) => {
    console.log("gameId, userId1, socketId1, userId2, socketId2", gameId, userId1, socketId1, userId2, socketId2)
    gameStates[gameId] = {};
    gameStates[gameId][userId1] = socketId1;
    gameStates[gameId][userId2] = socketId2;
    console.log("gameStates", gameStates)
    return gameStates;
}

const removeGameState = (gameId) => {
    const deletedGameState = gameStates[gameId];
    delete gameStates[gameId];
    return deletedGameState;
}

const getGameState = (gameId) => {
    console.log("gameStates",gameStates)
    console.log("gameId",gameId)
    return gameStates[gameId];
}

module.exports = {
    addGameState,
    removeGameState,
    getGameState,
}