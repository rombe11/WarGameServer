const ratingsService = require('../services/ratings');

const ratingsController = {
  addRating: async (req, res) => {
    const { username, rate } = req.body;
    try {
      const result = await ratingsService.addRating(username, rate);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUserRating: async (req, res) => {
    const { username } = req.params;
    try {
      const rating = await ratingsService.getUserRating(username);
      if (rating) {
        res.json(rating);
      } else {
        res.status(404).json({ error: 'Rating not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getMaxRating: async (req, res) => {
    try {
      const maxRating = await ratingsService.getMaxRating();
      res.json({ maxRating });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAmountOfMaxRatings: async (req, res) => {
    try {
      const count = await ratingsService.getAmountOfMaxRatings();
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = ratingsController;
