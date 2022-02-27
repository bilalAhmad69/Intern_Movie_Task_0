const { authUser } = require("../controller/auth.controller");
const express = require ("express");
const router = express.Router();

router.post("/" , authUser);

module.exports = router;