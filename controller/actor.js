const axios = require("axios");
const {Actor} = require("../models/Actor");
const  validateActor= require("./validation");
const fs = require ("fs");
// Get All Actors
const getActors = async(req,res) =>{
    try{
    const actor = await Actor.find();
    if(actor.length < 1) return res.status(404).send("No Record Found");
    res.status(200).send(actor);
    }
    catch (e) {
        res.send(e.message)
    }
}
//  Get Specific Actor
const getActor = async(req,res) =>{
    const actor = await Actor.findById({_id : req.params.id});
    if(!actor) return res.status(404).send("Actor Not found");
    res.status(200).send(actor);

}

// post Actor
const postActor = async (req , res) =>{
   
     const {error} = validateActor(req.body);
     if (error) return res.status(400).send(error.message);
     const {firstname , lastname ,age , gender} = req.body;
    try {
    let actor =  new Actor ({
        firstname :firstname,
        lastname : lastname,
        age : age,
        gender : gender,
    
    })
   
     await actor.save();
    res.status(200).send("Actor succesfully saved");
}
catch (e)
{  
    res.send(e.message);
}
 }
// update Actor

 const updateActor = async (req , res) =>{
    try{
        const actor = await Actor.findByIdAndUpdate(req.params.id , req.body);
        if(!actor) return res.status(404).send("actor not found")
        res.status(200).send("Actor Succesfully Saved");
    
    }
    catch (e)
    {
        res.send(e.message);
    }
 }
//  get Dummy Actors 
const getThenpostDummyActors = async(req, res) =>{
    try {
    const dummyActors = await axios.get(" https://dummyapi.io/data/v1/user", {
        headers : {
            "app-id" : "6223dd3357202319add4f0b1"
        }
    })
      const dummyActorsData = dummyActors.data.data;
      
     const actors =  await Actor.insertMany(dummyActorsData);
      res.send(actors)
}
catch (e)
{
    res.send(e.message);
}

}  
exports.getActors = getActors;
exports.postActor = postActor;
exports.getActor = getActor;
exports.updateActor = updateActor;
exports.getThenpostDummyActors = getThenpostDummyActors