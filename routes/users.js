const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

// Route for getting all users
router.get('/users', userController.getAllUsers);

// Route for getting a user by username
router.get('/users/:username', userController.getUserByUsername);

// Route for updating a user
router.put('/users/:username', userController.updateUser);

// Route for adding a new user
router.post('/users', userController.addUser);

// Route for checking if a user exists
router.get('/users/:username/exist', userController.isUserExist);

module.exports = router;
