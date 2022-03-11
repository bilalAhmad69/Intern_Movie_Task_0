const express = require("express");
const router = express.Router();
const user = require("./user");
const actor = require("./actor");
const auth = require("./auth");
const movie = require("./movie");
const rating = require("./rating");
const review = require("./review");
const firebase = require("./firebase");
router.use("/users", user);
router.use("/actors", actor);
router.use("/movies", movie);
router.use("/auth", auth);
router.use("/ratings", rating);
router.use("/reviews", review);
router.use("/firebase", firebase);

module.exports = router;
