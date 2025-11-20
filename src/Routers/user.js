const express  = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const connectionRequestModel = require("../models/connectionRequest");


userRouter.get("/user/request/recieved", userAuth, async(req,res) => {

    try{
        const loggedInUser = req.user;

        const connectionRequest = await connectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: "interest",
        }).populate("formUserId","firstName lastName");

        res.json({message: " data fetched succefully", data: connectionRequest,});

    }
    catch(err){
        res.status(400).send("ERROR : "+err.message)
    }
});

userRouter.get("/user/connection", userAuth, async (req,res) => {
    try{
        const loggedInUser = req.user;
        const connectionRequest = await connectionRequestModel.find({
            $or: [
                {toUserId: loggedInUser, status: "accepted"},
                {fromUserId: loggedInUser, status: "accepted"},
            ],
        }).populate("formUserId", "firstName lastName").populate("toUserId", "firstName lastName");

        

        const data = connectionRequest.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId
            }
              return row.fromUserId});

        console.log(data);

        res.json({data});

    }
    catch(err){
        res.status(400).send("ERROR :" + err.message);
    }
})

module.exports = userRouter;
