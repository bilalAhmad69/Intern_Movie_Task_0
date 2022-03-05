const mongoose = require("mongoose");
const actorSchema = mongoose.Schema({
     name : {
         type: String,
         minLength: 3,
         maxLength : 50,
         required : true,
     },
     age :{
         type : Number ,
         min : (3), 
         max : 150,
         required : true,
     },
     gender : {
         type : String,
         enum : ['Male' , 'Female' , 'Transgender'],
         default : 'Male'
     }
});

const Actor = new mongoose.model('Actor'  , actorSchema);
exports.Actor = Actor;
