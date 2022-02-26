const { getMovies, postMovie, getSpecificMovie, deleteMovie, getMoviesByGenre, totalBusinessByActor, updateMovie } = require("../controller/movie.controller");
const express = require("express");
const router = express.Router();
router.get("/" , getMovies);
router.get("/byGenre", getMoviesByGenre);
router.get("/totalbusiness/:id" , totalBusinessByActor);
router.get("/:id", getSpecificMovie);
router.post("/" , postMovie);
router.put("/:id" , updateMovie);
router.delete("/:id" , deleteMovie);


module.exports = router;