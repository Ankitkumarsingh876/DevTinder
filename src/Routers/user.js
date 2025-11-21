const express  = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const connectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");


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
                {toUserId: loggedInUser._id, status: "accepted"},
                {formUserId: loggedInUser._id, status: "accepted"},
            ],
        }).populate("formUserId", "firstName lastName").populate("toUserId", "firstName lastName");

        const data = connectionRequest.map((row) => {
            if(row.formUserId._id.toString() == loggedInUser._id.toString()){
                return row.toUserId
            }
              return row.formUserId});

        // console.log(data);

        res.json({data});

    }
    catch(err){
        res.status(400).send("ERROR :" + err.message);
    }
})

userRouter.get("/feed", userAuth, async(req,res) => {
    try{
        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;

        const connectionRequest = await connectionRequestModel.find({
            $or: [
                {formUserId: loggedInUser._id},
                {toUserId: loggedInUser._id}
            ],
        }).select("formUserId toUserId");
        const hideUserFromFeed = new Set();
        connectionRequest.forEach((req) => {
            hideUserFromFeed.add(req.formUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        });

        const users = await User.find({
            $and: [{_id: {$nin: Array.from(hideUserFromFeed)},},
                {_id: {$ne: loggedInUser._id},}
            ],

        }).skip(skip).limit(limit);

        res.send(users);

    }
    catch(err){
        res.status(400).send("ERROR :" + err.message)
    }

})

module.exports = userRouter;
