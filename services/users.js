const User = require('../models/User');

module.exports = {
    getAllUsers: async () => {
        return User.find();
    },
    getUserByUsername: async (username) => {
        return User.findOne({ username: username });
    },
    updateUser: async (username, newUser) => {
        return User.findOneAndUpdate({ username: username }, newUser, { new: true });
    },
    addUser: async (username, password, userImage, country, cups = 0) => {
        const newUser = new User({ username, password, userImage, country, cups });
        return newUser.save();
    },
    isUserExist: async (username) => {
        const user = await User.findOne({ username: username });
        return user !== null;
    }
};
