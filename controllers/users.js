const User = require('../models/User');
const UserService = require('../services/users');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await UserService.getAllUsers();
            res.json(users);
        } catch (err) {
            res.status(500).send(err);
        }
    },

    getUserByUsername: async (req, res) => {
        try {
            const { username } = req.params;
            const user = await UserService.getUserByUsername(username);
            
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            res.json(user);
        } catch (err) {
            res.status(500).send(err);
        }
    },

    updateUser: async (req, res) => {
        try {
            const { username } = req.params;
            const newUser = req.body;
            const updatedUser = await UserService.updateUser(username, newUser);
            
            if (!updatedUser) {
                return res.status(404).json({ error: "User not found" });
            }

            res.json(updatedUser);
        } catch (err) {
            res.status(500).send(err);
        }
    },

    addUser: async (req, res) => {
        try {
            const { username, password, userImage, country, cups } = req.body;
            const newUser = await UserService.addUser(username, password, userImage, country, cups);
            res.json(newUser);
        } catch (err) {
            res.status(500).send(err);
        }
    },

    isUserExist: async (req, res) => {
        try {
            const { username } = req.params;
            const isExist = await UserService.isUserExist(username);
            res.json({ exist: isExist });
        } catch (err) {
            res.status(500).send(err);
        }
    }
};
