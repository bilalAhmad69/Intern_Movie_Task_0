const jwt = require ("jsonwebtoken");
module.exports = function (req , res , next){
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("Access Denied.. No token Provided..");
    try {
    const decoded = jwt.verify(token , "jwtAuthToken");
    req.user = decoded;
    next();
    }
    catch (e)
    {
        res.status(400).send("Invalid Token");
    }


}