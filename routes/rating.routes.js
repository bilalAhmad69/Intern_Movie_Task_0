const express = require ("express");
const { postRating, updateRating, getMovieRating } = require("../controller/rating.controller");
const router = express.Router();
router.get("/:id" , getMovieRating);
router.post("/" , postRating);
router.put("/:id", updateRating);
module.exports = router;