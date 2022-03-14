const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { auth } = require("express-openid-connect");
require("dotenv").config();
const hbs = require("express-handlebars");
const Api = require("./routes/index");
const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/public/"));
app.use("/uploads/images", express.static(__dirname + "/uploads/images"));

app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/",
  })
);
app.set("views", "./views");
app.set("view engine", "hbs");
app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUE_BASE_URL,
    secret: "jksdjklfjklajsdl;kajskdfja;slkdjfiajs",
  })
);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Movies App",
    isAuthenticated: req.oidc.isAuthenticated(),
  });
});
//  Mongodb Connection
const URL = process.env.URL;
mongoose
  .connect(URL)
  .then(() => console.log("Connected with DataBase.."))
  .catch((e) => console.log(e.message));

app.use("/api", Api);

// listening for request
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`i am listening on port ${PORT}`);
});
