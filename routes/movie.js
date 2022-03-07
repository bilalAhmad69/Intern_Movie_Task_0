const { getMovies, postMovie, getMovie, deleteMovie, getMoviesByGenre, totalBusinessByActor, updateMovie , downloadCsvFile } = require("../controller/movie");
const express = require("express");
const router = express.Router();
router.get("/" , getMovies);
router.get("/byGenre", getMoviesByGenre);
router.get("/downlaodCsv" , downloadCsvFile)
router.get("/totalbusiness/:id" , totalBusinessByActor);
router.get("/:id", getMovie);
router.post("/" , postMovie);
router.put("/:id" , updateMovie);
router.delete("/:id" , deleteMovie);


module.exports = router;