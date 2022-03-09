const express = require("express");
const {
  getActors,
  postActor,
  getActor,
  updateActor,
  getThenpostDummyActors,
  downloadPicture,
} = require("../controller/actor");
const { upload } = require("../middleware/uploads");
const router = express.Router();
router.get("/", getActors);
router.get("/dummyapi", getThenpostDummyActors);
router.get("/downloadPicture", downloadPicture);
router.get("/:id", getActor);
router.post("/", upload.single("picture"), postActor);
router.put("/:id", upload.single("picture"), updateActor);
module.exports = router;
