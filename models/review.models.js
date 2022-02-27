const mongoose = require("mongoose");
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

exports.MovieReview = MovieReview;