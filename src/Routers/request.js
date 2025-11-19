const express = require('express');
const {userAuth} = require("../middlewares/auth.js");
const connectionRequestModel = require('../models/connectionRequest.js');
const requestRouter = express.Router();
const User = require("../models/user.js");

requestRouter.post("/request/send/:status/:toUserId",userAuth, async(req,res) => {
     try{
          const formUserId = req.user._id;
          const toUserId = req.params?.toUserId;
          const status =  req.params?.status;
          const allowedStatus= ["interest","ingnored"];

          if(!allowedStatus.includes(status)){
               return res.status(400).json({message: "invalid status types: " + status});
          }

          const toUser = await User.findById(toUserId);
          if(!toUser){
               return res.status(400).json({message: "User not found!"});
          }

          const existingConnectionRequest = await connectionRequestModel.findOne({
               $or: [
                    {formUserId, toUserId},
                    {formUserId: toUserId, toUserId: formUserId},

               ],
          });
          if(existingConnectionRequest){
             return res.status(400).json({message: "connection Request already exist"});
          }

          const connectionRequest = new connectionRequestModel({
               formUserId, toUserId, status
          })
          const data = await connectionRequest.save();
          res.json({message: req.user.firstName + " is " + status + " "+ toUserId.firstName ,data});
     }
     catch(err){
          res.status(500).send("ERROR: "+ err.message);
     }
     
   
})

module.exports = requestRouter;