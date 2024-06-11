const { gameSessionInsert } = require('../models/gameSession/services');
const { questionAggregate } = require('../models/question/services');
const { gameStateInsert } = require('../models/gameState/services');
const { createResponse } = require('../utils/response');
const { getReadyUsers, getConnectedUsers, readyUser, unreadyUser, removeUser } = require('../states/usersState');
const { addGameState } = require('../states/gameState');


exports.startGame = async (req, res) => {
    console.log("Request User:", req.user);
    let readyUsers = getReadyUsers();
    let connectedUsers = getConnectedUsers();

    try {
        const readyUsersCount = Object.keys(readyUsers).length;
        console.log("Ready Users Count:", readyUsersCount);

        // Check if there are enough ready users to start a game
        if (readyUsersCount >= 1) {
            const userId1 = req.user.id.toString();
            const socketId1 = connectedUsers[userId1];
            removeUser(userId1);

            const userId2 = Object.keys(readyUsers)[0]; // First-come, first-served basis
            const socketId2 = readyUsers[userId2];
            unreadyUser(userId2);

            // Get a sample of 6 questions from the question collection
            const questions = await questionAggregate([{ $sample: { size: 6 } }]);
            console.log("Questions:", questions);

            // Log the user IDs
            console.log("Player 1 ID:", userId1);
            console.log("Player 2 ID:", userId2);

            // Insert the game session into the database
            const gameSession = await gameSessionInsert({
                player1: userId1,
                player2: userId2,
                questions: questions.map(q => q._id)
            });
            console.log("Game Session:", gameSession);

            // Notify the players about the game initialization
            const io = req.app.get('socketio');
            io.to(socketId1).emit('game:init', { gameSessionId: gameSession.id });
            io.to(socketId2).emit('game:init', { gameSessionId: gameSession.id });

            // Add the game state
            addGameState(gameSession.id, userId1, socketId1, userId2, socketId2);

            const gameId = gameSession.id;
            await gameStateInsert({
                gameId: gameId,
                player1: { userId: userId1, socketId: socketId1 },
                player2: { userId: userId2, socketId: socketId2 },
            });

            return createResponse(res, 201, "success", 'Game started', { gameSessionId: gameSession.id });
        } else {
            const connectedUsersCount = Object.keys(connectedUsers).length;

            if (connectedUsersCount > 0) {
                // Mark the current user as ready
                readyUser(req.user.id);
                return createResponse(res, 201, "success", 'Waiting for other player to join', { message: 'Waiting for other player to join' });
            } else {
                
                return createResponse(res, 400, "fail", 'No connected users available.');
            }
        }
    } catch (error) {
        console.error("Error while starting game:", error);
        return createResponse(res, 400, "fail", 'Error while starting game', { error: error.message });
    }
};