const {Actor} = require("../models/Actor");
const validateActor = require("./validation");
// Get All Actors
const getActors = async(req,res) =>{
    try{
    const actor = await Actor.find().select("name age gender -_id");
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
    const {name , age , gender} = req.body;
    try {
    let actor =  new Actor ({
        name : name,
        age : age ,
        gender : gender
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

exports.getActors = getActors;
exports.postActor = postActor;
exports.getActor = getActor;
exports.updateActor = updateActor;