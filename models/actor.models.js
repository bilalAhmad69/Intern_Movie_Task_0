const mongoose = require("mongoose");
const Joi = require ("joi");
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

// front end validation using JOi


const validateActor = (actor) =>{
    const schema = Joi.object({
        name : Joi.string().min(3).max(50).required(),
        age : Joi.number().min(3).max(150).required(),
        gender : Joi.string().valid("Male" , "Female" , "Transgender")
    })

   return schema.validate(actor);
}



const Actor = new mongoose.model('Actor'  , actorSchema);
exports.Actor = Actor;
exports.validateActor = validateActor;