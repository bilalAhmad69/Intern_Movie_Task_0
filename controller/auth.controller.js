const {User}  = require ("../models/user.models");
const bcrypt = require("bcrypt");

const authUser = async (req , res) =>{
    let user = await User.findOne({email : req.body.email});
    if(!user)  return res.status(400).send("Email or Password is invalid ... ");
    const validPassword = await bcrypt.compare(req.body.password , user.password);
    if(!validPassword) return res.status(400).send("Email or Password is invalid ...");
    res.send("Log in...");
}


exports.authUser = authUser;