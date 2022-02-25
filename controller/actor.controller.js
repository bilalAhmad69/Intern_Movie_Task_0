const {Actor , validateActor} = require("../models/actor.models")

//  >>>>>>>  Get All Actors  Start <<<<<<<<<<<  //

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

//  >>>>>>>  Get All Actors  End<<<<<<<<<<<  //

//  >>>>>>>  Get Specific Actor  Start <<<<<<<<<<<  //
const specificActor = async(req,res) =>{
   console.log(req.params.id)
    const actor = await Actor.findById({_id : req.params.id});
    if(!actor) return res.status(404).send("Actor Not found");
    res.status(200).send(actor);

}

//  >>>>>>>  Get Specific Actor  End <<<<<<<<<<<  //



//>>>>>>>>>>>>> post Actor Start <<<<<<<<<<<<<<<<//
const postActor = async (req , res) =>{
    const {error} = validateActor(req.body);
    if (error) return res.status(400).send(error.message);
    const {name , age , gender} = req.body;
    try {
    let actor = new Actor ({
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

//>>>>>>>>>>>>> post Actor End <<<<<<<<<<<<<<<<//

//>>>>>>>>>>>>> Update Actor Start <<<<<<<<<<<<<<<<//

 const updateActor = async (req , res) =>{
     const {error} = validateActor(req.boyd);
     if(error) return res.status(400).send(error.message);
     const {name , age , gender} = req.body;
    try{
        const actor = await Actor.findByIdAndUpdate(req.params.id , {
            name : name,
            age : age ,
            gender : gender
        })
        if(!actor) return res.status(404).send("actor not found")
        res.status(200).send("Actor Succesfully Saved");
    
    }
    catch (e)
    {
        res.send(e.message);
    }
 }

//>>>>>>>>>>>>> Update Actor End <<<<<<<<<<<<<<<<//





exports.getActors = getActors;
exports.postActor = postActor;
exports.specificActor = specificActor;
exports.updateActor = updateActor;