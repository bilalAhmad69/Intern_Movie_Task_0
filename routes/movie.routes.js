const { getMovies, postMovie, getSpecificMovie, deleteMovie, getMoviesByGenre, totalBusinessByActor, updateMovie } = require("../controller/movie.controller");
const auth = require("../middleware/auth");
const admin = require  ("../middleware/admin")
const express = require("express");
const router = express.Router();
router.get("/" , getMovies);
router.get("/byGenre", getMoviesByGenre);
router.get("/totalbusiness/:id" , totalBusinessByActor);
router.get("/:id", getSpecificMovie);
// post and put routes are protected only admin can access....
router.post("/" , [auth , admin], postMovie);
router.put("/:id" ,[auth , admin], updateMovie);
router.delete("/:id" , deleteMovie);


module.exports = router;