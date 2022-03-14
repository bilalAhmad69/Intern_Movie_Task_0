const express = require("express");
const { requiresAuth } = require("express-openid-connect");
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
router.get("/", requiresAuth(), getActors);
router.get("/dummyapi", getThenpostDummyActors);
router.get("/downloadPicture", requiresAuth(), downloadPicture);
router.get("/:id", requiresAuth(), getActor);
router.post("/", requiresAuth(), upload.single("picture"), postActor);
router.put("/:id", requiresAuth(), upload.single("picture"), updateActor);
module.exports = router;
