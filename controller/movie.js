const {Movie, validateMovie} = require("../models/movie.models");
const {Actor} = require("../models/actor.models");
// get Movies
const  getMovies = async (req , res) =>{
     try{
      const movies = await Movie.find()
      .select("name genre businessDone rating  -_id")
      .populate("actors" , "name age gender -_id");
      if(movies.length < 1) return res.status(404).send("Movies not Found ");
      res.status(200).send(movies);
     }
     catch (e)
     {
         res.send(e.message);
     }
}

// get Specific movie
const getMovie = async (req , res) =>{
    try{
    const movie = await Movie.findById(req.params.id)
    .select("name genre businessDone rating")
    .populate("actors" , "name age gender -_id");
    if (!movie) return res.status(404).send("Movie not Found");
    res.status(200).send(movie);
    }
    catch (e)
    {
        res.send(e.message);
    }
}



// Get  Specific Movies By Genre 
const getMoviesByGenre = async(req, res) =>{
    
    try{
            const movies = await Movie.find({genre: req.body.genre})
            .select("name genre businessDone ")
            .populate("actors" , "name age gender -_id");
            if(movies < 1) return res.status(404).send("No Movies for Given Category..")
            res.status(200).send(movies);
    }
    catch(e)
    {
        res.send(e.message)
    }
}
// Post Movie
const postMovie = async (req,res) =>{
    // check the front end data
    const {error} = validateMovie(req.body);
    if(error) return res.status(400).send(error.message);
    const {name , genre , businessDone, actorId } = req.body;
    try{
        // check the actor is registered or not 
        const actor = await Actor.findById(actorId);
        if(!actor) return res.status(400).send("Given Actor Was not registered..");
        // check for genre is it available 
        const movie = new Movie ({
            name : name,
            genre : genre,
            businessDone : businessDone,
            actors : actorId,
        });
        await movie.save();
        res.status(200).send("Movie Sucessfully Added");
    }
    catch (e)
    {
        res.send(e.message);
    }
}

// update Movie 
const updateMovie = async (req , res) =>{
    // check the front end data
  
    const {name , genre ,businessDone , actorId  }  = req.body
    try {
           const  movie = await Movie.findByIdAndUpdate(req.params.id , {
                 name : name ,
                 genre : genre,
                 businessDone : businessDone,
                 actors : actorId,
           });
            if(!movie) return res.status(404).send("Movie Not Found...");
            res.status(200).send("Movie Updated Successfully..");
    }
    catch (e)
    {
        res.send(e.message)
    }
}


// Delete Movie
const deleteMovie = async(req, res) =>{
    try{
        const movie =  await Movie.findByIdAndDelete(req.params.id);
        if(!movie) res.status(404).send("Movie not Found");
        res.status(200).send(movie.name +"  Movie successfully Deleted..");
    }
    catch (e)
    {
        res.send(e.message);
    }
}
// Total Business Done By Actor
const totalBusinessByActor = async (req , res) =>{
    try {
    const movies = await Movie.find({actors : req.params.id})
    .populate("actors" , "name -_id");
     if(movies.length < 1) return res.status(400).send("Given actor have no Movie");
     let sum = 0;
     movies.map((movie) => {
         sum += movie.businessDone;
     });
   res.send(movies[0].actors + "   Total earning  " + sum);
    }
    catch (e)
    {
        res.send(e.message);
    }
    
}

exports.getMovies = getMovies;
exports.getMovie = getMovie;
exports.getMoviesByGenre = getMoviesByGenre;
exports.postMovie = postMovie;
exports.updateMovie = updateMovie;
exports.deleteMovie = deleteMovie;
exports.totalBusinessByActor = totalBusinessByActor;