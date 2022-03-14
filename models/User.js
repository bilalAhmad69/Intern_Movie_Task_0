const mongoose = require ("mongoose");
const jwt = require ("jsonwebtoken");
const config = require("config");
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
    },
    isAdmin : {
        type:Boolean
    }
});


// adding new function to user models to generate jwt token

userSchema.methods.generateAuthToken = function () {

    //  i will saved this jwtAuthToken if environment variable 
    const token = jwt.sign({_id : this._id , isAdmin : this.isAdmin}, config.get("jwtPrivateKey"));
    return token;
}

const User = mongoose.model("User" , userSchema);



exports.User = User;