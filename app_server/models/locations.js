const mongoose = require('mongoose');

const openingTimeSchema = mongoose.Schema({
  days: {
    type: String,
    required: true,
  },
  opening: String,
  closing: String,
  closed: {
    type: Boolean,
    required: true,
  },
});

const reviewSchema = mongoose.Schema({
  author: String,
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviewText: String,
  createdOn: {
    type: Date,
    default: Date.now(),
  },
});

const locationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: String,
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  facilities: [String],
  distance: String,
  reviews: [reviewSchema],
  OpeningTimes: [openingTimeSchema],
});

mongoose.model('Location', locationSchema);
