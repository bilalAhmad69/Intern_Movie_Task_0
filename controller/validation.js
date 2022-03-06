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

//  Rating Validation
module.exports =  validateRating = (rating) => {

    const schema = Joi.object({
        userId : Joi.string().hex().length(24).required(),
        movieId : Joi.string().hex().length(24).required(),
        rating : Joi.number().valid(1,2,3,4,5).required()

    });
    return schema.validate(rating);

}

// Review Validation
module.exports = validateReview = (review)  =>{

    const schema = Joi.object({
        userId : Joi.string().hex().length(24).required(),
        movieId : Joi.string().hex().length(24).required(),
        review : Joi.string().required()

    });
    return schema.validate(review);

}


// user Validation
const validateUser = (user) =>{
    const schema = Joi.object({
        name : Joi.string().min(3).max(50).required(),
        email : Joi.string().min(5).max(255).required().email(),
        phoneNumber : Joi.number().required(),
        password : Joi.string().min(5).max(255).required(),

    })
    return schema.validate(user);
}