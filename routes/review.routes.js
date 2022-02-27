const express = require("express");
const { postMovieReview, updateMovieReview, getMovieReview } = require("../controller/review.controller");
const router = express.Router();
router.get("/:id" , getMovieReview);
router.post ("/" , postMovieReview);
router.put ("/:id" , updateMovieReview);
module.exports = router;