const express = require ("express");
const config = require ("config");
const mongoose = require("mongoose");
const user = require("./routes/user.routes");
const actor = require ("./routes/actor.routes");
const movie = require ("./routes/movie.routes");
const auth = require("./routes/auth.routes");
const rating = require ("./routes/rating.routes");
const review = require ("./routes/review.routes");
const app = express();
app.use(express.json());

// >>>>>>>>>>>>>> checking the environment Varaible for JWT  Start <<<<<<<<<<< //

if(!config.get("jwtPrivateKey"))
{
    console.error("FATAL ERROR : jwtPrivateKey is not defined ...");
    process.exit(1);
}

// >>>>>>>>>>>>>> checking the environment Varaible for JWT  End <<<<<<<<<<< //



// >>>>>>>>>>>>>>>>>> Mongodb Connection Start <<<<<<<<<<<<<<<<<<//

mongoose.connect("mongodb://localhost/movies").then(()=>{
    console.log("Database is connected")
}).catch((e)=>console.log(e.message));

// >>>>>>>>>>>>>>>>>> Mongodb Connection End  <<<<<<<<<<<<<<<<<<//

app.use("/api/users", user);
app.use("/api/actors", actor);
app.use("/api/movies" , movie);
app.use("/api/auth", auth);
app.use("/api/ratings", rating);
app.use("/api/reviews" , review);

// >>>>>>>>>>>>>>>>>> Port Listening Start <<<<<<<<<<<<<<<<<<//

app.listen("3000" ,  ()=>{
    console.log("i am listening on port 3000");
})

// >>>>>>>>>>>>>>>>>> Port Listening End <<<<<<<<<<<<<<<<<<//