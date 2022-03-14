const { MovieReview } = require("../models/Review");
const { User } = require("../models/User");
const { Movie } = require("../models/Movie");
// get movie reviews
const getMovieReviews = async (req, res) => {
  //   specific movie id
  try {
    const movieReviews = await MovieReview.find({ movie: req.params.id })
      .select("review ")
      .populate("user", "name email -_id")
      .populate("movie", "name  genre -_id");
    if (movieReviews.length < 1)
      return res.send(404).send("No Review found for this movie");
    res.send(movieReviews);
  } catch (e) {
    res.send(e.message);
  }
};

//Post Review

const postMovieReview = async (req, res) => {
  const { userId, movieId, review } = req.body;
  try {
    // check the user registration
    const user = await User.findById(userId);
    if (!user)
      return res.status(400).send("Cannot give Rating  You are not Registered");
    //    check the movie is available
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).send("Movie not Found ");
    const movieReview = new MovieReview({
      user: userId,
      movie: movieId,
      review: review,
    });
    await movieReview.save();
    res.send("Review to Specific Movie Sucessfully..");
    movie.review.push(movieReview);
    await movie.save();
  } catch (e) {
    res.send(e.message);
  }
};
//  Update Review

const updateMovieReview = async (req, res) => {
  try {
    const movieReview = await MovieReview.findByIdAndUpdate(req.params.id, {
      review: req.body.review,
    });
    if (!movieReview) return res.status(404).send("Review not found");
    res.send("Updated Sucessfully");
  } catch (e) {
    res.send(e.message);
  }
};

exports.getMovieReview = getMovieReviews;
exports.postMovieReview = postMovieReview;
exports.updateMovieReview = updateMovieReview;
