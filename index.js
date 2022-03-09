const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const Api = require("./routes/index");
const app = express();
app.use(express.json());
//  Checking Environment varaible is set ?
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR : jwtPrivateKey is not defined ...");
  process.exit(1);
}

//  Mongodb Connection

const URL = process.env.URL;
mongoose
  .connect(URL)
  .then(() => console.log("Connected with DataBase.."))
  .catch((e) => console.log(e.message));

app.use("/api", Api);

// listening for request
const PORT = process.env.PORT || 3000;
app.listen("3000", () => {
  console.log(`i am listening on port ${PORT}`);
});
