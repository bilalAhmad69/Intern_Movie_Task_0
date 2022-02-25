const express = require("express");
const { postUser } = require("../controller/user.controller");
const router = express.Router();
router.get("/" , (req,res)=>{
    res.send("Hello I am listening......")
});

router.post("/" , postUser);
module.exports = router;