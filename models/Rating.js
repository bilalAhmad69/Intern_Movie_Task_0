const mongoose = require ("mongoose");
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
exports.Rating = Rating;