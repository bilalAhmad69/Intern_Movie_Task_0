const express = require("express");
const { postMovieReview, updateMovieReview, getMovieReview } = require("../controller/review.controller");
const auth = require ("../middleware/auth");
const router = express.Router();
router.get("/:id" , getMovieReview);
// only registered use can post and put...
router.post ("/" ,  auth ,postMovieReview);
router.put ("/:id" , auth, updateMovieReview);
module.exports = router;