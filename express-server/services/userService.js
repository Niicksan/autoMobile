const User = require("../models/User");


async function getUserInfo(id) {
    return User.findById(id, { hashedPassword: 0, updatedAt: 0 });
}

module.exports = {
    getUserInfo
}