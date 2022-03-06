const express = require ("express");
const config = require ("config");
const mongoose = require("mongoose");
const user = require("./routes/user");
const actor = require("./routes/actor");
const movie = require ("./routes/movie");
const auth = require("./routes/auth");
const rating = require ("./routes/rating");
const review = require ("./routes/review");
const app = express();
app.use(express.json());
//  Checking Environment varaible is set ?

if(!config.get("jwtPrivateKey"))
{
    console.error("FATAL ERROR : jwtPrivateKey is not defined ...");
    process.exit(1);
}

//  Mongodb Connection 

mongoose.connect("mongodb://localhost/movies").then(()=>{
    console.log("Database is connected")
}).catch((e)=>console.log(e.message));

app.use("/api/users", user);
app.use("/api/actors" , actor )
app.use("/api/movies" , movie);
app.use("/api/auth", auth);
app.use("/api/ratings", rating);
app.use("/api/reviews" , review);

// listening for request

app.listen("3000" ,  ()=>{
    console.log("i am listening on port 3000");
})
