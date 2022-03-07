const { string } = require("joi");
const mongoose = require("mongoose");
const actorSchema = mongoose.Schema({
     firstName : {
         type: String,
         minLength: 3,
         maxLength : 50,
         required : true,
     },
     lastName : {
        type: String,
        minLength: 3,
        maxLength : 50,
        required : true,
    },
     age :{
         type : Number ,
         min : (3), 
         max : 150,
     },
     title : {
         type : String,
     },
     picture : {
         type:String
     }

})
const Actor = new mongoose.model('Actor'  , actorSchema);
exports.Actor = Actor;
