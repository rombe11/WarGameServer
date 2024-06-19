const express = require('express');
const router = express.Router();
const ratingsController = require('../controllers/ratings');

//add or update a rating
router.post('/ratings', ratingsController.addRating);

//get a user's rating
router.get('/ratings/:username', ratingsController.getUserRating);

//get the maximum rating
router.get('/ratings/max/rate', ratingsController.getMaxRating);

//get the amount of maximum ratings
router.get('/ratings/max/count', ratingsController.getAmountOfMaxRatings);

module.exports = router;
