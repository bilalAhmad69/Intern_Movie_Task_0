const mongoose = require("mongoose");
const Joi = require ("joi");
const movieReviewSchema = mongoose.Schema ({
     user :{
         type : mongoose.Types.ObjectId,
         ref : "User"
     },
     movie : {
        type : mongoose.Types.ObjectId,
        ref : "Movie"
    },
     review : {
         type : String,
         required :true,
     }

}) ;

const MovieReview = mongoose.model("Review" , movieReviewSchema);
// front end validation using joi
function validateReview (review) {

    const schema = Joi.object({
        userId : Joi.string().hex().length(24).required(),
        movieId : Joi.string().hex().length(24).required(),
        review : Joi.string().required()

    });
    return schema.validate(review);

}
exports.MovieReview = MovieReview;
exports.validateReview = validateReview;