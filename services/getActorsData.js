const axios = require("axios");
const res = require("express/lib/response");
// get Actors Data from DummyAPi
let pageNumber = 0;
let actorsData = [];
module.exports = getActorsFromApi = async () => {
  try {
    const dummyActors = await axios.get(
      `https://dummyapi.io/data/v1/user?page=${pageNumber}&limit=50`,
      {
        headers: {
          "app-id": "6223dd3357202319add4f0b1",
        },
      }
    );
    if (pageNumber <= 1) {
      pageNumber++;
      actorsData.push(dummyActors.data.data);
      return getActorsFromApi();
    }
    return actorsData.flat();
  } catch (e) {
    res.send(e.message);
  }
};
