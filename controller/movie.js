const json2csv = require("json2csv").parse;
const fs = require("fs");
const { Movie } = require("../models/Movie");
const { Actor } = require("../models/Actor");
const uploadToFireBase = require("../services/uploadImagesToFirebase");

// Get  All Movies

const getMovies = async (req, res) => {
  try {
    let page = req.query.page;
    const limit = 10;
    page = (page - 1) * limit;
    const movies = await Movie.find()
      .skip(page)
      .limit(limit)
      .lean()
      .select("name genre businessDone poster rating")
      .populate("actors", "name age gender -_id");
    if (movies.length < 1) return res.status(404).send("Movies not Found ");
    const count = await Movie.count({});
    const numberOfPages = Math.round(count / limit + 1);
    res.status(200).render("movieslist.hbs", {
      movies,
      numberOfPages,
      BASEURL: process.env.BASEURL,
      title: "Movie List",
    });
  } catch (e) {
    res.send(e.message);
  }
};

// get Specific movie
const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
      .lean()
      .select("name genre businessDone poster rating")
      .populate("actors", "firstName lastName -_id");
    if (!movie) return res.status(404).render("Movie not found");
    res
      .status(200)
      .render("movieDetails.hbs", { movie, title: "Movie Details" });
  } catch (e) {
    res.send(e.message);
  }
};

// Get  Specific Movies By Genre
const getMoviesByGenre = async (req, res) => {
  try {
    const movies = await Movie.find({ genre: req.body.genre })
      .select("name genre businessDone  poster rating")
      .populate("actors", "name age gender -_id");
    if (movies < 1)
      return res.status(404).send("No Movies for Given Category..");
    res.status(200).send(movies);
  } catch (e) {
    res.send(e.message);
  }
};
// Post Movie
const postMovie = async (req, res) => {
  const { name, genre, businessDone, actorId } = req.body;
  try {
    const imageFirebasePath = await uploadToFireBase(
      req.file.path,
      req.file.originalname
    );
    // check the actor is registered or not
    const actor = await Actor.findById(actorId);
    if (!actor) return res.status(400).send("Given Actor Was not registered..");
    const movie = new Movie({
      name: name,
      genre: genre,
      businessDone: businessDone,
      actors: actorId,
      poster: imageFirebasePath,
    });
    await movie.save();
    res.status(200).send("Movie Sucessfully Added");
  } catch (e) {
    res.send(e.message);
  }
};

// update Movie
const updateMovie = async (req, res) => {
  const imageFirebasePath = await uploadToFireBase(
    req.file.path,
    req.file.orignalname
  );
  // check the front end data
  const movieObj = {};
  const { name, genre, businessDone, actorId, poster } = req.body;
  if (typeof name !== "undefined") movieObj["name"] = name;
  if (typeof genre !== "undefined") movieObj["genre"] = genre;
  if (typeof businessDone !== "undefined")
    movieObj["businessDone"] = businessDone;
  if (typeof actorId !== "undefined") movieObj["actors"] = actorId;
  if (typeof poster !== "undefined") movieObj["poster"] = imageFirebasePath;

  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, movieObj);
    if (!movie) return res.status(404).send("Movie Not Found...");
    res.status(200).send("Movie Updated Successfully..");
  } catch (e) {
    res.send(e.message);
  }
};

// Delete Movie
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) res.status(404).send("Movie not Found");
    res.status(200).send(movie.name + "  Movie successfully Deleted..");
  } catch (e) {
    res.send(e.message);
  }
};
// Total Business Done By Actor
const totalBusinessByActor = async (req, res) => {
  try {
    const movies = await Movie.find({ actors: req.params.id }).populate(
      "actors",
      "name -_id"
    );
    if (movies.length < 1)
      return res.status(400).send("Given actor have no Movie");
    let sum = 0;
    movies.map((movie) => {
      sum += movie.businessDone;
    });
    res.send(movies[0].actors + "   Total earning  " + sum);
  } catch (e) {
    res.send(e.message);
  }
};

// download csv file
const downloadCsvFile = async (req, res) => {
  try {
    const movies = await Movie.find({}).populate(
      "actors",
      "firstName lastName -id"
    );
    if (movies.length < 1) res.status(404).send("Movies not Found");
    movies.map((movie) => {
      const csv = json2csv({ movie });
      fs.appendFile("movies.csv", csv, (error) => {
        if (error) return res.send(error.message);
        res.send("CSV File Save Succesfully...");
      });
    });
  } catch (e) {
    res.send(e.message);
  }
};

module.exports = {
  getMovies,
  getMovie,
  getMoviesByGenre,
  postMovie,
  updateMovie,
  deleteMovie,
  totalBusinessByActor,
  downloadCsvFile,
};
