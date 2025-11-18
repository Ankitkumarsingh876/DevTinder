const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth.js");
const { validateEditProfileData } = require("../utils/validation.js");

profileRouter.get("/profile/view", userAuth, async( req,res) => {
    try {

     const user = req.user;
     res.send(user);}
     catch(err){
          res.status(400).send("Something went wrong"+ err.message);
     }
})

profileRouter.patch("/profile/edit",userAuth, async (req,res) =>{

     try{
          if(!validateEditProfileData(req)) {
               throw new Error("Invalid Error request");
          }

          const loggedInUser = req.user;
          console.log(loggedInUser);
          Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
          console.log(loggedInUser);
          await loggedInUser.save();

          res.json({message: `${loggedInUser.firstName}, profile Edit was succfully`, data:loggedInUser});
     }
     catch (err){
          res.status(400).send("something went wrong "+ err.message);
     }
     
})
module.exports = profileRouter;