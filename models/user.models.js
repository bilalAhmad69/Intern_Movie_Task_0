const mongoose = require ("mongoose");
const Joi = require ("joi");
const userSchema = mongoose.Schema({
    name : {
        type : String,
        minLength : 3,
        maxLength : 50,
        required : true
    },
    email : {
        type : String,
        minLength : 5, 
        maxLength : 255,
        required: true
    },
    phoneNumber : {
        type : Number,
        required : true
    },
    password : {
        type : String, 
        minLength : 5, 
        maxLength : 1024,
        required: true,
    }
});

const User = mongoose.model("User" , userSchema);

// Data Validation of Frontend 

const validateUser = (user) =>{
      const schema = Joi.object({
          name : Joi.string().min(3).max(50).required(),
          email : Joi.string().min(5).max(255).required().email(),
          phoneNumber : Joi.number().required(),
          password : Joi.string().min(5).max(255).required(),

      })
      return schema.validate(user);
}


exports.User = User;
exports.validateUser = validateUser;