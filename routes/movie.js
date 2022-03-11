const express = require("express");
const { requiresAuth } = require("express-openid-connect");
const { upload } = require("../middleware/uploads");
const {
  getMovies,
  postMovie,
  getMovie,
  deleteMovie,
  getMoviesByGenre,
  totalBusinessByActor,
  updateMovie,
  downloadCsvFile,
} = require("../controller/movie");
const router = express.Router();
router.get("/", getMovies);
router.get("/byGenre", getMoviesByGenre);
router.get("/downloadCsv", downloadCsvFile);
router.get("/totalbusiness/:id", totalBusinessByActor);
router.get("/:id", getMovie);
router.post("/", upload.single("picture"), postMovie);
router.put("/:id", upload.single("picture"), updateMovie);
router.delete("/:id", deleteMovie);

module.exports = router;
