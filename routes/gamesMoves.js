const express = require('express');
const router = express.Router();
const gameMovesController = require('../controllers/gamesMoves');

router.get('/moves/:gameID', gameMovesController.getMovesByGameID);
router.post('/moves/:gameID', gameMovesController.addMove);
router.get('/moves/user/:username', gameMovesController.getMovesByUsername);

module.exports = router;
