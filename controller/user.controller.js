const {User , validateUser}  = require ("../models/user.models");
const bcrypt = require ("bcrypt");

// >>>>>>>>>> Post User Start <<<<<<<<<<  //

const  postUser = async(req , res) =>{
    // Validate Data from frontend using Joi
    const {error} = validateUser (req.body);
    if (error)return res.status (400).send(error.message);
    
    const {name , email, phoneNumber , password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password , salt);

    try{
    // checking if user already registered than return 
    let user = await User.findOne({email:email});
    if (user) return res.status(400).send("User already Registerd");
      user = new User ({
         name : name,
         email : email,
         phoneNumber : phoneNumber,
         password : hashPassword,
     })   

     await user.save();
    //  function for generating token
     const token = user.generateAuthToken();
     res.header("x-auth-token" , token).status(200).send("User Successfully Registered");
    }
    catch(e)
    {
        res.send(e.message);
    }
}

// >>>>>>>>>> Post User End <<<<<<<<<<  //

exports.postUser = postUser;