const mongoose = require ("mongoose");
const Joi = require("joi");
const movieSchema = mongoose.Schema({
     name :{
         type: String, 
         minLength : 3, 
         maxLength : 255,
         required : true
     },
     genre :{
         type : String,
         minLength : 3, 
         maxLength : 50,
         required : true,
     },
     businessDone: {
         type : Number,
         required : true
     },
     actors : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Actor",
        required: true,
     },
     rating : {
         type : Number,
         enum : [1,2,3,4,5],
     },
     review : [{
         type : mongoose.Types.ObjectId,
         ref : "Review"
     }]
})

const Movie = mongoose.model("Movie" , movieSchema);

// Front-end Validation using Joi

function validateMovie (movie) {

    const schema = Joi.object({
        name : Joi.string().min(3).max(255).required(),
        genre : Joi.string().min(3).max(50).required(),
        businessDone : Joi.number().required(),
        actorId : Joi.string().hex().length(24)
    })
        return schema.validate(movie);

}


exports.Movie = Movie;
exports.validateMovie = validateMovie;