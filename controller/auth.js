const {User}  = require ("../models/User");
const mailSender = require("../services/mailSender");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
// login
const authUser = async (req , res) =>{
    let user = await User.findOne({email : req.body.email});
    if(!user)  return res.status(400).send("Email or Password is invalid ... ");
    const validPassword = await bcrypt.compare(req.body.password , user.password);
    if(!validPassword) return res.status(400).send("Email or Password is invalid ...");
     const token = user.generateAuthToken();
     res.header("x-auth-token" , token).send("You are login..");
}

// Sign Up
const signUpUser = async ( req , res) =>{
    if(!req.body.email) return res.status(400).send("No email provided");
    const user =await User.findOne({email:req.body.email});
    if(user) return res.status(400).send("email already taken");
    const token = jwt.sign(req.body.email , config.get("jwtPrivateKey") );
    const text = `http://localhost/api/users?${token}`;
   const acknowledge =  await mailSender(req.body.email , "Email verification" , text);
   res.send(acknowledge);
}
 
// forgotPassword
const forgottPassword = async (req,res) =>
{
    if(!req.body.email) return res.status(400).send("No email provided");
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send("Given email is not found");
    const token = jwt.sign(req.body.email , config.get("jwtPrivateKey") );
    const text = `http://localhost/api/users/updatePassword?${token}`;
    const acknowledge = await mailSender (req.body.email , "Recover your Password" , text);
    res.send(acknowledge);
}
exports.authUser = authUser;
exports.signUpUser = signUpUser;
exports.forgottPassword = forgottPassword;