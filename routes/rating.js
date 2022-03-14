const express = require ("express");
const auth = require ("../middleware/auth");
const { postRating, updateRating, getMovieRating } = require("../controller/rating");
const router = express.Router();
router.get("/:id" , getMovieRating);
// only registered user can put and post the ratings
router.post("/" ,  auth,postRating);
router.put("/:id",auth, updateRating);
module.exports = router;