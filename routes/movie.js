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
router.get("/", requiresAuth(), getMovies);
router.get("/byGenre", requiresAuth(), getMoviesByGenre);
router.get("/downloadCsv", downloadCsvFile);
router.get("/totalbusiness/:id", requiresAuth(), totalBusinessByActor);
router.get("/:id", requiresAuth(), getMovie);
router.post("/", upload.single("picture"), postMovie);
router.put("/:id", requiresAuth(), upload.single("picture"), updateMovie);
router.delete("/:id", requiresAuth(), deleteMovie);

module.exports = router;
