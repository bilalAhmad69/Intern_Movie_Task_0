const express = require("express");
const signUp = require("../middleware/signup");
const  forgottPassword = require ("../middleware/forgottPassword");
const { postUser , updatePassowrd} = require("../controller/user");
const router = express.Router();
router.post("/:id" , signUp, postUser);
router.put("/updatePassword/:id" , forgottPassword, updatePassowrd)
module.exports = router;