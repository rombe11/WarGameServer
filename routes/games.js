const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/games');

router.post('/games', gamesController.addGame);
router.put('/games/:gameID', gamesController.setWinner);
router.get('/games/:gameID', gamesController.getGame);
router.get('/games', gamesController.getAllGames);


module.exports = router;

