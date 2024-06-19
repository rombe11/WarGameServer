const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  username: {
    type: String,
    ref: "User",
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
}, { collection: "Ratings" });

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;

