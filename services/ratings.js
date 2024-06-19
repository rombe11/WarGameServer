const Rating = require('../models/Rating');

const ratingsService = {
  addRating: async (username, rate) => {
    try {
      const existingRating = await Rating.findOne({ username });
      if (existingRating) {
        existingRating.rate = rate;
        await existingRating.save();
        return { message: 'Rating updated successfully', rating: existingRating };
      } else {
        const newRating = new Rating({ username, rate });
        await newRating.save();
        return { message: 'Rating added successfully', rating: newRating };
      }
    } catch (error) {
      console.error('Error in addRating:', error);
      throw new Error('Error adding or updating rating');
    }
  },

  getUserRating: async (username) => {
    try {
      const rating = await Rating.findOne({ username });
      if (!rating) {
        return null;
      }
      return rating;
    } catch (error) {
      console.error('Error in getUserRating:', error);
      throw new Error('Error fetching user rating');
    }
  },
  getMaxRating: async () => {
    try {
      const result = await Rating.aggregate([
        { $group: { _id: null, maxRate: { $max: "$rate" } } }
      ]);
      return result.length > 0 ? result[0].maxRate : null;
    } catch (error) {
      console.error('Error in getMaxRating:', error);
      throw new Error('Error fetching max rating');
    }
  },

  getAmountOfMaxRatings: async () => {
    try {
      const maxRating = await ratingsService.getMaxRating();
      if (maxRating !== null) {
        const result = await Rating.aggregate([
          { $match: { rate: maxRating } },
          { $count: "count" }
        ]);
        return result.length > 0 ? result[0].count : 0;
      } else {
        return 0;
      }
    } catch (error) {
      console.error('Error in getAmountOfMaxRatings:', error);
      throw new Error('Error fetching amount of max ratings');
    }
  }
  
};

module.exports = ratingsService;
