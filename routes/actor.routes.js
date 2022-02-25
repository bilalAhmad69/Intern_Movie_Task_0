const express = require ("express");
const { getActors , postActor, specificActor, updateActor} = require("../controller/actor.controller");
const router = express.Router();
router.get("/" , getActors);
router.get("/:id" , specificActor);
router.post("/" , postActor);
router.put("/:id" , updateActor);

module.exports = router;