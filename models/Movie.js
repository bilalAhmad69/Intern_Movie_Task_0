const mongoose = require("mongoose");
const movieSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 255,
    required: true,
  },
  genre: {
    type: String,
    minLength: 3,
    maxLength: 50,
    required: true,
  },
  businessDone: {
    type: Number,
    required: true,
  },
  actors: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Actor",
    required: true,
  },
  poster: {
    type: String,
  },
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
  },
  review: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const Movie = mongoose.model("Movie", movieSchema);

exports.Movie = Movie;
