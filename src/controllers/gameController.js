const GameSession = require('../models/gameSession/services');
const User = require('../models/user/services');
const Question = require('../models/question/services');
const { createResponse } = require('../utils/response');


exports.startGame = async (req, res) => {
    try {
        return createResponse(res, 201, "success", 'Game start success')
    } catch (error) {
        return createResponse(res, 400, "fail", 'Error while starting game')
    }
};