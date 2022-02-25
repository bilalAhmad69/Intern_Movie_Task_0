const express = require ("express");
const mongoose = require("mongoose");
const user = require("./routes/user.routes");
const app = express();
app.use(express.json());
// >>>>>>>>>>>>>>>>>> Mongodb Connection Start <<<<<<<<<<<<<<<<<<//

mongoose.connect("mongodb://localhost/movies").then(()=>{
    console.log("Database is connected")
}).catch((e)=>console.log(e.message));

// >>>>>>>>>>>>>>>>>> Mongodb Connection End  <<<<<<<<<<<<<<<<<<//

app.use("/api/users", user);


// >>>>>>>>>>>>>>>>>> Port Listening Start <<<<<<<<<<<<<<<<<<//

app.listen("3000" ,  ()=>{
    console.log("i am listening on port 3000");
})

// >>>>>>>>>>>>>>>>>> Port Listening End <<<<<<<<<<<<<<<<<<//