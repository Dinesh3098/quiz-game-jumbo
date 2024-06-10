const jwt = require('jsonwebtoken');
const { getUserById } = require("../models/user/services");
const { createResponse } = require('../utils/response');

exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return createResponse(res, 401, "fail", 'Not authorized')
    }

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await getUserById({ _id: decodedToken.userId });
        next();
    } catch (error) {
        return createResponse(res, 401, "fail", 'Not authorized')
    }
};
