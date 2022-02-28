const express = require("express");
const { postUser } = require("../controller/user.controller");
const router = express.Router();
router.post("/" , postUser);
module.exports = router;