const { Actor } = require("../models/Actor");
const download = require("image-downloader");
const getActorsFromApi = require("../services/getActorsData");

// Get All Actors
const getActors = async (req, res) => {
  try {
    const page = req.query.page;
    const limit = 20;
    console.log(limit);
    const actors = await Actor.find({}).skip(page).limit(limit).lean();
    if (actors.length < 1) return res.status(404).send("No Record Found");
    const count = await Actor.count({});
    const numberOfPages = count / limit;
    res.status(200).render("actors.hbs", { actors, numberOfPages });
  } catch (e) {
    res.send(e.message);
  }
};
//  Get Specific Actor
const getActor = async (req, res) => {
  const actor = await Actor.findById({ _id: req.params.id }).lean();
  if (!actor) return res.status(404).send("Actor Not found");
  res.status(200).render("actorDetails.hbs", { actor });
};

// post Actor
const postActor = async (req, res) => {
  const { firstName, lastName, age, gender } = req.body;
  try {
    let actor = new Actor({
      firstName: firstName,
      lastName: lastName,
      age: age,
      gender: gender,
      picture: req.file.path,
    });

    await actor.save();
    res.status(200).send("Actor succesfully saved");
  } catch (e) {
    res.send(e.message);
  }
};
// update Actor

const updateActor = async (req, res) => {
  try {
    const { firstName, lastName, age, gender, picture } = req.body;
    const updateActorObject = {};
    if (typeof firstName !== "undefined") updateActor["firstName"] = firstName;
    if (typeof lastName !== "undefined") updateActor["lastName"] = lastName;
    if (typeof age !== "undefined") updateActor["age"] = age;
    if (typeof gender !== "undefined") updateActor["gender"] = gender;
    if (typeof picture !== "undefined") updateActor["picture"] = req.file.path;

    const actor = await Actor.findByIdAndUpdate(
      req.params.id,
      updateActorObject
    );
    if (!actor) return res.status(404).send("actor not found");
    res.status(200).send("Actor Succesfully Saved");
  } catch (e) {
    res.send(e.message);
  }
};
//  get Dummy Actors
const getThenpostDummyActors = async (req, res) => {
  try {
    const actors = await getActorsFromApi();
    actors.map(async (dummyActor) => {
      const { id, firstName, lastName, title, picture } = dummyActor;
      const actor = new Actor({
        _id: id,
        firstName: firstName,
        lastName: lastName,
        gender: title == "ms" ? "Female" : "Male",
        picture: picture,
      });
      await actor.save();
    });

    res.send("Data Sucessfully Stored in data based...");
  } catch (e) {
    res.send(e.message);
  }
};
// download images from Api
const downloadPicture = async (req, res) => {
  try {
    const actors = await getActorsFromApi();

    count = 0;
    actors.forEach(async (actor) => {
      picture = actor.picture;
      let path = "C:\\Users\\bilal\\Downloads\\Download\\";
      await createPicture(picture, path, count++);
    });
  } catch (err) {
    return res.send(err.message);
  }
  res.send("Images saved");
};

// helper function for download picture

async function createPicture(url, path, count) {
  const options = {
    url: url,
    dest: path + "image_" + count + ".jpg",
  };
  await download.image(options);
}

// helper function for pagination
exports.getActors = getActors;
exports.postActor = postActor;
exports.getActor = getActor;
exports.updateActor = updateActor;
exports.getThenpostDummyActors = getThenpostDummyActors;
exports.downloadPicture = downloadPicture;
