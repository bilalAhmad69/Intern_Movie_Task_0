const res = require("express/lib/response");
const { Movie } = require("../models/movie.models");
const {Rating, validateRating} = require ("../models/rating.models");
const { User } = require("../models/user.models");

//>>>>>>>>>>>>>> Get Rating Start <<<<<<<<<<<<<<<<<//

const getMovieRating =  async (req , res) =>{
    // Search rating by Movie id
    try{
    const movieRating = await Rating.find({movie : req.params.id}).select("rating -_id")
    .populate("user" , "name email -_id" )
    .populate("movie" , "name genre -_id");
    if(movieRating.length < 1) return res.status(404).send("No one Rated this Movie");
    res.status(200).send(movieRating);
    }
    catch (e)
    {
        res.send(e.message);
    }
}

//>>>>>>>>>>>>>> Get Rating End <<<<<<<<<<<<<<<<<//

//>>>>>>>>>>>>>> Post Rating Start <<<<<<<<<<<<<<<<<//
const postRating = async (req , res) => {
    const {error} = validateRating(req.body);
    if(error) return res.status(400).send(error.message);
    const {userId , movieId , rating} = req.body;
    try{
<<<<<<< HEAD
    //  is user is registered or not
=======
    const isMovieRated = await Rating.find().and([{movie:movieId} , {user : userId}]);
    if(isMovieRated.length >0) return res.status(400).send("You rated this movie once");
    
>>>>>>> movies
    const user = await User.findById(userId);
    if(!user) return res.status(400).send("Cannot give Rating  You are not Registered");
    //  check the movie is available or not
    const movie = await Movie.findById(movieId);
<<<<<<< HEAD
    if(!movie) return res.status(400).send("Bad Request ");
    // check if user once rated the movie then he only update
    const isRated = await Rating.find().and([{user : userId} , {movie : movieId}]);
    if(isRated.length >= 1) return res.send("you are Rated this movie once..");
=======
    if(!movie) return res.status(404).send("Movie not Found");
>>>>>>> movies
    const movieRating = new Rating({
        user : userId,
        movie : movieId,
        rating : rating
    });
    await movieRating.save();
    res.send("Rated Movie Sucessfully..");
    // update function for rating of movie
    updateMovieRating(movie)


    }
    catch (e)
    {
        console.log(e);
        res.send(e.message);
    }

}
//>>>>>>>>>>>>>> Post Rating End <<<<<<<<<<<<<<<<<//

//>>>>>>>>>>>>>> Update Rating Start <<<<<<<<<<<<<<<<<//

const updateRating = async (req ,res) =>{
    try {
    const rating = await Rating.findByIdAndUpdate(req.params.id , {
        rating : req.body.rating
    });
    if(!rating)  return res.status(404).send("Not Found");
    res.send("Sucessfully rating updated ..");
    const movie = await Movie.findById(rating.movie);
    updateMovieRating(movie)
   }
   catch (e)
   {
       res.send(e.message);
   }

}

//>>>>>>>>>>>>>> Update Rating End <<<<<<<<<<<<<<<<<//


// update the movie ratings and calculate the average

async function updateMovieRating (movie)
{
<<<<<<< HEAD
     
      const ratings = await Rating.find({movie :movie._id});
      if(ratings< 1) return;
       let sum = 0 ;
=======
      const ratings = await Rating.find({movie : movie._id});
      let sum = 0 ;
>>>>>>> movies
      let count = 0;
       // calculate all of the ratings of specific movie 
        ratings.map((rate)=>{
       sum += rate.rating;
           count++;
      })

      let rating = sum /count;
      movie.rating = Math.round(rating);
       await movie.save();
}

exports.getMovieRating = getMovieRating;
exports.postRating = postRating;
exports.updateRating = updateRating;