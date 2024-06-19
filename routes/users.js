const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

//getting all users
router.get('/users', userController.getAllUsers);

//getting a user by username
router.get('/users/:username', userController.getUserByUsername);

//updating a user
router.put('/users/:username', userController.updateUser);

//gain 1 cup
router.put('/users/cup/:username', userController.gainCup);

//adding a new user
router.post('/users', userController.addUser);

//if a user exists
router.get('/users/:username/exist', userController.isUserExist);

//country with max amount of players
router.get('/users/max/country', userController.getCountryWithMaxUsers);

//max losses player
router.get('/users/max/losses', userController.getUserWithMaxLosses);

//max wins player
router.get('/users/max/wins', userController.getPlayerWithMaxWins);

//user's stats
router.get('/users/:username/stats', userController.getUserGameStats);


module.exports = router;
