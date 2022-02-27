const {Movie} = require("../models/movie.models");
const {Actor} = require("../models/actor.models");

// >>>>>>>>>>>>>>>>> Get  All Movies Start <<<<<<<<<<<<<<<//
const  getMovies = async (req , res) =>{
     try{
      const movies = await Movie.find()
      .select("name genre businessDone rating -review -_id")
      .populate("genre" , "name -_id")
      .populate("actors" , "name age gender -_id");
      if(movies.length < 1) return res.status(404).send("Movies not Found ");
      res.status(200).send(movies);
     }
     catch (e)
     {
         res.send(e.message);
     }
}

// >>>>>>>>>>>>>>>>> Get  All Movies End <<<<<<<<<<<<<<<//

// >>>>>>>>>>>>>>>>> Get  Specific Movies Start <<<<<<<<<//

const getSpecificMovie = async (req , res) =>{
    try{
    const movie = await Movie.findById(req.params.id)
    .select("name genre businessDone rating review ")
    .populate("actors" , "name age gender -_id");
    if (!movie) return res.status(404).send("Movie not Found");
    res.status(200).send(movie);
    }
    catch (e)
    {
        res.send(e.message);
    }
}

// >>>>>>>>>>>>>>>>> Get  Specific Movies End <<<<<<<<<//


// >>>>>>>>>>>>>>>>> Get  Specific Movies By Genre Start <<<<<<<<<//
 
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

// >>>>>>>>>>>>>>>>> Get  Specific Movies By Genre End <<<<<<<<<//



// >>>>>>>>>>>>>>>>> Post Movie Start <<<<<<<<<<<<<<<//

const postMovie = async (req,res) =>{
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

// >>>>>>>>>>>>>>>>> Post Movie End <<<<<<<<<<<<<<<//

// >>>>>>>>>>>>>>>>> Update Movie Start <<<<<<<<<<<<<<<//
const updateMovie = async (req , res) =>{
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

// >>>>>>>>>>>>>>>>> Update Movie End <<<<<<<<<<<<<<<//

// >>>>>>>>>>>>>>>>> Delete Specific Movie Start <<<<<<<<<<<<<<<//

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

// >>>>>>>>>>>>>>>>> Delete Specific Movie End <<<<<<<<<<<<<<<//

//>>>>>>>>>>>>>>> Total Buisness By Specific Actor Start <<<<<<<<<<<<<<<<//
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
//>>>>>>>>>>>>>>> Total Buisness By Specific Actor End<<<<<<<<<<<<<<<<//

exports.getMovies = getMovies;
exports.getSpecificMovie = getSpecificMovie;
exports.getMoviesByGenre = getMoviesByGenre;
exports.postMovie = postMovie;
exports.updateMovie = updateMovie;
exports.deleteMovie = deleteMovie;
exports.totalBusinessByActor = totalBusinessByActor;