const express = require("express");
const actor = require("./actor");
const app = express();
app.use("/api/actor/" , actor);

