const mongoose = require ("mongoose");
const Joi = require("joi");
const ratingSchema = mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref : "User"
    },
    movie : {
        type : mongoose.Types.ObjectId,
        ref : "Movie"
    },
    rating : {
        type : Number,
        enum : [1,2,3,4,5],
    }
});

const Rating = mongoose.model("Rating" , ratingSchema);

function validateRating (rating) {

    const schema = Joi.object({
        userId : Joi.string().hex().length(24).required(),
        movieId : Joi.string().hex().length(24).required(),
        rating : Joi.number().valid(1,2,3,4,5).required()

    });
    return schema.validate(rating);

}

exports.Rating = Rating;
exports.validateRating = validateRating;