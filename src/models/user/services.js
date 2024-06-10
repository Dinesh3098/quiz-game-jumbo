const User = require("./index");

exports.getUser = async (data) => {
    try {
        const user = await User.findOne(data);
        return user;
    } catch (error) {
        throw error;
    }
};

exports.create = async (userData) => {
    try {
        const user = await User.create(userData);
        return user;
    } catch (error) {
        throw error;
    }
};

exports.getUserById = async (data) => {
    try {
        const user = await User.findById(data);
        return user;
    } catch (error) {
        throw error;
    }
};