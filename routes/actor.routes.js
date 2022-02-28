const express = require ("express");
const { getActors , postActor, specificActor, updateActor} = require("../controller/actor.controller");
const auth = require ("../middleware/auth");
const admin = require ("../middleware/admin");
const router = express.Router();
router.get("/" , getActors);
router.get("/:id" , specificActor);
// only adimn can put and post the actors
router.post("/" , [auth , admin], postActor);
router.put("/:id" ,[auth , admin], updateActor);

module.exports = router;