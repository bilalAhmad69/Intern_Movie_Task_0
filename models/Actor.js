const mongoose = require("mongoose");
const actorSchema = mongoose.Schema({
  _id: {
    type: String,
    default: Date.now(),
  },
  firstName: {
    type: String,
    minLength: 3,
    maxLength: 50,
    required: true,
  },
  lastName: {
    type: String,
    minLength: 3,
    maxLength: 50,
    required: true,
  },
  age: {
    type: Number,
    min: 3,
    max: 150,
  },
  gender: {
    type: String,
  },
  picture: {
    type: String,
  },
});
const Actor = new mongoose.model("Actor", actorSchema);
exports.Actor = Actor;
