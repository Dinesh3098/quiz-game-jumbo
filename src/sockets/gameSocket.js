const { gameSessionById, gameSessionUpdate } = require('../models/gameSession/services');
const { gameStateById } = require('../models/gameState/services');
const jwt = require('jsonwebtoken');
const { addUser } = require("../states/usersState");


module.exports = (io) => {
    io.use((socket, next) => {
        // Authenticate the socket connection using JWT
        const token = socket.handshake.headers?.token;
        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) return next(new Error("Authentication error"));
                socket.decoded = decoded;
                next();
            });
        } else {
            next(new Error("Authentication error"));
        }
    }).on("connection", (socket) => {
        // Event listener for adding a user
        socket.on("adduser", ({ userId }) => {
            addUser(userId, socket.id);
        });

        // Event listener for sending a question to a user
        socket.on("question:send", async ({ gameId, userId, questionIndex }) => {
            try {
                const game = await gameSessionById({ _id: gameId });

                const question = game.questions[questionIndex];
                const gameState = await gameStateById({ gameId })

                let socketId
                if (gameState.player1.userId == userId) {
                    socketId = gameState.player1.socketId
                } else {
                    socketId = gameState.player2.socketId
                }

                io.to(socketId).emit("question", question);
            } catch (error) {
                throw new Error("Error sending question:", error);
            }
        });

        // Event listener for submitting an answer
        socket.on("answer:submit", async ({ gameId, userId, answer, questionIndex }) => {
            try {
                const game = await gameSessionById({ _id: gameId });
                
                const question = game.questions[questionIndex];
                const isCorrect = question.correctAnswer === answer;

                if (game.player1.toString() === userId) {
                    game.player1Score += isCorrect ? 1 : 0;
                } else {
                    game.player2Score += isCorrect ? 1 : 0;
                }

                await gameSessionUpdate({ _id: game._id }, game);

                // If last question, determine the winner and end the game
                if (questionIndex === 5) {
                    game.winner = game.player1Score > game.player2Score ? game.player1 : game.player2;
                    await gameSessionUpdate({ _id: game._id }, game);

                    const gameState = await gameStateById({ gameId })
                    io.to(gameState.player1.socketId).emit("game:end", { winner: game.winner, game });
                    io.to(gameState.player2.socketId).emit("game:end", { winner: game.winner, game });
                }
            } catch (error) {
                throw new Error("Error submitting answer:", error);
            }
        });

        // Event listener for disconnecting a user
        socket.on("disconnect", () => {
            removeUser(socket.id);
        });
    });
};