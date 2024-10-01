const User = require('../models/User');
const bcrypt = require('bcrypt');


async function register(email, companyName, password) {
    const existing = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (existing) {
        throw new Error('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        companyName,
        hashedPassword
    });

    return userInfo(user);
};

async function login(email, password) {
    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (!user) {
        throw new Error('Incorrect username or password');
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!hasMatch) {
        throw new Error('Incorrect username or password');
    }

    return userInfo(user);
};

function userInfo({ _id, email }) {
    return {
        id: _id.toString(),
        email
    };
};

module.exports = {
    register,
    login,
};