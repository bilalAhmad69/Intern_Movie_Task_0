const { authUser } = require("../controller/auth");
const express = require ("express");
const router = express.Router();

router.post("/" , authUser);

module.exports = router;