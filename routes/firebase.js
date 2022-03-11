const express = require("express");
const { uploadsImageIntoFirebase } = require("../controller/firebase");
const { upload } = require("../middleware/uploads");

const router = express.Router();
router.post("/", upload.single("picture"), uploadsImageIntoFirebase);
module.exports = router;
