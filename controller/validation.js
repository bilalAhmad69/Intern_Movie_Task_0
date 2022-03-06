const Joi = require ("joi");
// Actor Validation
module.exports = validateActor = (actor) =>{
    const schema = Joi.object({
        name : Joi.string().min(3).max(50).required(),
        age : Joi.number().min(3).max(150).required(),
        gender : Joi.string().valid("Male" , "Female" , "Transgender")
    })
   return schema.validate(actor);
}

//  Movie Validation
module.exports =  validateMovie = (movie) =>{

    const schema = Joi.object({
        name : Joi.string().min(3).max(255).required(),
        genre : Joi.string().min(3).max(50).required(),
        businessDone : Joi.number().required(),
        actorId : Joi.string().hex().length(24)
    })
        return schema.validate(movie);

}
