const express = require ("express");
const { getActors , postActor, getActor, updateActor , getThenpostDummyActors} = require("../controller/actor");
const router = express.Router();
router.get("/" , getActors);
router.get("/dummyapi"  , getThenpostDummyActors)
router.get("/:id" , getActor);
router.post("/" , postActor);
router.put("/:id" , updateActor);

module.exports = router;