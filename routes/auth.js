const { authUser ,signUpUser , forgottPassword} = require("../controller/auth");
const express = require ("express");
const router = express.Router();
router.post("/signUp" , signUpUser);
router.post("/forgottPassword" ,  forgottPassword);
router.post("/" , authUser);


module.exports = router;