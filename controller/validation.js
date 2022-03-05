// Actor Validation
module.exports = validateActor = (actor) =>{
    const schema = Joi.object({
        name : Joi.string().min(3).max(50).required(),
        age : Joi.number().min(3).max(150).required(),
        gender : Joi.string().valid("Male" , "Female" , "Transgender")
    })

   return schema.validate(actor);
}

