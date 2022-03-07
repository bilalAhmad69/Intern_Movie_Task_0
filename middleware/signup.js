const jwt = require("jsonwebtoken");
const config = require("config")
module.exports = function async(req , res ,next) {
    const token = req.params.id;
    if(!token) return res.status(401).send("Access Denied.. No token Provided..");
    try {
        const decoded =  jwt.verify(token , config.get("jwtPrivateKey") );
        req.body.email = decoded;
        next();
    }
    catch (e){
       res.status(400).send("invalid token");
    }

           
}