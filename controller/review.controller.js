const {MovieReview, validateReview} = require ("../models/review.models");
const {User} = require ("../models/user.models");
const {Movie} = require ("../models/movie.models");

// >>>>>>>>>> get Review Start <<<<<<<<<<<<<<<<<<//
const getMovieReview = async (req , res) =>{
//   specific movie id 
   try {
    const movieReviews = await MovieReview.find({movie:req.params.id}).select("review ")
    .populate("user" , "name email -_id")
    .populate("movie" , "name  genre -_id")
    if(movieReviews.length < 1) return res.send(404).send("No Review found for this movie");
    res.send(movieReviews); 
   }
   catch (e) 
   {
       res.send (e.message);
   }

}
// >>>>>>>>>> get Review Start <<<<<<<<<<<<<<<<<<//

// >>>>>>>>>>>> Post Review Start <<<<<<<<<<<<<<<< //

const postMovieReview = async (req, res) =>{
    const {error} = validateReview(req.body);
    if (error) return res.status(400).send(error.message);
    const {userId , movieId , review} = req.body;
    try{
        // check the user registration
    const user = await User.findById(userId);
    if(!user) return res.status(400).send("Cannot give Rating  You are not Registered");
    //    check the movie is available
    const movie = await Movie.findById(movieId);
    if(!movie) return res.status(404).send("Movie not Found ");
    const movieReview = new MovieReview({
        user : userId,
        movie : movieId,
        review : review
    });
    await movieReview.save();
    res.send("Review to Specific Movie Sucessfully..");
    movie.review.push(movieReview);
    await movie.save();
}
    catch (e)
    {
        res.send(e.message);           
    }
}

// >>>>>>>>>>>> Post Review End <<<<<<<<<<<<<<<< //


// >>>>>>>>>>>> Update Review Start <<<<<<<<<<<<<<<< //

const updateMovieReview = async(req,res) =>{

    try {
   const movieReview = await MovieReview.findByIdAndUpdate(req.params.id , 
    {
        review : req.body.review
    });
   if(!movieReview) return res.status(404).send("Review not found");
   res.send("Updated Sucessfully");
}
catch (e)
{
    res.send(e.message);
}
}

// >>>>>>>>>>>> Update Review End <<<<<<<<<<<<<<<< //

exports.getMovieReview = getMovieReview;
exports.postMovieReview = postMovieReview;
exports.updateMovieReview = updateMovieReview;