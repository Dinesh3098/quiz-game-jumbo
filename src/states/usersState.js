let users = {
    connected: {},
    ready: {},
};

const addUser = (userId, socketId) => {
    userId = String(userId);
    users.connected[userId] = socketId;
    console.log("users", users)
    return users;
}

const removeUser = (userId) => {
    userId = String(userId);
    const deletedUser = users.connected[userId];
    delete users.connected[userId];
    return deletedUser;
}

const readyUser = (userId) => {
    userId = String(userId);
    users.ready[userId] = users.connected[userId];
    delete users.connected[userId];
    console.log("readyUser", users)
    return users;
}

const unreadyUser = (userId) => {
    userId = String(userId);
    const deletedUser = users.ready[userId];
    delete users.ready[userId];
    console.log("unreadyUser", users)
    return deletedUser;
}

const getConnectedUsers = () => {
    return users.connected;
}

const getReadyUsers = () => {
    return users.ready;
}

module.exports = {
    addUser,
    removeUser,
    readyUser,
    unreadyUser,
    getConnectedUsers,
    getReadyUsers,
}

